const { Joi } = require('celebrate');

const { URL_REGEXP, TOKEN_REGEXP } = require('./constants');

const createCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(URL_REGEXP),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().regex(TOKEN_REGEXP),
  }).unknown(true),
};

const getCardSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().regex(TOKEN_REGEXP),
  }).unknown(true),
};

module.exports = {
  createCardSchema,
  getCardSchema,

};
