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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0
  });

  // Default images array for fallback
  const defaultImages = [car1Image, car2Image, car3Image, car4Image, car5Image, car6Image];

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    authorBio: '',
    authorAvatar: '',
    excerpt: '',
    content: '',
    heroImage: '',
    contentImage: '',
    keyPoints: [''],
    requirements: [''],
    tags: '',
    estimatedReadTime: '',
    metaDescription: '',
    slug: '',
    featured: false,
    published: true
  });

  const categories = [
    'Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems', 
    'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology'
  ];

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  // Fetch blogs from API
  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blogs/featured?page=${page}&limit=6`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Add fallback images for blogs without heroImage
        const blogsWithImages = data.data.map((blog, index) => ({
          ...blog,
          image: blog.heroImage || defaultImages[index % defaultImages.length]
        }));
        
        setBlogPosts(blogsWithImages);
        
        if (data.pagination) {
          setPagination(data.pagination);
        } else {
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalBlogs: blogsWithImages.length
          });
        }
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
      // Use default data as fallback
      setBlogPosts([
        {
          _id: '1',
          category: "Sound",
          image: car1Image,
          title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
          author: "Admin",
          createdAt: "2023-11-22T00:00:00.000Z",
          excerpt: "The BMW ALPINA XB7 represents the pinnacle of luxury SUV engineering, combining exceptional performance with unparalleled comfort."
        },
        {
          _id: '2',
          category: "Accessories",
          image: car2Image,
          title: "BMW X6 M50i is designed to exceed your sportiest expectations",
          author: "Admin",
          createdAt: "2023-11-22T00:00:00.000Z",
          excerpt: "The BMW X6 M50i stands as a testament to BMW's ability to blend coupe elegance with SUV practicality."
        }
      ]);
      // Also reset pagination for fallback
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalBlogs: 2
      });
    } finally {
      setLoading(false);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.author || !formData.excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const submitData = {
        ...formData,
        keyPoints: formData.keyPoints.filter(point => point.trim() !== ''),
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };

      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Blog post created successfully!');
        setShowModal(false);
        resetForm();
        fetchBlogs(); // Refresh the blog list
      } else {
        throw new Error(result.message || 'Failed to create blog post');
      }
    } catch (err) {
      console.error('Error creating blog:', err);
      alert('Error creating blog post: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      author: '',
      authorBio: '',
      authorAvatar: '',
      excerpt: '',
      content: '',
      heroImage: '',
      contentImage: '',
      keyPoints: [''],
      requirements: [''],
      tags: '',
      estimatedReadTime: '',
      metaDescription: '',
      slug: '',
      featured: false,
      published: true
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handlePageChange = (page) => {
    fetchBlogs(page);
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
      
      {/* Header */}
      <div className="blog-header">
        <div className="blog-header-content">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <span className="breadcrumb-home">Home</span>
            <span className="breadcrumb-separator">/</span>
            <span>Blog</span>
          </div>
          
          <div className="header-flex">
            <div>
              <h1 className="header-title">Latest Automotive News & Reviews</h1>
              <p className="header-subtitle">Stay updated with the latest car reviews, automotive news, and industry insights</p>
              {error && (
                <p className="error-message" style={{ color: '#ff4444', fontSize: '14px', marginTop: '8px' }}>
                  Note: Using fallback data. API Error: {error}
                </p>
              )}
            </div>
            <button 
              className="add-post-btn"
              onClick={() => setShowModal(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add New Post
            </button>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-main">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article 
              key={post._id || post.id} 
              className="blog-card"
              onClick={() => handleBlogClick(post._id || post.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Image Container */}
              <div className="blog-image-container">
                <img 
                  src={post.image || post.heroImage} 
                  alt={post.title}
                  className="blog-image"
                  onError={(e) => {
                    e.target.src = defaultImages[0]; // Fallback to first default image
                  }}
                />
                {/* Category Tag */}
                <div className="blog-category-tag">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="blog-content">
                {/* Author and Date */}
                <div className="blog-meta">
                  <span className="blog-author">{post.author}</span>
                  <span>{formatDate(post.createdAt || post.date)}</span>
                </div>
                
                {/* Title */}
                <h3 className="blog-title">
                  {post.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`pagination-btn ${pagination.currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            {pagination.hasNext && (
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create New Blog Post</h2>
              <button 
                onClick={handleCloseModal}
                className="modal-close-btn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <BlogForm onClose={handleCloseModal} onCreated={fetchBlogs} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;
