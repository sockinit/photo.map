
var test = require('tape');
var jwt = require('../lib/jwt.js');


test('generateToken function returns a string, not containing the token passed to it', (t) => {
    const encrypted = jwt.generateToken('token');
    const actual = encrypted.indexOf('token');
    const expected = -1;
    t.equal(actual, expected , 'jwt.generateToken successfully encrypts a string')
});
