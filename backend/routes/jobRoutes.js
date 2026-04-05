const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, applyForJob } = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
    .get(getJobs)
    .post(createJob);

router.route('/:id')
    .get(getJobById);

router.route('/:id/apply')
    .post(applyForJob);

module.exports = router;
