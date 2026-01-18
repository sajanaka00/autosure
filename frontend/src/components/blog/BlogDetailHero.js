import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock } from 'lucide-react';
import heroFallback from '../../assets/images/cars/blog-des1.jpg';

const BlogDetailHero = ({ blog }) => {
    const { scrollYProgress } = useScroll();
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.1]);

    return (
        <div className="luxury-hero">
            <motion.div
                className="hero-image-container"
                style={{ scale: heroScale, opacity: heroOpacity }}
            >
                <img
                    src={blog.images.hero || heroFallback}
                    alt={blog.title}
                    onError={(e) => e.target.src = heroFallback}
                />
                <div className="luxury-overlay" />
            </motion.div>

            <div className="hero-text-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <span className="category-label">{blog.category}</span>
                    <h1 className="main-title">{blog.title}</h1>
                    <div className="hero-meta">
                        <div className="meta-user">
                            <div className="avatar-small">{blog.author.name[0]}</div>
                            <span>{blog.author.name}</span>
                        </div>
                        <div className="dot" />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <div className="dot" />
                        <div className="read-time"><Clock size={14} /> {blog.readTime || '5 min read'}</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetailHero;
