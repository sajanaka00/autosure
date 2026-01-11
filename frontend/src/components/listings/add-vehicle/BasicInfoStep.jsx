import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const BasicInfoStep = ({ formData, handleInputChange, makeOptions, conditionOptions, bodyTypeOptions, categories }) => {
    const currentYear = new Date().getFullYear();

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
            key="step1"
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
                <h3 className="add-car-step-title">Basic Information</h3>
                <p className="add-car-step-desc">Establish the core identity of the vehicle</p>
            </motion.div>

            <motion.div
                className="add-car-form-grid"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Make *</label>
                    <select
                        name="make"
                        className="add-car-form-select"
                        value={formData.make}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Make</option>
                        {makeOptions.map(make => (
                            <option key={make} value={make}>{make}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Model *</label>
                    <input
                        type="text"
                        name="model"
                        className="add-car-form-input"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="e.g., M235i xDrive Gran Coupé"
                        required
                    />
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Year *</label>
                    <input
                        type="number"
                        name="year"
                        className="add-car-form-input"
                        min="1900"
                        max={currentYear + 1}
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                    />
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Condition *</label>
                    <select
                        name="condition"
                        className="add-car-form-select"
                        value={formData.condition}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Condition</option>
                        {conditionOptions.map(condition => (
                            <option key={condition} value={condition}>{condition}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Body Type *</label>
                    <select
                        name="bodyType"
                        className="add-car-form-select"
                        value={formData.bodyType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Body Type</option>
                        {bodyTypeOptions.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Category</label>
                    <select
                        name="category"
                        className="add-car-form-select"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Vehicle Number *</label>
                    <input
                        type="text"
                        name="vehicleNumber"
                        className="add-car-form-input"
                        value={formData.vehicleNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., KJ-4088"
                        required
                    />
                </motion.div>

                <motion.div className="add-car-form-group" variants={itemVariants}>
                    <label className="add-car-form-label">Number of Owners *</label>
                    <input
                        type="number"
                        name="numberOfOwners"
                        className="add-car-form-input"
                        min="1"
                        value={formData.numberOfOwners}
                        onChange={handleInputChange}
                        required
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default BasicInfoStep;
