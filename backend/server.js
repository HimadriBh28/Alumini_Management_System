const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://alumni-management-system.vercel.app',
        'https://alumini-management-system.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());

// ============ MONGODB CONNECTION ============
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 Checking MongoDB URI:', MONGODB_URI ? '✅ URI exists' : '❌ URI MISSING!');

if (!MONGODB_URI) {
    console.error('❌ CRITICAL: MONGODB_URI environment variable is not set!');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully to Atlas!'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    });

// ============ SCHEMAS ============
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['alumni', 'student', 'admin'], default: 'student' },
    profile: {
        graduationYear: String,
        branch: String,
        company: String,
        designation: String,
        location: String,
        bio: String,
        phoneNumber: String,
        linkedinUrl: String
    },
    createdAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    jobType: { type: String, enum: ['full-time', 'part-time', 'internship', 'contract'], default: 'full-time' },
    description: { type: String, required: true },
    requirements: [String],
    salary: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventType: { type: String, enum: ['workshop', 'seminar', 'networking', 'webinar', 'meetup', 'conference'] },
    startDate: { type: Date, required: true },
    endDate: Date,
    location: String,
    isVirtual: { type: Boolean, default: false },
    meetingLink: String,
    maxAttendees: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    registrations: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        registeredAt: { type: Date, default: Date.now }
    }],
    status: { type: String, default: 'upcoming' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Job = mongoose.model('Job', jobSchema);
const Event = mongoose.model('Event', eventSchema);

// ============ AUTH MIDDLEWARE ============
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey123');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// ============ AUTH ROUTES ============
app.post('/api/auth/register', async (req, res) => {
    try {
        console.log('📝 Registration attempt:', req.body.email);
        
        const { name, email, password, role, graduationYear, branch } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        
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
        
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secretkey123',
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
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
        
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secretkey123',
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/auth/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ USER ROUTES ============
app.get('/api/users', async (req, res) => {
    try {
        const { role } = req.query;
        const query = role ? { role } : {};
        const users = await User.find(query).select('-password');
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.put('/api/users/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.profile = { ...user.profile, ...req.body };
        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

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

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name').sort('startDate');
        res.json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create event (Students only)
app.post('/api/events', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        // Only students can create events
        if (user.role !== 'student') {
            return res.status(403).json({ 
                success: false, 
                message: 'Only students can create events' 
            });
        }
        
        const event = new Event({
            ...req.body,
            createdBy: req.user.id,
            registrations: []
        });
        
        await event.save();
        res.status(201).json({ success: true, event });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Register for event (Alumni only)
app.post('/api/events/:id/register', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        const user = await User.findById(req.user.id);
        if (user.role !== 'alumni') {
            return res.status(403).json({ success: false, message: 'Only alumni can register for events' });
        }
        
        const alreadyRegistered = event.registrations.some(r => r.user.toString() === req.user.id);
        if (alreadyRegistered) {
            return res.status(400).json({ success: false, message: 'Already registered' });
        }
        
        event.registrations.push({ user: req.user.id, registeredAt: new Date() });
        await event.save();
        
        res.json({ success: true, message: 'Registered successfully' });
    } catch (error) {
        console.error('Register for event error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is healthy' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Alumni Management System API', endpoints: ['/api/auth', '/api/jobs', '/api/events', '/api/users'] });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/api/health`);
    console.log(`📍 Register: http://localhost:${PORT}/api/auth/register`);
    console.log(`📍 Events: http://localhost:${PORT}/api/events`);
    console.log(`📍 Jobs: http://localhost:${PORT}/api/jobs`);
});
