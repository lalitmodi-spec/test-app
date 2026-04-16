import { adminAuth } from "@/lib/firebase/admin.mjs";
import { NextResponse } from "next/server";


export async function middleware(request) {
    const token = request.cookies.get("firebase-token")?.value; // or read from Authorization header
    console.log(token,"token")
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
        const decoded = await adminAuth.verifyIdToken(token);
        const role = decoded.role;

        const pathname = request.nextUrl.pathname;

        // Role-based protection
        if (role !== "superadmin" && role !== "admin") {
            return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
        }

        // You can add more rules...
        return NextResponse.next();
    } catch (error) {
        console.log(error,"error")
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: ["/"],
};
