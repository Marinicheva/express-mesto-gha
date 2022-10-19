const mongoose = require('mongoose');
const User = require('../models/user');

const ERRORS = require('../utils/constants');

const getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res
    .status(ERRORS.defaultError.errorCode)
    .send({ message: ERRORS.defaultError.errorMessage }));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send(user))
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

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId).orFail(new Error('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }

      if (err.message === 'Not found') {
        return res
          .status(ERRORS.notFound.errorCode)
          .send({ message: ERRORS.notFound.errorMessage });
      }

      return res
        .status(ERRORS.defaultError.errorCode)
        .send({ message: ERRORS.defaultError.errorMessage });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }

      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }

      if (err.message === 'Not found') {
        return res
          .status(ERRORS.notFound.errorCode)
          .send({ message: ERRORS.notFound.errorMessage });
      }

      return res
        .status(ERRORS.defaultError.errorCode)
        .send({ message: ERRORS.defaultError.errorMessage });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERRORS.badRequest.errorCode)
          .send({ message: ERRORS.badRequest.errorMessage });
      }

      if (err.message === 'Not found') {
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
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
};
