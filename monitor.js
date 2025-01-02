const fetch = require('node-fetch');

const checkServerHealth = async () => {
    try {
        const response = await fetch('http://localhost:3000/health');
        if (!response.ok) {
            console.error('Backend server is down!');
            // Here, you can integrate a notification system (e.g., email or Slack) for the server down event.
        } else {
            console.log('Backend server is healthy.');
        }
    } catch (error) {
        console.error('Error checking backend server:', error.message);
    }
};

// Check every minute
setInterval(checkServerHealth, 60000); // 60,000 ms = 1 minute
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Database host
    user: 'root', // Database user
    password: 'root', // Database password
    database: 'test' // Database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Database connected');
});
