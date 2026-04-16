// lib/antd/theme.js

export const antdTheme = {
    token: {
        // Primary color - matches your :root --primary (#2563eb)
        colorPrimary: "#2563eb",

        // Success color
        colorSuccess: "#22c55e",

        // Warning color
        colorWarning: "#f59e0b",

        // Error color - matches your --destructive
        colorError: "#ef4444",

        // Info color - matches your --accent
        colorInfo: "#6366f1",

        // Background colors
        colorBgBase: "#f8fafc",
        colorBgContainer: "#ffffff",

        // Text colors
        colorTextBase: "#0f172a",
        colorTextSecondary: "#64748b",

        // Border colors
        colorBorder: "#e2e8f0",
        colorBorderSecondary: "#f1f5f9",

        // Border radius
        borderRadius: 8,

        // Font
        fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",

        // Size
        fontSize: 14,
    },
    components: {
        Button: {
            borderRadius: 6,
            controlHeight: 36,
        },
        Card: {
            borderRadiusLG: 12,
            boxShadowTertiary: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        },
        Table: {
            borderRadius: 8,
            headerBg: "#f8fafc",
            headerColor: "#0f172a",
            rowHoverBg: "#f1f5f9",
        },
        Modal: {
            borderRadiusLG: 12,
        },
        Tag: {
            borderRadiusSM: 4,
        },
        Statistic: {
            titleFontSize: 14,
            contentFontSize: 28,
        },
        Input: {
            borderRadius: 6,
            controlHeight: 36,
        },
        Select: {
            borderRadius: 6,
            controlHeight: 36,
        },
    },
};