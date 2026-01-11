import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X, CheckCircle } from 'lucide-react';

const ImageUploadStep = ({
    handleImageUpload,
    imagePreviews,
    removeImage,
    featuredImageIndex,
    setFeaturedImage,
    commonFeatures,
    formData,
    handleFeatureToggle
}) => {
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
            key="step5"
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
                <h3 className="add-car-step-title">Images & Features</h3>
                <p className="add-car-step-desc">Visual presentation and equipment list</p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div className="add-car-upload-section" variants={itemVariants}>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="add-car-upload-input"
                        id="image-upload"
                        hidden
                    />
                    <label htmlFor="image-upload" className="add-car-upload-area add-car-upload-label">
                        <div className="add-car-upload-icon-circle">
                            <Upload size={20} />
                        </div>
                        <span className="add-car-upload-text">Click to upload images</span>
                        <span className="add-car-upload-subtext">Product Images (Up to 5) *</span>
                    </label>
                </motion.div>

                {imagePreviews.length > 0 ? (
                    <motion.div className="add-car-image-previews" variants={itemVariants}>
                        <div className="add-car-preview-grid">
                            {imagePreviews.map((preview, index) => (
                                <motion.div
                                    key={index}
                                    className="add-car-preview-item"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <img src={preview.url} alt={`Preview ${index + 1}`} className="add-car-preview-image" />

                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="add-car-remove-btn"
                                        title="Remove Image"
                                    >
                                        <X size={12} />
                                    </button>

                                    {featuredImageIndex === index ? (
                                        <div className="add-car-featured-tag">Default</div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setFeaturedImage(index)}
                                            className="add-car-set-main-btn"
                                        >
                                            Set Main
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div className="add-car-no-images-hint" variants={itemVariants}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--titanium-text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                            No images attached yet. Add up to 5 photos to showcase your vehicle.
                        </p>
                    </motion.div>
                )}

                <motion.div className="add-car-features-section" variants={itemVariants}>
                    <h4 className="add-car-section-subtitle">Key Features</h4>
                    <div className="add-car-features-grid">
                        {commonFeatures.map(feature => (
                            <label key={feature} className={`add-car-feature-chip ${formData.features.includes(feature) ? 'active' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.features.includes(feature)}
                                    onChange={() => handleFeatureToggle(feature)}
                                    hidden
                                />
                                <CheckCircle
                                    size={16}
                                    strokeWidth={formData.features.includes(feature) ? 3 : 2}
                                    color={formData.features.includes(feature) ? "var(--titanium-accent)" : "#cbd5e1"}
                                />
                                {feature}
                            </label>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ImageUploadStep;
