"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Layout,
    Menu,
    Avatar,
    Dropdown,
    Badge,
    Space,
    Typography,
    Button,
    Drawer,
    Tooltip,
    Modal,
    message,
} from "antd";
import {
    DashboardOutlined,
    TeamOutlined,
    UserSwitchOutlined,
    ApartmentOutlined,
    SettingOutlined,
    BankOutlined,
    TransactionOutlined,
    MoneyCollectOutlined,
    MenuOutlined,
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
    SunOutlined,
    MoonOutlined,
    SearchOutlined,
    ProfileOutlined,
    CrownOutlined,
    SafetyCertificateOutlined,
    LockOutlined,
    KeyOutlined,
    AppstoreOutlined,
    DownOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";

import { useAuth } from "@/context/AuthContext";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const pathname = usePathname();
    const { userData, logout } = useAuth();

    // ✅ Move all hooks BEFORE any conditional returns
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setCollapsed(true);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const isDark = savedTheme === "dark";

        setIsDarkMode(isDark);

        if (isDark) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, []);

    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;

        setIsDarkMode(newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");

        if (newDarkMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    };

    const menuItems = [
        {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
        },
        {
            key: "/members",
            icon: <TeamOutlined />,
            label: <Link href="/members">Members</Link>,
        },
        {
            key: "/agents",
            icon: <UserSwitchOutlined />,
            label: <Link href="/agents">Agents</Link>,
        },
        {
            key: "/programs",
            icon: <ApartmentOutlined />,
            label: <Link href="/programs">Programs</Link>,
        },
        {
            key: "/transactions",
            icon: <TransactionOutlined />,
            label: <Link href="/transactions">Transactions</Link>,
        },
        {
            key: "/expenses",
            icon: <MoneyCollectOutlined />,
            label: <Link href="/expenses">Expenses</Link>,
        },
        {
            key: "/masters",
            icon: <AppstoreOutlined />,
            label: "Masters",
            children: [
                {
                    key: "/master/users",
                    icon: <UserOutlined />,
                    label: <Link href="/master/users">Users</Link>,
                },
                {
                    key: "/master/roles",
                    icon: <SafetyCertificateOutlined />,
                    label: <Link href="/master/roles">Roles</Link>,
                },
                {
                    key: "/master/permissions",
                    icon: <LockOutlined />,
                    label: <Link href="/master/permissions">Permissions</Link>,
                },
                {
                    key: "/master/settings",
                    icon: <SettingOutlined />,
                    label: <Link href="/master/settings">System Settings</Link>,
                },
            ],
        },
        {
            key: "/reports",
            icon: <ProfileOutlined />,
            label: "Reports",
            children: [
                {
                    key: "/reports/financial",
                    icon: <BankOutlined />,
                    label: <Link href="/reports/financial">Financial Reports</Link>,
                },
                {
                    key: "/reports/members",
                    icon: <TeamOutlined />,
                    label: <Link href="/reports/members">Member Reports</Link>,
                },
                {
                    key: "/reports/agents",
                    icon: <UserSwitchOutlined />,
                    label: <Link href="/reports/agents">Agent Reports</Link>,
                },
            ],
        },
        {
            key: "/settings",
            icon: <SettingOutlined />,
            label: <Link href="/settings">Settings</Link>,
        },
    ];

    const userMenuItems = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "My Profile",
        },
        {
            key: "security",
            icon: <KeyOutlined />,
            label: "Security",
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            danger: true,
        },
    ];

    const handleUserMenuClick = ({ key }) => {
        if (key === "logout") {
            Modal.confirm({
                title: "Logout",
                content: "Are you sure you want to logout?",
                onOk: () => {
                    logout();
                    message.success("Logged out successfully");
                },
            });
        }
    };

    // ✅ Now check auth pages AFTER all hooks
    const isAuthPage = pathname?.startsWith("/auth");
    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {!isMobile && (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width={260}
                    theme="light"
                    style={{
                        background: "var(--bg-sidebar)",
                        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 100,
                    }}
                >
                    <div
                        style={{
                            height: 64,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: collapsed ? "center" : "flex-start",
                            padding: collapsed ? "0" : "0 24px",
                            borderBottom: "1px solid var(--border-color)",
                            background: "var(--bg-sidebar)",
                        }}
                    >
                        <Space>
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CrownOutlined style={{ color: "#fff", fontSize: 18 }} />
                            </div>
                            {!collapsed && (
                                <div>
                                    <Text strong style={{ color: "var(--text-primary)", fontSize: 16 }}>
                                        Admin Panel
                                    </Text>
                                    <Text
                                        type="secondary"
                                        style={{ fontSize: 10, display: "block" }}
                                    >
                                        Management System
                                    </Text>
                                </div>
                            )}
                        </Space>
                    </div>

                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={["/masters", "/reports"]}
                        items={menuItems}
                        style={{
                            flex: 1,
                            borderRight: 0,
                            background: "transparent",
                            marginTop: 8,
                        }}
                    />

                    <div
                        style={{
                            padding: 16,
                            borderTop: "1px solid var(--border-color)",
                        }}
                    >
                        <Tooltip title="Help">
                            <Button
                                type="text"
                                icon={<QuestionCircleOutlined />}
                                block
                                style={{ textAlign: "left" }}
                            >
                                {!collapsed && "Need Help?"}
                            </Button>
                        </Tooltip>
                    </div>
                </Sider>
            )}

            <Drawer
                placement="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                closable={false}
                width={260}
                styles={{ body: { padding: 0 } }}
            >
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Space>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CrownOutlined style={{ color: "#fff", fontSize: 18 }} />
                        </div>
                        <Text strong>Admin Panel</Text>
                    </Space>
                </div>
                <Menu mode="inline" selectedKeys={[pathname]} items={menuItems} />
            </Drawer>

            <Layout
                style={{
                    marginLeft: !isMobile ? (collapsed ? 80 : 260) : 0,
                    transition: "all 0.2s",
                    background: "var(--bg-page)",
                }}
            >
                <Header
                    style={{
                        background: "var(--bg-header)",
                        padding: "0 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid var(--border-color)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                        position: "sticky",
                        top: 0,
                        zIndex: 99,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        {isMobile && (
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setMobileOpen(true)}
                                style={{ fontSize: 20 }}
                            />
                        )}

                        <div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Welcome back,
                            </Text>
                            <Text
                                strong
                                style={{ color: "var(--text-primary)", fontSize: 14, marginLeft: 4 }}
                            >
                                {userData?.displayName || "Admin User"}
                            </Text>
                        </div>
                    </div>

                    <Space size="middle">
                        <Tooltip title="Search">
                            <Button type="text" icon={<SearchOutlined />} />
                        </Tooltip>

                        {/* <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
                            <Button
                                type="text"
                                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                                onClick={toggleTheme}
                            />
                        </Tooltip> */}

                        <Dropdown
                            menu={{
                                items: userMenuItems,
                                onClick: handleUserMenuClick,
                            }}
                            trigger={["click"]}
                        >
                            <Badge count={3} size="small">
                                <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} />
                            </Badge>
                        </Dropdown>

                        <Dropdown
                            menu={{
                                items: userMenuItems,
                                onClick: handleUserMenuClick,
                            }}
                            trigger={["click"]}
                        >
                            <Space style={{ cursor: "pointer" }}>
                                <Avatar
                                    size={36}
                                    icon={<UserOutlined />}
                                    style={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    }}
                                />
                                {!isMobile && (
                                    <>
                                        <div style={{ lineHeight: 1.2 }}>
                                            <Text
                                                strong
                                                style={{ color: "var(--text-primary)", fontSize: 13 }}
                                            >
                                                {userData?.displayName || "John Doe"}
                                            </Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: 11 }}>
                                                {userData?.role || "Super Admin"}
                                            </Text>
                                        </div>
                                        <DownOutlined
                                            style={{ fontSize: 12, color: "var(--text-secondary)" }}
                                        />
                                    </>
                                )}
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>

                <Content
                    style={{
                        margin: 24,
                        padding: 24,
                        background: "var(--bg-content)",
                        borderRadius: 12,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>

            {/* Global Styles */}
            <style jsx global>{`
                :root {
                    --bg-page: #f5f7fa;
                    --bg-sidebar: #ffffff;
                    --bg-header: #ffffff;
                    --bg-content: #ffffff;
                    --text-primary: #1f2937;
                    --text-secondary: #6b7280;
                    --border-color: #e5e7eb;
                    --bg-hover: #f3f4f6;
                }

                body.dark-theme {
                    --bg-page: #0f172a;
                    --bg-sidebar: #1e293b;
                    --bg-header: #1e293b;
                    --bg-content: #1e293b;
                    --text-primary: #f1f5f9;
                    --text-secondary: #94a3b8;
                    --border-color: #334155;
                    --bg-hover: #334155;
                }

                body {
                    margin: 0;
                    padding: 0;
                    background: var(--bg-page);
                    transition: all 0.3s ease;
                }

                .ant-menu {
                    background: transparent !important;
                }

                .ant-menu-item {
                    margin: 4px 8px !important;
                    border-radius: 8px !important;
                }

                .ant-menu-item-selected {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                }

                .ant-menu-item-selected a {
                    color: #fff !important;
                }

                .ant-menu-item:hover {
                    background: var(--bg-hover) !important;
                }

                .ant-layout-header {
                    line-height: inherit !important;
                }

                /* Scrollbar Styling */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: var(--border-color);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </Layout>
    );
};

export default MainLayout;