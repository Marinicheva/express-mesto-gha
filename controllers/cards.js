const mongoose = require('mongoose');
const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

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
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError(`Карточка с id ${cardId} не найдена`))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нет прав для выполнения этого действия'));
      }

      return Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch((err) => {
      // Некорректный ID карточки
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Указан некорректный id картчоки'));
      } else {
        next(err);
      }
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
      } else {
        next(err);
      }
    });
};

const removeLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с id ${cardId} не найдена`))
    .then((card) => res.send(card))
    .catch((err) => {
      // Некорректный id карточки
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
