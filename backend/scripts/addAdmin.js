const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Initialize Firebase Admin SDK
const { initializeFirebase } = require('../config/firebase');
initializeFirebase();

/**
 * Creates an admin user in Firebase Authentication and Firestore
 * @param {string} email - Admin email address
 * @param {string} password - Admin password (min 6 characters)
 * @param {string} fullName - Admin's full name
 * @param {string} phone - Phone number in E.164 format (e.g., +923001234567)
 * @param {string} role - Admin role (default: 'admin', can be 'superadmin')
 */
const createAdmin = async (email, password, fullName, phone, role = 'admin') => {
    try {
        // Step 1: Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: fullName,
            phoneNumber: phone, // Must be in E.164 format: +923001234567
        });

        console.log(`✅ User created in Firebase Auth with UID: ${userRecord.uid}`);

        // Step 2: Add to admins collection in Firestore
        await admin.firestore().collection('admins').doc(userRecord.uid).set({
            uid: userRecord.uid,
            email: email,
            fullName: fullName,
            phone: phone,
            role: role,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            isActive: true
        });

        console.log(`✅ Successfully added ${email} as ${role} to admins collection`);
        console.log(`📋 Admin details:
      - UID: ${userRecord.uid}
      - Email: ${email}
      - Full Name: ${fullName}
      - Phone: ${phone}
      - Role: ${role}
    `);

        console.log('\n🎉 Admin creation completed successfully!');
        console.log('You can now use these credentials to log in to the admin dashboard.\n');

        return userRecord.uid;

    } catch (error) {
        console.error('❌ Error creating admin:', error.message);

        // Handle specific errors
        if (error.code === 'auth/email-already-exists') {
            console.error('⚠️  This email is already registered');
        } else if (error.code === 'auth/invalid-phone-number') {
            console.error('⚠️  Phone number must be in E.164 format (e.g., +923001234567)');
        } else if (error.code === 'auth/weak-password') {
            console.error('⚠️  Password should be at least 6 characters');
        } else if (error.code === 'auth/invalid-email') {
            console.error('⚠️  Invalid email address format');
        }

        process.exit(1);
    } finally {
        // Exit the process after completion
        process.exit(0);
    }
};

// ============================================================================
// USAGE: Replace with actual admin details before running
// ============================================================================
// Run this script with: node scripts/addAdmin.js
// ============================================================================

createAdmin(
    'raohq8@gmail.com',           // email
    '123456',              // password (min 6 characters)
    'Muhammad Hammad',                      // fullName
    '+923258510690',                   // phone (E.164 format: country code + number)
    'admin'                       // role (optional, defaults to 'admin')
);
