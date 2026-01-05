import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, ShieldCheck, Star } from 'lucide-react';
import Avatar1 from '../../../assets/images/avatars/avatar1.jpg';

const VehicleDealerCard = () => {
    return (
        <motion.div
            className="vdp-dealer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            {/* Price Preview for Sticker Effect */}
            <div className="vdp-dealer-price-header">
                <span className="vdp-price-label">Our Price</span>
                <h2 className="vdp-price-amount">$ 86,590</h2>
            </div>

            <div className="vdp-dealer-header">
                <div className="vdp-dealer-avatar-row">
                    <img src={Avatar1} alt="Dealer" className="vdp-dealer-avatar" />
                    <div className="vdp-dealer-details">
                        <h3 className="vdp-dealer-name">BMW of Manhattan</h3>
                        <div className="vdp-dealer-rating">
                            <Star size={14} fill="#fbbf24" color="#fbbf24" />
                            <span>4.8 (120 Reviews)</span>
                        </div>
                    </div>
                </div>

                <div className="vdp-dealer-meta">
                    <div className="vdp-meta-item">
                        <MapPin size={16} className="text-gray-400" />
                        <span>Manhattan, NY</span>
                    </div>
                    <div className="vdp-meta-item">
                        <ShieldCheck size={16} className="text-blue-500" />
                        <span className="text-blue-600 font-medium">Verified Dealer</span>
                    </div>
                </div>
            </div>

            <div className="vdp-dealer-actions">
                <button className="vdp-btn vdp-btn-primary">
                    <MessageSquare size={18} />
                    Message Dealer
                </button>
                <button className="vdp-btn vdp-btn-outline">
                    <Phone size={18} />
                    (212) 555-0123
                </button>
            </div>

            <p className="vdp-finance-note">
                Estimated payments: <strong>$ 1,250/mo</strong>
            </p>
        </motion.div>
    );
};

export default VehicleDealerCard;
