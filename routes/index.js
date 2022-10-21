const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const {
  createUser,
  login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const ERRORS = require('../utils/constants');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.get('/', (req, res) => {
  res.send('Это сейчас я маленькая строка. Но когда-нибудь я стану ГЛАВНОЙ страницей');
});

router.use('*', (req, res) => {
  res.status(ERRORS.notFound.errorCode).send({ message: ERRORS.notFound.errorMessage });
});

module.exports = router;
