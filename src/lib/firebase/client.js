import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

if (typeof window !== "undefined") {

    // 🔹 Enable debug token for localhost
    if (process.env.NODE_ENV === "development") {
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
    }

    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        ),
        isTokenAutoRefreshEnabled: true,
    })
}

export default app