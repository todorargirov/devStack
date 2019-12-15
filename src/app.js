require('dotenv').config()

function start() {
    // Initialize app
    const fastify = require('fastify')({ logger: true })
    const routes = require('./routes')

    fastify.register(routes).after(err => {
        if (err) {
            throw err
        }
    })

    fastify.listen(process.env.PORT, process.env.HOST, (err, address) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`Server started on ${address}`)
    })
}

module.exports = {
    start: start,
}
