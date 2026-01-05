import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

const VehicleDescription = () => {
    return (
        <section className="vdp-description">
            <motion.h2
                className="vdp-section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Description
            </motion.h2>
            <motion.div
                className="vdp-description__content"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <p className="vdp-description__paragraph">
                    Experience the perfect blend of luxury and performance with this BMW M235i xDrive Gran Coupé. Featuring a 2.0-liter TwinPower Turbo 4-cylinder engine producing 301 horsepower, this vehicle delivers exceptional driving dynamics with the confidence of xDrive all-wheel drive.
                </p>
                <p className="vdp-description__paragraph">
                    This M Performance model comes equipped with premium features including Dakota leather upholstery, M Sport Package, adaptive LED headlights, and the latest BMW iDrive 7.0 infotainment system. The Gran Coupé body style offers a perfect balance of sporty aesthetics and practical functionality with four doors and generous rear seating.
                </p>
            </motion.div>

            <div className="vdp-description__downloads">
                <motion.a
                    href="#"
                    className="vdp-description__download-link"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ x: 5, backgroundColor: '#f3f4f6' }}
                >
                    <FileText size={20} className="vdp-description__download-icon" />
                    <span>BMW-M235i-Brochure.pdf</span>
                </motion.a>
                <motion.a
                    href="#"
                    className="vdp-description__download-link"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ x: 5, backgroundColor: '#f3f4f6' }}
                >
                    <FileText size={20} className="vdp-description__download-icon" />
                    <span>Vehicle-History-Report.pdf</span>
                </motion.a>
            </div>
        </section>
    );
};

export default VehicleDescription;
