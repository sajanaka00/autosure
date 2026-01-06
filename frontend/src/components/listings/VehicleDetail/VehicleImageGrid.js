import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, X } from 'lucide-react';
import BMW1 from '../../../assets/images/cars/vdp1.jpg';
import BMW2 from '../../../assets/images/cars/vdp2.jpg';
import BMW3 from '../../../assets/images/cars/vdp3.jpg';
import BMW4 from '../../../assets/images/cars/vdp4.jpg';
import BMW5 from '../../../assets/images/cars/vdp5.jpg';
// import BMW6 from '../../../assets/images/cars/audi6.jpg';

const VehicleImageGrid = () => {
    // Determine the images to show
    const images = [BMW1, BMW2, BMW3, BMW4, BMW5];

    // For the "Bento" layout, we want 1 Main + 4 Side images
    const mainImage = images[0];
    const sideImages = images.slice(1, 6);

    return (
        <div className="vdp-hero-grid">
            {/* Main Large Image */}
            <motion.div
                className="vdp-hero-main"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.005 }}
            >
                <img src={mainImage} alt="Main Vehicle View" className="vdp-img-cover" />

                <div className="vdp-hero-badge">Featured</div>
            </motion.div>

            {/* Side Grid (Desktop Only mostly, or stacked on mobile) */}
            <div className="vdp-hero-side">
                {sideImages.map((img, index) => {
                    // Logic: If on the last grid item (index 3), and we have more total images than the 5 displayed (1 main + 4 side),
                    // Show the overlay count. OR if we just want to show gallery access.
                    // Common pattern: Last item shows "+(Remaining + 1)" or similar.
                    // Let's use: Total - 4 (The 4 clean ones are Main + 3 Side).
                    const remainingCount = images.length - 4;
                    const showOverlay = index === 3 && remainingCount > 1;

                    return (
                        <motion.div
                            key={index}
                            className="vdp-hero-item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img src={img} alt={`Vehicle View ${index + 2}`} className="vdp-img-cover" />

                            {showOverlay && (
                                <div className="vdp-more-overlay">
                                    <span className="vdp-more-count">+{remainingCount}</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default VehicleImageGrid;
