const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const ERRORS = require('../utils/constants');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.get('/', (req, res) => {
  res.send('Это сейчас я маленькая строка. Но когда-нибудь я стану ГЛАВНОЙ страницей');
});

router.use('*', (req, res) => {
  res.status(ERRORS.notFound.errorCode).send({ message: ERRORS.notFound.errorMessage });
});

module.exports = router;
