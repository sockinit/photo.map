'use strict';
const querystring = require('querystring');

var https = require('https');

const getEvents = (options, cb) => {

    var opts = {
        protocol: 'https:',
        hostname: 'api.meetup.com',
        path: '/2/open_events?&sign=true&photo-host=public&time=,1w&lat='+options.latitude+'&lon='+options.longitude+'&radius='+options.radius+'&key='+process.env.API_KEY,
        method: 'GET'
    };

    const request = https.request(opts, (response) => {
        let body = '';
        response.on('data', (chunk) => {

            body += chunk;
        });
        response.on('end', () => {
            cb(null, body);
        });
    });

    request.write('he');
    request.end();
};


module.exports = {
    getEvents: getEvents
};
