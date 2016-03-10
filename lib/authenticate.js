'use strict';
var querystring = require('querystring');
var http = require('https');
var jwt = require('./jwt.js');


exports.register = function(server, options, next) {

    server.route([{
        path: '/login',
        method: 'GET',
        config: {
            handler: (request, reply) => {

                reply.redirect(getMeetupURI());
            }
        }
    }, {
        path: '/welcome',
        method: 'GET',
        config: {
            handler: (request, reply) => {

                if(!request.query.code) {
                    return reply('Error').code(400);
                   }


                console.log('request.query.code ------>', request.query.code);

                const options = {
                    hostname: 'secure.meetup.com',
                    path: '/oauth2/access',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: querystring.stringify({
                        client_id: process.env.MEETUP_KEY,
                        client_secret: process.env.MEETUP_SECRET,
                        grant_type: 'authorization_code',
                        redirect_uri: process.env.BASE_URL + '/welcome',
                        code: request.query.code
                    })
                };
                console.log(options.body);
                makeRequest(options, (data) => {
                    var token = JSON.parse(data).access_token;
                    console.log(jwt.generateToken(token));
                    reply.redirect('/map').state('user_session', token);

                });
            }
        }
    }]);

    return next();
};

exports.register.attributes = {
    name: 'authenticate'
};

const makeRequest = (options, callback) => {
    var req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunky) => {
            body += chunky;
        });
        res.on('error', (err) => {
            callback(err);
        });
        res.on('end', () => {
            callback(body);
        });
    });

    req.write(options.body);
    req.end();
};


const getMeetupURI = () => {
    return 'https://secure.meetup.com/oauth2/authorize?' + querystring.stringify({
        client_id: process.env.MEETUP_KEY,
        response_type: 'code',
        redirect_uri: process.env.BASE_URL + '/welcome'
    });
};
