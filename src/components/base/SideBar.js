// app/components/SideBar.jsx (Optional - if you want to keep separate)
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Menu, Typography, Space, Button, Tooltip } from 'antd';
import {
    DashboardOutlined, TeamOutlined, UserSwitchOutlined,
    ApartmentOutlined, SettingOutlined, BankOutlined,
    TransactionOutlined, MoneyCollectOutlined, CrownOutlined,
    AppstoreOutlined, UserOutlined, SafetyCertificateOutlined,
    LockOutlined, ProfileOutlined, QuestionCircleOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

const SideBar = ({ collapsed, setCollapsed, isMobile }) => {
    const pathname = usePathname();

    const menuItems = [
        { key: '/dashboard', icon: <DashboardOutlined />, label: <Link href="/dashboard">Dashboard</Link> },
        { key: '/members', icon: <TeamOutlined />, label: <Link href="/members">Members</Link> },
        { key: '/agents', icon: <UserSwitchOutlined />, label: <Link href="/agents">Agents</Link> },
        { key: '/programs', icon: <ApartmentOutlined />, label: <Link href="/programs">Programs</Link> },
        { key: '/transactions', icon: <TransactionOutlined />, label: <Link href="/transactions">Transactions</Link> },
        { key: '/expenses', icon: <MoneyCollectOutlined />, label: <Link href="/expenses">Expenses</Link> },
        {
            key: '/masters',
            icon: <AppstoreOutlined />,
            label: 'Masters',
            children: [
                { key: '/master/users', icon: <UserOutlined />, label: <Link href="/master/users">Users</Link> },
                { key: '/master/roles', icon: <SafetyCertificateOutlined />, label: <Link href="/master/roles">Roles</Link> },
                { key: '/master/permissions', icon: <LockOutlined />, label: <Link href="/master/permissions">Permissions</Link> },
            ]
        },
        {
            key: '/reports',
            icon: <ProfileOutlined />,
            label: 'Reports',
            children: [
                { key: '/reports/financial', icon: <BankOutlined />, label: <Link href="/reports/financial">Financial</Link> },
                { key: '/reports/members', icon: <TeamOutlined />, label: <Link href="/reports/members">Members</Link> },
            ]
        },
        { key: '/settings', icon: <SettingOutlined />, label: <Link href="/settings">Settings</Link> },
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={260}
            theme="light"
            style={{
                background: 'var(--bg-sidebar)',
                boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
                position: isMobile ? 'absolute' : 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 100,
            }}
        >
            <div style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '0' : '0 24px',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <Space>
                    <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <CrownOutlined style={{ color: '#fff', fontSize: 18 }} />
                    </div>
                    {!collapsed && (
                        <div>
                            <Text strong>Admin Panel</Text>
                            <Text type="secondary" style={{ fontSize: 10, display: 'block' }}>Management</Text>
                        </div>
                    )}
                </Space>
            </div>

            <Menu
                mode="inline"
                selectedKeys={[pathname]}
                defaultOpenKeys={['/masters', '/reports']}
                items={menuItems}
                style={{ flex: 1, borderRight: 0, background: 'transparent', marginTop: 8 }}
            />

            <div style={{ padding: 16, borderTop: '1px solid var(--border-color)' }}>
                <Tooltip title="Help">
                    <Button type="text" icon={<QuestionCircleOutlined />} block>
                        {!collapsed && 'Need Help?'}
                    </Button>
                </Tooltip>
            </div>
        </Sider>
    );
};

export default SideBar;