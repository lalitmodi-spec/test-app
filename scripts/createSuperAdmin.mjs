import { adminAuth, adminDb } from "../src/lib/firebase/admin.mjs";


 async function createSuperAdmin() {
    const email = "lalit.modi@gmail.com";     // ← CHANGE THIS
    const password = "root@1234";   // ← CHANGE THIS (use strong password)
    const displayName = "Lalit Modi";
   
    try {
        // Check if user already exists
        let userRecord;
        try {
            userRecord = await adminAuth.getUserByEmail(email);
            console.log("Super admin already exists with UID:", userRecord.uid);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                // Create new user
                userRecord = await adminAuth.createUser({
                    email,
                    password,
                    displayName,
                    emailVerified: true,   // Set true for initial super admin
                });
                console.log("New super admin created with UID:", userRecord.uid);
            } else {
                throw error;
            }
        }

        // Set superadmin role + extra custom claims
        await adminAuth.setCustomUserClaims(userRecord.uid, {
            role: "superadmin",
            isSuperAdmin: true,
            eventId: null,           // you can change later
            createdAt: new Date().toISOString(),
        });

        // Force token refresh
        await adminAuth.revokeRefreshTokens(userRecord.uid);

        // === Save extra details in Firestore `users` collection ===
        const userData = {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            role: "superadmin",
            isSuperAdmin: true,
            status: "active",
            disabled: false,
            createdAt: new Date(),
            lastUpdated: new Date(),
            // Add any custom fields you want
            // eventId: "main-event-001",
            // department: "IT",
        };

        await adminDb.collection("users").doc(userRecord.uid).set(userData, { merge: true });

        console.log("✅ Super Admin created successfully!");
        console.log("Email:", email);
        console.log("Role: superadmin");
        console.log("Firestore document added in users collection.");

    } catch (error) {
        console.error("❌ Error creating super admin:", error.message);
    }
}

// Run the script
createSuperAdmin();