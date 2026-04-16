import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin.mjs";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req) {
        const auth = await verifyAdmin(req);
        if (!auth.success) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }
    try {
        const { uid, disabled } = await req.json(); // disabled: true = disable, false = enable

        if (!uid || typeof disabled !== "boolean") {
            return NextResponse.json(
                { error: "UID and disabled (true/false) are required" },
                { status: 400 }
            );
        }

        await adminAuth.updateUser(uid, { disabled });

        const status = disabled ? "disabled" : "enabled";

        return NextResponse.json({
            success: true,
            message: `User account has been ${status} successfully`,
            uid,
            disabled,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}