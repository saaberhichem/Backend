const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
process.on('SIGINT', () => {
    console.log('Web server is stopping...');
    // Add any cleanup or notification logic here
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('Web server is stopping...');
    // Add any cleanup or notification logic here
    process.exit();
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Backend server is running' });
});
const os = require('os');
const disk = require('diskusage');

// Monitor CPU and RAM Usage
const getSystemUsage = () => {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const usedMemory = totalMemory - freeMemory;

    return {
        cpuLoad: os.loadavg()[0], // 1-minute CPU load average
        freeMemory: (freeMemory / (1024 * 1024)).toFixed(2) + ' MB',
        usedMemory: (usedMemory / (1024 * 1024)).toFixed(2) + ' MB',
        totalMemory: (totalMemory / (1024 * 1024)).toFixed(2) + ' MB'
    };
};

// Monitor Disk Usage
const getDiskUsage = async (path) => {
    try {
        const { available, free, total } = await disk.check(path);
        return {
            freeDisk: (free / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            totalDisk: (total / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            usedDisk: ((total - free) / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
        };
    } catch (error) {
        console.error('Error fetching disk usage:', error.message);
        return null;
    }
};

// API Endpoint to Get Resource Usage
app.get('/resources', async (req, res) => {
    const systemUsage = getSystemUsage();
    const diskUsage = await getDiskUsage('/'); // Change '/' to your server's root directory

    res.json({
        systemUsage,
        diskUsage
    });
});
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const sendNotification = (subject, message) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'admin-email@example.com',
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Notification sent:', info.response);
        }
    });
};

// Example usage when backend or database goes down
sendNotification('Backend Down', 'The backend server is not responding.');
