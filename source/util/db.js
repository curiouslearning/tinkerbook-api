const mysql = require('mysql');
const settings = require("../../db.json");

const options = {
    host: settings.database.host,
    user: settings.database.user,
    password: settings.database.password,
    database: settings.database.database,
    connectionLimit: 10,
    supportBigNumbers: true
};

console.log('database settings', options);

const pool = mysql.createPool(options);

exports.get = (done) => {
    pool.getConnection((err, connection) => {
        done(err, connection);
    });
};

exports.pool = pool;
