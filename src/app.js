require('dotenv').config();

function start() {
    // Initialize app
    const fastify = require('fastify')({ logger: true });
    const routes = require('./routes');

    // Initialize db
    fastify
        .register(require('fastify-postgres'), {
            connectionString: process.env.DB_CONNSTRING,
        })
        .after(err => {
            if (err) {
                throw err;
            }
        });

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
