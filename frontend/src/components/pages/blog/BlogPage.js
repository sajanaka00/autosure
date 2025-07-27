import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import '../../../styles/blog.css';

// Default fallback images
import car1Image from '../../../assets/images/cars/bmw.jpg';
import car2Image from '../../../assets/images/cars/car1.jpg';
import car3Image from '../../../assets/images/cars/car3.png';
import car4Image from '../../../assets/images/cars/car4.png';
import car5Image from '../../../assets/images/cars/car5.png';
import car6Image from '../../../assets/images/cars/car6.png';

// Reusable Breadcrumb Component
const Breadcrumb = () => (
  <div className="breadcrumb">
    <span className="breadcrumb-home">Home</span>
    <span className="breadcrumb-separator">/</span>
    <span>Blog</span>
  </div>
);

// Reusable Category Tag Component
const CategoryTag = ({ category, onClick }) => (
  <div className="link" onClick={onClick}>
    <div className="category-text">{category}</div>
  </div>
);

// Reusable Author Component
const Author = ({ author, date }) => (
  <div className="link2">
    <div className="background"></div>
    <div className="admin">{author}</div>
  </div>
);

// Reusable Article Card Component
const ArticleCard = ({ 
  post,
  onClick,
  onTagClick,
  formatDate
}) => (
  <div className="article" onClick={() => onClick(post._id)} style={{ cursor: 'pointer' }}>
    <div className="container">
      <div className="figure-link">
        <img 
          src={post.image || post.heroImage} 
          alt={post.title} 
          className="detail-post-image" 
          onError={(e) => {
            // Fallback to a default image if the image fails to load
            e.target.src = car1Image;
          }}
        />
      </div>
      <CategoryTag category={post.category} />
    </div>
    <Author author={post.author} date={formatDate(post.createdAt)} />
    <div className="date-text">{formatDate(post.createdAt)}</div>
    <div className="heading-4-link">
      <div className="blog-title-text">{post.title}</div>
    </div>
    
    {/* Tags rendering */}
    {post.tags && post.tags.length > 0 && (
      <div className="blog-tags">
        {post.tags.map(tag => (
          <button 
            key={tag} 
            className="tag-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onTagClick(tag);
            }}
          >
            #{tag}
          </button>
        ))}
      </div>
    )}
  </div>
);

