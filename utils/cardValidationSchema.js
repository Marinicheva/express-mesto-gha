const { Joi } = require('celebrate');

const { URL_REGEXP } = require('./constants');

const createCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(URL_REGEXP),
  }),
};

const getCardSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports = {
  createCardSchema,
  getCardSchema,

};
