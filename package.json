'use strict';

const Joi = require('joi'),
    appHandler = require('../handlers/appHandler');

module.exports = function (server) {
     // read
     server.route({
        method: 'get',
        path: '/v1/getIpfsApiConfig',
        config: {
            handler: appHandler.getIpfsApiConfig,
            description: 'GET all IPFS Config Details',
            notes: 'Returns a list of configs',
            tags: ['api'],
            validate: {
            }
        }
    });
    // read
    server.route({
    method: 'get',
    path: '/v1/getIpfsFilesList',
    config: {
        handler: appHandler.getIpfsFilesList,
        description: 'GET all IPFS Files List',
        notes: 'Returns a list of files',
        tags: ['api'],
        validate: {
        }
    }
});
}
