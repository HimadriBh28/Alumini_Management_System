const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes - MAKE SURE THESE PATHS ARE CORRECT
const authRoutes = require('./routes/authRoutes');

// Register routes - THIS IS THE CRITICAL PART
app.use('/api/auth', authRoutes);

// Simple test routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is healthy' });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Test endpoint works' });
});

// MongoDB connection (optional for testing)
mongoose.connect('mongodb://localhost:27017/alumni_management')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('⚠️ MongoDB not connected:', err.message));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Health: http://localhost:${PORT}/api/health`);
    console.log(`✅ Auth routes: http://localhost:${PORT}/api/auth/register`);
});
