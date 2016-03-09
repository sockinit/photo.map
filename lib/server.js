var Hapi = require('hapi');
var server = new Hapi.Server();
var port = process.env.PORT || 8000;
require('env2')('./config.env');
var cookiePlugin = require('./cookiePlugin.js');
var Vision = require('vision');
var Handlebars = require('handlebars');


// var serverPlugin = require('./plugin.js');

//plugins
var Inert = require('inert');
var Authenticate = require('./authenticate.js');

var plugins = [Vision, Inert, Authenticate, cookiePlugin];

server.connection({
    port: port
});

server.register(plugins, (err) => {
    if (err){
        throw err;
    }
});


module.exports = server;
