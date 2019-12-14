require('dotenv').config()

function start() {
    const fastify = require('fastify')({ logger: true })
    const routes = require('./routes/routes')

    fastify.register(routes)

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
