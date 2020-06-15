const jwt = require('jsonwebtoken');
const {
    jwtSecretKey,
    jwtRefreshKey
} = require('../../src/config/global');
const helper = require('../helpers/myResponse');
const config = require('../../src/config/global');

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
    },

    verifyJwtRefreshToken: function (request, response, next) {
        const refreshToken = request.body.refreshToken || request.query.refreshToken || request.headers.refreshToken
        try {
            if (refreshToken) {
                const decode = jwt.verify(refreshToken, jwtRefreshKey, {
                    expiresIn: config.refreshToken
                });
                request.decodeRefreshToken = decode;
                delete decode.iat;
                next()
            }
        } catch (err) {
            console.log(err);
            if (err.message === 'invalid signature') {
                return helper.response(response, 'fail', 'Invalid Signature Token', 403);
            }
            return helper.response(response, 'fail', 'Invalid Token', 401);
        }
    }
};