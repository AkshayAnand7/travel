import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const hasCustomConfig = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForBuildValidation123456",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "rk-travel-hub.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "rk-travel-hub",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "rk-travel-hub.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
}

if (typeof window !== 'undefined' && !hasCustomConfig && process.env.NODE_ENV === 'development') {
  console.info(
    '[Firebase] Using placeholder configuration. To connect to your real Firebase project, set NEXT_PUBLIC_FIREBASE_* variables in .env.local.'
  )
}

// Initialize Firebase (singleton)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app
