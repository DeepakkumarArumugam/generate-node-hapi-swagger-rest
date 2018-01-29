'use strict';

const log = require('../config/logger'),
    Feed = require('../models/feed'),
    ipfsAPI = require('ipfs-api');

    // or using options
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

//exports
module.exports = {

    getIpfsApiConfig: function (request, reply) {
        ipfs.config.get((err, config) => {
            if (err) {
              throw err
            }
            reply(JSON.parse(config));
          })
    },
    getIpfsFilesList: function (request, reply) {
        ipfs.ls.get('/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv',(err, response) => {
            if (err) {
              throw err
            }
            reply(JSON.parse(response));
          })
    },

}; //end of module exports
