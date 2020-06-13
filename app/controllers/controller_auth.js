const modelAuth = require('../models/model_auth');
const helper = require('../helpers/myResponse');
const bcrypt = require('bcrypt');

module.exports = {
    register: async function (request, response) {
        const setData = request.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(setData.password, salt);
        setData.password = hash;
        try {
            const result = await modelAuth.registerModel(setData);
            delete result.password;
            return helper.response(response, 'success', result, 201);
        } catch (err) {
            console.log(err)
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },
    login: async function (request, response) {
        const loginData = request.body;
        try {
            const result = await modelAuth.loginModel(loginData.username);
            if (result.length > 0) {
                const hashPass = result[0].password;
                const checkPass = bcrypt.compareSync(loginData.password, hashPass);
                if (checkPass) {
                    delete result[0].password;
                    return helper.response(response, 'success', result, 200);
                }
                return helper.response(response, 'fail', 'Incorrect Username or Password!', 400);
            }
            return helper.response(response, 'fail', 'Incorrect Username or Password!', 400);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    }
};