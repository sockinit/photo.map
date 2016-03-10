'use strict';

var Handlebars = require('handlebars');

exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/map',
        config: {
          handler: function(request, reply) {
              reply.view('map');
          }
        }
    });
    next();
};


exports.register.attributes = {
  name: 'mapPlugin'
};