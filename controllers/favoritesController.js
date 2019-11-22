const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var dotenv = require('dotenv').config();
var fetch = require('node-fetch');
var user = require('../models/user');
var fetch = require('node-fetch');
let forecastPojo = require('../models/currentForecast.js');

const create = (request, response) => {
    database('users').where('apiKey', request.body.api_key)
        .then((user) => {
            if (user) {
                 return database('favorites').insert({location: request.body.location, userId: user.id})
                     .then(() => {
                         response.status(200).send({message: `${request.body.location} has been added to your favorites`});
                     })
                     .catch((error) => {
                         response.status(500).json({error})
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
    let addedFav = new forecastPojo(location, forecast)
    return addedFav;
}

async function forecastFavs(favArray) {
    const forecastedFavs = []
    await asyncForEach(favArray, async (fav) => {
        let coords  = await googleGeocode(fav.location).then(response => response)
        let darksky = await darkskyApi(coords.lat, coords.lng).then(response => response)
        let finalObject = await createFavForecast(fav.location, darksky)
        forecastedFavs.push(finalObject)
    })
    return forecastedFavs
}

async function dbCall(user) {
    let favArray = await database('favorites').where('userId', user[0].id)
    let final = await forecastFavs(favArray)
    return final;
}

const show = async (request, response) => {
    let user = await database('users').where('apiKey', request.body.api_key)
        if(user) {
            let work = await dbCall(user)
            response.status(200).json(work)
           } else {
               response.status(401).send({error: 'Unauthorized'})
           };
};

const remove = (request, response) => {
    database('users').where('apiKey', request.body.api_key)
        .then((user) => {
            if(user) {
                database('favorites').where('userId', user[0].id).where('location', request.body.location).del()
                    .then(() => {
                        response.status(204).send({message: `${request.query.location} has been deleted`})
                    })
                    .catch((error) => {
                        response.status(500).json({error})
                    })
            } else {
                response.status(401).send({error: 'Unauthorized'})
            };
        })
};


module.exports = {
    create,
    show,
    remove
};