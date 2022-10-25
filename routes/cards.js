const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const { createCardSchema, getCardSchema } = require('../utils/cardValidationSchema');

router.get('/', getCards);
router.post('/', celebrate(createCardSchema), createCard);
router.delete('/:cardId', celebrate(getCardSchema), deleteCard);
router.put('/:cardId/likes', celebrate(getCardSchema), addLike);
router.delete('/:cardId/likes', celebrate(getCardSchema), removeLike);

module.exports = router;
