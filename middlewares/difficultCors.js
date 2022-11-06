const DEFAULT_ALLOWED_METHODS = require('../utils/constants');

const difficultCors = (req, res, next) => {
  const { method } = req;

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.end();
  } else {
    next();
  }
};

module.exports = difficultCors;
