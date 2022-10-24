const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const { createCardSchema, cardByIDSchema } = require('../utils/cardValidationSchema');

router.get('/', getCards);
router.post('/', celebrate(createCardSchema), createCard);
router.delete('/:cardId', celebrate(cardByIDSchema), deleteCard);
router.put('/:cardId/likes', celebrate(cardByIDSchema), addLike);
router.delete('/:cardId/likes', celebrate(cardByIDSchema), removeLike);

module.exports = router;
