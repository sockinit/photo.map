var test = require('tape');
var url = require('url');
var querystring = require('querystring');
var server = require('../lib/server.js');

test('Check the existence of a path "/map"', (t) => {
    var options = {
        method: 'GET',
        url: '/map'
    };
    server.inject(options, (response) => {
        var expected = 200;
        var actual = response.statusCode;
        t.equal(actual, expected, '"/map" path exists');
        t.end();
    });
});
