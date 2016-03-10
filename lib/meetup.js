'use strict';
const querystring = require('querystring');
// options = {
//     lattitude: '',
//     longitude: '',
//     radius: 1,
//     time1: '',
//     time2: ''
// };

// var request = https.request(options, function(response){
//         var body = '';
//         response.on('data', function(chunk){
//             body += chunk;
//         });
//         response.on('end', function(err) {
//             cb(null, body);
//         });
//     });

var https = require('https');

const getEvents = (options, cb) => {


    var opts = {
        protocol: 'https:',
        hostname: 'api.meetup.com',
        path: '/2/open_events.json?topic=photo&time='+options.time1+','+options.time2+'&radius='+options.radius+'&key='+process.env.API_KEY,
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
    console.log('request-----', request);
    request.end();
};


module.exports = {
    getEvents: getEvents
};
