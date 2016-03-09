
var Hapi = require('hapi');
var server = new Hapi.Server();
var port = process.env.PORT || 8000;
require('env2')('config.env');

//plugins
var Inert = require('inert');
var Authenticate = require('./authenticate.js');

var plugins = [ Inert, Authenticate ];

server.connection({
    port: port
});

server.register(plugins, (err) => {
    if (err){
        throw err;
    }
});


module.exports = server;
