const environment = process.env.NODE_ENV || 'development';
const configuration = require('/../knexfile')[environment];
const database = require('knex')(configuration);

var user = require('/../models/user');

const create = (request, response) => {
    console.log(request)
    database('users').where('apiKey', request.body.api_key)
        .then((user) => {
            if (user) {

            } else {
                response.status(401).send({error: 'Unauthorized'})
            };
        })
});