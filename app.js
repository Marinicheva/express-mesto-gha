const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => console.log('Db is connected'));

app.use('/users', userRouter);

// Отрабатывает
app.get('/', (req, res) => {
  res.send('Get on main is working');
});

app.listen(PORT, () => {
  console.log('App listerning');
});
