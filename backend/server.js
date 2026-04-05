const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration - Allow frontend to connect
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is healthy' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Alumni Management System API' });
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/alumni_management')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('⚠️ MongoDB not connected:', err.message));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/api/health`);
});
