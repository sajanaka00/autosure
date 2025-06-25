import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/blog.css';
import '../../../styles/blog-modal.css';

const BlogPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      category: "Sound",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The BMW ALPINA XB7 represents the pinnacle of luxury SUV engineering, combining exceptional performance with unparalleled comfort."
    },
    {
      id: 2,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1617886903355-9354bb57751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "BMW X6 M50i is designed to exceed your sportiest expectations",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The BMW X6 M50i stands as a testament to BMW's ability to blend coupe elegance with SUV practicality."
    },
    {
      id: 3,
      category: "Exterior",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The 2024 BMW X5 in its distinctive gold finish represents a bold statement in luxury SUV design."
    },
    {
      id: 4,
      category: "Body Kit",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle Efficiency",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The 2024 Kia Sorento Hybrid showcases how modern manufacturers are successfully balancing size and efficiency."
    },
    {
      id: 5,
      category: "Fuel Systems",
      image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "2024 BMW Hybrid gives up nothing with its optimized performance",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "BMW's 2024 hybrid lineup represents a masterclass in optimization, where efficiency meets performance without compromise."
    },
    {
      id: 6,
      category: "Exterior",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "2024 BMW X3 M Sport Seats – available as a standalone option",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The 2024 BMW X3 M Sport seats represent a significant upgrade in both comfort and style."
    },
    {
      id: 7,
      category: "Body Kit",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "2023 Carnival Standard blind-spot & forward collision avoidance",
      author: "Admin",
      date: "November 22, 2023",
      excerpt: "The 2023 Kia Carnival sets new standards for family vehicle safety with its comprehensive suite of advanced driver assistance systems."
    },
    {
      id: 8,
      category: "Sound",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
      author: "Admin",
      date: "September 19, 2023",
      excerpt: "The Volkswagen Golf and Polo represent two different approaches to compact car excellence."
    },
    {
      id: 9,
      category: "Oil & Filters",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Battle of the SUVs – Kia Sportage vs Hyundai Tucson",
      author: "Admin",
      date: "September 19, 2023",
      excerpt: "The Kia Sportage and Hyundai Tucson represent a fascinating sibling rivalry in the compact SUV segment."
    }
  ]);

  // Enhanced form data from EnhancedBlogForm
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
    navigate(`/blog/${blogId}`);
  };

  const handleReadMore = (e, blogId) => {
    e.stopPropagation();
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
    
    // Enhanced validation
    if (!formData.title || !formData.category || !formData.author || !formData.excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new blog post with enhanced data
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
      image: formData.heroImage || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    };

    // Add to blog posts
    setBlogPosts(prev => [newPost, ...prev]);
    
    // Reset form and close modal
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
      <main className="main-content">
        <div className="container">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Home</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Blog</span>
          </div>
          
          <div className="blog-header">
            <div className="blog-header-content">
              <h1 className="blog-title">Latest Automotive News & Reviews</h1>
              <p className="blog-subtitle">Stay updated with the latest car reviews, automotive news, and industry insights</p>
            </div>
            <button 
              className="add-blog-btn"
              onClick={() => setShowModal(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add New Post
            </button>
          </div>
          
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="blog-card"
                onClick={() => handleBlogClick(post.id)}
              >
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="category-tag">{post.category}</span>
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-author">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      {post.author}
                    </span>
                    <span className="blog-date">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      {post.date}
                    </span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <button 
                    className="read-more-btn"
                    onClick={(e) => handleReadMore(e, post.id)}
                  >
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
          
          <div className="pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn pagination-next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Enhanced Add Blog Post Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="enhanced-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Blog Post</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            
            <div className="enhanced-modal-body">
              <form className="enhanced-blog-form" onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="form-section">
                  <h3 className="form-section-title">Basic Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Title *</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="category">Category *</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="author">Author *</label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Enter author name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="tags">Tags</label>
                      <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="e.g., BMW, luxury, performance"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="excerpt">Excerpt *</label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Brief description of the blog post"
                      rows="3"
                      required
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="form-section">
                  <h3 className="form-section-title">Images</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="heroImage">Hero Image URL</label>
                      <input
                        type="url"
                        id="heroImage"
                        name="heroImage"
                        value={formData.heroImage}
                        onChange={handleInputChange}
                        placeholder="Main image for the blog post"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="contentImage">Content Image URL</label>
                      <input
                        type="url"
                        id="contentImage"
                        name="contentImage"
                        value={formData.contentImage}
                        onChange={handleInputChange}
                        placeholder="Additional image for content section"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="form-section">
                  <h3 className="form-section-title">Content</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="content">Main Content</label>
                      <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Write the main content of your blog post here..."
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="estimatedReadTime">Estimated Read Time</label>
                      <input
                        type="text"
                        id="estimatedReadTime"
                        name="estimatedReadTime"
                        value={formData.estimatedReadTime}
                        onChange={handleInputChange}
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                  </div>
                </div>

                {/* Key Points Section */}
                <div className="form-section">
                  <h3 className="form-section-title">What You'll Learn</h3>
                  
                  {formData.keyPoints.map((point, index) => (
                    <div key={index} className="array-input-group">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleArrayChange('keyPoints', index, e.target.value)}
                        placeholder={`Key point ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('keyPoints', index)}
                        className="remove-btn"
                        disabled={formData.keyPoints.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addArrayItem('keyPoints')}
                    className="add-btn"
                  >
                    + Add Key Point
                  </button>
                </div>

                {/* Requirements Section */}
                <div className="form-section">
                  <h3 className="form-section-title">Requirements</h3>
                  
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="array-input-group">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        placeholder={`Requirement ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="remove-btn"
                        disabled={formData.requirements.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="add-btn"
                  >
                    + Add Requirement
                  </button>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated with Automotive News</h2>
            <p>Get the latest car reviews, industry news, and exclusive content delivered to your inbox</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe Now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;