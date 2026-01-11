import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SidebarStepper = ({ steps, activeStep }) => {
    return (
        <div className="titanium-sidebar-stepper">
            <div className="sidebar-stepper-header">
                <span className="sidebar-brand">AUTOSURE</span>
                <h2 className="sidebar-title">List Your Vehicle</h2>
            </div>

            <div className="sidebar-steps-list">
                {steps.map((name, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < activeStep;
                    const isActive = stepNumber === activeStep;
                    const isUpcoming = stepNumber > activeStep;

                    return (
                        <div
                            key={index}
                            className={`sidebar-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
                        >
                            <div className="sidebar-step-node-container">
                                <div className="sidebar-step-node">
                                    {isCompleted ? (
                                        <Check size={14} strokeWidth={3} />
                                    ) : (
                                        <span>{stepNumber}</span>
                                    )}
                                </div>
                                {index < steps.length - 1 && <div className="sidebar-step-line" />}
                            </div>

                            <div className="sidebar-step-content">
                                <span className="sidebar-step-label">{name}</span>
                                {isActive && (
                                    <motion.span
                                        className="sidebar-step-status"
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        Current Progress
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="sidebar-footer">
                <p className="sidebar-help-text">Need help? Contact support</p>
                <div className="sidebar-progress-overview">
                    <div className="progress-percentage">
                        {Math.round(((activeStep - 1) / (steps.length - 1)) * 100)}% Complete
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarStepper;
