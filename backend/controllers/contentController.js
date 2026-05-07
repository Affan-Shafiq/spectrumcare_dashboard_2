const { getFirestore } = require('../config/firebase');
const { FieldValue } = require('firebase-admin/firestore');

// ==================== BLOG OPERATIONS ====================

/**
 * Get all blogs
 * Query param: includeHidden=true to show hidden blogs (admin only)
 */
const getAllBlogs = async (req, res) => {
    try {
        const db = getFirestore();
        const includeHidden = req.query.includeHidden === 'true';

        let blogsQuery = db.collection('blogs').orderBy('createdAt', 'desc');

        // Filter out hidden blogs unless explicitly requested
        if (!includeHidden) {
            blogsQuery = blogsQuery.where('isHidden', '==', false);
        }

        const snapshot = await blogsQuery.get();

        const blogs = [];
        snapshot.forEach(doc => {
            blogs.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.error('Get all blogs error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch blogs',
                code: 'FETCH_FAILED'
            }
        });
    }
};

/**
 * Get single blog by ID
 */
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const blogDoc = await db.collection('blogs').doc(id).get();

        if (!blogDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Blog not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        res.status(200).json({
            success: true,
            blog: {
                id: blogDoc.id,
                ...blogDoc.data()
            }
        });
    } catch (error) {
        console.error('Get blog by ID error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch blog',
                code: 'FETCH_FAILED'
            }
        });
    }
};

/**
 * Create new blog
 */
const createBlog = async (req, res) => {
    try {
        const { 
            title, summary, content, category, 
            authorName, authorRole, authorCredentials, 
            tags, audienceType 
        } = req.body;
        const db = getFirestore();

        // Validation
        if (!title || !summary || !content || !category) {
            return res.status(400).json({
                error: {
                    message: 'Missing required fields: title, summary, content, category',
                    code: 'VALIDATION_ERROR'
                }
            });
        }

        const blogData = {
            // Core Info
            title,
            summary,
            content,
            category,
            contentType: 'blog',
            language: 'en',
            schemaVersion: 2,
            
            // Author Info
            authorName: authorName || req.admin.fullName,
            authorRole: authorRole || 'admin',
            authorCredentials: authorCredentials || '',
            authorId: null, // Admin created
            
            // Metadata & Quality
            tags: tags || [],
            audienceType: audienceType || 'generalized',
            qualityScore: 90,
            qualityFlags: [],
            keyTakeaways: [],
            coverImageUrl: null,
            urduVersion: null,
            sourceContext: null,
            reviewNotes: null,
            
            // Visibility & Status
            isHidden: false,
            publicationStatus: 'published',
            
            // Age Targeting
            minAge: null,
            maxAge: null,
            
            // Targeting (Simplified for admin)
            targetParentId: null,
            targetChildId: null,
            targeting: {
                scope: 'global',
                parentIds: [],
                childIds: [],
                cohortIds: []
            },
            
            // Workflow
            workflow: {
                state: 'published',
                reviewDecision: 'approved',
                reviewNotes: null,
                submittedAt: FieldValue.serverTimestamp(),
                submittedByUserId: null,
                reviewedAt: FieldValue.serverTimestamp(),
                reviewedByUserId: null,
                publishedAt: FieldValue.serverTimestamp(),
                publishedByUserId: null
            },
            
            // Timestamps
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            publishedAt: FieldValue.serverTimestamp(),
            reviewedAt: FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('blogs').add(blogData);

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            blogId: docRef.id
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to create blog',
                code: 'CREATE_FAILED'
            }
        });
    }
};

/**
 * Update blog
 */
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            title, summary, content, category,
            authorName, authorRole, authorCredentials,
            tags, audienceType, isHidden
        } = req.body;
        const db = getFirestore();

        // Check if blog exists
        const blogDoc = await db.collection('blogs').doc(id).get();
        if (!blogDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Blog not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        // Build update object (only include provided fields)
        const updateData = {
            updatedAt: FieldValue.serverTimestamp()
        };

        if (title !== undefined) updateData.title = title;
        if (summary !== undefined) updateData.summary = summary;
        if (content !== undefined) updateData.content = content;
        if (category !== undefined) updateData.category = category;
        if (authorName !== undefined) updateData.authorName = authorName;
        if (authorRole !== undefined) updateData.authorRole = authorRole;
        if (authorCredentials !== undefined) updateData.authorCredentials = authorCredentials;
        if (tags !== undefined) updateData.tags = tags;
        if (audienceType !== undefined) updateData.audienceType = audienceType;
        if (isHidden !== undefined) updateData.isHidden = isHidden;

        await db.collection('blogs').doc(id).update(updateData);

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully'
        });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to update blog',
                code: 'UPDATE_FAILED'
            }
        });
    }
};

/**
 * Toggle blog visibility (hide/show)
 */
const toggleBlogVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const blogDoc = await db.collection('blogs').doc(id).get();
        if (!blogDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Blog not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        const currentStatus = blogDoc.data().isHidden;

        await db.collection('blogs').doc(id).update({
            isHidden: !currentStatus,
            updatedAt: FieldValue.serverTimestamp()
        });

        res.status(200).json({
            success: true,
            message: `Blog ${!currentStatus ? 'hidden' : 'shown'} successfully`,
            isHidden: !currentStatus
        });
    } catch (error) {
        console.error('Toggle blog visibility error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to toggle blog visibility',
                code: 'TOGGLE_FAILED'
            }
        });
    }
};

/**
 * Delete blog
 */
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const blogDoc = await db.collection('blogs').doc(id).get();
        if (!blogDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Blog not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        await db.collection('blogs').doc(id).delete();

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to delete blog',
                code: 'DELETE_FAILED'
            }
        });
    }
};

