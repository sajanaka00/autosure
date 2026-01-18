import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

const BlogFeatures = ({ keyFeatures, requirements }) => {
    const hasKeyFeatures = keyFeatures && (keyFeatures.leftColumn?.length > 0 || keyFeatures.rightColumn?.length > 0);
    const hasRequirements = requirements && requirements.length > 0;

    if (!hasKeyFeatures && !hasRequirements) return null;

    return (
        <div className="blog-features-section">
            {hasKeyFeatures && (
                <div className="features-block">
                    <h3 className="section-subtitle">Key Specifications & Features</h3>
                    <div className="features-grid">
                        <div className="features-column">
                            {keyFeatures.leftColumn?.map((feature, idx) => (
                                <motion.div
                                    key={`l-${idx}`}
                                    className="feature-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <span className="feature-icon"><Check size={16} /></span>
                                    <span className="feature-text">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                        <div className="features-column">
                            {keyFeatures.rightColumn?.map((feature, idx) => (
                                <motion.div
                                    key={`r-${idx}`}
                                    className="feature-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <span className="feature-icon"><Check size={16} /></span>
                                    <span className="feature-text">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {hasRequirements && (
                <div className="requirements-block">
                    <h3 className="section-subtitle">Ownership Requirements</h3>
                    <div className="requirements-list">
                        {requirements.map((req, idx) => (
                            <motion.div
                                key={idx}
                                className="requirement-item"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                            >
                                <AlertCircle size={20} className="req-icon" />
                                <p>{req}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogFeatures;
