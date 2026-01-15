import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogFeaturedPost = ({ featuredPost, formatDate }) => {
    const navigate = useNavigate();

    if (!featuredPost) return null;

    return (
        <section style={{ maxWidth: '1200px', margin: '0 auto 3rem', padding: '0 2rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="featured-post-card"
                onClick={() => navigate(`/blog/${featuredPost._id}`)}
            >
                <div className="featured-image-wrapper">
                    <img src={featuredPost.image} alt={featuredPost.title} />
                    <div className="featured-overlay" />
                    <div className="featured-badge">Featured Story</div>
                </div>
                <div className="featured-content">
                    <div className="post-meta">
                        <span className="post-category">{featuredPost.category}</span>
                        <span className="post-dot">•</span>
                        <span className="post-date">{formatDate(featuredPost.createdAt)}</span>
                    </div>
                    <h2 className="featured-title">{featuredPost.title}</h2>
                    <p className="featured-excerpt">{featuredPost.excerpt || "Dive into the details of this amazing vehicle and discover what makes it stand out from the competition..."}</p>
                    <div className="featured-footer">
                        <div className="author-info">
                            <div className="author-avatar">{typeof featuredPost.author === 'string' ? featuredPost.author[0] : 'A'}</div>
                            <span>{typeof featuredPost.author === 'object' ? featuredPost.author.name : featuredPost.author}</span>
                        </div>
                        <span className="read-more-link">Read Full Story <ArrowRight size={16} /></span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BlogFeaturedPost;
