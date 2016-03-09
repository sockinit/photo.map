var Hapi = require('hapi');
var server = new Hapi.Server();
var port = process.env.PORT || 8000;
require('env2')('./config.env');
var cookiePlugin = require('./cookiePlugin.js');
var Vision = require('vision');
var Handlebars = require('handlebars');
var twitterPlugin = require('./twitterPlugin.js');
//plugins
var Inert = require('inert');
var Authenticate = require('./authenticate.js');

var plugins = [Vision, Inert, Authenticate, cookiePlugin, twitterPlugin];

server.connection({
    port: port
});

server.register(plugins, (err) => {
    if (err){
        throw err;
    }

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: '../views',
        layout: 'default',
        layoutPath: '../views/layout'
    });

    server.route([{
        method: 'GET',
        path: '/public/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    }, {
        method: 'GET',
        path: '/map',
        config: {
            handler: function(request, reply) {
                reply.view('map');
            }
        }
    }]);
});




module.exports = server;
