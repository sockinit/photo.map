const querystring = require('querystring');
// options = {
//     lattitude: '',
//     longitude: '',
//     radius: 1,
//     time1: '',
//     time2: ''
// };

// var request = http.request(options, function(response){
//         var body = '';
//         response.on('data', function(chunk){
//             body += chunk;
//         });
//         response.on('end', function(err) {
//             cb(null, body);
//         });
//     });

var http = require('https');

const getEvents = (options, cb) => {
    const httpOptions = {
        method: 'GET',
        host: 'api.meetup.com',
        path: '2/open_events',
        body: querystring.stringify({
            lat: options.latitude,
            lon: options.longitude,
            radius: options.radius,
            time: options.time1 + "," + options.time2
        })
    };

    const request = http.request(httpOptions, (response) => {
        let body = '';
        response.on('data', (chunk) => {
            body += chunk;
        });
        response.on('end', () => {
            cb(null, body);
        });
    });

    request.write();
    request.end();
};


module.exports = {
    getEvents: getEvents
};
