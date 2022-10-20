[![Tests for sprint 13](https://github.com/Marinicheva/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/Marinicheva/express-mesto-gha/actions/workflows/tests-13-sprint.yml)

[![Tests for sprint 14](https://github.com/Marinicheva/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Marinicheva/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

#  Учебный проект Mesto (бэкенд)
## Описание проекта
Mesto - это сервис, с помощью которого можно делиться с другими пользователями Интернета своими фотографиями.
В данном проекте выполнена реализация бэкенд части проекта, в которой предусмотрено: 
* запуск сервера;
* установка соединения с NoSQL БД - MongoDB;
* создание основных маршрутов;
* обработка запросов по маршрутам;
* описание схем и моделей документов в БД;
* отловка и обработка возможных ошибок;

Код проекта можно посмотреть по ссылке  [тут](https://github.com/Marinicheva/express-mesto-gha).

В работе над данным проектом были использованы следующие методы и технологии:

- Node.js
- Express
- MongoDB
- Mongoose
- ESLint
  
##  Запуск проекта

`npm install` - для устновки необходимых для функционирования проекта пакетов

`mongod` - перед запуском самого проекта (как в продакшен версии, так и в режиме разработки) необходимо выполнить данную команду для подключения к БД

`npm run start` — запускает сервер

`npm run dev` — запускает сервер с hot-reload
