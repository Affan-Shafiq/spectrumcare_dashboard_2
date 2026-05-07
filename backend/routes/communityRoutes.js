const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// All routes are protected and require admin access
router.use(verifyAdmin);

/**
 * @route   GET /api/community/stats
 * @desc    Get statistics for community moderation
 * @access  Private (Admin)
 */
router.get('/stats', communityController.getCommunityStats);

/**
 * @route   GET /api/community/reports
 * @desc    Get moderation queue (grouped reports)
 * @access  Private (Admin)
 */
router.get('/reports', communityController.getCommunityReports);

/**
 * @route   PATCH /api/community/moderate/:postId
 * @desc    Approve or remove a reported post
 * @access  Private (Admin)
 */
router.patch('/moderate/:postId', communityController.moderatePost);

/**
 * @route   GET /api/community/all-posts
 * @desc    Get all community posts for feed view
 * @access  Private (Admin)
 */
router.get('/all-posts', communityController.getAllPosts);

module.exports = router;
