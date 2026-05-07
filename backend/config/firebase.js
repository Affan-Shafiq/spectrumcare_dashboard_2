const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

let db = null;

const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {
            let credential;

            if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
                // Production / Docker / Railway: credentials passed as JSON string env var
                const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
                credential = admin.credential.cert(serviceAccount);
                console.log('🔑 Firebase: using FIREBASE_SERVICE_ACCOUNT_JSON env var');
            } else {
                // Local development: fall back to serviceAccountKey.json file
                const serviceAccountPath = path.join(
                    __dirname, '..', process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json'
                );
                const serviceAccount = require(serviceAccountPath);
                credential = admin.credential.cert(serviceAccount);
                console.log('🔑 Firebase: using local serviceAccountKey.json file');
            }

            admin.initializeApp({ credential });
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
