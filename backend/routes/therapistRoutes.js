const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');
const {
    getAllTherapists,
    getTherapistById,
    updateTherapistStatus,
    getTherapistStats
} = require('../controllers/therapistController');

// All routes require admin authentication
router.use(verifyAdmin);

/**
 * @route   GET /api/therapists/stats
 * @desc    Get therapist statistics
 * @access  Protected (Admin)
 */
router.get('/stats', getTherapistStats);

/**
 * @route   GET /api/therapists
 * @desc    Get all therapists (optionally filter by status)
 * @query   status=pending|approved|rejected (optional)
 * @access  Protected (Admin)
 */
router.get('/', getAllTherapists);

/**
 * @route   GET /api/therapists/:id
 * @desc    Get single therapist by ID
 * @access  Protected (Admin)
 */
router.get('/:id', getTherapistById);

/**
 * @route   PATCH /api/therapists/:id/status
 * @desc    Update therapist status (approve/reject)
 * @body    { status: 'pending' | 'approved' | 'rejected' }
 * @access  Protected (Admin)
 */
router.patch('/:id/status', updateTherapistStatus);

module.exports = router;
