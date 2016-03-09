var Hapi = require('hapi');
var server = new Hapi.Server();
var port = process.env.PORT || 8000;
var url = require('url');
var querystring = require('querystring');
require('env2')('config.env');
var http = require('https');

var cookiePlugin = require('./cookiePlugin.js'); 

server.register(require('inert'), function(err){
    if (err){
        throw err;
    }
});

server.connection({
    port: port
});

module.exports = server;
