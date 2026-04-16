"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";      

export default function Home() {
  const router = useRouter();
  const { user, loading, role, userData } = useAuth();

  useEffect(() => {
    if (!loading && !userData) {
      router.push("/auth/login");   // Redirect if not logged in
    }
  }, [userData, loading, router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!userData) {
    return null; // or loading spinner
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold"></h1>
      <p>Your Role: <strong>{role || "No role assigned"}</strong></p>

      {/* Your admin panel content */}
    </div>
  );
}
