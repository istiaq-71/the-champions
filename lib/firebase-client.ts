// Firebase Client SDK initialization for client-side operations
// Optional - only loads if firebase is installed and configured
'use client'

let auth: any = null
let storage: any = null

// Only try to load Firebase Client if environment variables are set
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  try {
    // @ts-ignore - firebase may not be installed
    const { initializeApp, getApps } = require('firebase/app')
    // @ts-ignore
    const { getAuth } = require('firebase/auth')
    // @ts-ignore
    const { getStorage } = require('firebase/storage')

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }

    let app
    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }
    auth = getAuth(app)
    storage = getStorage(app)
  } catch (error) {
    // Firebase client not installed or not properly configured
    // This is fine - the app will work without it
    console.warn('Firebase Client not available.')
  }
}

export { auth, storage }

