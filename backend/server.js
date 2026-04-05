const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/alumni_management')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['alumni', 'student', 'admin'], default: 'student' },
    profile: {
        graduationYear: String,
        branch: String,
        company: String,
        designation: String
    },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    jobType: String,
    description: String,
    requirements: [String],
    salary: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    eventType: String,
    startDate: Date,
    location: String,
    registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

// ============ AUTH ROUTES ============
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role, graduationYear, branch } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
            profile: { graduationYear, branch }
        });
        
        await user.save();
        
        const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey123', { expiresIn: '7d' });
        
        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey123', { expiresIn: '7d' });
        
        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/auth/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token' });
        }
        
        const decoded = jwt.verify(token, 'secretkey123');
        const user = await User.findById(decoded.id).select('-password');
        
        res.json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

// Middleware to check authentication
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token' });
        }
        const decoded = jwt.verify(token, 'secretkey123');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// ============ JOB ROUTES ============
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'name').sort('-createdAt');
        res.json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/jobs', auth, async (req, res) => {
    try {
        // Check if user is alumni
        const user = await User.findById(req.user.id);
        if (user.role !== 'alumni') {
            return res.status(403).json({ success: false, message: 'Only alumni can post jobs' });
        }
        
        const job = new Job({ ...req.body, postedBy: req.user.id });
        await job.save();
        res.status(201).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ EVENT ROUTES ============
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort('-createdAt');
        res.json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/events/:id/register', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        if (!event.registrations.includes(req.user.id)) {
            event.registrations.push(req.user.id);
            await event.save();
        }
        
        res.json({ success: true, message: 'Registered for event' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is healthy' });
});

const PORT = 10000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/api/health`);
});
