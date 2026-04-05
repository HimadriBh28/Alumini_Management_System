const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    description: {
        type: String,
        required: true
    },
    requirements: [String],
    salary: String,
    applicationDeadline: Date,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applications: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        coverLetter: String,
        resume: String,
        appliedAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
            default: 'pending'
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
