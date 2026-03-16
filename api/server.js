const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Use absolute paths from the project root
const authRoutes = require('./backend/routes/authRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const jobRoutes = require('./backend/routes/jobRoutes');
const eventRoutes = require('./backend/routes/eventRoutes');

const app = express();

// CORS configuration
app.use(cors({
    origin: ['https://alumni-management-system.vercel.app', 'http://localhost:3000'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is running' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Alumni Management System API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
