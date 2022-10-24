const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const cardValidationSchema = require('../utils/cardValidationSchema');

router.get('/', getCards);
router.post('/', celebrate(cardValidationSchema), createCard);
router.delete('/:cardId', celebrate(cardValidationSchema), deleteCard);
router.put('/:cardId/likes', celebrate(cardValidationSchema), addLike);
router.delete('/:cardId/likes', celebrate(cardValidationSchema), removeLike);

module.exports = router;
