const fs = require('fs');
const path = require('path');
const backend = require('./backend'); // Import backend logic
const express = require('express');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Respond to preflight requests
    } else {
        next();
    }
});

// Endpoint for /api/countryInfo
app.get('/api/countryInfo', async (req, res) => {
    try {
        const countryInfo = await backend.getCountryInfo();
        res.json(countryInfo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.get('/api/indCountryInfo', async (req, res) => {
    try {
        const indCountryInfo = await backend.getIndCountryInfo();
        res.json(indCountryInfo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Serve other files or return 404 if not found
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
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
