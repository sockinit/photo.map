'use strict';
var meetup = require('./meetup.js');
var Handlebars = require('handlebars');
var https = require('https');
var jwtPlugin = require('./jwt.js');
var querystring = require('querystring');

exports.register = (server, options, next) => {

    var makeRequest = function(options, cb) {
    var request = https.request(options, function(response) {
        var body = "";
        response.on('data', function(chunk) {
            body += chunk;
        });
        response.on('end', function() {
            cb(null, body);
        });
        response.on('error', function(error) {
            console.log('request to ' + options.host + ' failed!');
            cb(error);
        });
    });
    request.write(options.body);
    request.end();
};

    server.route([{
        method: 'GET',
        path: '/map/meetup',
        config: {
            handler: function(request, reply) {
                if(!request.state.user_session) {
                    return reply.redirect('/login');
                } else if (!request.state["Longitude"]){
                    reply.redirect('/map')
                } else {
                    const options = {
                        latitude: request.state['Latitude'],
                        longitude: request.state['Longitude'],
                        time1: '',
                        time2: '1w',
                        radius: 1
                    };

                    meetup.getEvents(options, (err, apiData) => {
                        // console.log(JSON.parse(apiData).results[0]);
                        var results = JSON.parse(apiData).results.slice(0,10);
                        var formattedArray = results.map((meetup) => {
                            if(!meetup.venue ){
                                return;
                            }
                            var meetupObj = {};
                            meetupObj.address = meetup.venue.address_1;
                            var desc = meetup.description;
                            var description = desc.replace("''", "");
                            meetupObj.description = description;
                            meetupObj.name = meetup.name;
                            // meetupObj.description = meetup.description;
                            meetupObj.dateTime = new Date(meetup.time).toUTCString();
                            meetupObj.latitude = meetup.venue.lat;
                            meetupObj.longitude = meetup.venue.lon;
                            meetupObj.id = meetup.id;
                            meetupObj.event_url = meetup.event_url;
                            meetupObj.groupurlname = meetup.group.urlname;
                            return meetupObj;
                        }).filter((item) => {
                                return item;
                        });
                        // console.log(formattedArray);

                        var token = jwtPlugin.decodeToken(request.state.user_session);
                        console.log('token----------', token);
                        var userDataOptions = {
                            hostname: 'api.meetup.com',
                            path: '/2/member/self',
                            method: 'GET',
                            body: "",
                            // body: querystring.stringify({
                            //     'access_token': token
                            // })
                            headers: {
                                'Authorization': 'Bearer ' +token,
                            }
                        };
                        makeRequest(userDataOptions, function(err, response) {
                            response = JSON.parse(response);
                            var userArray = [];
                            userArray.push(response.name, response.link, response.city, response.photo.highres_link);
                            console.log(userArray);
                            reply.view('map', {
                                data : {
                                    longitude : request.state["Longitude"],
                                    latitude : request.state["Latitude"],
                                    eventsArray : formattedArray,
                                    response: userArray
                                }
                            });
                        });


                    });
                }
          }
        }
    }, {
        method: 'GET',
        path: '/getdata',
        handler: function(request, reply) {
        var token = jwtPlugin.decodeToken(request.state.user_session);
        console.log('token----------', token);
        var userDataOptions = {
            hostname: 'api.meetup.com',
            path: '/2/member/self',
            method: 'GET',
            body: "",
            // body: querystring.stringify({
            //     'access_token': token
            // })
            headers: {
                'Authorization': 'Bearer ' +token,
            }
        };
        makeRequest(userDataOptions, function(err, response) {
            console.log(response);
            reply(response);
        });
    }
    }]);
    next();
};


exports.register.attributes = {
  name: 'meetupPlugin'
};
