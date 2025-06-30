import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import BlogForm from './BlogForm';
import '../../../styles/blog.css';

// Default fallback images
import car1Image from '../../../assets/images/cars/car1.png';
import car2Image from '../../../assets/images/cars/car2.png';
import car3Image from '../../../assets/images/cars/car3.png';
import car4Image from '../../../assets/images/cars/car4.png';
import car5Image from '../../../assets/images/cars/car5.png';
import car6Image from '../../../assets/images/cars/car6.png';

const BlogPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null); // Added tag filter state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0
  });

  const defaultImages = [car1Image, car2Image, car3Image, car4Image, car5Image, car6Image];
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  const categories = [
    'All', 'Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems',
    'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology'
  ];

  // Fetch blogs from API
  const fetchBlogs = async (page = 1, category = 'All', tag = null) => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/blogs?page=${page}&limit=6`;

      if (category !== 'All') url += `&category=${encodeURIComponent(category)}`;
      if (tag) url += `&tag=${encodeURIComponent(tag)}`; // Added tag filter

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blogs');

      const data = await response.json();
      if (data.success) {
        const blogsWithImages = data.data.map((blog, index) => ({
          ...blog,
          image: blog.heroImage || defaultImages[index % defaultImages.length]
        }));

        setBlogPosts(blogsWithImages);
        setPagination(data.pagination || {
          currentPage: page,
          totalPages: Math.ceil(blogsWithImages.length / 6),
          totalBlogs: blogsWithImages.length
        });
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);

      // Fallback data
      const fallbackData = [
        {
          _id: '1', category: "Sound", image: car1Image, title: "2024 BMW ALPINA XB7 with exclusive details",
          author: "Admin", createdAt: "2023-11-22T00:00:00.000Z", excerpt: "Luxury SUV engineering at its peak.", tags: ['luxury', 'sound']
        },
        {
          _id: '2', category: "Accessories", image: car2Image, title: "BMW X6 M50i exceeds expectations",
          author: "Admin", createdAt: "2023-11-22T00:00:00.000Z", excerpt: "Elegance meets performance.", tags: ['accessories']
        },
        {
          _id: '3', category: "Technology", image: car3Image, title: "Driver Assistance Systems",
          author: "Tech Expert", createdAt: "2023-11-20T00:00:00.000Z", excerpt: "Latest safety tech.", tags: ['technology', 'safety']
        }
      ];

      const filteredData = category === 'All' ? fallbackData :
        fallbackData.filter(blog => blog.category === category);

      const finalFiltered = tag ? filteredData.filter(b => b.tags?.includes(tag)) : filteredData;

      setBlogPosts(finalFiltered);
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(finalFiltered.length / 6),
        totalBlogs: finalFiltered.length
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    fetchBlogs(1, selectedCategory, selectedTag);
  }, [selectedCategory, selectedTag]); // Add selectedTag to useEffect dependencies

  const handleBlogClick = (blogId) => navigate(`/blog/${blogId}`);
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchBlogs(page, selectedCategory, selectedTag);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const { currentPage, totalPages } = pagination;
    const buttons = [];

    if (currentPage > 1) {
      buttons.push(<button key="prev" className="pagination-btn pagination-nav" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>);
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) endPage = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) startPage = Math.max(1, totalPages - 4);

    if (startPage > 1) {
      buttons.push(<button key={1} className="pagination-btn" onClick={() => handlePageChange(1)}>1</button>);
      if (startPage > 2) buttons.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      buttons.push(<button key={totalPages} className="pagination-btn" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>);
    }

    if (currentPage < totalPages) {
      buttons.push(<button key="next" className="pagination-btn pagination-nav" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>);
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="blog-container">
        <Navbar />
        <div className="blog-loading">
          <div className="loading-spinner"></div>
          <p>Loading blogs...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-container">
      <Navbar />

      <div className="blog-header">
        <div className="blog-header-content">
          <div className="breadcrumb">
            <span className="breadcrumb-home">Home</span>
            <span className="breadcrumb-separator">/</span>
            <span>Blog</span>
          </div>
          <div className="header-flex">
            <div>
              <h1 className="header-title">Latest Automotive News & Reviews</h1>
              <p className="header-subtitle">Stay updated with the latest car reviews, automotive news, and insights</p>
              {error && (
                <p className="error-message" style={{ color: '#ff4444' }}>
                  API Error: {error}. Showing fallback data.
                </p>
              )}
              {selectedTag && (
                <p className="selected-tag">
                  Filtering by tag: <strong>{selectedTag}</strong>{' '}
                  <button onClick={() => setSelectedTag(null)} className="clear-tag-btn">Clear</button>
                </p>
              )}
            </div>
            <button className="add-post-btn" onClick={() => setShowModal(true)}>+ Add New Post</button>
          </div>
        </div>
      </div>

      <div className="blog-main">
        <div className="category-filters">
          <div className="category-filters-container">
            {categories.map((category) => (
              <button key={category} className={`category-tag ${selectedCategory === category ? 'active' : ''}`} onClick={() => handleCategoryFilter(category)}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="results-info">
          <p>
            {selectedCategory === 'All'
              ? `Showing ${blogPosts.length} of ${pagination.totalBlogs} posts`
              : `Showing ${blogPosts.length} posts in "${selectedCategory}"`
            }
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post._id} className="blog-card" onClick={() => handleBlogClick(post._id)} style={{ cursor: 'pointer' }}>
              <div className="blog-image-container">
                <img src={post.image || post.heroImage} alt={post.title} className="blog-image" />
                <div className="blog-category-tag">{post.category}</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-author">{post.author}</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>

                {/* Tag rendering */}
                <div className="blog-tags">
                  {post.tags?.map(tag => (
                    <button key={tag} className="tag-btn" onClick={(e) => {
                      e.stopPropagation(); // prevent blog card click
                      handleTagClick(tag);
                    }}>
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="no-results">
            <h3>No posts found</h3>
            <p>Try a different category or tag.</p>
          </div>
        )}

        {pagination.totalPages > 1 && blogPosts.length > 0 && (
          <div className="pagination">
            <div className="pagination-controls">{renderPaginationButtons()}</div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Blog Post</h2>
              <button onClick={() => setShowModal(false)} className="modal-close-btn">X</button>
            </div>
            <div className="modal-body">
              <BlogForm onClose={() => setShowModal(false)} onCreated={() => fetchBlogs(1, selectedCategory)} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;
