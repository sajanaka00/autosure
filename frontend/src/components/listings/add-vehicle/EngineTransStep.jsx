import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

const EngineTransStep = ({ formData, handleInputChange, transmissionOptions, fuelTypeOptions, driveTypeOptions }) => {
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
            key="step2"
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
                <h3 className="add-car-step-title">Engine & Transmission</h3>
                <p className="add-car-step-desc">Technical specifications and drivetrain details</p>
            </motion.div>

            <motion.div
                className="add-car-form-grid"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Engine Size *</label>
                    <input
                        type="text"
                        name="engineSize"
                        className="add-car-form-input"
                        value={formData.engineSize}
                        onChange={handleInputChange}
                        placeholder="e.g., 2.0L Turbo I4"
                        required
                    />
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Transmission *</label>
                    <select
                        name="transmission"
                        className="add-car-form-select"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Transmission</option>
                        {transmissionOptions.map(trans => (
                            <option key={trans} value={trans}>{trans}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Fuel Type *</label>
                    <select
                        name="fuelType"
                        className="add-car-form-select"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Fuel Type</option>
                        {fuelTypeOptions.map(fuel => (
                            <option key={fuel} value={fuel}>{fuel}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Drive Type</label>
                    <select
                        name="driveType"
                        className="add-car-form-select"
                        value={formData.driveType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Drive Type</option>
                        {driveTypeOptions.map(drive => (
                            <option key={drive} value={drive}>{drive}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Mileage *</label>
                    <input
                        type="text"
                        name="mileage"
                        className="add-car-form-input"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        placeholder="e.g., 8,500 mi"
                        required
                    />
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Seating Capacity</label>
                    <input
                        type="number"
                        name="seatingCapacity"
                        className="add-car-form-input"
                        value={formData.seatingCapacity}
                        onChange={handleInputChange}
                        placeholder="e.g., 5"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default EngineTransStep;
