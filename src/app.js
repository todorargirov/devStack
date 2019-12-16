require('dotenv').config();
const db = require('./db/pg');

function start() {
    // Initialize app
    const fastify = require('fastify')({ logger: true });
    const routes = require('./routes');

    // Initialize db
    (async () => {
        const client = await db.getClient();
        let res = null;
        try {
            res = await client.query('SELECT * from ff_users where id = $1', [1]);
            fastify.log.info('DB Result ', res.rows);
        } finally {
            client.release();
        }
    })();

    // Initialize routes
    fastify.register(routes).after(err => {
        if (err) {
            throw err;
        }
    });

    fastify.ready(() => {
        console.log(fastify.printRoutes());
    });

    fastify.listen(process.env.PORT, process.env.HOST, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
}

module.exports = {
    start: start,
};
