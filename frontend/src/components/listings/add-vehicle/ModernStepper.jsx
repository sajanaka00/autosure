import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const ModernStepper = ({ steps, activeStep }) => {
    return (
        <div className="modern-stepper-container">
            <div className="modern-stepper-track">
                {steps.map((name, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < activeStep;
                    const isActive = stepNumber === activeStep;

                    return (
                        <React.Fragment key={index}>
                            <div className={`modern-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                                <div className="node-wrapper">
                                    <div className="node-outer">
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    className="node-pulse"
                                                    layoutId="node-pulse"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1.2, opacity: 0.15 }}
                                                    exit={{ scale: 1.5, opacity: 0 }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    style={{ position: 'absolute', top: '-4px', left: '-4px', right: '-4px', bottom: '-4px', borderRadius: '50%', background: '#405ff2', zIndex: 1 }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        <motion.div
                                            className="node-inner"
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                backgroundColor: isCompleted ? '#405ff2' : isActive ? '#405ff2' : 'white',
                                                borderColor: (isCompleted || isActive) ? '#405ff2' : '#e2e8f0',
                                                color: (isCompleted || isActive) ? '#ffffff' : '#94a3b8'
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700',
                                                fontFamily: 'Outfit, sans-serif',
                                                fontSize: '0.85rem',
                                                zIndex: 5,
                                                position: 'relative',
                                                border: '2px solid',
                                                boxShadow: isActive ? '0 0 15px rgba(64, 95, 242, 0.3)' : 'none'
                                            }}
                                        >
                                            {isCompleted ? <Check size={16} /> : <span>{stepNumber}</span>}
                                        </motion.div>
                                    </div>

                                    <div className="node-label-container">
                                        <span className="node-label">{name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="node-underline"
                                                className="node-label-underline"
                                                style={{ height: '2px', background: '#405ff2', borderRadius: '10px', marginTop: '2px' }}
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="modern-stepper-spacer">
                                    <div className="modern-stepper-line">
                                        <motion.div
                                            className="line-fill"
                                            initial={{ width: "0%" }}
                                            animate={{ width: isCompleted ? "100%" : "0%" }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                        />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default ModernStepper;
