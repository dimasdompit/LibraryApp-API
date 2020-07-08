const connection = require("../helpers/mysql");

module.exports = {
  // Get all books data
  totalBooksModel: function () {
    return new Promise((resolve, reject) => {
      let sql = "SELECT COUNT(*) FROM book";
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(...result);
      });
    });
  },

  showAllBookModel: function (keyword, sortBy, sortType, limit, pagination) {
    const keywordBy = `%${keyword}%`;
    let end = limit * pagination - limit;
    return new Promise((resolve, reject) => {
      let sql = `SELECT book.id AS id, book.title, book.description AS description, book.image AS image, genre.genre_name AS genre, author.author_name AS author, book.status, book.created_at, book.updated_at FROM book INNER JOIN genre ON book.genre_id = genre.genre_id INNER JOIN author ON book.author_id = author.author_id WHERE title LIKE ? OR author.author_name LIKE ? OR genre.genre_name LIKE ? OR book.status LIKE ? ORDER BY ${sortBy} ${sortType} LIMIT ? OFFSET ?`;
      connection.query(
        sql,
        [keywordBy, keywordBy, keywordBy, keywordBy, limit, end],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getBookDetailModel: function (id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT book.id, book.title, book.description, book.image, genre.genre_name AS genre, author.author_name AS author, book.status, book.created_at, book.updated_at FROM book INNER JOIN genre USING (genre_id) INNER JOIN author USING (author_id) WHERE book.id=?`;
      connection.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  // Add new book
  addBookModel: function (setData) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO book SET ?`;
      connection.query(sql, setData, (err, result) => {
        if (err) {
          reject(err);
        }
        const newData = {
          // id: result.insertId,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  // update book
  updateBookModel: function (setData, id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE book SET ? WHERE id=?`;
      connection.query(sql, [setData, id], (err, result) => {
        if (err) {
          reject(err);
        }

        const newData = {
          id,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  // delete book by id
  deleteBookModel: function (id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM book WHERE id=?`;
      connection.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        }

        const newData = {
          id,
          ...result,
        };
        resolve(newData);
      });
    });
  },

  // Show History By User ID
  showHistoryByUserIdModel: function (id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT history.history_id, book.title AS book, users.username AS users, history.history_status, history.created_at, history.updated_at FROM history INNER JOIN book ON history.book_id = book.id INNER JOIN users ON history.user_id = users.id WHERE history.user_id=?`;
      connection.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  },

  // Show History By History ID
  showHistoryByIdModel: function (id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT history.history_id, book.id AS book, users.username AS users, history.history_status, history.created_at, history.updated_at FROM history INNER JOIN book ON history.book_id = book.id INNER JOIN users ON history.user_id = users.id WHERE history.history_id=?`;
      connection.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  },

  // Add history borrow
  historyBorrowModel: function (setData) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO history SET ?`;
      connection.query(sql, setData, (err, result) => {
        if (err) {
          reject(err);
        }

        const newData = {
          ...setData,
        };

        resolve(newData);
      });
    });
  },

  // Update history borrow
  historyReturnModel: function (status, id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE history SET history.history_status = ? WHERE history.book_id AND history.user_id = ?`;
      connection.query(sql, [status, id], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  },

  // Borrow book status update
  borrowBookModel: function (status, id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE book SET book.status = ? WHERE id=?`;
      connection.query(sql, [status, id], (err, result) => {
        if (err) {
          reject(err);
        }

        const newData = {
          id,
          ...status,
        };
        resolve(newData);
      });
    });
  },

  // Return book status update
  returnBookModel: function (status, id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE book SET book.status=? WHERE id=?`;
      connection.query(sql, [status, id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
