const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../utils/Errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let playload;

  try {
    playload = jwt.verify(token, 'secret'); // TODO Не забудь - соль в константе
    req.user = playload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

module.exports = {
  auth,
};
