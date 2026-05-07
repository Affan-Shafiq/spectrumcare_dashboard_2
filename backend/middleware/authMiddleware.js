const { admin, getFirestore } = require('../config/firebase');

/**
 * Middleware to verify Firebase Auth token and check admin status
 */
const verifyAdmin = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: {
                    message: 'No authorization token provided',
                    code: 'NO_TOKEN'
                }
            });
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // Check if user exists in admins collection
        const db = getFirestore();
        const adminDoc = await db.collection('admins').doc(uid).get();

        if (!adminDoc.exists) {
            return res.status(403).json({
                error: {
                    message: 'User is not authorized as admin',
                    code: 'NOT_ADMIN'
                }
            });
        }

        const adminData = adminDoc.data();

        // Check if admin account is active
        if (!adminData.isActive) {
            return res.status(403).json({
                error: {
                    message: 'Admin account is inactive',
                    code: 'INACTIVE_ACCOUNT'
                }
            });
        }

        // Attach admin data to request object
        req.admin = {
            uid: uid,
            email: decodedToken.email,
            ...adminData
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);

        // Handle specific Firebase errors
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({
                error: {
                    message: 'Token has expired',
                    code: 'TOKEN_EXPIRED'
                }
            });
        } else if (error.code === 'auth/argument-error') {
            return res.status(401).json({
                error: {
                    message: 'Invalid token format',
                    code: 'INVALID_TOKEN'
                }
            });
        }

        return res.status(401).json({
            error: {
                message: 'Authentication failed',
                code: 'AUTH_FAILED'
            }
        });
    }
};

module.exports = { verifyAdmin };
