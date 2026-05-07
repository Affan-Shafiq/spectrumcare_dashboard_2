const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');
const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    toggleBlogVisibility,
    deleteBlog,
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    toggleVideoVisibility,
    deleteVideo
} = require('../controllers/contentController');

// All routes require admin authentication
router.use(verifyAdmin);

// ==================== BLOG ROUTES ====================

/**
 * @route   GET /api/content/blogs
 * @desc    Get all blogs (optionally include hidden)
 * @query   includeHidden=true (optional)
 * @access  Protected (Admin)
 */
router.get('/blogs', getAllBlogs);

/**
 * @route   GET /api/content/blogs/:id
 * @desc    Get single blog by ID
 * @access  Protected (Admin)
 */
router.get('/blogs/:id', getBlogById);

/**
 * @route   POST /api/content/blogs
 * @desc    Create new blog
 * @body    { title, summary, content, category }
 * @access  Protected (Admin)
 */
router.post('/blogs', createBlog);

/**
 * @route   PUT /api/content/blogs/:id
 * @desc    Update blog
 * @body    { title?, summary?, content?, category? }
 * @access  Protected (Admin)
 */
router.put('/blogs/:id', updateBlog);

/**
 * @route   PATCH /api/content/blogs/:id/toggle-visibility
 * @desc    Toggle blog visibility (hide/show)
 * @access  Protected (Admin)
 */
router.patch('/blogs/:id/toggle-visibility', toggleBlogVisibility);

/**
 * @route   DELETE /api/content/blogs/:id
 * @desc    Delete blog permanently
 * @access  Protected (Admin)
 */
router.delete('/blogs/:id', deleteBlog);

// ==================== VIDEO ROUTES ====================

/**
 * @route   GET /api/content/videos
 * @desc    Get all videos (optionally include hidden)
 * @query   includeHidden=true (optional)
 * @access  Protected (Admin)
 */
router.get('/videos', getAllVideos);

/**
 * @route   GET /api/content/videos/:id
 * @desc    Get single video by ID
 * @access  Protected (Admin)
 */
router.get('/videos/:id', getVideoById);

/**
 * @route   POST /api/content/videos
 * @desc    Create new video
 * @body    { title, youtubeLink, duration, category }
 * @access  Protected (Admin)
 */
router.post('/videos', createVideo);

/**
 * @route   PUT /api/content/videos/:id
 * @desc    Update video
 * @body    { title?, youtubeLink?, duration?, category? }
 * @access  Protected (Admin)
 */
router.put('/videos/:id', updateVideo);

/**
 * @route   PATCH /api/content/videos/:id/toggle-visibility
 * @desc    Toggle video visibility (hide/show)
 * @access  Protected (Admin)
 */
router.patch('/videos/:id/toggle-visibility', toggleVideoVisibility);

/**
 * @route   DELETE /api/content/videos/:id
 * @desc    Delete video permanently
 * @access  Protected (Admin)
 */
router.delete('/videos/:id', deleteVideo);

module.exports = router;
