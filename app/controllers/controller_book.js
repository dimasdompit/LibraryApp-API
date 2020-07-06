const helper = require("../helpers/myResponse");
const modelBook = require("../models/model_book");
const joi = require("@hapi/joi");
const fs = require("fs");

const addBookSchema = joi.object({
  title: joi.required(),
  description: joi.required(),
  image: joi.string().required(),
  genre_id: joi.number().required(),
  author_id: joi.number().required(),
  status: joi.string().required(),
});

module.exports = {
  showAllBooks: async function (request, response) {
    const totalBooks = await modelBook.totalBooksModel();
    const totalData = {
      ...totalBooks,
    };
    console.log(totalBooks);
    const search = request.query.search || "";
    let sortBy = request.query.sortBy || "created_at";
    let sortType = request.query.sortType || "DESC";
    let limit = parseInt(request.query.limit) || 6;
    let page = parseInt(request.query.page) || 1;

    try {
      const result = await modelBook.showAllBookModel(
        search,
        sortBy,
        sortType,
        limit,
        page
      );

      const newData = {
        result,
        ...totalData,
      };

      if (result[0]) {
        return helper.response(response, "success", newData, 200);
      } else {
        return helper.response(response, "fail", "Book Not Found", 404);
      }
    } catch (err) {
      console.log(err);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  getBookDetail: async function (request, response) {
    const id = request.params.id;
    try {
      const result = await modelBook.getBookDetailModel(id);
      if (result[0]) {
        return helper.response(response, "success", result, 200);
      } else {
        return helper.response(
          response,
          "fail",
          `Book with ID = ${id} Not Found`,
          401
        );
      }
    } catch (err) {
      console.log(err);
      return helper.response(response, "fail", "Internal Server Error");
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
      return helper.response(response, "success", result, 201);
    } catch (err) {
      console.log(err);
      if (err.response === undefined) {
        return helper.response(
          response,
          "fail",
          "Format image must be : JPG/JPEG/PNG",
          401
        );
      }
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  updateBooks: async function (request, response) {
    const setData = request.body;
    const id = request.params.id;
    let existImage = null;
    if (request.file) {
      //   setData.image = request.file.filename;
      const newImage = request.file.filename;
      setData.image = newImage;
      const existData = await modelBook.getBookDetailModel(id);
      existImage = existData[0].image;
    }
    try {
      const result = await modelBook.updateBookModel(setData, id);
      if (result.id == id) {
        if (existImage != null) fs.unlinkSync(`./assets/images/${existImage}`);
        const newData = await modelBook.getBookDetailModel(id);
        return helper.response(response, "success", newData, 200);
      }
      return helper.response(
        response,
        "fail",
        `Book with ID = ${id} not found`,
        404
      );
    } catch (err) {
      console.log(err);
      if (err.response === undefined) {
        return helper.response(
          response,
          "fail",
          "Format image must be : JPG/JPEG/PNG",
          401
        );
      }
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  deleteBooks: async function (request, response) {
    const id = request.params.id;
    try {
      const result = await modelBook.deleteBookModel(id);
      return helper.response(response, "success", result, 200);
    } catch (err) {
      console.log(err);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  showHistoryByUserId: async function (request, response) {
    const id = request.params.id;
    try {
      const result = await modelBook.showHistoryByUserIdModel(id);
      return helper.response(response, "success", result, 200);
    } catch (err) {
      console.log(err);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  borrowBooks: async function (request, response) {
    const setData = request.body;
    const id = request.params.id;
    try {
      const result = await modelBook.getBookDetailModel(id);
      if (result[0].status === "Available") {
        let status = result[0].status;
        status = "Not Available";
        await modelBook.historyBorrowModel(setData);
        await modelBook.borrowBookModel(status, id);
        const message = `You have successfully borrowed '${result[0].title}' book`;
        return helper.response(response, "success", message, 200);
      } else {
        return helper.response(
          response,
          "fail",
          `Sorry '${result[0].title}' is Not Available/Borrowed`,
          401
        );
      }
    } catch (err) {
      console.log(err);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  returnBooks: async function (request, response) {
    const id = request.params.id;
    try {
      const result = await modelBook.getBookDetailModel(id);
      const history = await modelBook.showHistoryByBookId(id);
      const newHistory = {
        ...history[0],
      };
      if (
        result[0].status === "Not Available" &&
        newHistory.history_status === "borrow"
      ) {
        let status = result[0].status;
        let newHistoryStatus = newHistory.history_status;
        status = "Available";
        newHistoryStatus = "returned";
        await modelBook.returnBookModel(status, id);
        await modelBook.historyReturnModel(newHistoryStatus, id);
        const message = `You have returned '${result[0].title}' book, thank you!`;
        return helper.response(response, "success", message, 200);
      } else {
        return helper.response(
          response,
          "fail",
          "There are no books to return",
          401
        );
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },
};
