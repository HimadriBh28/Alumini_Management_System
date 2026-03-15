const Event = require('../models/Event');

// @desc    Create event (Admin only)
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            createdBy: req.user.id
        };

        const event = await Event.create(eventData);
        
        res.status(201).json({
            success: true,
            event
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
    try {
        const { upcoming, eventType } = req.query;
        let query = {};

        if (upcoming === 'true') {
            query.startDate = { $gte: new Date() };
        }
        if (eventType) {
            query.eventType = eventType;
        }

        const events = await Event.find(query)
            .populate('createdBy', 'name email')
            .populate('registrations.user', 'name email')
            .sort('startDate');

        res.json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Private
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('registrations.user', 'name email profile');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({
            success: true,
            event
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if already registered
        const alreadyRegistered = event.registrations.some(
            reg => reg.user.toString() === req.user.id
        );

        if (alreadyRegistered) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Check if event has reached max attendees
        if (event.maxAttendees && event.registrations.length >= event.maxAttendees) {
            return res.status(400).json({ message: 'Event is full' });
        }

        event.registrations.push({
            user: req.user.id
        });

        await event.save();

        res.json({
            success: true,
            message: 'Successfully registered for event'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update event (Admin only)
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({
            success: true,
            event
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete event (Admin only)
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.deleteOne();

        res.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    registerForEvent,
    updateEvent,
    deleteEvent
};