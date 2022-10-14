const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.get('/', (req, res) => {
  res.send('Это сейчас я маленькая строка. Но когда-нибудь я стану ГЛАВНОЙ страницей');
});

module.exports = router;
