import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";
import { verifyAdmin } from "@/lib/auth";   // Reuse your existing auth helper

export async function POST(req) {
    // 1. Verify only admin can send emails
    const auth = await verifyAdmin(req);
    if (!auth.success) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const { to, subject, html, template, templateProps } = await req.json();

        if (!to || !subject) {
            return NextResponse.json({ error: "to and subject are required" }, { status: 400 });
        }

        let emailHtml = html;

        // If using React Email template
        if (template && templateProps) {
            const EmailComponent = (await import(`@/components/emails/${template}`)).default;
            // You can render React Email to HTML if needed, but Resend handles `react` prop directly
            return await sendEmail({
                to,
                subject,
                react: <EmailComponent {...templateProps} />,
            });
        }

        // Or send raw HTML
        const result = await sendEmail({
            to,
            subject,
            html: emailHtml,
        });

        return NextResponse.json({ success: true, message: "Email sent successfully", id: result.data?.id });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}