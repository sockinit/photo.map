var usersDB = { username: 'user', password: 'password', user_session: 'someencryptedvalue1234567890' };

exports.register = function(server, options, next){
    server.route([{
        method: 'GET',
        path: '/',
        config: {
            handler: function(request, reply){
                reply('cookie exists!').state('user_session', usersDB.user_session);
            }
        }
    // },{
    //     method: 'GET',
    //     path: '/profile',
    //     config: {
    //         handler: function(request, reply){
    //             if ( request.state['user_session'] !== usersDB.user_session ){
    //                 console.log(request.state['user_session'], usersDB.user_session);
    //                 reply('You are not logged in - go back to the home page to log in again');
    //             } else {
    //                 reply(loggedInString);
    //             }
    //         }
    //     }
    }]);
    return next();
};





exports.register.attributes = {
    name: 'cookiesPlugin'
};
