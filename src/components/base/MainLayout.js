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

    // ⭐ hide layout for auth pages
    const isAuthPage = pathname.startsWith("/auth");

    if (isAuthPage) {
        return <>{children}</>;
    }

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

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {!isMobile && (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width={260}
                    theme="light"
                >
                    <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 24px" }}>
                        <Space>
                            <CrownOutlined style={{ fontSize: 22 }} />
                            {!collapsed && <Text strong>Admin Panel</Text>}
                        </Space>
                    </div>

                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={["/masters", "/reports"]}
                        items={menuItems}
                    />
                </Sider>
            )}

            <Drawer
                placement="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                closable={false}
                width={260}
            >
                <Menu mode="inline" selectedKeys={[pathname]} items={menuItems} />
            </Drawer>

            <Layout
                style={{
                    marginLeft: !isMobile ? (collapsed ? 80 : 260) : 0,
                    transition: "all 0.2s",
                }}
            >
                <Header
                    style={{
                        padding: "0 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#fff",
                    }}
                >
                    <div>
                        {isMobile && (
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setMobileOpen(true)}
                            />
                        )}

                        <Text style={{ marginLeft: 10 }}>
                            Welcome back, {userData?.displayName || "User"}
                        </Text>
                    </div>

                    <Space>
                        <Tooltip title="Search">
                            <Button type="text" icon={<SearchOutlined />} />
                        </Tooltip>

                        <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
                            <Button
                                type="text"
                                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                                onClick={toggleTheme}
                            />
                        </Tooltip>

                        <Badge count={3}>
                            <Button type="text" icon={<BellOutlined />} />
                        </Badge>

                        <Dropdown
                            menu={{
                                items: userMenuItems,
                                onClick: handleUserMenuClick,
                            }}
                        >
                            <Space>
                                <Avatar icon={<UserOutlined />} />
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>

                <Content
                    style={{
                        margin: 24,
                        padding: 24,
                        background: "#fff",
                        borderRadius: 12,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;