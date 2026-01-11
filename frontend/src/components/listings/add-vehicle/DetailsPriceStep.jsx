import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';

const DetailsPriceStep = ({ formData, handleInputChange, badgeOptions, setFormData }) => {
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
            key="step4"
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
                <h3 className="add-car-step-title">Details & Pricing</h3>
                <p className="add-car-step-desc">Dimensions, visibility, and market value</p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div className="add-car-form-group full-width" variants={itemVariants}>
                    <label className="add-car-form-label">Vehicle Listing Title *</label>
                    <input
                        type="text"
                        name="title"
                        className="add-car-form-input"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., 2024 BMW M235i xDrive Gran Coupé"
                        required
                    />
                </motion.div>

                <motion.div className="add-car-form-grid" variants={containerVariants}>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Price ($) *</label>
                        <input
                            type="number"
                            name="price"
                            className="add-car-form-input"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="45900"
                            required
                        />
                    </motion.div>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Exterior Color</label>
                        <input
                            type="text"
                            name="color"
                            className="add-car-form-input"
                            value={formData.color}
                            onChange={handleInputChange}
                            placeholder="e.g., Brooklyn Grey"
                        />
                    </motion.div>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Interior Color</label>
                        <input
                            type="text"
                            name="interiorColor"
                            className="add-car-form-input"
                            value={formData.interiorColor}
                            onChange={handleInputChange}
                            placeholder="e.g., Magma Red"
                        />
                    </motion.div>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Down Payment ($) *</label>
                        <input
                            type="number"
                            name="downPayment"
                            className="add-car-form-input"
                            value={formData.downPayment}
                            onChange={handleInputChange}
                            placeholder="0"
                            required
                        />
                    </motion.div>

                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Badge</label>
                        <select
                            name="badge"
                            className="add-car-form-select"
                            value={formData.badge}
                            onChange={(e) => {
                                const selectedBadge = badgeOptions.find(b => b.value === e.target.value);
                                setFormData(prev => ({
                                    ...prev,
                                    badge: e.target.value,
                                    badgeColor: selectedBadge ? selectedBadge.color : 'blue'
                                }));
                            }}
                        >
                            <option value="">No Badge</option>
                            {badgeOptions.map(badge => (
                                <option key={badge.value} value={badge.value}>{badge.value}</option>
                            ))}
                        </select>
                    </motion.div>
                </motion.div>

                <motion.div className="add-car-form-group full-width" variants={itemVariants} style={{ marginTop: '1.5rem' }}>
                    <label className="add-car-form-label">Description *</label>
                    <textarea
                        name="description"
                        className="add-car-form-textarea"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your vehicle's standout features and condition..."
                        required
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default DetailsPriceStep;
