const crypto = require('crypto');

const URL_REGEXP = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;

const TOKEN_SIGN = crypto.randomBytes(16).toString('hex');

module.exports = {
  URL_REGEXP,
  TOKEN_SIGN,
};
