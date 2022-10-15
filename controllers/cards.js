const mongoose = require('mongoose');
const Card = require('../models/card');

const ERRORS = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res
      .status(ERRORS.defaultError.errorCode)
      .send({ message: ERRORS.defaultError.errorMessage }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }
      return res
        .status(ERRORS.defaultError.errorCode)
        .send({ message: ERRORS.defaultError.errorMessage });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .orFail(new Error('NotFoundError'))
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new Error('Forbidden');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }

      if (err.message === 'Forbidden') {
        return res
          .status(ERRORS.forbidden.errorCode)
          .send({ message: ERRORS.forbidden.errorMessage });
      }

      if (err.name === 'NotFoundError') {
        return res
          .status(ERRORS.notFound.errorCode)
          .send({ message: ERRORS.notFound.errorMessage });
      }

      return res
        .status(ERRORS.defaultError.errorCode)
        .send({ message: ERRORS.defaultError.errorMessage });
    });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFoundError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }

      if (err.name === 'NotFoundError') {
        return res
          .status(ERRORS.notFound.errorCode)
          .send({ message: ERRORS.notFound.errorMessage });
      }

      return res
        .status(ERRORS.defaultError.errorCode)
        .send({ message: ERRORS.defaultError.errorMessage });
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

      if (err.name === 'NotFoundError') {
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
