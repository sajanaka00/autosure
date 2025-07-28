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
const BlogBreadcrumb = () => (
  <div className="blog-page-breadcrumb">
    <span className="blog-page-breadcrumb-home">Home</span>
    <span className="blog-page-breadcrumb-separator">/</span>
    <span>Blog</span>
  </div>
);

// Blog Article Card Component - Matching the design from image
const BlogArticleCard = ({ 
  post,
  onClick,
  onTagClick,
  formatDate
}) => (
  <div className="blog-article-card" onClick={() => onClick(post._id)}>
    <div className="blog-article-image-container">
      <img 
        className="blog-article-image"
        src={post.image || post.heroImage} 
        alt={post.title}
        onError={(e) => {
          e.target.src = car1Image;
        }}
      />
      <div className="blog-article-category-badge">
        {post.category}
      </div>
    </div>
    
    <div className="blog-article-content">
      <div className="blog-article-meta">
        {/* <div className="blog-article-meta-dot"></div> */}
        <span className="blog-article-author">{post.author}</span>
        <span className="blog-article-date-separator">•</span>
        <span className="blog-article-date">{formatDate(post.createdAt)}</span>
      </div>
      
      <h3 className="blog-article-title">{post.title}</h3>
      
      {/* Tags rendering */}
      {post.tags && post.tags.length > 0 && (
        <div className="blog-article-tags">
          {post.tags.map(tag => (
            <button 
              key={tag} 
              className="blog-article-tag-btn" 
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
  </div>
);

// Dynamic Pagination Component - Not hardcoded
const BlogPagination = ({ pagination, onPageChange }) => {
  const renderPaginationButtons = () => {
    const { currentPage, totalPages } = pagination;
    const buttons = [];

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button 
          key="prev" 
          className="blog-page-pagination-btn blog-page-pagination-nav" 
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg className="blog-page-pagination-arrow" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      );
    }

    // Calculate page range
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust range for better display
    if (currentPage <= 3) endPage = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) startPage = Math.max(1, totalPages - 4);

    // First page and ellipsis if needed
    if (startPage > 1) {
      buttons.push(
        <button 
          key={1} 
          className="blog-page-pagination-btn" 
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="blog-page-pagination-ellipsis">...</span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          className={`blog-page-pagination-btn ${currentPage === i ? 'active' : ''}`} 
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="blog-page-pagination-ellipsis">...</span>
        );
      }
      buttons.push(
        <button 
          key={totalPages} 
          className="blog-page-pagination-btn" 
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button 
          key="next" 
          className="blog-page-pagination-btn blog-page-pagination-nav" 
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <svg className="blog-page-pagination-arrow" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      );
    }

    return buttons;
  };

  if (pagination.totalPages <= 1) return null;

  return (
    <div className="blog-page-pagination">
      {renderPaginationButtons()}
    </div>
  );
};

// Main Blog Page Component
const BlogPage = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
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
  const ITEMS_PER_PAGE = 6; // 6 items per page for pagination visibility

  const categories = [
    'All', 'Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems',
    'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology'
  ];

  // Fetch blogs from API or use fallback data
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blogs`);
      
      if (!response.ok) throw new Error('Failed to fetch blogs');

      const data = await response.json();
      if (data.success) {
        const blogsWithImages = data.data.map((blog, index) => ({
          ...blog,
          image: blog.heroImage || blog.image || defaultImages[index % defaultImages.length]
        }));
        setAllPosts(blogsWithImages);
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);

      // Enhanced fallback data - 12 items to demonstrate pagination
      const fallbackData = [
        {
          _id: '1', 
          category: "Sound", 
          image: car1Image, 
          title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          tags: ['luxury', 'sound']
        },
        {
          _id: '2', 
          category: "Accessories", 
          image: car2Image, 
          title: "BMW X6 M50i is designed to exceed your sportiest",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          tags: ['accessories', 'performance']
        },
        {
          _id: '3', 
          category: "Exterior", 
          image: car3Image, 
          title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          tags: ['exterior', 'review']
        },
        {
          _id: '4', 
          category: "Body Kit", 
          image: car4Image, 
          title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          tags: ['hybrid', 'efficiency']
        },
        {
          _id: '5', 
          category: "Fuel Systems", 
          image: car5Image, 
          title: "2024 Audi Hybrid gives up nothing with its optimized",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          tags: ['fuel-systems', 'technology']
        },
        {
          _id: '6', 
          category: "Interior", 
          image: car6Image, 
          title: "2024 BMW X3 M Sport Seats – available as a standalone option",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          tags: ['interior', 'comfort']
        },
        {
          _id: '7', 
          category: "Safety", 
          image: car1Image, 
          title: "2023 Carnival Standard blind-spot & forward collision avoidance",
          author: "admin", 
          createdAt: "2023-11-22T00:00:00.000Z", 
          tags: ['safety', 'technology']
        },
        {
          _id: '8', 
          category: "Sound", 
          image: car2Image, 
          title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
          author: "admin", 
          createdAt: "2023-09-19T00:00:00.000Z", 
          tags: ['comparison', 'volkswagen']
        },
        {
          _id: '9', 
          category: "Performance", 
          image: car3Image, 
          title: "Battle of the SUVs – Kia Sportage vs Hyundai Tucson",
          author: "admin", 
          createdAt: "2023-09-19T00:00:00.000Z", 
          tags: ['suv', 'comparison']
        },
        {
          _id: '10', 
          category: "Performance", 
          image: car4Image, 
          title: "Mercedes-AMG GT 63 S Review: Ultimate Performance Machine",
          author: "admin", 
          createdAt: "2023-08-15T00:00:00.000Z", 
          tags: ['performance', 'mercedes']
        },
        {
          _id: '11', 
          category: "Safety", 
          image: car5Image, 
          title: "Advanced Driver Assistance Systems: The Future of Road Safety",
          author: "admin", 
          createdAt: "2023-08-10T00:00:00.000Z", 
          tags: ['safety', 'technology', 'adas']
        },
        {
          _id: '12', 
          category: "Technology", 
          image: car6Image, 
          title: "Electric Vehicle Charging Infrastructure: What You Need to Know",
          author: "admin", 
          createdAt: "2023-07-28T00:00:00.000Z", 
          tags: ['electric', 'technology', 'charging']
        }
      ];

      setAllPosts(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Filter and paginate posts
  const getFilteredAndPaginatedPosts = () => {
    let filteredPosts = allPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      filteredPosts = filteredPosts.filter(post => post.tags?.includes(selectedTag));
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const startIndex = (pagination.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Update pagination state
    setPagination(prev => ({
      ...prev,
      totalPages,
      totalBlogs: filteredPosts.length
    }));

    return paginatedPosts;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filteredPosts = getFilteredAndPaginatedPosts();
    setBlogPosts(filteredPosts);
  }, [allPosts, selectedCategory, selectedTag, pagination.currentPage]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: page }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="blog-page-container">
        <Navbar/>
        <div className="blog-page-loading">
          <div className="blog-page-loading-spinner"></div>
          <p>Loading blogs...</p>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="blog-page-container">
      <Navbar/>
      <div className="blog-page-header">
        <div className="blog-page-header-content">
          <BlogBreadcrumb />
          <div className="blog-page-header-flex">
            <div>
              <h1 className="blog-page-title">Blog</h1>
              {error && (
                <p className="blog-page-error-message" style={{ color: '#ff4444' }}>
                  API Error: {error}. Showing fallback data.
                </p>
              )}
              {selectedTag && (
                <p className="blog-page-selected-tag">
                  Filtering by tag: <strong>{selectedTag}</strong>{' '}
                  <button onClick={() => setSelectedTag(null)} className="blog-page-clear-tag-btn">
                    Clear
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="blog-page-main">
        <div className="blog-page-category-filters">
          <div className="blog-page-category-filters-container">
            {categories.map((category) => (
              <button 
                key={category} 
                className={`blog-page-category-tag ${selectedCategory === category ? 'active' : ''}`} 
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-page-results-info">
          <p>
            {selectedCategory === 'All'
              ? `Showing ${blogPosts.length} of ${pagination.totalBlogs} posts (Page ${pagination.currentPage} of ${pagination.totalPages})`
              : `Showing ${blogPosts.length} posts in "${selectedCategory}" (Page ${pagination.currentPage} of ${pagination.totalPages})`
            }
          </p>
        </div>

        <div className="blog-page-articles-grid">
          {blogPosts.map((post) => (
            <BlogArticleCard
              key={post._id}
              post={post}
              onClick={handleBlogClick}
              onTagClick={handleTagClick}
              formatDate={formatDate}
            />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="blog-page-no-results">
            <h3>No posts found</h3>
            <p>Try a different category or tag.</p>
          </div>
        )}

        <BlogPagination 
          pagination={pagination} 
          onPageChange={handlePageChange} 
        />
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPage;