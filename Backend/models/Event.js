const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required']
    },
    description: {
        type: String,
        required: [true, 'Event description is required']
    },
    eventType: {
        type: String,
        enum: ['webinar', 'workshop', 'networking', 'seminar', 'meetup'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: Date,
    location: {
        type: String,
        required: true
    },
    isVirtual: {
        type: Boolean,
        default: false
    },
    meetingLink: String,
    maxAttendees: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    registrations: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        registeredAt: {
            type: Date,
            default: Date.now
        },
        attended: {
            type: Boolean,
            default: false
        }
    }],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);