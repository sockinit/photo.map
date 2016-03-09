var querystring = require('querystring');


exports.register = function(server, options, next) {

    server.route([{
        path: '/login',
        method: 'GET',
        config: {
            handler: (request, reply) => {
                reply.redirect(getFacebookURI());
            }
        }
    }]);

    return next();
};

exports.register.attributes = {
    name: 'authenticate'
};


const getFacebookURI = () => {
    return 'https://www.facebook.com/dialog/oauth?' + querystring.stringify({
        client_id: process.env.FACEBOOK_CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI
    });
};
