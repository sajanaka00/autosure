import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AboutHero = () => {
    return (
        <section className="au-hero-contact-style">
            <div className="au-container">
                <motion.div
                    className="au-hero-content-centered"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="au-hero-pill">EST. 1985</span>
                    <h1>
                        We Don't Sell Cars.<br />
                        We Sell <span className="highlight-text">Dreams <Sparkles size={42} strokeWidth={2} style={{ display: 'inline', marginBottom: -4, fill: '#2563eb', fillOpacity: 0.2 }} /></span>
                    </h1>
                    <p>
                        Experience the pinnacle of automotive engineering.
                        AutoSure isn't just a dealership; it's a gateway to the extraordinary.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;
