const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
app.use(express.json());

mongoose.connect(MONGO_URL)
  .then(() => console.log('Db is connected'))
  .catch((err) => console.log('Ошибка подключения к БД', err));

app.use((req, res, next) => {
  req.user = {
    _id: '634824bf25d513763e707942',
  };

  next();
});

app.use('/', router);

app.listen(PORT, () => {
  console.log('App listerning');
});
