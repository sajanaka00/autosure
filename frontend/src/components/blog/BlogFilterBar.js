import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const BlogFilterBar = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
}) => {
    return (
        <section className="blog-controls-section">
            <motion.div
                className="blog-controls-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="blog-categories">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="blog-search-wrapper">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="blog-search-input"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default BlogFilterBar;
