require('env2')('config.env');

var test = require('tape');
var jwt = require('../lib/jwt.js');


test('generateToken function returns a string, not containing the token passed to it', (t) => {
    const encrypted = jwt.generateToken('token');
    const actual = encrypted.indexOf('token');
    const expected = -1;
    t.equal(actual, expected , 'jwt.generateToken successfully encrypts a string');
    t.end();
});

test('decodeToken returns original token back to us', (t) => {
    const encrypted = jwt.generateToken('token');
    const actual = jwt.decodeToken(encrypted);
    const expected = 'token';
    t.equal(actual, expected , 'jwt.decodeToken decrypts token');
    t.end();
});

//Wanted to test that incorrect encryption returns something (not an error) 
// test('decodeToken returns empty string if decrypted value doesnt match original', (t) => {
//     const encrypted = jwt.generateToken('token');
//     const falseEncrypted = encrypted + 'false';
//     const actual = jwt.decodeToken(falseEncrypted);
//     const expected = '';
//     t.equal(actual, expected , 'jwt.decodeToken doesnt match decrypted value');
//     t.end();
// });
