'use strict';

var Handlebars = require('handlebars');

exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/map/meetup',
        config: {
          handler: function(request, reply) {
              reply.view('map', {
                data : {
                  longitude : request.state["Longitude"],
                  latitude : request.state["Latitude"]
                }
              });
          }
        }
    });
    next();
};


exports.register.attributes = {
  name: 'meetupPlugin'
};
