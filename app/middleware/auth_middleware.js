const jwt = require('jsonwebtoken');
const {
    jwtSecretKey
} = require('../../src/config/global');
const helper = require('../helpers/myResponse');

module.exports = {
    verifyJwtToken: function (request, response, next) {
        const token = request.headers.authorization;
        try {
            const decode = jwt.verify(token, jwtSecretKey);
            request.decodeToken = decode;
            next();
        } catch (err) {
            console.log(err)
            if (err.name === 'TokenExpiredError') {
                return helper.response(response, 'fail', 'Token Expired!', 401);
            }
            return helper.response(response, 'fail', 'Invalid Token', 401);
        }
    }
};