// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/express_sweater_weather_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/express_sweater_weather_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://pixwyexapothmp:9954869918636a97be4306e7498fc42d43f39d588f62a7a93f0ab9886e011354@ec2-107-21-110-75.compute-1.amazonaws.com:5432/df1d39bfjq3mf1',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
