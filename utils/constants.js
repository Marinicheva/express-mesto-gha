const ERRORS = {
  badRequest: {
    errorCode: 400,
    errorMessage: 'Переданы некорректные или неполные данные',
  },
  forbidden: {
    errorCode: 403,
    errorMessage: 'У данного пользователя нет прав на выполнение этого действия',
  },
  notFound: {
    errorCode: 404,
    errorMessage: 'Запрашиваемый ресурс не найден',
  },
  defaultError: {
    errorCode: 500,
    errorMessage: 'На сервере произошла ошибка',
  },
};

module.exports = ERRORS;
