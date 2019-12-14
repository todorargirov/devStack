async function routes(fastify) {
    fastify.get('/', (request, reply) => {
        reply.send('Hello World')
    })
}

module.exports = routes
