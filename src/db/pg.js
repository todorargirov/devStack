const { Pool } = require('pg');

let pool;
let logger;
let callCount = 0;

const testQuery = 'SELECT NOW() as now';

const connectOptions = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    max: process.env.DB_MAX_POOL_SIZE,
    connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT_MILLIS,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS,
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
