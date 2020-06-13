// import helpers mysql
const connection = require('../helpers/mysql');

module.exports = {

    getAllGenreModel: function () {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM genre';
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    addGenreModel: function (setData) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO genre SET ?';
            connection.query(sql, setData, (err, result) => {
                if (err) {
                    reject(err);
                }
                const newData = {
                    ...setData
                };
                resolve(newData);
            });
        });
    },

    updateGenreModel: function (setData, id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE genre SET ? WHERE genre_id=?';
            connection.query(sql, [setData, id], (err, result) => {
                if (err) {
                    reject(err);
                }

                const newData = {
                    id,
                    ...setData
                };
                resolve(newData);
            });
        });
    },

    deleteGenreModel: function (id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM genre WHERE genre_id=?';
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

    searchGenreByNameModel: function (keyword) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM genre WHERE genre_name=?';
            connection.query(sql, keyword, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

};