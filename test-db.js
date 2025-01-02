const db = require('./db'); // Import the database connection

async function testConnection() {
    try {
        // Test query
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('Database connected successfully:', rows);
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}

testConnection(); // Run the test
