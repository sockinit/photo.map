var Vision = require('vision');
var Handlebars = require('handlebars');


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            handler: (request, reply) => {
                if(!request.state.user_session) {
                    return reply.redirect('/login');
                }
                    reply.redirect('/map');
                
            }
        }
    });
    return next();
};


exports.register.attributes = {
    name: 'cookiesPlugin'
};
