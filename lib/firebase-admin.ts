// Firebase Admin SDK initialization for server-side operations
// Optional - only loads if firebase-admin is installed and configured

let adminAuth: any = null
let adminStorage: any = null

// Only try to load Firebase Admin if environment variables are set
if (process.env.FIREBASE_PROJECT_ID) {
  try {
    // Use dynamic require to avoid build errors if firebase-admin is not installed
    // @ts-ignore - firebase-admin may not be installed
    const admin = require('firebase-admin')
    
    if (admin && (!admin.apps || admin.apps.length === 0)) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      })
    }

    if (admin) {
      adminAuth = admin.auth()
      adminStorage = admin.storage()
    }
  } catch (error) {
    // Firebase admin not installed or not properly configured
    // This is fine - the app will work without it
    // Silently fail - Firebase is optional
  }
}

export { adminAuth, adminStorage }
