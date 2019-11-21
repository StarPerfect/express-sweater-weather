var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) => {
    database('favorites').select()
        .then(res => res.json())
        .then(result => response.status(200).send(result))
});

module.exports = router;