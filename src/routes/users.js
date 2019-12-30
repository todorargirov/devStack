const { getUserInfo } = require('../services/userService');
const authService = require('../services/authService');

const url = '/users/:username';

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
        if (res.success === false) {
            reply.code(401);
            reply.send(res);
        } else {
            request.tokenPayload = res.data;
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

        // check the token info vs the params
        if (request.tokenPayload.username === request.params.username) {
            const res = await getUserInfo(request.params.username);
            //send the reply
            reply.send(res);
        } else {
            reply.code(401);
            reply.send({ success: false, data: '401 Unauthorized' });
        }
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
