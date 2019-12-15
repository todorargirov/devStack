module.exports = [
    {
        methods: ['GET', 'POST'],
        url: '/ping',
        handler: (request, reply) => {
            reply.send('Pong!')
        },
    },
    {
        methods: ['PATCH'],
        url: '/ping',
        handler: (request, reply) => {
            reply.send('PATCH PONG')
        },
    },
]
