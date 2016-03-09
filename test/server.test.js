var test = require('tape');
var url = require('url');
var querystring = require('querystring');
var server = require('../lib/server.js');


test('server exists', function(t)  {

    var actual;

    actual = Object.keys(server).length > 0;
    t.ok(actual, 'server exists!');
    t.end();
});

test('test the content of the cookie', function(t) {
    var options = {
        url: '/login',
        method: 'GET'
    };

    server.inject(options, function(response) {
    var expected = 'someencryptedvalue1234567890';
    var actual = response.state['user_session'];
    t.ok(actual, expected, 'cookie content is "someencryptedvalue1234567890"');
    t.end();
    });
});
