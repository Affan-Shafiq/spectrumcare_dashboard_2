const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

let db = null;

const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {
            let credential;

            if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
                // Production / Docker / Railway
                console.log('🔑 Firebase: reading FIREBASE_SERVICE_ACCOUNT_JSON env var...');
                let serviceAccount;
                try {
                    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
                } catch (parseErr) {
                    throw new Error(
                        'FIREBASE_SERVICE_ACCOUNT_JSON is set but is not valid JSON. ' +
                        'Make sure you pasted the entire JSON file as a single-line string. ' +
                        'Parse error: ' + parseErr.message
                    );
                }
                credential = admin.credential.cert(serviceAccount);
                console.log('🔑 Firebase: credential loaded from env var ✅');
            } else {
                // Local development fallback — key file must exist
                const keyPath = path.join(
                    __dirname, '..', './serviceAccountKey.json'
                );
                console.log('🔑 Firebase: no FIREBASE_SERVICE_ACCOUNT_JSON set, trying file:', keyPath);
                const fs = require('fs');
                if (!fs.existsSync(keyPath)) {
                    throw new Error(
                        'Firebase credentials not found.\n' +
                        '  • In production/Railway: set the FIREBASE_SERVICE_ACCOUNT_JSON environment variable.\n' +
                        '  • In local dev: place serviceAccountKey.json in the backend/ folder.'
                    );
                }
                const serviceAccount = require(keyPath);
                credential = admin.credential.cert(serviceAccount);
                console.log('🔑 Firebase: credential loaded from file ✅');
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
