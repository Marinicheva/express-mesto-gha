const router = require('express').Router();
const { celebrate } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');

const { unloginedUserSchema } = require('../utils/userValidationSchemas');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', celebrate(unloginedUserSchema), createUser);
router.post('/signin', celebrate(unloginedUserSchema), login);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
