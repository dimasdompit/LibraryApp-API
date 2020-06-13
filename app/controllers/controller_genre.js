const helper = require('../helpers/myResponse');
const modelGenre = require('../models/model_genre');

module.exports = {
    getAllGenre: async function (request, response) {
        try {
            const result = await modelGenre.getAllGenreModel();
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    addGenre: async function (request, response) {
        const setData = request.body;
        try {
            const result = await modelGenre.addGenreModel(setData);
            return helper.response(response, 'success', result, 201);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    updateGenre: async function (request, response) {
        const setData = request.body;
        const id = request.params.id;
        try {
            const result = await modelGenre.updateGenreModel(setData, id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    deleteGenre: async function (request, response) {
        const id = request.params.id;
        try {
            const result = await modelGenre.deleteGenreModel(id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    searchGenre: async function (request, response) {
        const keyword = request.query.keyword;
        try {
            const result = await modelGenre.searchGenreByNameModel(keyword);
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