const handleErrors = (err, req, res, next) => {
  // Определяем код ошибки (если нет присваиваем дефолтное значение)
  const { statusCode = 500, message } = err;
  res.status(statusCode)
  // Задаем сообщение ошибки (если сттус дефолт, то и сообщение дефолтное)
    .send({
      message: statusCode === 500
        ? 'На сервера произошла ошибка'
        : message,
    });

  next();
};

module.exports = handleErrors;
