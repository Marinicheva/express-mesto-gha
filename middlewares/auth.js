const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  let playload;

  try {
    playload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = playload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

module.exports = {
  auth,
};