// ==================== VIDEO OPERATIONS ====================

/**
 * Get all videos
 */
const getAllVideos = async (req, res) => {
    try {
        const db = getFirestore();
        const includeHidden = req.query.includeHidden === 'true';

        let videosQuery = db.collection('videoResources').orderBy('createdAt', 'desc');

        if (!includeHidden) {
            videosQuery = videosQuery.where('isHidden', '==', false);
        }

        const snapshot = await videosQuery.get();

        const videos = [];
        snapshot.forEach(doc => {
            videos.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json({
            success: true,
            count: videos.length,
            videos
        });
    } catch (error) {
        console.error('Get all videos error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch videos',
                code: 'FETCH_FAILED'
            }
        });
    }
};

/**
 * Get single video by ID
 */
const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const videoDoc = await db.collection('videoResources').doc(id).get();

        if (!videoDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Video not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        res.status(200).json({
            success: true,
            video: {
                id: videoDoc.id,
                ...videoDoc.data()
            }
        });
    } catch (error) {
        console.error('Get video by ID error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch video',
                code: 'FETCH_FAILED'
            }
        });
    }
};

/**
 * Create new video
 */
const createVideo = async (req, res) => {
    try {
        const { 
            title, youtubeLink, summary, category,
            sourceOrg, displaySource, whyThisHelps,
            sourceCredibility, minAge, maxAge,
            tags, urduVersion
        } = req.body;
        const db = getFirestore();

        // Validation
        if (!title || !youtubeLink || !summary || !category) {
            return res.status(400).json({
                error: {
                    message: 'Missing required fields: title, youtubeLink, summary, category',
                    code: 'VALIDATION_ERROR'
                }
            });
        }

        const videoData = {
            // Core Info
            title,
            youtubeLink,
            summary,
            category,
            contentType: 'video',
            language: 'en',
            
            // Source & Help Info
            sourceOrg: sourceOrg || '',
            displaySource: displaySource || '',
            whyThisHelps: whyThisHelps || '',
            sourceCredibility: sourceCredibility || '',
            
            // Age Targeting
            minAge: minAge !== undefined ? minAge : 0,
            maxAge: maxAge !== undefined ? maxAge : 18,
            
            // Metadata
            tags: tags || [],
            urduVersion: urduVersion || null,
            thumbnailUrl: null,
            
            // Status
            isHidden: false,
            
            // Timestamps
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('videoResources').add(videoData);

        res.status(201).json({
            success: true,
            message: 'Video created successfully',
            videoId: docRef.id
        });
    } catch (error) {
        console.error('Create video error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to create video',
                code: 'CREATE_FAILED'
            }
        });
    }
};

/**
 * Update video
 */
const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            title, youtubeLink, summary, category,
            sourceOrg, displaySource, whyThisHelps,
            sourceCredibility, minAge, maxAge,
            tags, urduVersion, isHidden
        } = req.body;
        const db = getFirestore();

        const videoDoc = await db.collection('videoResources').doc(id).get();
        if (!videoDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Video not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        const updateData = {
            updatedAt: FieldValue.serverTimestamp()
        };

        if (title !== undefined) updateData.title = title;
        if (youtubeLink !== undefined) updateData.youtubeLink = youtubeLink;
        if (summary !== undefined) updateData.summary = summary;
        if (category !== undefined) updateData.category = category;
        if (sourceOrg !== undefined) updateData.sourceOrg = sourceOrg;
        if (displaySource !== undefined) updateData.displaySource = displaySource;
        if (whyThisHelps !== undefined) updateData.whyThisHelps = whyThisHelps;
        if (sourceCredibility !== undefined) updateData.sourceCredibility = sourceCredibility;
        if (minAge !== undefined) updateData.minAge = minAge;
        if (maxAge !== undefined) updateData.maxAge = maxAge;
        if (tags !== undefined) updateData.tags = tags;
        if (urduVersion !== undefined) updateData.urduVersion = urduVersion;
        if (isHidden !== undefined) updateData.isHidden = isHidden;

        await db.collection('videoResources').doc(id).update(updateData);

        res.status(200).json({
            success: true,
            message: 'Video updated successfully'
        });
    } catch (error) {
        console.error('Update video error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to update video',
                code: 'UPDATE_FAILED'
            }
        });
    }
};

/**
 * Toggle video visibility
 */
const toggleVideoVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const videoDoc = await db.collection('videoResources').doc(id).get();
        if (!videoDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Video not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        const currentStatus = videoDoc.data().isHidden;

        await db.collection('videoResources').doc(id).update({
            isHidden: !currentStatus,
            updatedAt: FieldValue.serverTimestamp()
        });

        res.status(200).json({
            success: true,
            message: `Video ${!currentStatus ? 'hidden' : 'shown'} successfully`,
            isHidden: !currentStatus
        });
    } catch (error) {
        console.error('Toggle video visibility error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to toggle video visibility',
                code: 'TOGGLE_FAILED'
            }
        });
    }
};

/**
 * Delete video
 */
const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const videoDoc = await db.collection('videoResources').doc(id).get();
        if (!videoDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Video not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        await db.collection('videoResources').doc(id).delete();

        res.status(200).json({
            success: true,
            message: 'Video deleted successfully'
        });
    } catch (error) {
        console.error('Delete video error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to delete video',
                code: 'DELETE_FAILED'
            }
        });
    }
};

module.exports = {
    // Blog operations
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    toggleBlogVisibility,
    deleteBlog,

    // Video operations
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    toggleVideoVisibility,
    deleteVideo
};
