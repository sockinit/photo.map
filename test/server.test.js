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
