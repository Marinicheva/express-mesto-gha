const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => res.send(user))
        .catch((err) => {
          // Данные пользователя не соответствуют схеме
          if (err instanceof mongoose.Error.ValidationError) {
            next(new BadRequestError('Переданы некорректные или неполные данные'));
          }

          // Такой email уже есть в БД
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким e-mail уже существует'));
          }

          next(err);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' }); // TODO вместо secret надо сформировать строку для токена
      res
        .cookie('token', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ message: 'Авторизация прошла успешно', token });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный id пользователя'));
      }

      next(err);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Переданные новые данные пользователя не соответвуют схеме
        next(new BadRequestError('Переданные некорректные данные пользователя'));
      }

      if (err instanceof mongoose.Error.CastError) {
        // Некорретный id пользователя
        next(new BadRequestError('Некорректный id пользователя'));
      }

      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Переданные данные аватара не соответсвуют схеме
        next(new BadRequestError('Переданы некорректные данные аватара пользователя'));
      }

      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
};
