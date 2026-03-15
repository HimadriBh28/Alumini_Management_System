const express = require('express');
const {
    createEvent,
    getEvents,
    getEventById,
    registerForEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, getEvents)
    .post(protect, authorize('admin'), createEvent);

router.route('/:id')
    .get(protect, getEventById)
    .put(protect, authorize('admin'), updateEvent)
    .delete(protect, authorize('admin'), deleteEvent);

router.route('/:id/register')
    .post(protect, registerForEvent);

module.exports = router;