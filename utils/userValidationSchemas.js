const { Joi } = require('celebrate');

const { URL_REGEXP, TOKEN_REGEXP } = require('./constants');

const unloginedUserSchema = { // Незалогиненный юзер
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGEXP),
  }),
};

const loginedUserSchema = { // Залогиненный юзер
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGEXP),
  }),
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().regex(TOKEN_REGEXP),
  }).unknown(true),
};

module.exports = {
  unloginedUserSchema,
  loginedUserSchema,
};
