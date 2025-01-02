const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',       // Replace with your database host
    user: 'root',            // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'my_database'  // Replace with your database name
});

module.exports = db;
