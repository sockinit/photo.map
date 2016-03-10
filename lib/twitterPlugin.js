'use strict';

var Handlebars = require('handlebars');


exports.register = (server, options, next) => {

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
