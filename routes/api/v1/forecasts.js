var express = require('express');
var router = express.Router();
var dotenv = require('dotenv').config();
var fetch = require('node-fetch');
var user = require('../../../models/user');
var forecastPojo = require('../../../models/forecast.js');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

var latitude;
var longitude;
var location;


router.get('/', (request, response) => {
    location = request.query.location
    database('users').where('apiKey', request.body.api_key)
        .then((user) => {
            if (user) {
                let geocodeStart = 'https://maps.googleapis.com/maps/api/geocode/json'
                let fullGoogleUrl = geocodeStart + '?key=' + process.env.GOOGLE_KEY + '&address=' + location
                fetch(fullGoogleUrl)
                    .then(res => res.json())
                    .then((results) => {
                        let coords = results.results[0].geometry.location
                        latitude = coords.lat;
                        longitude = coords.lng;
                    })
                    .then(() => {
                        var darkskyStart = 'https://api.darksky.net/'
                        var fullDarkskyUrl = darkskyStart + `forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`
                        fetch(fullDarkskyUrl)
                            .then(res => res.json())
                            .then((results) => {
                                response.status(200).send(JSON.stringify(new forecastPojo(location, results)))
                            })
                    })
                    .catch((error) => {
                        response.status(500).json({error});
                    });
            } else {
                response.status(401).send({error: 'Unauthorized'})
            };
        })
});

module.exports = router;