import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ReviewStep = ({ formData, imagePreviews, featuredImageIndex }) => {
    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <motion.div
            key="step6"
            className="add-car-form-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="add-car-step-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h3 className="add-car-step-title">Review & Submit</h3>
                <p className="add-car-step-desc">Confirm your vehicle details before listing</p>
            </motion.div>

            <motion.div
                className="add-car-review-summary"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div className="review-summary-card" variants={itemVariants}>
                    <div className="review-summary-header">
                        <h4>{formData.title || "Untitled Vehicle"}</h4>
                        <div className="review-summary-price">
                            ${parseFloat(formData.price || 0).toLocaleString()}
                        </div>
                    </div>

                    <div className="review-summary-content">
                        <div className="review-data-group">
                            <h6>Identity</h6>
                            <p>{formData.year} {formData.make} {formData.model}</p>
                            <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Reg: {formData.vehicleNumber}</p>
                        </div>
                        <div className="review-data-group">
                            <h6>Condition</h6>
                            <p>{formData.condition} • {formData.mileage} miles</p>
                        </div>
                        <div className="review-data-group">
                            <h6>Mechanical</h6>
                            <p>{formData.engineSize} • {formData.transmission}</p>
                        </div>
                        <div className="review-data-group">
                            <h6>Performance</h6>
                            <p>{formData.horsepower} HP • {formData.torque} lb-ft</p>
                        </div>
                        <div className="review-data-group">
                            <h6>Aesthetics</h6>
                            <p>Ext: {formData.exteriorColor} • Int: {formData.interiorColor}</p>
                        </div>
                        <div className="review-data-group">
                            <h6>Market</h6>
                            <p>Badge: {formData.badge || "None"}</p>
                        </div>
                    </div>
                </motion.div>

                {imagePreviews.length > 0 && (
                    <motion.div className="review-summary-card" variants={itemVariants}>
                        <div className="review-summary-header">
                            <h4>Attached Photos</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--titanium-text-muted)' }}>
                                {imagePreviews.length} Image(s)
                            </span>
                        </div>
                        <div className="review-summary-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                            {imagePreviews.map((img, i) => (
                                <div key={i} className="add-car-preview-item">
                                    <img src={img.url} alt="Review" className="add-car-preview-image" />
                                    {i === featuredImageIndex && <div className="add-car-featured-tag">Default</div>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ReviewStep;
