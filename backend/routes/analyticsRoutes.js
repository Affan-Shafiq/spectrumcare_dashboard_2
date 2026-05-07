const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Get user activity analytics
router.get('/user-activity', verifyAdmin, analyticsController.getUserAnalytics);

module.exports = router;
