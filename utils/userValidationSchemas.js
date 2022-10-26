const { Joi } = require('celebrate');

const { URL_REGEXP } = require('./constants');

const unloginedUserSchema = { // Незалогиненный юзер
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
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
    userId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = {
  unloginedUserSchema,
  loginedUserSchema,
};
