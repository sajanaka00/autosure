import React from 'react';
import { motion } from 'framer-motion';

const AboutStats = () => {
    const stats = [
        { number: "45+", label: "Years of Legacy" },
        { number: "15K", label: "Verified Sales" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "30+", label: "Countries Served" }
    ];

    return (
        <section className="au-stats-row-section">
            <div className="au-container">
                <div className="au-stats-clean-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="au-stat-clean-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="au-stat-clean-num">{stat.number}</div>
                            <div className="au-stat-clean-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutStats;
