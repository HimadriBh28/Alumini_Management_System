const Job = require('../models/Job');

// Create a new job posting (Alumni only)
const createJob = async (req, res) => {
    try {
        console.log('Creating job:', req.body);
        
        const jobData = {
            ...req.body,
            postedBy: req.user.id
        };
        
        const job = new Job(jobData);
        await job.save();
        
        res.status(201).json({
            success: true,
            message: 'Job posted successfully',
            job
        });
    } catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true })
            .populate('postedBy', 'name email')
            .sort('-createdAt');
        
        res.json({
            success: true,
            count: jobs.length,
            jobs
        });
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single job
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'name email profile')
            .populate('applications.student', 'name email');
        
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }
        
        res.json({
            success: true,
            job
        });
    } catch (error) {
        console.error('Get job error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Apply for a job (Student only)
const applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }
        
        // Check if already applied
        const alreadyApplied = job.applications.some(
            app => app.student.toString() === req.user.id
        );
        
        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: 'Already applied for this job'
            });
        }
        
        job.applications.push({
            student: req.user.id,
            coverLetter: req.body.coverLetter,
            resume: req.body.resume
        });
        
        await job.save();
        
        res.json({
            success: true,
            message: 'Application submitted successfully'
        });
    } catch (error) {
        console.error('Apply for job error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    applyForJob
};
