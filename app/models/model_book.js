const connection = require('../helpers/mysql');

module.exports = {
    // Get all books data
    // showAllBookModel: function () {
    //     return new Promise((resolve, reject) => {
    //         let sql = `SELECT book.id, book.title, book.description, book.image, genre.genre_name AS genre, author.author_name AS author, book.status, book.created_at, book.updated_at FROM book INNER JOIN genre USING (genre_id) INNER JOIN author USING (author_id)`;
    //         connection.query(sql, (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolve(result);
    //         });
    //     });
    // },
    showAllBookModel: function (keyword, sortBy, sortType, limit, pagination) {
        const keywordBy = `%${keyword}%`;
        let end = (limit * pagination) - limit;
        return new Promise((resolve, reject) => {
            let sql = `SELECT book.id AS id, book.title, book.description AS description, book.image AS image, genre.genre_name AS genre, author.author_name AS author, book.status, book.created_at, book.updated_at FROM book INNER JOIN genre ON book.genre_id = genre.genre_id INNER JOIN author ON book.author_id = author.author_id WHERE title LIKE ? OR author.author_name LIKE ? OR genre.genre_name LIKE ? OR book.status LIKE ? ORDER BY ${sortBy} ${sortType} LIMIT ? OFFSET ?`;
            connection.query(sql, [keywordBy, keywordBy, keywordBy, keywordBy, limit, end], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    getBookById: function (id) {
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
                    ...setData
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
                    ...setData
                };
                resolve(newData);
            })
        })
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
                    id
                }
                resolve(newData);
            });
        });
    },

    // search, sort, paginate features
    // searchBookModel: function (keyword, sortBy, sortType, limit, pagination) {
    //     const keywordBy = `%${keyword}%`;
    //     let end = (limit * pagination) - limit;
    //     return new Promise((resolve, reject) => {
    //         let sql = `SELECT book.id AS id, book.title, book.description AS description, book.image AS image, genre.genre_name AS genre, author.author_name AS author, book.status, book.created_at, book.updated_at FROM book INNER JOIN genre ON book.genre_id = genre.genre_id INNER JOIN author ON book.author_id = author.author_id WHERE title LIKE ? OR author.author_name LIKE ? OR genre.genre_name LIKE ? OR book.status LIKE ? ORDER BY ${sortBy} ${sortType} LIMIT ? OFFSET ?`
    //         connection.query(sql, [keywordBy, keywordBy, keywordBy, keywordBy, limit, end], (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolve(result);
    //         });
    //     });
    // },

    borrowBookModel: function (status, id) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE book SET book.status = ? WHERE id=?`;
            connection.query(sql, [status, id], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

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
    }

};