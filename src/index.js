'use strict';

let path = require('path'),
    Lout = require('lout'),
    Good = require('good'),
    GoodFile = require('good-file'),
    bunyan = require('bunyan'),
    Hapi = require('hapi'),
    Inert = require('inert'),
    Vision = require('vision'),
    HapiSwagger = require('hapi-swagger'),
    Pack = require('../package');



//log clas will now globally available
global.log = bunyan.createLogger({
    name: 'application-name'
});



/**
 * Construct the server
 */
let server = new Hapi.Server({
    connections: {
        routes: {
            cors: true,
            log: true
        },
        router: {
            stripTrailingSlash: true
        }
    }
});
log.info('server constructed');

/**
 * Create the connection
 */
// port: config.port

server.connection({
    port: process.env.PORT || 3000

});
//debug('added port: ', config.port);
let swaggerOptions = {
    info: {
        'title': 'API Documentation',
        'version': Pack.version
    }
};

server.register([Inert, Vision, {
    'register': HapiSwagger,
    'options': swaggerOptions
}], function (err) {
    err ? log.info("Inert or Vision plugin failed, it will stop swagger") : log.info("Inert or Vision plugin registered, it will start  swagger");
});



/**
 * Build a logger for the server & each service
 */
let reporters = [new GoodFile({
    log: '*'
}, __dirname + '/../logs/server.log')];
//if you want to serve static files 
server.route({
    method: 'get',
    path: '/{param*}',
    handler: {
        directory: {
            path: __dirname + '/../public',
            listing: true
        }
    }
});

/**
 * Add logging
 */
server.register({
    register: Good,
    options: {
        opsInterval: 1000,
        reporters: reporters
    }
}, function (err) {
    if (err) throw new Error(err);

    log.debug('registered Good for logging with reporters: ', reporters);
});

/**
 * Add /docs route
 */
server.register({
    register: Lout
}, function (err) {
    if (err) throw new Error(err);
    log.info('added Lout for /docs');
});

/**
 * If this isn't for testing, start the server
 */

server.start(function (err) {
    if (err) throw new Error(err);
    log.info('server started!');
    let summary = server.connections.map(function (cn) {
        return {
            labels: cn.settings.labels,
            uri: cn.info.uri
        };
    });
    let appRoute = require(__dirname + '/routes/appRoute')(server);
    log.info('Connections: ', summary);
    server.log('server', 'started: ' + JSON.stringify(summary));
});

module.exports = server;