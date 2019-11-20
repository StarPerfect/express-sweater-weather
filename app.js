const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// const environment = process.env.NODE_ENV || 'development';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);
const User = require('./models/user');
var indexRouter = require('./routes/index');
// var papersRouter = require('./routes/api/v1/papers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.end.PORT || 3000);
app.locals.title = 'Express Sweater Weather';

app.use('/', indexRouter);
// app.use('/api/v1/papers', papersRouter);

app.get('/api/v1/forecast', (req, res) => {
    res.send
});
module.exports = app;







// Below is my Geocode API call
var geocodeStart = 'https://maps.googleapis.com/maps/api/geocode/json'
var fullGoogleUrl = geocodeStart + '?key=' + process.env.GOOGLE_KEY + '&address=denver,co'

fetch(fullGoogleUrl)
    .then(response => response.json())
    .then((results) => {
        let coords = results.results[0].geometry.location
        let latitude = coords.lat
        let longitude = coords.lng
        console.log(coords)
    });





// Below is the DarkSky API Call
// { lat: 39.7392358, lng: -104.990251 }

var darkskyStart = 'https://api.darksky.net/'
var fullDarkskyUrl = darkskyStart + 'forecast/' + process.env.DARKSKY_KEY + '/39.7392358,-104.990251'
// var fullDarkskyUrl = darkskyStart + `forecast/${process.env.GOOGLE_KEY}/${latitude},${longitude}`
fetch(fullDarkskyUrl)
.then(response => response.json())
.then((results) => {
    console.log(results)
});
