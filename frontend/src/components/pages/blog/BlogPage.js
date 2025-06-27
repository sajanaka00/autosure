import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import '../../../styles/blog.css';

import car1Image from '../../../assets/images/cars/car1.png';
import car2Image from '../../../assets/images/cars/car2.png';
import car3Image from '../../../assets/images/cars/car3.png';
import car4Image from '../../../assets/images/cars/car4.png';
import car5Image from '../../../assets/images/cars/car5.png';
import car6Image from '../../../assets/images/cars/car6.png';

const BlogPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      category: "Sound",
      image: car1Image,
      title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The BMW ALPINA XB7 represents the pinnacle of luxury SUV engineering, combining exceptional performance with unparalleled comfort."
    },
    {
      id: 2,
      category: "Accessories",
      image: car2Image,
      title: "BMW X6 M50i is designed to exceed your sportiest expectations",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The BMW X6 M50i stands as a testament to BMW's ability to blend coupe elegance with SUV practicality."
    },
    {
      id: 3,
      category: "Exterior",
      image: car3Image,
      title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The 2024 BMW X5 in its distinctive gold finish represents a bold statement in luxury SUV design."
    },
    {
      id: 4,
      category: "Body Kit",
      image: car4Image,
      title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle Efficiency",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The 2024 Kia Sorento Hybrid showcases how modern manufacturers are successfully balancing size and efficiency."
    },
    {
      id: 5,
      category: "Fuel Systems",
      image: car5Image,
      title: "2024 BMW Hybrid gives up nothing with its optimized performance",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "BMW's 2024 hybrid lineup represents a masterclass in optimization, where efficiency meets performance without compromise."
    },
    {
      id: 6,
      category: "Exterior",
      image: car6Image,
      title: "2024 BMW X3 M Sport Seats – available as a standalone option",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The 2024 BMW X3 M Sport seats represent a significant upgrade in both comfort and style."
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    excerpt: '',
    content: '',
    heroImage: '',
    contentImage: '',
    keyPoints: [''],
    requirements: [''],
    tags: '',
    estimatedReadTime: ''
  });

  const categories = [
    'Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems', 
    'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology'
  ];

  const handleBlogClick = (blogId) => {
    // Navigate to blog detail page
    navigate(`/blog/${blogId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.author || !formData.excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    const newPost = {
      id: Math.max(...blogPosts.map(post => post.id)) + 1,
      title: formData.title,
      category: formData.category,
      author: formData.author,
      excerpt: formData.excerpt,
      content: formData.content,
      keyPoints: formData.keyPoints.filter(point => point.trim() !== ''),
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      tags: formData.tags,
      estimatedReadTime: formData.estimatedReadTime,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      image: formData.heroImage || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    };

    setBlogPosts(prev => [newPost, ...prev]);
    
    setFormData({
      title: '',
      category: '',
      author: '',
      excerpt: '',
      content: '',
      heroImage: '',
      contentImage: '',
      keyPoints: [''],
      requirements: [''],
      tags: '',
      estimatedReadTime: ''
    });
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      title: '',
      category: '',
      author: '',
      excerpt: '',
      content: '',
      heroImage: '',
      contentImage: '',
      keyPoints: [''],
      requirements: [''],
      tags: '',
      estimatedReadTime: ''
    });
  };

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
              key={post.id} 
              className="blog-card"
              onClick={() => handleBlogClick(post.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Image Container */}
              <div className="blog-image-container">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="blog-image"
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
                  <span>{post.date}</span>
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
        <div className="pagination">
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
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
              <div className="form-section">
                {/* Basic Information */}
                <div className="form-group">
                  <h3 className="form-section-title">Basic Information</h3>
                  
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">Author *</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter author name"
                        required
                      />
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">Hero Image URL</label>
                      <input
                        type="url"
                        name="heroImage"
                        value={formData.heroImage}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Main image for the blog post"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Excerpt *</label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows="3"
                      className="form-textarea"
                      placeholder="Brief description of the blog post"
                      required
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="form-group">
                  <h3 className="form-section-title">Content</h3>
                  
                  <div className="form-field">
                    <label className="form-label">Main Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="6"
                      className="form-textarea"
                      placeholder="Write the main content of your blog post here..."
                    />
                  </div>
                </div>

                {/* Key Points */}
                <div className="form-group">
                  <h3 className="form-section-title">Key Points</h3>
                  
                  {formData.keyPoints.map((point, index) => (
                    <div key={index} className="array-input-container">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleArrayChange('keyPoints', index, e.target.value)}
                        className="form-input array-input"
                        placeholder={`Key point ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('keyPoints', index)}
                        className="array-remove-btn"
                        disabled={formData.keyPoints.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addArrayItem('keyPoints')}
                    className="array-add-btn"
                  >
                    + Add Key Point
                  </button>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={handleSubmit}
                    className="btn-primary"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <Footer />
    </div>
  );
};

export default BlogPage;