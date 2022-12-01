require("dotenv").config();

const { APP_PORT, APP_DB_HOST, APP_DB_PASSWORD, APP_DB_USER } = process.env;

const config = {
  app: {
    port: APP_PORT || 8001,
  },
  db: {
    user: APP_DB_USER,
    password: APP_DB_PASSWORD,
    host: APP_DB_HOST,
  },
};

module.exports = config;
