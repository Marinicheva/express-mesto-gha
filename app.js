const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const limiter = require('./middlewares/requestLimiter');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

dotenv.config();

// console.log(process.env.TOKEN_SIGN);

const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose.connect(MONGO_URL);

app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
