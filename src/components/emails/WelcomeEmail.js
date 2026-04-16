import * as React from "react";
import { Html, Head, Body, Container, Text, Button, Hr } from "@react-email/components";


export default function WelcomeEmail({ name, role }) {
    return (
        <Html>
            <Head />
            <Body style={{ backgroundColor: "#f8fafc", fontFamily: "sans-serif" }}>
                <Container style={{ margin: "40px auto", padding: "20px", maxWidth: "600px" }}>
                    <Text style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a" }}>
                        Welcome to Admin Panel, {name}!
                    </Text>

                    <Text style={{ fontSize: "16px", color: "#64748b", marginTop: "16px" }}>
                        Your account has been created successfully with the role: <strong>{role}</strong>
                    </Text>

                    <Button
                        href="https://youradminpanel.com/login"
                        style={{
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            marginTop: "24px",
                            textDecoration: "none",
                        }}
                    >
                        Login Now
                    </Button>

                    <Hr style={{ margin: "32px 0" }} />

                    <Text style={{ fontSize: "14px", color: "#94a3b8" }}>
                        If you have any questions, reply to this email.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}