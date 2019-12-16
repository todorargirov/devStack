const { query } = require('../db/pg');

const url = '/ping';

const routeParams = {
    methods: ['GET', 'POST'],
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
        request.log.info(`Query: ${JSON.stringify(request.query)}`);
        const res = await query('SELECT NOW() as now');
        reply.send({
            rowCount: res.rowCount,
            rows: res.rows,
        });
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

module.exports = [routeParams];
