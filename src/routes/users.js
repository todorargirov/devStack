const userService = require('../services/userService');
const authService = require('../services/authService');

const getUserUrl = '/users/:username';
const getUserListUrl = '/users';
const createUserUrl = '/users';

const verifyToken = (request, reply, done) => {
    const res = authService.checkRequest(request.headers['authorization']);
    if (res.success === false) {
        reply.code(401);
        reply.send(res);
    } else {
        request.tokenPayload = res.data.payload;
    }
    done();
};

const userSchema = {
    user_name: { type: 'string' },
    user_type: { type: 'string' },
    date_created: { type: 'string', format: 'date' },
    date_updated: { type: 'string', format: 'date' },
    date_deleted: { type: 'string', format: 'date' },
};

const getUserListRoute = {
    method: 'GET',
    url: getUserListUrl,
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: userSchema,
                },
            },
        },
    },

    onRequest: (request, reply, done) => {
        verifyToken(request, reply, done);
    },
    handler: async (request, reply) => {
        const userList = await userService.getUserInfoList();
        if (userList) {
            reply.send(userList);
        }
    },
};

const createUserRoute = {
    method: 'POST',
    url: createUserUrl,
    schema: {
        body: {
            type: 'object',
            required: ['user_name', 'user_type'],
            properties: {
                user_name: { type: 'string' },
                user_type: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    user_name: userSchema.user_name,
                    user_type: userSchema.user_type,
                    date_created: userSchema.date_created,
                },
            },
        },
    },
    handler: async (request, reply) => {
        const userExists = await userService.getUserInfo(request.body.user_name);
        if (userExists) {
            reply.code(400);
            reply.send({ success: false, data: '400 Bad Request / User already exists' });
        } else {
            const createdUserInfo = await userService.createUser(request.body.user_name, request.body.user_type);
            if (createdUserInfo) {
                reply.code(201);
                reply.send({
                    user_name: createdUserInfo.user_name,
                    user_type: createdUserInfo.user_type,
                    date_created: createdUserInfo.date_created,
                });
            }
        }
    },
};
const getUserRoute = {
    method: 'GET',
    url: getUserUrl,
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
                properties: userSchema,
            },
        },
    },

    onRequest: (request, reply, done) => {
        verifyToken(request, reply, done);
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
        if (request.tokenPayload.user_name === request.params.username) {
            const res = await userService.getUserInfo(request.params.username);
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

module.exports = [getUserRoute, getUserListRoute, createUserRoute];
