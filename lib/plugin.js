'use strict';

var Handlebars = require('handlebars');


exports.register = function(server, options, next) {

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: '../views',
        layout: 'default',
        layoutPath: '../views/layout'
    });
    server.route({
        method: 'GET',
        path: '/twitter',
        config: {
          handler: function(request, reply) {
              reply.view('twitter');
          }
        }
    });
    next();
};


exports.register.attributes = {
  name: 'plugin'
};
