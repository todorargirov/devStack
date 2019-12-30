const { getUser } = require('../services/userService');
const authService = require('../services/authService');

const url = '/users/:id';

const userRoutes = {
    methods: ['GET'],
    url: url,
    schema: {
        headers: {
            type: 'object',
            properties: {
                authorization: { type: 'string' },
            },
            required: ['authorization'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    rowCount: { type: 'integer' },
                    rows: {},
                },
            },
        },
    },

    onRequest: (request, reply, done) => {
        const res = authService.checkRequest(request);
        console.log(res);
        if (res.success === false) {
            reply.code(401);
            reply.send(res);
        }
        done();
    },
    /*
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
        const res = await getUser(request, reply);
        //send the reply
        reply.send(res);
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

module.exports = [userRoutes];
