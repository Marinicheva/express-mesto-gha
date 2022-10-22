const mongoose = require('mongoose');
const Card = require('../models/card');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors');

const ERRORS = require('../utils/constants'); // TODO Don't forget to remove when set central errorHandler

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create(
    {
      name,
      link,
      owner: req.user._id,
    },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      // Некорретные данные
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError(`Карточка с id ${cardId} не найдена`))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав для выполнения этого действия');
      }

      Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch((err) => {
      // Некорректный ID карточки
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Указан некорректный id картчоки'));
      }

      next(err);
    });
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с id ${cardId} не найдена`))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        // Некорректный id карточки
        next(new BadRequestError('Передан некорректный id карточки'));
      }

      next(err);
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFoundError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }

      if (err.message === 'NotFoundError') {
        return res
          .status(ERRORS.notFound.errorCode)
          .send({ message: ERRORS.notFound.errorMessage });
      }
      return res
        .status(ERRORS.defaultError.errorCode)
        .send({ message: ERRORS.defaultError.errorMessage });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
