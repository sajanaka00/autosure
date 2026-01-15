import React from 'react';
import { motion } from 'framer-motion';

const BlogHero = () => {
    return (
        <section className="blog-hero-section">
            <div className="blog-hero-bg-accent" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="blog-hero-header"
            >
                <span className="blog-hero-subtitle">Our Journal</span>
                <h1 className="blog-hero-title">Discover the <br /><span className="highlight-text">Automotive World</span></h1>
                <p className="blog-hero-desc">
                    Insights, reviews, and stories from the cutting edge of modern transportation.
                </p>
            </motion.div>
        </section>
    );
};

export default BlogHero;
