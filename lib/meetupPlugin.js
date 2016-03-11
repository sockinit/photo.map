'use strict';
var meetup = require('./meetup.js');
var Handlebars = require('handlebars');

exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/map/meetup',
        config: {
            handler: function(request, reply) {
                if(!request.state.user_session) {
                    return reply.redirect('/login');
                }
                // else if (!request.state["Longitude"]){
                //     reply.redirect('/map')
                // }
                else {

                    const options = {
                        latitude: request.state['Latitude'],
                        longitude: request.state['Longitude'],
                        time1: '',
                        time2: '1w',
                        radius: 1
                    };

                    meetup.getEvents(options, (err, apiData) => {
                        var strLocations = 'AA';
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
                            strLocations += meetup.venue.lat + 'Z' + meetup.venue.lon +'Q';
                            meetupObj.id = meetup.id;
                            meetupObj.event_url = meetup.event_url;
                            meetupObj.groupurlname = meetup.group.urlname;
                            return meetupObj;
                        }).filter((item) => {
                                return item;
                        });
                        strLocations += 'AA';

                        reply.view('map', {
                            data : {
                                eventsArray : formattedArray,
                                hiddenData: JSON.stringify(formattedArray),
                                api_key : process.env.MAP_API_KEY
                            }
                        }).state('locations', strLocations);
                    });
                }
            }
        }
    });
    next();
};


exports.register.attributes = {
  name: 'meetupPlugin'
};
