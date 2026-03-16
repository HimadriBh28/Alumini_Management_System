const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Simple logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ROOT ROUTE - This MUST work
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Alumni Management System API',
        endpoints: {
            health: '/health',
            api: '/api/health',
            test: '/api/test'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is healthy' });
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Test endpoint works' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        path: req.path,
        suggestion: 'Try /, /health, or /api/health'
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📍 Test URL: http://localhost:${PORT}/`);
});
