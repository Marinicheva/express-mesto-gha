const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => res.status(500).send({ message: err.message }));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  const { id } = req.params;

  return User.findById(id).orFail(new Error('Not found')) // Посмотри в слак в чате группы пост от Жени какой там красивый текст ошибки
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not found') {
        return res.status(404).send('Пользователь с таким id не найден');
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new Error('Not found')) // Посмотри в слак в чате группы пост от Жени какой там красивый текст ошибки
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        return res.status(404).send('Пользователь с таким id не найден');
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
};