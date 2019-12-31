const authService = require('../services/authService');
const userService = require('../services/userService');

const url = '/auth';

const authRoute = {
    method: 'GET',
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

    handler: async (request, reply) => {
        const userInfo = await userService.getUserInfo(request.query.username);
        if (userInfo) {
            const token = authService.getToken(userInfo);
            reply.send({ token: token });
        } else {
            reply.code(401);
            reply.send({ success: false, data: '401 Not Authorized' });
        }
    },
};

module.exports = [authRoute];
