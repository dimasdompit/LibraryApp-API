// import mysql
const mysql = require('mysql');
// import mysql config
const config = require('../../src/config/global');

// create connection to database
const connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

module.exports = connection;