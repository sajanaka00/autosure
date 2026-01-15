import React from 'react';
import { motion } from 'framer-motion';

const BlogNewsletter = () => {
    return (
        <section className="newsletter-section">
            <motion.div
                className="newsletter-container"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="newsletter-content">
                    <h2>Subscribe to our <span className="text-gradient-white">Newsletter</span></h2>
                    <p>Get the latest automotive news, reviews, and exclusive offers delivering directly to your inbox.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email address" />
                        <button>Subscribe</button>
                    </div>
                    <p className="newsletter-disclaimer">No spam, unsubscribe at any time.</p>
                </div>
            </motion.div>
        </section>
    );
};

export default BlogNewsletter;
