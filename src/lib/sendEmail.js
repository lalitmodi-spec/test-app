import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);



export async function sendEmail({
    to,
    subject,
    html,
    react,
    from = process.env.FROM_EMAIL || "Admin Panel <no-reply@yourdomain.com>",
}) {
    try {
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            ...(html && { html }),
            ...(react && { react }),
        });

        if (error) {
            console.error("Resend Error:", error);
            throw new Error(error.message);
        }

        console.log("Email sent successfully:", data?.id);
        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error(error.message || "Failed to send email");
    }
}