const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send(err.message));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  const { id } = req.params;

  return Card.findByIdAndRemove(id).orFail(new Error('Not found')) // Посмотри в слак в чате группы пост от Жени какой там красивый текст ошибки
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        return res.status(404).send('Карточка с таким id не найдена');
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
