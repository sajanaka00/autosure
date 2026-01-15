import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogList = ({ blogPosts, loading, formatDate }) => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="blog-grid-section">
            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                </div>
            ) : (
                <motion.div
                    className="blog-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {blogPosts.map((post) => (
                        <motion.article
                            key={post._id}
                            className="blog-card"
                            variants={itemVariants}
                            onClick={() => navigate(`/blog/${post._id}`)}
                            whileHover={{ y: -8 }}
                        >
                            <div className="card-image-container">
                                <img src={post.image} alt={post.title} loading="lazy" />
                                <div className="card-category-badge">{post.category}</div>
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <Clock size={14} />
                                    <span>{post.readTime}</span>
                                    <span className="meta-divider">•</span>
                                    <span>{formatDate(post.createdAt)}</span>
                                </div>
                                <h3 className="card-title">{post.title}</h3>
                                <p className="card-excerpt">
                                    {post.excerpt ? post.excerpt.substring(0, 100) + '...' : 'Click to read more about this fascinating topic in the automotive world...'}
                                </p>
                                <div className="card-footer">
                                    <div className="card-author">
                                        <User size={14} />
                                        <span>{typeof post.author === 'object' ? post.author.name : post.author}</span>
                                    </div>
                                    <button className="card-action-btn">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            )}

            {!loading && blogPosts.length === 0 && (
                <div className="no-results">
                    <h3>No articles found</h3>
                    <p>Try adjusting your search or category filter.</p>
                </div>
            )}
        </section>
    );
};

export default BlogList;
