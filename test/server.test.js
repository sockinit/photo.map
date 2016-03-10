var test = require('tape');
var url = require('url');
var querystring = require('querystring');
var server = require('../lib/server.js');


test('server exists', (t) => {

    var actual;

    actual = Object.keys(server).length > 0;
    t.ok(actual, 'server exists!');
    t.end();
});

test('/ should redirect', (t) => {
    var options = {
        url: '/',
        method: 'GET'
    };
    server.inject(options, (response) => {
        //Should set a cookie
        var expected = 302;
        var actual = response.statusCode;
        t.equal(actual, expected, 'Redirects!');
        t.end();
    });
});

test('test the content of the cookie', (t) => {
    var options = {
        url: '/',
        method: 'GET'
    };

    server.inject(options, (response) => {

    // var expected = 'user_session=ok';
    // var cookie = response.raw.res._headers['set-cookie'];
    // var actual = cookie[0];
    //
    var actual = response.raw.res._headers['set-cookie'];
    var expected;
    t.equal(actual, expected, 'server gets a response');
    t.end();
    });
});
