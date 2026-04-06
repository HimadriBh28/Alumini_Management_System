const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    getEventById,
    registerForEvent,
    cancelRegistration,
    updateEvent,
    deleteEvent,
    getMyEvents
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
    .get(getEvents)
    .post(createEvent);  // Students can create events

router.get('/my-events', getMyEvents);
router.post('/:id/register', registerForEvent);
router.delete('/:id/cancel', cancelRegistration);
router.route('/:id')
    .get(getEventById)
    .put(updateEvent)
    .delete(deleteEvent);

module.exports = router;
