import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';

const FormNavigation = ({ activeStep, totalSteps, prevStep, nextStep, loading, isValid }) => {
    const isLastStep = activeStep === totalSteps;

    return (
        <div className="premium-nav-wrapper">
            <div className="premium-nav-container">
                <div className="premium-nav-left">
                    {activeStep > 1 && (
                        <motion.button
                            whileHover={{ background: '#f1f5f9' }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={prevStep}
                            className="premium-nav-btn secondary"
                        >
                            <ArrowLeft size={18} />
                            <span>Previous Step</span>
                        </motion.button>
                    )}
                </div>

                <div className="premium-nav-right">
                    <motion.button
                        whileHover={isValid && !loading ? { scale: 1.02, y: -1 } : {}}
                        whileTap={isValid && !loading ? { scale: 0.98 } : {}}
                        type={isLastStep ? "submit" : "button"}
                        onClick={isLastStep ? undefined : nextStep}
                        disabled={!isValid || loading}
                        className={`premium-nav-btn primary ${isLastStep ? 'submit' : ''} ${!isValid ? 'disabled' : ''}`}
                    >
                        {loading ? (
                            <span className="loading-spinner-mini" />
                        ) : (
                            <>
                                <span>{isLastStep ? 'Complete Listing' : 'Next Step'}</span>
                                {isLastStep ? <Check size={18} /> : <ChevronRight size={18} />}
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default FormNavigation;
