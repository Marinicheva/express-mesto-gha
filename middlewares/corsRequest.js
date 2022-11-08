const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const corsRequest = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req.method;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = corsRequest;
