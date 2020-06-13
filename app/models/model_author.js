const connection = require('../helpers/mysql');

module.exports = {
    getAllAuthorModel: function () {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM author';
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    addAuthorModel: function (setData) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO author SET ?';
            connection.query(sql, setData, (err, result) => {
                if (err) {
                    reject(err);
                }

                const newData = {
                    ...setData
                }
                resolve(newData);
            });
        });
    },

    updateAuthorModel: function (setData, id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE author SET ? WHERE author_id=?';
            connection.query(sql, [setData, id], (err, result) => {
                if (err) {
                    reject(err);
                }
                const newData = {
                    id,
                    ...setData
                }
                resolve(newData);
            });
        });
    },

    deleteAuthorModel: function (id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM author WHERE author_id=?';
            connection.query(sql, id, (err, result) => {
                if (err) {
                    reject(err);
                }
                const newData = {
                    id
                };
                resolve(newData);
            });
        });
    },

    searchAuthorModel: function (keyword) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM author WHERE author_name=?';
            connection.query(sql, keyword, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
    }
}