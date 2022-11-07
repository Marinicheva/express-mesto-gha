const allowedCors = require('../utils/constants');

const simpleCors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    next();
  } else {
    next();
  }
};

module.exports = simpleCors;
