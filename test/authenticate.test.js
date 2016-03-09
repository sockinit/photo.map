var test = require('tape');
var server = require('../lib/server.js');



test('/login endpoint redirect to gh', function(t){
    var expected, actual;
    var options = {
        url:'/login',
        method: 'GET'
    };

    server.inject(options, function(response) {
        actual = response.statusCode;
        expected = 302;

        t.equal(actual, expected, 'server responds with 302');
        t.end();
    });
});
