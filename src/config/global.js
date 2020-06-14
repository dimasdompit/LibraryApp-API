const config = {
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    jwtSecretKey: process.env.JWT_SECRET,
    tokenLife: process.env.TOKEN_LIFE
};

module.exports = config;