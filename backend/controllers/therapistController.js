const { getFirestore } = require('../config/firebase');
const { FieldValue } = require('firebase-admin/firestore');

/**
 * Get all therapists with optional status filter
 */
const getAllTherapists = async (req, res) => {
    try {
        const db = getFirestore();
        const { status } = req.query;

        let therapistsQuery = db.collection('therapists');

        // Filter by status if provided
        if (status) {
            therapistsQuery = therapistsQuery.where('status', '==', status);
        }

        const snapshot = await therapistsQuery.get();

        const therapists = [];
        snapshot.forEach(doc => {
            therapists.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Sort by createdAt in memory (descending - newest first)
        therapists.sort((a, b) => {
            const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt?._seconds ? a.createdAt._seconds * 1000 : 0);
            const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt?._seconds ? b.createdAt._seconds * 1000 : 0);
            return bTime - aTime;
        });

        res.status(200).json({
            success: true,
            count: therapists.length,
            therapists
        });
    } catch (error) {
        console.error('Get all therapists error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch therapists',
                code: 'FETCH_FAILED'
            }
        });
    }
};

/**
 * Get single therapist by ID
 */
const getTherapistById = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const therapistDoc = await db.collection('therapists').doc(id).get();

        if (!therapistDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Therapist not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        res.status(200).json({
            success: true,
            therapist: {
                id: therapistDoc.id,
                ...therapistDoc.data()
            }
        });
    } catch (error) {
        console.error('Get therapist by ID error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch therapist',
                code: 'FETCH_FAILED'
            }
        });
    }
};

/**
 * Update therapist status (approve/reject)
 */
const updateTherapistStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const db = getFirestore();

        // Validate status
        if (!['requested', 'pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                error: {
                    message: 'Invalid status. Must be: requested, pending, approved, or rejected',
                    code: 'VALIDATION_ERROR'
                }
            });
        }

        const therapistDoc = await db.collection('therapists').doc(id).get();
        if (!therapistDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Therapist not found',
                    code: 'NOT_FOUND'
                }
            });
        }

        // Update status only (isVerified is for email verification, handled by mobile app)
        await db.collection('therapists').doc(id).update({
            status,
            updatedAt: FieldValue.serverTimestamp()
        });

        res.status(200).json({
            success: true,
            message: `Therapist ${status} successfully`
        });
    } catch (error) {
        console.error('Update therapist status error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to update therapist status',
                code: 'UPDATE_FAILED'
            }
        });
    }
};

/**
 * Get therapist statistics
 */
const getTherapistStats = async (req, res) => {
    try {
        const db = getFirestore();

        // Get all therapists
        const allTherapists = await db.collection('therapists').get();

        // Calculate stats
        let pendingCount = 0;
        let approvedTodayCount = 0;
        let rejectedTodayCount = 0;
        let totalApprovedCount = 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        allTherapists.forEach(doc => {
            const data = doc.data();

            // Count by status
            if (data.status === 'requested' || data.status === 'pending') {
                pendingCount++;
            } else if (data.status === 'approved') {
                totalApprovedCount++;

                // Check if approved today
                if (data.updatedAt) {
                    const updatedDate = data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt._seconds * 1000);
                    if (updatedDate >= today) {
                        approvedTodayCount++;
                    }
                }
            } else if (data.status === 'rejected') {
                // Check if rejected today
                if (data.updatedAt) {
                    const updatedDate = data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt._seconds * 1000);
                    if (updatedDate >= today) {
                        rejectedTodayCount++;
                    }
                }
            }
        });

        res.status(200).json({
            success: true,
            stats: {
                pendingReview: pendingCount,
                approvedToday: approvedTodayCount,
                rejectedToday: rejectedTodayCount,
                totalApproved: totalApprovedCount
            }
        });
    } catch (error) {
        console.error('Get therapist stats error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch therapist statistics',
                code: 'FETCH_FAILED'
            }
        });
    }
};

module.exports = {
    getAllTherapists,
    getTherapistById,
    updateTherapistStatus,
    getTherapistStats
};
