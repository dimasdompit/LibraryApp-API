const connection = require("../helpers/mysql");

module.exports = {
  registerModel: function (setData) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO users SET ?";
      connection.query(sql, setData, (error, result) => {
        if (error) {
          reject(error);
        }

        const newData = {
          id: result.insertId,
          ...setData,
        };
        resolve(newData);
      });
    });
  },
  loginModel: function (username) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT users.id, users.username, users.password, roles.roles_name AS roles, users.created_at, users.updated_at FROM users INNER JOIN roles USING (roles_id) WHERE username=?";
      connection.query(sql, username, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
};
