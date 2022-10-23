const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError, BadRequestError } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: (value) => {
      const regex = /https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/;
      return regex.test(value);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      if (validator.isEmail(value)) {
        return true;
      }
      return false;
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Необходима авторизация'))
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadRequestError(`Пользователь с e-mail ${email} не найден`));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            Promise.reject(new BadRequestError('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
