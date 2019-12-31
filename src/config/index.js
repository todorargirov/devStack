require('dotenv').config();

const config = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,

    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,

    DB_MAX_POOL_SIZE: process.env.DB_MAX_POOL_SIZE,
    DB_CONNECTION_TIMEOUT_MILLIS: process.env.DB_CONNECTION_TIMEOUT_MILLIS,
    DB_IDLE_TIMEOUT_MILLIS: process.env.DB_IDLE_TIMEOUT_MILLIS,

    JWT_PREFIX: process.env.JWT_PREFIX,
    JWT_SECRET: process.env.JWT_SECRET,
}
module.exports = config;