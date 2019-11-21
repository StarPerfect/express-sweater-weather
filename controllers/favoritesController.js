const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

var user = require('../models/user');
var fetch = require('node-fetch');

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

module.exports = {
    create
};