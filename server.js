const fs = require('fs');
const path = require('path');
const backend = require('./backend'); // Import backend logic
const express = require('express');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Enable CORS for specific origins (update with your actual origins)
const allowedOrigins = ['https://example.com', 'https://api.example.com'];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Respond to preflight requests
    } else {
        next();
    }
});

// API endpoints
app.get('/api/countryInfo', async (req, res) => {
    try {
        const countryInfo = await backend.getCountryInfo();
        res.json(countryInfo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/indCountryInfo', async (req, res) => {
    try {
        const countryInfo = await backend.getIndCountryInfo();
        res.json(countryInfo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Other routes
app.use((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        // Add other content types as needed
    }[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).send('File not found');
            } else {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const server = app.listen(process.env.PORT || 80, () => {
    console.log(`Server running on port ${server.address().port}`);
});

// Graceful shutdown when SIGTERM received
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Closing server gracefully...');
    server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
    });
});
