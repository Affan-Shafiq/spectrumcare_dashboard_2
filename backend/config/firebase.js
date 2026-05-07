const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccountPath = path.join(__dirname, '..', process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json');

let db = null;

const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {
            const serviceAccount = require(serviceAccountPath);

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });

            db = admin.firestore();
            console.log('✅ Firebase Admin SDK initialized successfully');
        } else {
            db = admin.firestore();
        }

        return db;
    } catch (error) {
        console.error('❌ Error initializing Firebase Admin SDK:', error.message);
        throw error;
    }
};

const getFirestore = () => {
    if (!db) {
        return initializeFirebase();
    }
    return db;
};

module.exports = {
    initializeFirebase,
    getFirestore,
    admin
};
