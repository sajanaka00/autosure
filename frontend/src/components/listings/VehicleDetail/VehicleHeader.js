import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Bookmark, ArrowLeftRight } from 'lucide-react';

const VehicleHeader = () => {
    return (
        <div className="modern-vdp-header">
            {/* Top Row: Title + Price (Mobile) / Actions */}
            <div className="modern-vdp-header__top">
                <div className="modern-vdp-header__tags">
                    <span className="vdp-tag vdp-tag--primary">New Arrival</span>
                    <span className="vdp-tag vdp-tag--outline">Certified</span>
                </div>

                <div className="modern-vdp-header__actions-block">
                    <div className="modern-vdp-header__cta-group">
                        <button className="modern-vdp-header__icon-btn" title="Share">
                            <Share2 size={18} />
                            <span className="vdp-btn-label">Share</span>
                        </button>
                        <button className="modern-vdp-header__icon-btn" title="Save">
                            <Bookmark size={18} />
                            <span className="vdp-btn-label">Save</span>
                        </button>
                        <button className="modern-vdp-header__icon-btn" title="Compare">
                            <ArrowLeftRight size={18} />
                            <span className="vdp-btn-label">Compare</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="modern-vdp-header__identity">
                <motion.h1
                    className="modern-vdp-header__title"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    BMW M235i xDrive Gran Coupé
                </motion.h1>
                <motion.div
                    className="modern-vdp-header__sub-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="vdp-sub-text">2024</span>
                    <span className="vdp-dot-divider">•</span>
                    <span className="vdp-sub-text">Sedan</span>
                    <span className="vdp-dot-divider">•</span>
                    <span className="vdp-sub-text">2.0L Turbo</span>
                    <span className="vdp-dot-divider">•</span>
                    <span className="vdp-sub-text">AWD</span>
                </motion.div>

                {/* Price Display for Mobile (or if we want it here too) */}
                <div className="modern-vdp-header__price-mobile">
                    <h2>$86,590</h2>
                </div>
            </div>
        </div>
    );
};

export default VehicleHeader;
