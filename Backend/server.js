const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS configuration - Allow both local and deployed frontend
app.use(cors({
    origin: [
        'https://alumni-management-system.vercel.app',  // Your Vercel URL
        'http://localhost:3000'
    ],
    credentials: true
}));

// ... rest of the code remains the same ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
