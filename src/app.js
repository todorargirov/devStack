const config = require('./config');
const db = require('./db/pg');

function start() {
    // Initialize app
    const fastify = require('fastify')({ logger: { level: 'debug' /* file: './logs/app.log' */ } });
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

    fastify.listen(config.PORT, config.HOST, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
}

module.exports = {
    start: start,
};
