const Job = require('../models/Job');

// @desc    Create job posting (Alumni only)
// @route   POST /api/jobs
// @access  Private/Alumni
const createJob = async (req, res) => {
    try {
        const jobData = {
            ...req.body,
            postedBy: req.user.id
        };

        const job = await Job.create(jobData);
        
        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
    try {
        const { jobType, location, experienceLevel } = req.query;
        let query = { isActive: true };

        if (jobType) query.jobType = jobType;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (experienceLevel) query.experienceLevel = experienceLevel;

        const jobs = await Job.find(query)
            .populate('postedBy', 'name email profile')
            .sort('-createdAt');

        res.json({
            success: true,
            count: jobs.length,
            jobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Private
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'name email profile')
            .populate('applications.student', 'name email profile');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply for job (Students only)
// @route   POST /api/jobs/:id/apply
// @access  Private/Student
const applyForJob = async (req, res) => {
    try {
        const { coverLetter, resume } = req.body;
        
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if already applied
        const alreadyApplied = job.applications.some(
            app => app.student.toString() === req.user.id
        );

        if (alreadyApplied) {
            return res.status(400).json({ message: 'Already applied for this job' });
        }

        job.applications.push({
            student: req.user.id,
            coverLetter,
            resume
        });

        await job.save();

        res.json({
            success: true,
            message: 'Application submitted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update application status (Alumni only)
// @route   PUT /api/jobs/:jobId/applications/:applicationId
// @access  Private/Alumni
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const job = await Job.findById(req.params.jobId);
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user is the job poster
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const application = job.applications.id(req.params.applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        await job.save();

        res.json({
            success: true,
            message: 'Application status updated'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    applyForJob,
    updateApplicationStatus
};