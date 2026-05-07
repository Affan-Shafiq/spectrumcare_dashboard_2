const express = require('express');
const router = express.Router();
const mlController = require('../controllers/mlController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Get ML performance statistics
router.get('/stats', verifyAdmin, mlController.getMLStats);

// Get recent screening results with accuracy mapping
router.get('/recent-results', verifyAdmin, mlController.getRecentResults);

module.exports = router;
