const { Pool } = require('pg');

let pool;
let callCount = 0;

const connectOptions = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
};

const initPool = () => {
    if (!pool) {
        console.log('Pool not initialized! Creating now...');
        pool = new Pool(connectOptions);
    }
    callCount++;
    console.log('Database call count: ' + callCount);
    return pool;
};
module.exports = {
    getClient: async function getClient() {
        if (!pool) {
            initPool();
        }
        const client = await pool.connect();
        return client;
    },
};
