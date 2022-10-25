const router = require('express').Router();
const { celebrate } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');

const { unloginedUserSchema, loginedUserSchema } = require('../utils/userValidationSchemas');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors');

router.post('/signup', celebrate(unloginedUserSchema), createUser);
router.post('/signin', celebrate(unloginedUserSchema), login);

router.use('/users', celebrate(loginedUserSchema), auth, userRouter);
router.use('/cards', celebrate(loginedUserSchema), auth, cardRouter);

router.get('/', (req, res) => {
  res.send('Это сейчас я маленькая строка. Но когда-нибудь я стану ГЛАВНОЙ страницей');
});

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
