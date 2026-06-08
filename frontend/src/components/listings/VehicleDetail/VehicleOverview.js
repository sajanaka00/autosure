import React from 'react';
import { motion } from 'framer-motion';
import { 
    Car3Line, Dashboard2Line, GasStationLine, CalendarLine, 
    Settings6Line, LightningLine, CarDoorLine, PaletteLine 
} from '@mingcute/react';

const InfoItem = ({ icon: Icon, label, value, index }) => (
    <motion.div
        className="vdp-info-item"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
    >
        <div className="vdp-info-icon-wrapper">
            <Icon size={24} />
        </div>
        <div className="vdp-info-content">
            <span className="vdp-info-label">{label}</span>
            <span className="vdp-info-value">{value}</span>
        </div>
    </motion.div>
);

const VehicleOverview = () => {
    const stats = [
        { icon: Car3Line, label: "Body Type", value: "Sedan" },
        { icon: Dashboard2Line, label: "Mileage", value: "850 mi" },
        { icon: GasStationLine, label: "Fuel Type", value: "Premium" },
        { icon: CalendarLine, label: "Year", value: "2024" },
        { icon: Settings6Line, label: "Transmission", value: "Automatic" },
        { icon: LightningLine, label: "Engine", value: "2.0L Turbo" },
        { icon: CarDoorLine, label: "Doors", value: "4 Doors" },
        { icon: PaletteLine, label: "Ext. Color", value: "Brooklyn Grey" },
    ];

    return (
        <section className="vdp-overview">
            <h3 className="vdp-section-title">Car Overview</h3>
            <div className="vdp-overview-grid">
                {stats.map((item, idx) => (
                    <InfoItem key={idx} {...item} index={idx} />
                ))}
            </div>
        </section>
    );
};

export default VehicleOverview;
