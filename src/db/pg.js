const { Pool } = require('pg');
const config = require('../config');

let pool;
let logger;
let callCount = 0;

const testQuery = 'SELECT NOW() as now';

const connectOptions = {
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
    max: config.DB_MAX_POOL_SIZE,
    connectionTimeoutMillis: config.DB_CONNECTION_TIMEOUT_MILLIS,
    idleTimeoutMillis: config.DB_IDLE_TIMEOUT_MILLIS,
};

const init = loggerInstance => {
    if (!logger) {
        logger = loggerInstance;
    }
    if (!pool) {
        logger.info('Database not initialized! Creating now...');
        pool = new Pool(connectOptions);
    }
    logger = loggerInstance;
    if (testPool()) {
        return pool;
    }
};

const testPool = async () => {
    let res = null;
    try {
        res = await queryByClient(testQuery);
    } catch (err) {
        logger.error(err);
    }
};

async function queryByClient(queryString, queryParams) {
    if (!pool) {
        init();
    }

    const client = await pool.connect();
    let res = null;
    let start, end, duration;
    try {
        start = Date.now();
        res = await client.query(queryString, queryParams);
        end = Date.now();
        duration = end - start;
    } catch (err) {
        logger.error(err);
    } finally {
        client.release();
    }

    callCount++;
    logger.debug('Database Call Count: *** ', callCount, '  ***');
    logger.info(
        `Query: '${queryString}'; Params: ${queryParams || '[]'}; Result: ${JSON.stringify(
            res.rows
        )}; Duration: ${duration} ms`
    );
    return res;
}

module.exports = {
    init: init,
    query: queryByClient,
};
