const URL_REGEXP = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;

const allowedCors = [
  'https://marinich.students.nomoredomains.icu',
  'http://marinich.students.nomoredomains.icu',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  URL_REGEXP,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
