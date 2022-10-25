const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
app.use(cookieParser());
app.use(express.json());

mongoose.connect(MONGO_URL);

app.use('/', router);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
