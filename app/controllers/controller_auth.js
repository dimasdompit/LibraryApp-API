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
            return helper.response(response, 'success', result, 201);
        } catch (err) {
            console.log(err)
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    }
};