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

test('test if we get a response', (t) => {
    var options = {
        url: '/',
        method: 'GET'
    };

    server.inject(options, (response) => {

    var expected = 200;
    var actual = response.statusCode;
    t.equal(actual, expected, 'server gets a response');
    t.end();
    });
});

test('test the content of the cookie', (t) => {
    var options = {
        url: '/',
        method: 'GET'
    };

    server.inject(options, (response) => {

    var expected = 'user_session=someencryptedvalue1234567890';
    var cookie = response.raw.res._headers['set-cookie'];
    var actual = cookie[0];
    console.log(actual);
    t.equal(actual, expected, 'server gets a response');
    t.end();
    });
});

test('first time user cannot access page', (t) => {
    var options = {
        url: '/profile',
        method: 'GET'
    };

    server.inject(options, (response) => {

    var expected = undefined;
    var actual = response.raw.res._headers['set-cookie'];
    t.equal(actual, expected, 'user session field is empty');
    t.end();
    });
});
