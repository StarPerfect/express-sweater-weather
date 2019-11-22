var dotenv = require('dotenv').config();
var fetch = require('node-fetch');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

var indexRouter = require('./routes/index');
var forecastsRouter = require('./routes/api/v1/forecasts');
var favoritesController = require('./controllers/favoritesController');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.title = 'Express Sweater Weather';

app.use('/', indexRouter);
app.use('/api/v1/forecasts', forecastsRouter);
app.post('/api/v1/favorites', favoritesController.create);

app.delete('/api/v1/favorites', favoritesController.remove);


module.exports = app;