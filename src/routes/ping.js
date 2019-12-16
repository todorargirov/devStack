const db = require('../db/pg');

const url = '/ping';

const routeParams = {
    methods: ['GET', 'POST'],
    url: url,
    schema: {
        querystring: {
            required: ['par1', 'par2'],
            type: 'object',
            properties: {
                par1: { type: 'string' },
                par2: { type: 'integer' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    value: { type: 'string' },
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
        const client = await db.getPool().connect();
        let res = null;
        try {
            res = await client.query('SELECT * from ff_users where id = $1', [1]);
            request.log.info('DB Result ', res.rows);
        } finally {
            client.release();
        }

        reply.send({ value: res.rows[0].username });
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
