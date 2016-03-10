var jwt = require('jasonwebtoken');
var secret = process.env.JWT_SECRET;

const generateToken = (token) => jwt.sign({access_token: token}, secret);

module.exports = {
    generateToken: generateToken
}
