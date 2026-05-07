const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');
const { verifyToken, getProfile } = require('../controllers/authController');

/**
 * @route   POST /api/auth/verify
 * @desc    Verify admin token and return admin data
 * @access  Protected
 */
router.post('/verify', verifyAdmin, verifyToken);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current admin profile
 * @access  Protected
 */
router.get('/profile', verifyAdmin, getProfile);

module.exports = router;
