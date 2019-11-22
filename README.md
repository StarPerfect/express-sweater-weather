# Express Sweater Weather

[![Build Status](https://travis-ci.com/StarPerfect/express-sweater-weather.svg?branch=master)](https://travis-ci.com/StarPerfect/express-sweater-weather)

## Contents
-[Introduction](#intro)
-[Initial Setup](#setup)
-[Testing](#testing)
-[How to Use](#use)
-[Schema Design](#schema)
-[Tech Stack List](#stack)
-[Core Contributors](#contributors)

#### Introduction <a name="intro"></a>
Express Sweater Weather is a small collection of endpoints using a lightweight Express framework. As the first introduction to JavaScript, it takes a project previously done in Ruby (my native language) and replicates it using Node.js and Knex. You can see the original project requirements [here](https://backend.turing.io/module4/projects/express_sweater_weather/express_sweater_weather_spec). The endpoints available in this application connect to [Google's Geocode API](https://developers.google.com/maps/documentation/geocoding/start#:~:targetText=The%20Geocoding%20API%20is%20a,Client%20for%20Google%20Maps%20Services.) for geolocation coordinates and sends them through the [Darksky API](https://darksky.net/dev/docs) which provides forecast information for the given location. Through the endpoints a user can get forecasts, save a favorite location, views forecasts for all their favorite locations, and delete a favorite. To see how to accomplish this, please see [Using this API](#use).

### Initial Setup <a name="setup"></a>
To use this app locally on your machine, you'll need to `clone` down a copy and install dependencies.

```
git clone git@github.com:StarPerfect/express-sweater-weather.git
npm install
```

A database is necessary before going any further. You’ll need to pick a name for it. I woudl suggest calling it something like `sweater_weather_dev`.  Once you've figured out a name, follow these commands to create your database and run the migrations necessary for this application.

```
psql
CREATE DATABASE put_db_name_here_dev;
\q
knex migrate:latest
knex seed:run
```

### Testing
Most of the setup is going to be same as the one you did before. You’ll notice one small difference with setting the environment flag to `test`.  

```
psql
CREATE DATABASE DATABASE_NAME_test;
\q
knex migrate:latest --env test
knex seed:run
```

Running tests are simple and require you to run the following command below: 

`npm test`

When the tests have completed, you’ll get a read out of how things panned out. Testing was not required with this project so you'll notice there isn't much in the results. That's totally ok for this application.

### How to Use <a name="use"></a>
There are two ways to use this application. There is a production version if you didn't want to install and run it locally from your machine. You will follow the same steps below but for the production version you will be replacing the `https://localhost:3000` with `https://express-s-w.herokuapp.com/`. Everything else is the same.

Now you are ready to see what this application can do! Because this is a backend app only, you'll need to use [Postman](https://www.getpostman.com/downloads/) to access the endpoints and see results. In terminal, run `npm start`. This starts the server. (This step is skipped if you're using the production version.)

Currently, this application does not have user registration but like most apps, an API key is required. I have setup a user for you and your API key is `jgn983hy48thw9begh98h4539h4`. This will need to be sent with each of the requests below.

#### GET Forecast Request
To pass in data such as your API key, find the `Body` section of the Postman request. Change the type to raw JSON and enter your API key from above like this:

```
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

Make sure you are sending a GET request to `https://localhost:3000/api/v1/forecasts?location=city,state` replacing City and State with the desired location. The response will be detailed forecast information for that location including current weather, 8 hourly updates, and the next 7 days.

#### POST Favorite Request
This endpoint allows for saving a favorite location. The raw JSON body will need to include both the API key from above and the location you'd like to favorite. Here's an example:

```
{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

Send this through Postman as a POST request to `https:localhost/api/v1/favorites`.

#### GET Favorite Location Forecasts Request
After you've saved some locations, you can view the current forecasts for each location you favorited. This request only need the API key sent as raw JSON in the body again. This will be a GET request to `https:localhost/api/v1/favorites`.

```
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

#### DELETE Favorite Request
Finally, you can delete any location off your favorites list. Like always, we need to send our API Key as raw JSON in the body:

```
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

Send this as a DELETE request in Postman to `https:localhost/api/v1/favorites`.

### Schema Design <a name="schema"></a>
<img src="https://dbdiagram.io/d/5dd7e54cedf08a25543e3f25">

### Tech Stack <a name="stack"></a>
- [Node.js](https://nodejs.org/en/)
- [Knex](https://www.npmjs.com/package/knex)
- [PostgreSQL](https://www.postgresql.org/)
- [Heroku](heroku.com)

### Contributors <a name="contributors"></a>
Corina Allen
- GitHub: [StarPerfect](https://github.com/StarPerfect)
- LinkedIn: [Corina Allen](https://www.linkedin.com/in/corina-allen/)