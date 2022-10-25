const URL_REGEXP = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;
const TOKEN_REGEXP = /Bearer\s(\w|\.)+/;

const TOKEN_SIGN = 'don\'t say it anybody';

module.exports = {
  URL_REGEXP,
  TOKEN_REGEXP,
  TOKEN_SIGN,
};
