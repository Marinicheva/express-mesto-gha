const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(401)
      .send({ message: 'Необходима авторизация' }); // TODO Общий обработчик ошибок
  }

  const token = authorization.replace('Bearer ', '');

  let playload;

  try {
    playload = jwt.verify(token, 'secret');
    // console.log('playload', playload);
    req.user = playload;
    next();
  } catch (err) {
    res.status(401)
      .send({ message: 'Необходима авторизация' }); // TODO Общий обработчик ошибок
  }
};

module.exports = {
  auth,
};
