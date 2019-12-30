require('dotenv').config();
const db = require('./db/pg');

function start() {
    // Initialize app
    const fastify = require('fastify')({ logger: { level: 'debug' } });
    const routes = require('./routes');

    // Initialize db
    db.init(fastify.log);

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
