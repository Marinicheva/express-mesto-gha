const URL_REGEXP = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;
const TOKEN_REGEXP = /Bearer\s(\w|\.)+/;

module.exports = {
  URL_REGEXP,
  TOKEN_REGEXP,
};
