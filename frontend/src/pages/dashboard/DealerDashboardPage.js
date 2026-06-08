import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardStats from '../../components/dashboard/DashboardStats';
import DashboardListings from '../../components/dashboard/DashboardListings';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './DealerDashboardPage.css';

export default function DealerDashboardPage() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) setActiveTab(tab);
        else setActiveTab('overview');
    }, [location.search]);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <DashboardStats />
                        <div className="dashboard-content-area">
                            <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
                            <p style={{ color: '#64748b' }}>No recent activity to display.</p>
                        </div>
                    </>
                );
            case 'listings':
                return (
                    <>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>My Listings</h3>
                        <DashboardListings />
                    </>
                );
            default:
                return (
                    <div className="dashboard-content-area">
                        <h3 style={{ marginTop: 0, textTransform: 'capitalize' }}>{activeTab}</h3>
                        <p style={{ color: '#64748b' }}>This section is under construction.</p>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout>
            {renderContent()}
        </DashboardLayout>
    );
}
