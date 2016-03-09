var usersDB = { username: 'user', password: 'password', user_session: 'someencryptedvalue1234567890' };

var Vision = require('vision');
var Handlebars = require('handlebars');


exports.register = (server, options, next) => {
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
        path: '/',
        config: {
            handler: (request, reply) => {
                reply('cookie exists!').state('user_session', usersDB.user_session);
            }
        }
    },{
        method: 'GET',
        path: '/profile',
        config: {
            handler: function(request, reply){
                if ( request.state['user_session'] !== usersDB.user_session ){
                    reply('You are not logged in - go back to the home page to log in again');
                } else {
                    reply('logged In String');
                }
            }
        }
    }, {
        method: 'GET',
        path: '/twitter',
        config: {
          handler: function(request, reply) {
              reply.view('twitter');
          }
        }
    }]);
    return next();
};


exports.register.attributes = {
    name: 'cookiesPlugin'
};
