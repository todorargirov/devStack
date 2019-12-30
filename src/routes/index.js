const ping = require('./ping');
const users = require('./users');

/**
 * This function initializes endpoints based on the full route declaration. One endpoint per REST method.
 * TODO: Improve with nullish coalescing ?? operator
 *
 * @param {fastify} fastify The fastify instance
 * @param {Object} routeParams The full declaration of the route
 */
function initializeEndpoint(fastify, routeParams) {
    routeParams.map(routeParam => {
        routeParam.methods.forEach(m => {
            fastify.route({
                // The REST method to register
                method: m,
                // The URL of the endpoint
                url: routeParam.url,
                // The schema that validates the request and response data schema
                // schema: { body: {}, querystring: {}, params: {}, response: {}}
                schema: routeParam.schema,

                // The handler function that processes the request and sends the response
                handler: routeParam.handler,

                // pre_ and on_ functions run according to lifeCycle. Can be an Array [func1, func2]
                onRequest: routeParam.onRequest,

                onSend: routeParam.onSend,

                onResponse: routeParam.onResponse,

                preParsing: routeParam.preParsing,

                preValidation: routeParam.preValidation,

                preHandler: routeParam.preHandler,

                preSerialization: routeParam.preSerialization,

                //attachValidation: routeParam.attachValidation || {},

                //schemaCompiler: routeParam.schemaCompiler || {},

                //bodyLimit: routeParam.bodyLimit || 1048576,

                //logLevel: routeParam.logLevel || {},

                //logSerializers: routeParam.logSerializers || {},

                config: routeParam.config || {},

                //version: routeParam.version || 'dev',

                //prefixTrailingSlash: routeParam.prefixTrailingSlash || '',
            });
        });
    });
}

async function routes(fastify) {
    initializeEndpoint(fastify, ping);
    initializeEndpoint(fastify, users);
}

module.exports = routes;
