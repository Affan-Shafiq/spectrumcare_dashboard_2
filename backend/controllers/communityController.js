const { getFirestore } = require('../config/firebase');

/**
 * Get Community Moderation Statistics
 * @route GET /api/community/stats
 */
exports.getCommunityStats = async (req, res) => {
    try {
        const db = getFirestore();
        
        // 1. Total Posts: All documents in communityPosts
        const totalPostsQuery = await db.collection('communityPosts').count().get();
        const totalPosts = totalPostsQuery.data().count;

        // 2. Pending Review: Count of unique reports that are pending
        // The user mentioned "post that have been reported by the users"
        const pendingReportsQuery = await db.collection('communityReports')
            .where('status', '==', 'pending')
            .count()
            .get();
        const pendingReview = pendingReportsQuery.data().count;

        // 3. Removed Posts: All documents in deletedPosts
        const removedPostsQuery = await db.collection('deletedPosts').count().get();
        const removedPosts = removedPostsQuery.data().count;

        // 4. Approved Posts: Reported posts that were reviewed and approved by admin
        const approvedPostsQuery = await db.collection('communityReports')
            .where('status', '==', 'approved')
            .count()
            .get();
        const approvedPosts = approvedPostsQuery.data().count;

        res.status(200).json({
            success: true,
            data: {
                totalPosts,
                pendingReview,
                removedPosts,
                approvedPosts
            }
        });
    } catch (error) {
        console.error('Error fetching community stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch community statistics',
            error: error.message
        });
    }
};

/**
 * Get Community Reports (Moderation Queue)
 * @route GET /api/community/reports
 */
exports.getCommunityReports = async (req, res) => {
    try {
        const { status = 'pending' } = req.query;
        const db = getFirestore();

        // 1. Fetch reports
        const reportsSnapshot = await db.collection('communityReports')
            .where('status', '==', status)
            .get();

        if (reportsSnapshot.empty) {
            return res.status(200).json({ success: true, data: [] });
        }

        // 2. Group reports by targetId
        const reportGroups = {};
        for (const doc of reportsSnapshot.docs) {
            const report = doc.data();
            const targetId = report.targetId;
            
            if (!targetId) continue;

            if (!reportGroups[targetId]) {
                reportGroups[targetId] = {
                    postId: targetId,
                    targetAuthorName: report.targetAuthorName,
                    status: report.status,
                    createdAt: report.createdAt,
                    reportCount: 0,
                    reasons: new Set()
                };
            }
            reportGroups[targetId].reportCount++;
            if (report.reason) reportGroups[targetId].reasons.add(report.reason);
        }

        // 3. Fetch associated posts (check both active and deleted collections)
        const results = [];
        for (const targetId in reportGroups) {
            const group = reportGroups[targetId];
            
            // Try fetching from communityPosts first
            let postDoc = await db.collection('communityPosts').doc(targetId).get();
            let post = postDoc.exists ? postDoc.data() : null;

            // If not found and status is 'removed', check deletedPosts
            if (!post && group.status === 'removed') {
                postDoc = await db.collection('deletedPosts').doc(targetId).get();
                post = postDoc.exists ? postDoc.data() : null;
            }

            // Safe date conversion
            let timestamp = new Date();
            if (group.createdAt) {
                if (typeof group.createdAt.toDate === 'function') timestamp = group.createdAt.toDate();
                else if (group.createdAt._seconds) timestamp = new Date(group.createdAt._seconds * 1000);
            }

            results.push({
                id: targetId,
                userName: group.targetAuthorName || (post ? post.authorName : 'Unknown'),
                authorRole: post ? post.authorRole : 'user',
                content: post ? post.content : '[Post Content Deleted]',
                category: post && post.topics ? post.topics[0] : 'general',
                topics: post ? post.topics : [],
                status: group.status,
                reportCount: group.reportCount,
                likesCount: post ? (post.likesCount || 0) : 0,
                replyCount: post ? (post.replyCount || 0) : 0,
                isTherapistTargeted: post ? post.isTherapistTargeted : false,
                timestamp: timestamp,
                reasons: Array.from(group.reasons)
            });
        }

        // Sort by date (most recent report grouping)
        results.sort((a, b) => b.timestamp - a.timestamp);

        res.status(200).json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Error in getCommunityReports:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Moderate a Post (Approve or Remove)
 * @route PATCH /api/community/moderate/:postId
 */
exports.moderatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { action } = req.body; // 'approve' or 'remove'
        const db = getFirestore();

        if (!['approve', 'remove'].includes(action)) {
            return res.status(400).json({ success: false, message: 'Invalid action' });
        }

        const batch = db.batch();

        // 1. Update all reports for this post
        const reportsSnapshot = await db.collection('communityReports')
            .where('targetId', '==', postId)
            .get();
        
        const reportStatus = action === 'approve' ? 'approved' : 'removed';
        reportsSnapshot.docs.forEach(doc => {
            batch.update(doc.ref, { 
                status: reportStatus,
                moderatedAt: new Date(),
                moderatedBy: req.admin.email
            });
        });

        if (action === 'approve') {
            // 2. Approve: Update post moderation status
            const postRef = db.collection('communityPosts').doc(postId);
            batch.update(postRef, { 
                moderationStatus: 'active',
                isReported: false // Clear the reported flag if it exists
            });
        } else {
            // 2. Remove: Move to deletedPosts and delete from communityPosts
            const postRef = db.collection('communityPosts').doc(postId);
            const postDoc = await postRef.get();

            if (postDoc.exists) {
                const postData = postDoc.data();
                const deletedPostRef = db.collection('deletedPosts').doc(postId);
                
                batch.set(deletedPostRef, {
                    ...postData,
                    deletedAt: new Date(),
                    deletedBy: req.admin.email,
                    deletionReason: 'Moderation'
                });
                
                batch.delete(postRef);
            }
        }

        await batch.commit();

        res.status(200).json({
            success: true,
            message: `Post ${action === 'approve' ? 'approved' : 'removed'} successfully`
        });

    } catch (error) {
        console.error(`Error moderating post ${req.params.postId}:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to moderate post',
            error: error.message
        });
    }
};



/**
 * Get All Community Posts (Feed View)
 * @route GET /api/community/all-posts
 */
exports.getAllPosts = async (req, res) => {
    try {
        const db = getFirestore();
        
        const postsSnapshot = await db.collection("communityPosts")
            .orderBy("createdAt", "desc")
            .limit(100)
            .get();

        const posts = postsSnapshot.docs.map(doc => {
            const post = doc.data();
            
            let timestamp = new Date();
            if (post.createdAt) {
                if (typeof post.createdAt.toDate === 'function') timestamp = post.createdAt.toDate();
                else if (post.createdAt._seconds) timestamp = new Date(post.createdAt._seconds * 1000);
            }

            return {
                id: doc.id,
                userName: post.authorName || 'Unknown',
                authorRole: post.authorRole || 'user',
                content: post.content || '',
                topics: post.topics || [],
                likesCount: post.likesCount || 0,
                replyCount: post.replyCount || 0,
                timestamp: timestamp,
                moderationStatus: post.moderationStatus || 'active'
            };
        });

        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error('Error fetching all posts:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
