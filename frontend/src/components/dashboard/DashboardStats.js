import React from 'react';
import { TrendingUp, Users, Car, MessageSquare, DollarSign } from 'lucide-react';

export default function DashboardStats() {
    const stats = [
        {
            id: 1,
            label: 'Total Listings',
            value: '24',
            trend: '+12%',
            isUp: true,
            icon: <Car size={24} color="#3b82f6" />,
            bg: '#eff6ff'
        },
        {
            id: 2,
            label: 'Total Views',
            value: '12.5k',
            trend: '+4.3%',
            isUp: true,
            icon: <Users size={24} color="#8b5cf6" />,
            bg: '#f5f3ff'
        },
        {
            id: 3,
            label: 'Messages',
            value: '18',
            trend: '-2.1%',
            isUp: false,
            icon: <MessageSquare size={24} color="#f59e0b" />,
            bg: '#fffbeb'
        },
        {
            id: 4,
            label: 'Revenue Est.',
            value: '$240k',
            trend: '+18.2%',
            isUp: true,
            icon: <DollarSign size={24} color="#10b981" />,
            bg: '#ecfdf5'
        }
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat) => (
                <div key={stat.id} className="stat-card">
                    <div className="stat-info">
                        <h3>{stat.label}</h3>
                        <p className="value">{stat.value}</p>
                        <span className={`trend ${stat.isUp ? 'up' : 'down'}`}>
                            {stat.isUp ? <TrendingUp size={14} /> : <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} />}
                            {stat.trend} from last month
                        </span>
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: stat.bg }}>
                        {stat.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
