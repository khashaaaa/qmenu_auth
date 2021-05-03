const mysql = require('mysql2')

exports.connector = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASS
})