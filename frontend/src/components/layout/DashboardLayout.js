import React, { useState } from 'react';
import { LayoutDashboard, Car, ShoppingBag, MessageSquare, Settings, LogOut, Plus } from 'lucide-react';
import { tokenManager } from '../../utils/tokenManager';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../pages/dashboard/DealerDashboardPage.css';

export default function DashboardLayout({ children, title, subtitle, actions }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = tokenManager.getUser();

    const handleLogout = () => {
        tokenManager.removeToken();
        tokenManager.removeUser();
        navigate('/login');
    };

    const navItems = [
        { id: '', label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dealer-dashboard' },
        { id: 'listings', label: 'My Listings', icon: <Car size={20} />, path: '/dealer-dashboard?tab=listings' },
        { id: 'sales', label: 'Sales', icon: <ShoppingBag size={20} />, path: '/dealer-dashboard?tab=sales' },
        { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} />, path: '/dealer-dashboard?tab=messages' },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/dealer-dashboard?tab=settings' },
    ];

    // Determine active tab based on query param or text
    const currentTab = new URLSearchParams(location.search).get('tab') || '';

    return (
        <div className="dealer-dashboard-container">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                    <Car size={32} color="#3b82f6" />
                    <span>Portal</span>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`sidebar-item ${currentTab === item.id ? 'active' : ''}`}
                            onClick={() => {
                                if (item.path.includes('?')) {
                                    navigate(item.path);
                                } else {
                                    navigate(item.path);
                                }
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile-mini">
                        <div className="user-avatar">
                            {user?.firstName ? user.firstName[0] : 'D'}
                        </div>
                        <div className="user-info">
                            <h4>{user?.firstName || 'Dealer'}</h4>
                            <p>{user?.role || 'Admin'}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="sidebar-item" style={{ marginTop: '1rem', color: '#ef4444' }}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-title">
                        <h1>{title || `Welcome back, ${user?.firstName || 'Partner'}`}</h1>
                        <p>{subtitle || "Here's what's happening with your store today."}</p>
                    </div>
                    <div className="header-actions">
                        {actions || (
                            <button className="action-btn btn-primary" onClick={() => navigate('/vehicles/add')}>
                                <Plus size={20} />
                                Add New Listing
                            </button>
                        )}
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
