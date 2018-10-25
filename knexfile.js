const path = require('path');

require('dotenv').config();

const {env} = process;
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      port: env.DB_PORT,
      host: env.DB_HOST,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve('./src/server/migrations'),
    },
    seeds: {
      directory: path.resolve('./src/server/seeds'),
    },
  },
};
