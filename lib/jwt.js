var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET.toString();

const generateToken = (token) => jwt.sign(token, secret);

const decodeToken = (encrypted) => jwt.verify(encrypted, secret);

module.exports = {
    generateToken: generateToken,
    decodeToken: decodeToken
};
