const { getPingService } = require('../services/pingService');

const url = '/ping';

const pingRoute = {
    method: 'GET',
    url: url,
    schema: {
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
    /*
    onRequest: (request, reply, done) => {
        console.log(`${url}:onRequest`)
        done()
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
        const res = await getPingService();
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

module.exports = [pingRoute];
