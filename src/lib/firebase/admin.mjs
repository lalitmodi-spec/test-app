import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

const serviceAccount = {
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY?.replace(/\\n/g, "\n"),
}
console.log(process.env.FIREBASE_PROJECT_ID,"process.env.FIREBASE_PROJECT_ID")
const adminApp =
    getApps().length === 0
        ? initializeApp({
            credential: cert(serviceAccount),
        })
        : getApps()[0]

const adminAuth = getAuth(adminApp)
const adminDb = getFirestore(adminApp)

export { adminAuth, adminDb }


