const helper = require('../helpers/myResponse');
const modelAuthor = require('../models/model_author');

module.exports = {
    getAllAuthor: async function (request, response) {
        try {
            const result = await modelAuthor.getAllAuthorModel();
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    addAuthor: async function (request, response) {
        const setData = request.body;
        try {
            const result = await modelAuthor.addAuthorModel(setData);
            return helper.response(response, 'success', result, 201);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    updateAuthor: async function (request, response) {
        const setData = request.body;
        const id = request.params.id;
        try {
            const result = await modelAuthor.updateAuthorModel(setData, id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    deleteAuthor: async function (request, response) {
        const id = request.params.id;
        try {
            const result = await modelAuthor.deleteAuthorModel(id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    searchAuthor: async function (request, response) {
        const keyword = request.query.keyword;
        try {
            const result = await modelAuthor.searchAuthorModel(keyword);
            if (result[0]) {
                return helper.response(response, 'success', result, 200);
            } else {
                return helper.response(response, 'fail', 'Not Found', 404);
            }
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    }
}