import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Armchair, Car } from 'lucide-react';

const FeatureCard = ({ label, icon: Icon, features, index }) => (
    <motion.div
        className="vdp-feature-card-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="vdp-card-header">
            <div className="vdp-card-icon">
                <Icon size={24} />
            </div>
            <h3 className="vdp-card-title">{label}</h3>
        </div>

        <ul className="vdp-card-list">
            {features.map((feature, idx) => (
                <li key={idx} className="vdp-card-list-item">
                    <Check size={14} className="vdp-item-check" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

const VehicleFeatures = () => {
    const categories = [
        {
            id: 'interior',
            label: "Interior",
            icon: Armchair,
            features: ["Leather Seats", "Sunroof", "Heated Seats", "Navigation", "Premium Audio"]
        },
        {
            id: 'safety',
            label: "Safety",
            icon: Shield,
            features: ["Backup Camera", "Blind Spot", "Lane Departure", "Adaptive Cruise", "Brake Assist"]
        },
        {
            id: 'exterior',
            label: "Exterior",
            icon: Car,
            features: ["Alloy Wheels", "LED Lights", "Fog Lights", "Rear Spoiler", "Rain Sensors"]
        },
        {
            id: 'tech',
            label: "Tech",
            icon: Zap,
            features: ["Apple CarPlay", "Android Auto", "Bluetooth", "Keyless Entry", "WiFi Hotspot"]
        }
    ];

    return (
        <div className="vdp-features-section">
            <h2 className="vdp-section-title">Vehicle Highlights</h2>
            <div className="vdp-features-row-grid">
                {categories.map((cat, idx) => (
                    <FeatureCard key={cat.id} {...cat} index={idx} />
                ))}
            </div>
        </div>
    );
};

export default VehicleFeatures;
