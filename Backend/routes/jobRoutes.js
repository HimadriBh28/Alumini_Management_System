const express = require('express');
const {
    createJob,
    getJobs,
    getJobById,
    applyForJob,
    updateApplicationStatus
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, getJobs)
    .post(protect, authorize('alumni'), createJob);

router.route('/:id')
    .get(protect, getJobById);

router.route('/:id/apply')
    .post(protect, authorize('student'), applyForJob);

router.route('/:jobId/applications/:applicationId')
    .put(protect, authorize('alumni'), updateApplicationStatus);

module.exports = router;