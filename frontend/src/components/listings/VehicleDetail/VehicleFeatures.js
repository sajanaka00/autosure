import React from 'react';
import { motion } from 'framer-motion';
import { 
    SeatLine, SeatHeatedLine, SafeShieldLine, Car3Line, ChipLine, CheckLine,
    SparklesLine, SunLine, MapPinLine, SpeakerLine,
    VideoLine, EyeCloseLine, RoadLine, Dashboard3Line, SafeShield2Line,
    DiscLine, LowBeamHeadlightsLine, FrontFogLightsLine, WindLine, RainLine,
    CarplayLine, AndroidLine, BluetoothLine, Key1Line, WifiLine
} from '@mingcute/react';

// Dynamic resolver to match features to rich MingCute icons
const getFeatureIcon = (featureName) => {
    const name = featureName.toLowerCase();
    
    // Interior
    if (name.includes('leather')) return SparklesLine;
    if (name.includes('sunroof')) return SunLine;
    if (name.includes('heated')) return SeatHeatedLine;
    if (name.includes('navigation')) return MapPinLine;
    if (name.includes('audio') || name.includes('sound') || name.includes('speaker')) return SpeakerLine;
    
    // Safety
    if (name.includes('camera')) return VideoLine;
    if (name.includes('blind spot')) return EyeCloseLine;
    if (name.includes('lane')) return RoadLine;
    if (name.includes('cruise')) return Dashboard3Line;
    if (name.includes('brake') || name.includes('assist')) return SafeShield2Line;
    
    // Exterior
    if (name.includes('wheel')) return DiscLine;
    if (name.includes('led') || name.includes('light')) return LowBeamHeadlightsLine;
    if (name.includes('fog')) return FrontFogLightsLine;
    if (name.includes('spoiler')) return WindLine;
    if (name.includes('rain') || name.includes('sensor')) return RainLine;
    
    // Tech
    if (name.includes('apple') || name.includes('carplay')) return CarplayLine;
    if (name.includes('android')) return AndroidLine;
    if (name.includes('bluetooth')) return BluetoothLine;
    if (name.includes('keyless') || name.includes('key')) return Key1Line;
    if (name.includes('wifi') || name.includes('hotspot')) return WifiLine;
    
    // Fallback
    return CheckLine;
};

const FeatureCard = ({ label, icon: Icon, features, index, id }) => (
    <motion.div
        className={`vdp-feature-card-col vdp-feature-cat-${id}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="vdp-card-header">
            <div className="vdp-card-icon">
                <Icon size={28} />
            </div>
            <h3 className="vdp-card-title">{label}</h3>
        </div>

        <ul className="vdp-card-list">
            {features.map((feature, idx) => {
                const FeatureIcon = getFeatureIcon(feature);
                return (
                    <li key={idx} className="vdp-card-list-item">
                        <span className="vdp-item-check">
                            <FeatureIcon size={16} />
                        </span>
                        <span>{feature}</span>
                    </li>
                );
            })}
        </ul>
    </motion.div>
);

const VehicleFeatures = () => {
    const categories = [
        {
            id: 'interior',
            label: "Interior",
            icon: SeatLine,
            features: ["Leather Seats", "Sunroof", "Heated Seats", "Navigation", "Premium Audio"]
        },
        {
            id: 'safety',
            label: "Safety",
            icon: SafeShieldLine,
            features: ["Backup Camera", "Blind Spot", "Lane Departure", "Adaptive Cruise", "Brake Assist"]
        },
        {
            id: 'exterior',
            label: "Exterior",
            icon: Car3Line,
            features: ["Alloy Wheels", "LED Lights", "Fog Lights", "Rear Spoiler", "Rain Sensors"]
        },
        {
            id: 'tech',
            label: "Tech",
            icon: ChipLine,
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
