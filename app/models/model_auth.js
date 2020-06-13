const connection = require('../helpers/mysql');

module.exports = {
    registerModel: function (setData) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO users SET ?'
            connection.query(sql, setData, (error, result) => {
                if (error) {
                    reject(error);
                }
                const newData = {
                    id: result.insertId,
                    ...setData
                };
                resolve(newData);
            });
        });
    },
    loginModel: function (username) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users WHERE username=?';
            connection.query(sql, username, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
}