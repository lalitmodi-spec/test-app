// app/components/TopBar.jsx (Optional - if you want to keep separate)
"use client";

import React from 'react';
import { Layout, Space, Avatar, Dropdown, Badge, Button, Typography } from 'antd';
import {
    BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined,
    SunOutlined, MoonOutlined, SearchOutlined
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const { Header } = Layout;
const { Text } = Typography;

const TopBar = ({ isDarkMode, toggleTheme, onMenuClick }) => {
    const userMenuItems = [
        { key: 'profile', icon: <UserOutlined />, label: 'My Profile' },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
        { key: 'divider', type: 'divider' },
        { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
    ];
  const { userData }=useAuth()
    return (
        <Header style={{
            background: 'var(--bg-header)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
            <div>
                <Text type="secondary">Welcome back,</Text>
                <Text strong style={{ marginLeft: 4 }}>{userData?.displayName || 'User'}</Text>
            </div>



            <Space size="middle">
                <Button type="text" icon={<SearchOutlined />} />
                <Button type="text" icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} />
                <Badge count={3}>
                    <Button type="text" icon={<BellOutlined />} />
                </Badge>
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                    <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', background: '#667eea' }} />
                </Dropdown>
            </Space>
        </Header>
    );
};

export default TopBar;