const { getFirestore } = require('../config/firebase');

/**
 * Verify admin token and return admin data
 */
const verifyToken = async (req, res) => {
    try {
        // Admin data is already attached by verifyAdmin middleware
        const adminData = req.admin;

        res.status(200).json({
            success: true,
            admin: {
                uid: adminData.uid,
                email: adminData.email,
                fullName: adminData.fullName,
                phone: adminData.phone,
                role: adminData.role,
                isActive: adminData.isActive
            }
        });
    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to verify token',
                code: 'VERIFICATION_FAILED'
            }
        });
    }
};

/**
 * Get current admin profile
 */
const getProfile = async (req, res) => {
    try {
        const db = getFirestore();
        const adminDoc = await db.collection('admins').doc(req.admin.uid).get();

        if (!adminDoc.exists) {
            return res.status(404).json({
                error: {
                    message: 'Admin profile not found',
                    code: 'PROFILE_NOT_FOUND'
                }
            });
        }

        const adminData = adminDoc.data();

        res.status(200).json({
            success: true,
            profile: {
                uid: adminData.uid,
                email: adminData.email,
                fullName: adminData.fullName,
                phone: adminData.phone,
                role: adminData.role,
                isActive: adminData.isActive,
                createdAt: adminData.createdAt
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch profile',
                code: 'FETCH_FAILED'
            }
        });
    }
};

module.exports = {
    verifyToken,
    getProfile
};
