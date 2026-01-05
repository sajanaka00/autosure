import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Fuel, Zap, Settings, Timer, Ruler } from 'lucide-react';

const SpecCard = ({ label, value, subtext, icon: Icon, index }) => (
    <motion.div
        className="vdp-visual-spec-card"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="vdp-spec-card-icon">
            <Icon size={20} />
        </div>
        <div className="vdp-spec-card-content">
            <span className="vdp-spec-card-label">{label}</span>
            <span className="vdp-spec-card-value">{value}</span>
            {subtext && <span className="vdp-spec-card-sub">{subtext}</span>}
        </div>
    </motion.div>
);

const VehicleSpecs = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Key highlights showcased visually
    const highlights = [
        { label: "Horsepower", value: "301", subtext: "HP @ 5000", icon: Zap },
        { label: "0-60 mph", value: "4.7s", subtext: "Acceleration", icon: Timer },
        { label: "Engine", value: "2.0L", subtext: "Turbo I-4", icon: Settings },
        { label: "MPG", value: "24/33", subtext: "City/Hwy", icon: Fuel },
        { label: "Drive", value: "AWD", subtext: "System", icon: Gauge },
        { label: "Length", value: "178.5\"", subtext: "Compact", icon: Ruler },
    ];

    const detailedSpecs = {
        "Engine & Performance": [
            { label: "Engine Type", value: "2.0L TwinPower Turbo Inline 4-Cylinder" },
            { label: "Horsepower", value: "301 hp @ 5000-6250 rpm" },
            { label: "Torque", value: "331 lb-ft @ 1750-4500 rpm" },
            { label: "Transmission", value: "8-Speed Sport Automatic" },
            { label: "Drivetrain", value: "xDrive All-Wheel Drive" },
            { label: "0-60 mph", value: "4.7 seconds" },
            { label: "Top Speed", value: "155 mph (electronically limited)" }
        ],
        "Dimensions & Weight": [
            { label: "Length", value: "178.5 inches" },
            { label: "Width", value: "70.9 inches" },
            { label: "Height", value: "55.9 inches" },
            { label: "Wheelbase", value: "105.1 inches" },
            { label: "Curb Weight", value: "3,605 lbs" },
            { label: "Cargo Capacity", value: "15.1 cu ft" }
        ],
        "Fuel & Economy": [
            { label: "Fuel Tank Capacity", value: "13.2 gallons" },
            { label: "City / Hwy MPG", value: "23 / 33 mpg" },
            { label: "Fuel Type", value: "Premium Unleaded" }
        ],
        "Warranty": [
            { label: "Basic", value: "4 Years / 50,000 Miles" },
            { label: "Drivetrain", value: "4 Years / 50,000 Miles" },
            { label: "Rust", value: "12 Years / Unlimited Miles" },
            { label: "Roadside Assistance", value: "4 Years / Unlimited Miles" }
        ]
    };

    return (
        <div className="vdp-spec-section">
            <h2 className="vdp-section-title">Technical Specifications</h2>
            <div className="vdp-visual-specs-grid">
                {highlights.map((item, idx) => (
                    <SpecCard key={idx} {...item} index={idx} />
                ))}
            </div>

            <div className="vdp-specs-footer">
                <button
                    className="vdp-view-full-specs-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    View Full Technical Details
                </button>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="vdp-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <motion.div
                        className="vdp-modal-content"
                        onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div className="vdp-modal-header">
                            <h3>Full Technical Specifications</h3>
                            <button className="vdp-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <div className="vdp-modal-body">
                            {Object.entries(detailedSpecs).map(([category, items]) => (
                                <div key={category} className="vdp-spec-category">
                                    <h4>{category}</h4>
                                    <div className="vdp-spec-table">
                                        {items.map((spec, i) => (
                                            <div key={i} className="vdp-spec-row">
                                                <span className="vdp-spec-label">{spec.label}</span>
                                                <span className="vdp-spec-value">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default VehicleSpecs;
