const authService = require('../services/authService');

const url = '/auth';

const authRoutes = {
    methods: ['GET'],
    url: url,
    schema: {
        querystring: {
            type: 'object',
            properties: {
                username: { type: 'string' },
            },
            required: ['username'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                },
            },
        },
    },

    /*
    onRequest: (request, reply, done) => {


    },
    
    preParsing: (request, reply, done) => {
        console.log(`${url}:preParsing`)
        done()
    },

    preValidation: (request, reply, done) => {
        console.log(`${url}:preValidation`)
        done()
    },

    preHandler: (request, reply, done) => {
        console.log(`${url}:preHandler`)
        done()
    },
    */
    handler: async (request, reply) => {
        // in the handler, log the incoming request
        //request.log.info(`Query: ${JSON.stringify(request.query)}`);
        // then, take what params are needed and pass to the service
        //const params = {};
        // wait for the service processing
        //send the reply
        const token = authService.getToken(request.query.username);
        reply.send({ token: token });
    },
    /*
    preSerialization: (request, reply, payload, done) => {
        console.log(`${url}:preSerialization`)
        done()
    },

    onSend: (request, reply, payload, done) => {
        console.log(`${url}:onSend`)
        done()
    },

    onResponse: (request, reply, done) => {
        console.log(`${url}:onResponse`)
        done()
    },
    */
};

module.exports = [authRoutes];
