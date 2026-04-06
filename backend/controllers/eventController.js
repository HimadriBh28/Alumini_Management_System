const Event = require('../models/Event');
const User = require('../models/User');

const createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            createdBy: req.user.id
        };
        
        const event = new Event(eventData);
        await event.save();
        
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event
        });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const { upcoming, eventType } = req.query;
        let query = {};
        
        if (upcoming === 'true') {
            query.startDate = { $gte: new Date() };
            query.status = 'upcoming';
        }
        if (eventType) {
            query.eventType = eventType;
        }
        
        const events = await Event.find(query)
            .populate('createdBy', 'name email profile')
            .populate('registrations.user', 'name email profile')
            .sort({ startDate: 1 });
        
        res.json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single event
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'name email profile')
            .populate('registrations.user', 'name email profile');
        
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        res.json({ success: true, event });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Register for event (Alumni can register)
const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        // Check if already registered
        const alreadyRegistered = event.registrations.some(
            reg => reg.user.toString() === req.user.id
        );
        
        if (alreadyRegistered) {
            return res.status(400).json({ success: false, message: 'Already registered for this event' });
        }
        
        // Check if event has reached max attendees
        if (event.maxAttendees && event.registrations.length >= event.maxAttendees) {
            return res.status(400).json({ success: false, message: 'Event is full' });
        }
        
        event.registrations.push({
            user: req.user.id,
            registeredAt: new Date()
        });
        
        await event.save();
        
        res.json({
            success: true,
            message: 'Successfully registered for event',
            registrationCount: event.registrations.length
        });
    } catch (error) {
        console.error('Register for event error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel registration
const cancelRegistration = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        event.registrations = event.registrations.filter(
            reg => reg.user.toString() !== req.user.id
        );
        
        await event.save();
        
        res.json({
            success: true,
            message: 'Registration cancelled successfully'
        });
    } catch (error) {
        console.error('Cancel registration error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update event (Only creator)
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent
        });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete event (Only creator or admin)
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        await event.deleteOne();
        
        res.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get events created by user
const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ createdBy: req.user.id })
            .populate('registrations.user', 'name email profile')
            .sort('-createdAt');
        
        res.json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        console.error('Get my events error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    registerForEvent,
    cancelRegistration,
    updateEvent,
    deleteEvent,
    getMyEvents
};
