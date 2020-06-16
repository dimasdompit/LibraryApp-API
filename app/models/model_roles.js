const connection = require('../helpers/mysql');

module.exports = {
    getAllRolesModel: function () {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM roles`;
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    addRolesModel: function (setData) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO roles SET ?`;
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

    updateRolesModel: function (setData, id) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE roles SET ? WHERE roles_id=?`;
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

    deleteRolesModel: function (id) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM roles WHERE roles_id=?`;
            connection.query(sql, id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}