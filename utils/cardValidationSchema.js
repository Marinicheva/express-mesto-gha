const { Joi } = require('celebrate');

const URL_REGEXP = require('./constants');

const cardValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().regex(URL_REGEXP),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports = cardValidationSchema;
