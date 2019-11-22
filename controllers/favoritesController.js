const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var dotenv = require('dotenv').config();
var fetch = require('node-fetch');
var user = require('../models/user');
var fetch = require('node-fetch');
let forecastCurrently = require('../models/currentForecast.js');
var latitude;
var longitude;

const create = (request, response) => {
    database('users').where('apiKey', request.body.api_key)
        .then((user) => {
            if (user) {
                 return database('favorites').insert({location: request.body.location, userId: user.id})
                     .then(() => {
                         response.status(200).send({message: `${request.body.location} has been added to your favorites`});
                     })
                     .catch((error) => {
                         response.status(500).json({error});
                     })
            } else {
                response.status(401).send({error: 'Unauthorized'})
            };
        })
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

async function googleGeocode(location) {
    let geocodeStart = 'https://maps.googleapis.com/maps/api/geocode/json'
    let fullGoogleUrl = geocodeStart + '?key=' + process.env.GOOGLE_KEY + '&address=' + location
    let response = await fetch(fullGoogleUrl)     
    let json = await response.json();
    let coords = json.results[0].geometry.location;  
    return coords;       
}

async function darkskyApi(latitude, longitude) {
    let darkskyStart = 'https://api.darksky.net/'
    let fullDarkskyUrl = darkskyStart + `forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`
    let response = await fetch(fullDarkskyUrl)
    let darksky = await response.json();
    return darksky;
}

async function createFavForecast(location, forecast) {
    let forecastedFavs = [];
    let favForecast = new forecastCurrently(location, forecast)
    let addedFav = forecastedFavs.push(favForecast);
    return addedFav;
}

const show = (request, response) => {
    let forecastedFavs = [];
    database('users').where('apiKey', request.body.api_key)
        .then((user) => {
           if(user) {
               database('favorites').where('userId', user[0].id)
                   .then((favArray) => {
                       asyncForEach(favArray, async(fav) => {
                           googleGeocode(fav.location)
                           .then((coords) => {
                                latitude = coords.lat;
                                longitude = coords.lng;
                           })
                            // let geocodeStart = 'https://maps.googleapis.com/maps/api/geocode/json'
                            // let fullGoogleUrl = geocodeStart + '?key=' + process.env.GOOGLE_KEY + '&address=' + fav.location
                            // fetch(fullGoogleUrl)
                            //     .then(res => res.json())
                            //     .then((results) => {
                            //         let coords = results.results[0].geometry.location
                                    // latitude = coords.lat;
                                    // longitude = coords.lng;
                            //     })
                            .then(() => {
                                darkskyApi(latitude, longitude)
                                .then((data) => { 
                                    console.log(data)
                                    // response.status(200).send(JSON.stringify(createFavForecast(fav.location, data)));
                                })
                                    // var darkskyStart = 'https://api.darksky.net/'
                                    // var fullDarkskyUrl = darkskyStart + `forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`
                                    // fetch(fullDarkskyUrl)
                                    //     .then(res => res.json())
                                    //     .then((results) => {
                                    //         let locationForecast = new forecastCurrently(fav.location, results)
                                    //         forecastedFavs.push(locationForecast)
                                    //     //    forecastedFavs.push(new forecastCurrently(fav.location, results))
                                    //        // FIGURE OUT HOW TO PULL OUT THIS FORECASTEDFAVS AND DISPLAY IT
                                    //     })
                                })
                                .catch((error) => {
                                    response.status(500).json({error});
                                });
                       })
                       .then(() => {
                        response.status(200).send(JSON.stringify(forecastedFavs));
                        })
                   })
                   .catch((error) => {
                       response.status(500).json({error})
                   })
           } else {
               response.status(401).send({error: 'Unauthorized'})
           };
        });
};


module.exports = {
    create,
    show
};