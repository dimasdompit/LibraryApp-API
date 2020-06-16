const helper = require('../helpers/myResponse');
const modelRoles = require('../models/model_roles');

module.exports = {
    getAllRoles: async function (request, response) {
        try {
            const result = await modelRoles.getAllRolesModel();
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    addRoles: async function (request, response) {
        const setData = request.body;
        try {
            const result = await modelRoles.addRolesModel(setData);
            return helper.response(response, 'success', result, 201);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    updateRoles: async function (request, response) {
        const setData = request.body;
        const id = request.params.id;
        try {
            const result = await modelRoles.updateRolesModel(setData, id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    deleteRoles: async function (request, response) {
        const id = request.params.id;
        try {
            const result = await modelRoles.deleteRolesModel(id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    }
}