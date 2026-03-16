const express = require('express');
const {
    getUsers,
    getUser,
    updateProfile,
    approveUser,
    deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, authorize('admin'), getUsers);

router.route('/profile')
    .put(protect, updateProfile);

router.route('/:id')
    .get(protect, getUser)
    .delete(protect, authorize('admin'), deleteUser);

router.route('/:id/approve')
    .put(protect, authorize('admin'), approveUser);

module.exports = router;