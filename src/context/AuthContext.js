"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/lib/antd/theme";




const AuthContext = createContext({
    user: null,
    loading: true,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(undefined);
    const [userData, setUserData] = useState(null);
    const fetchUserData = async (user) => {
        try {
            if (!user) return;

            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                console.log(userSnap.data(), "userData");
                setUserData(userSnap.data());
            } else {
                console.log("No user found");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    const logout = () => {
        auth.signOut();
        setUserData(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log(currentUser, "currentUser");

            if (currentUser) {
                await fetchUserData(currentUser);

                const tokenResult = await currentUser.getIdTokenResult();
                const idToken = tokenResult.token;
                localStorage.setItem("token", idToken);
                document.cookie = `firebase-token=${idToken}; path=/; max-age=3600`;
                setRole(tokenResult.claims.role);
            } else {
                setRole(undefined);
                localStorage.removeItem("token");
                document.cookie = "firebase-token=; path=/; max-age=0";
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, role, userData, logout }}>
            <ConfigProvider theme={antdTheme}>
            {children}
            </ConfigProvider>
        </AuthContext.Provider>
    );
}

// Custom hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);