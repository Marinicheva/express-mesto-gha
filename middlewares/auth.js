const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { TOKEN_SIGN } = require('../utils/constants');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  let playload;

  try {
    playload = jwt.verify(token, TOKEN_SIGN);
    req.user = playload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

module.exports = {
  auth,
};
