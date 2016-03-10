var Vision = require('vision');
var Handlebars = require('handlebars');


exports.register = (server, options, next) => {

    server.route([{
        method: 'GET',
        path: '/',
        config: {
            handler: (request, reply) => {
                if(request.state.user_session) {
                    reply.redirect('/map');
                }
                else {
                    reply.redirect('/login');
                }
            }
        }
    },{
        method: 'GET',
        path: '/profile',
        config: {
            handler: function(request, reply){
                if(request.state.user_session){
                    reply('You are not logged in - go back to the home page to log in again');
                } else {
                    reply('logged In String');
                }
            }
        }
    }]);
    return next();
};


exports.register.attributes = {
    name: 'cookiesPlugin'
};
