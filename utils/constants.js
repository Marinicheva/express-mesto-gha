const ERRORS = {
  badRequest: {
    errorCode: 400, // Add
    errorMessage: 'Переданы некорректные или неполные данные',
  },
  forbidden: {
    errorCode: 403, // Add
    errorMessage: 'У данного пользователя нет прав на выполнение этого действия',
  },
  notFound: { // Add
    errorCode: 404,
    errorMessage: 'Запрашиваемый ресурс не найден',
  },
  defaultError: {
    errorCode: 500, // Add
    errorMessage: 'На сервере произошла ошибка',
  },
};

module.exports = ERRORS;
