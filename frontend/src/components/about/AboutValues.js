import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Star, Heart, Award, Users } from 'lucide-react';

const AboutValues = () => {
    const values = [
        { icon: <Shield size={28} />, title: "100% Verified", desc: "Every vehicle undergoes a rigorous 200-point inspection process." },
        { icon: <Zap size={28} />, title: "Instant Process", desc: "Digital-first buying experience that respects your time." },
        { icon: <Star size={28} />, title: "Premium Only", desc: "We only source the top 1% of vehicles available in the market." },
        { icon: <Heart size={28} />, title: "Customer First", desc: "Our 7-day money-back guarantee allows you to buy with confidence." },
        { icon: <Award size={28} />, title: "Transparent Pricing", desc: "No hidden fees. The price you see is the price you pay." },
        { icon: <Users size={28} />, title: "Expert Support", desc: "Concierge-level support available 24/7 for all our clients." }
    ];

    return (
        <section className="au-values-section">
            <div className="au-container">
                <div className="au-section-header">
                    <h2>Why Choose AutoSure?</h2>
                    <p>We believe in elevating every aspect of your car buying journey.</p>
                </div>
                <div className="au-values-grid">
                    {values.map((val, i) => (
                        <motion.div
                            key={i}
                            className="au-value-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="au-icon-box">{val.icon}</div>
                            <h3>{val.title}</h3>
                            <p>{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutValues;
