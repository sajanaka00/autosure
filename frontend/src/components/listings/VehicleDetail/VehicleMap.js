import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

const VehicleMap = () => {
    const MAP_CONFIG = {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.7503476847757!2d-73.98194228459467!3d40.76592997932637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1651341947324!5m2!1sen!2sus",
        width: "100%",
        height: "100%",
        style: { border: 0 },
        allowFullScreen: "",
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade"
    };

    return (
        <div className="vdp-location-section">
            <h2 className="vdp-section-title">Location</h2>
            <div className="vdp-address-row">
                <div className="vdp-address-text">555 West 57th Street, New York, NY 10019</div>
                <motion.div
                    className="vdp-directions-link"
                    whileHover={{ x: 5 }}
                >
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Get Directions</span>
                    <Navigation size={14} style={{ marginLeft: '6px' }} />
                </motion.div>
            </div>
            <motion.div
                className="vdp-map-container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--vdp-border)' }}
            >
                <iframe {...MAP_CONFIG} title="BMW Dealership Location Map" />
            </motion.div>
        </div>
    );
};

export default VehicleMap;