// Reusable Pagination Component
const Pagination = ({ pagination, onPageChange }) => {
  const renderPaginationButtons = () => {
    const { currentPage, totalPages } = pagination;
    const buttons = [];

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button 
          key="prev" 
          className="pagination-btn pagination-nav" 
          onClick={() => onPageChange(currentPage - 1)}
        >
          &laquo;
        </button>
      );
    }

    // Calculate page range
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) endPage = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) startPage = Math.max(1, totalPages - 4);

    // First page and ellipsis
    if (startPage > 1) {
      buttons.push(
        <button key={1} className="pagination-btn" onClick={() => onPageChange(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`} 
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      buttons.push(
        <button key={totalPages} className="pagination-btn" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button 
          key="next" 
          className="pagination-btn pagination-nav" 
          onClick={() => onPageChange(currentPage + 1)}
        >
          &raquo;
        </button>
      );
    }

    return buttons;
  };

  if (pagination.totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-controls">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

// Main Blog Page Component
const BlogPage = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
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
      let url = `${API_BASE_URL}/blogs?page=${page}&limit=9`;

      if (category !== 'All') url += `&category=${encodeURIComponent(category)}`;
      if (tag) url += `&tag=${encodeURIComponent(tag)}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blogs');

      const data = await response.json();
      if (data.success) {
        const blogsWithImages = data.data.map((blog, index) => ({
          ...blog,
          image: blog.heroImage || blog.image || defaultImages[index % defaultImages.length]
        }));

        setBlogPosts(blogsWithImages);
        setPagination(data.pagination || {
          currentPage: page,
          totalPages: Math.ceil(blogsWithImages.length / 9),
          totalBlogs: blogsWithImages.length
        });
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);

      // Fallback data that matches the original design with proper images
      const fallbackData = [
        {
          _id: '1', 
          category: "Sound", 
          image: car1Image, 
          title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          excerpt: "Luxury engineering at its peak.", 
          tags: ['luxury', 'sound']
        },
        {
          _id: '2', 
          category: "Accessories", 
          image: car2Image, 
          title: "BMW X6 M50i is designed to exceed your sportiest.",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          excerpt: "Performance meets elegance.", 
          tags: ['accessories', 'performance']
        },
        {
          _id: '3', 
          category: "Exterior", 
          image: car3Image, 
          title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          excerpt: "Comprehensive review of the latest model.", 
          tags: ['exterior', 'review']
        },
        {
          _id: '4', 
          category: "Body Kit", 
          image: car4Image, 
          title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          excerpt: "Efficiency in a spacious package.", 
          tags: ['hybrid', 'efficiency']
        },
        {
          _id: '5', 
          category: "Fuel Systems", 
          image: car5Image, 
          title: "2024 Audi Hybrid gives up nothing with its optimized",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          excerpt: "Advanced fuel system technology.", 
          tags: ['fuel-systems', 'technology']
        },
        {
          _id: '6', 
          category: "Exterior", 
          image: car6Image, 
          title: "2024 BMW X3 M Sport Seats – available as a standalone option",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          excerpt: "Comfort meets sportiness.", 
          tags: ['interior', 'comfort']
        },
        {
          _id: '7', 
          category: "Body Kit", 
          image: car1Image, 
          title: "2023 Carnival Standard blind-spot & forward collision avoidance",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          excerpt: "Safety technology overview.", 
          tags: ['safety', 'technology']
        },
        {
          _id: '8', 
          category: "Sound", 
          image: car2Image, 
          title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
          author: "admin", 
          createdAt: "2023-09-19T00:00:00.000Z", 
          excerpt: "Classic comparison review.", 
          tags: ['comparison', 'volkswagen']
        },
        {
          _id: '9', 
          category: "Oil & Filters", 
          image: car3Image, 
          title: "Battle of the SUVs – Kia Sportage vs Hyundai Tucson",
          author: "admin", 
          createdAt: "2023-09-19T00:00:00.000Z", 
          excerpt: "SUV showdown comparison.", 
          tags: ['suv', 'comparison']
        }
      ];

      const filteredData = category === 'All' ? fallbackData :
        fallbackData.filter(blog => blog.category === category);

      const finalFiltered = tag ? filteredData.filter(b => b.tags?.includes(tag)) : filteredData;

      setBlogPosts(finalFiltered);
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(finalFiltered.length / 9),
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
  }, [selectedCategory, selectedTag]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSelectedTag(null); // Clear tag filter when changing category
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

  if (loading) {
    return (
      <div className="blog-container">
        <Navbar/>
        <div className="blog-loading">
          <div className="loading-spinner"></div>
          <p>Loading blogs...</p>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <Navbar/>
      <div className="blog-header">
        <div className="blog-header-content">
          <Breadcrumb />
          <div className="header-flex">
            <div>
              <h1 className="header-title">Blog</h1>
              {error && (
                <p className="error-message" style={{ color: '#ff4444' }}>
                  API Error: {error}. Showing fallback data.
                </p>
              )}
              {selectedTag && (
                <p className="selected-tag">
                  Filtering by tag: <strong>{selectedTag}</strong>{' '}
                  <button onClick={() => setSelectedTag(null)} className="clear-tag-btn">
                    Clear
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="blog-main">
        <div className="category-filters">
          <div className="category-filters-container">
            {categories.map((category) => (
              <button 
                key={category} 
                className={`category-tag ${selectedCategory === category ? 'active' : ''}`} 
                onClick={() => handleCategoryFilter(category)}
              >
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
            <ArticleCard
              key={post._id}
              post={post}
              onClick={handleBlogClick}
              onTagClick={handleTagClick}
              formatDate={formatDate}
            />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="no-results">
            <h3>No posts found</h3>
            <p>Try a different category or tag.</p>
          </div>
        )}

        <Pagination 
          pagination={pagination} 
          onPageChange={handlePageChange} 
        />
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPage;