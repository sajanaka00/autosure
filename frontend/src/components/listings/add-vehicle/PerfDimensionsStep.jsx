import React from 'react';
import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';

const PerfDimensionsStep = ({ formData, handleInputChange }) => {
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
            key="step3"
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
                <h3 className="add-car-step-title">Performance & Warranty</h3>
                <p className="add-car-step-desc">Advanced technical data and coverage</p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div variants={itemVariants} className="add-car-form-section-title">Performance Metrics</motion.div>
                <motion.div className="add-car-form-grid" variants={containerVariants}>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Horsepower (HP)</label>
                        <input
                            type="text"
                            name="horsepower"
                            className="add-car-form-input"
                            value={formData.horsepower}
                            onChange={handleInputChange}
                            placeholder="e.g., 301"
                        />
                    </motion.div>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Torque (lb-ft)</label>
                        <input
                            type="text"
                            name="torque"
                            className="add-car-form-input"
                            value={formData.torque}
                            onChange={handleInputChange}
                            placeholder="e.g., 331"
                        />
                    </motion.div>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">0-60 mph (sec)</label>
                        <input
                            type="text"
                            name="acceleration060"
                            className="add-car-form-input"
                            value={formData.acceleration060}
                            onChange={handleInputChange}
                            placeholder="e.g., 4.7"
                        />
                    </motion.div>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Top Speed (mph)</label>
                        <input
                            type="text"
                            name="topSpeed"
                            className="add-car-form-input"
                            value={formData.topSpeed}
                            onChange={handleInputChange}
                            placeholder="e.g., 155"
                        />
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="add-car-form-section-title">Warranty Coverage</motion.div>
                <motion.div className="add-car-form-grid" variants={containerVariants}>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Basic Warranty</label>
                        <input
                            type="text"
                            name="warrantyBasic"
                            className="add-car-form-input"
                            value={formData.warrantyBasic}
                            onChange={handleInputChange}
                            placeholder="e.g., 4 Years / 50,000 Miles"
                        />
                    </motion.div>
                    <motion.div className="add-car-form-group" variants={itemVariants}>
                        <label className="add-car-form-label">Drivetrain Warranty</label>
                        <input
                            type="text"
                            name="warrantyDrivetrain"
                            className="add-car-form-input"
                            value={formData.warrantyDrivetrain}
                            onChange={handleInputChange}
                            placeholder="e.g., 4 Years / 50,000 Miles"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default PerfDimensionsStep;
