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
        let refreshToken = request.body.refreshToken || request.query.refreshToken || request.headers['refresh-token'];
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
    },

    is_Admin: function (request, response, next) {
        const role = request.decodeToken.roles_id;
        try {
            if (role !== 1) {
                return helper.response(response, 'fail', 'Not Allowed', 401);
            } else {
                next();
            }
        } catch (error) {
            console.log(error);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    is_User: function (request, response, next) {
        const role = request.decodeToken.roles_id;
        try {
            if (role === 1 || role === 2 || role === 3) {
                next();
            } else {
                return helper.response(response, 'fail', 'Not Allowed', 401);
            }
        } catch (error) {
            console.log(error);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    is_Staff: function (request, response, next) {
        const role = request.decodeToken.roles_id;
        console.log(role);
        try {
            if (role === 1 || role === 3) {
                next()
            } else {
                return helper.response(response, 'fail', 'Not Allowed', 401);
            }
        } catch (error) {
            console.log(error);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    }
};