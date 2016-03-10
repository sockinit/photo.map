var test = require('tape');
var server = require('../lib/server.js');



test('/login endpoint redirect to gh', (t) => {
    var expected, actual;
    var options = {
        url:'/login',
        method: 'GET'
    };

    server.inject(options, (response) => {
        //redirect test
        actual = response.statusCode;
        expected = 302;
        t.equal(actual, expected, 'server responds with 302');
        t.end();
    });
});


test('/welcome code is present', (t) => {
    var expected, actual;
    var options = {
        url:'/welcome?code=something12345',
        method: 'GET'
    };

    server.inject(options, (response) => {
        //redirects to meetup
        actual = response.statusCode;
        expected = 302;
        t.equal(actual, expected, 'server responds with 302');

        // var redirect = response.headers.location;
        // var redirectOptions = url.parse(redirect);
        //
        // actual = redirectOptions.host;
        // expected = 'meetup.com';
        // t.equal(actual, expected, 'redirect to meetup');

        t.end();
    });
});

test('at route /welcome if code is not present give 400 (bad request)', (t) => {
    var expected, actual;
    var options = {
        url:'/welcome',
        method: 'GET'
    };

    server.inject(options, (response) => {
        //redirects to meetup
        actual = response.statusCode;
        expected = 400;
        t.equal(actual, expected, '400 bad request');

        // var redirect = response.headers.location;
        // var redirectOptions = url.parse(redirect);
        //
        // actual = redirectOptions.host;
        // expected = 'meetup.com';
        // t.equal(actual, expected, 'redirect to meetup');

        t.end();
    });
});
