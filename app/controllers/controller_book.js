const helper = require('../helpers/myResponse');
const modelBook = require('../models/model_book');
const joi = require('@hapi/joi');

const addBookSchema = joi.object({
    title: joi.required(),
    description: joi.required(),
    image: joi.string().required(),
    genre_id: joi.number().required(),
    author_id: joi.number().required(),
    status: joi.string().required()
});

module.exports = {

    showAllBooks: async function (request, response) {
        console.log(request.decodeToken);
        try {
            const result = await modelBook.showAllBookModel();
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    addBooks: async function (request, response) {
        const setData = request.body;
        if (request.file) {
            setData.image = request.file.filename;
        }
        try {
            await addBookSchema.validateAsync(setData);
            const result = await modelBook.addBookModel(setData);
            return helper.response(response, 'success', result, 201);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    updateBooks: async function (request, response) {
        const setData = request.body;
        if (request.file) {
            setData.image = request.file.filename;
        }
        const id = request.params.id;
        try {
            const result = await modelBook.updateBookModel(setData, id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err)
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    deleteBooks: async function (request, response) {
        const id = request.params.id;
        try {
            const result = await modelBook.deleteBookModel(id);
            return helper.response(response, 'success', result, 200);
        } catch (err) {
            console.log(err);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    searchBooks: async function (request, response) {
        const keyword = request.query.keyword || '';
        let limit = parseInt(request.query.limit) || 5;
        let pagination = parseInt(request.query.pagination) || 1;
        let sortBy = request.query.sortBy || 'created_at';
        let sortType = request.query.sortType || 'ASC';
        try {
            const result = await modelBook.searchBookModel(keyword, sortBy, sortType, limit, pagination);
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

};