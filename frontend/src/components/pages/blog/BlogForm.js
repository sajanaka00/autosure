import React, { useState } from 'react';
import { X, Plus, Minus, Upload, Eye, Save, FileText, User, Tag, Image, Clock, Hash, Edit } from 'lucide-react';
import '../../../styles/blog-modal.css';

const BlogForm = ({ onClose = () => {}, onCreated = () => {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: {
      name: '',
      bio: '',
      avatar: ''
    },
    excerpt: '',
    content: {
      intro: '',
      body: '',
      quote: {
        text: '',
        author: ''
      }
    },
    images: {
      hero: '',
      content: '',
      alt: ''
    },
    keyFeatures: {
      leftColumn: [''],
      rightColumn: ['']
    },
    requirements: [''],
    tags: '',
    navigation: {
      previous: {
        title: '',
        slug: ''
      },
      next: {
        title: '',
        slug: ''
      }
    },
    estimatedReadTime: '',
    metaDescription: '',
    featured: false,
    published: true
  });

  // File upload states
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [contentImageFile, setContentImageFile] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'file'

  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems', 
    'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology',
    'Executive', 'Luxury', 'SUV', 'Sedan', 'Reviews'
  ];

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = type === 'checkbox' ? checked : value;
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayChange = (field, side, index, value) => {
    if (field === 'keyFeatures') {
      setFormData(prev => ({
        ...prev,
        keyFeatures: {
          ...prev.keyFeatures,
          [side]: prev.keyFeatures[side].map((item, i) => i === index ? value : item)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].map((item, i) => i === index ? value : item)
      }));
    }
  };

  const addArrayItem = (field, side = null) => {
    if (field === 'keyFeatures') {
      setFormData(prev => ({
        ...prev,
        keyFeatures: {
          ...prev.keyFeatures,
          [side]: [...prev.keyFeatures[side], '']
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], '']
      }));
    }
  };

  const removeArrayItem = (field, side, index) => {
    if (field === 'keyFeatures') {
      if (formData.keyFeatures[side].length > 1) {
        setFormData(prev => ({
          ...prev,
          keyFeatures: {
            ...prev.keyFeatures,
            [side]: prev.keyFeatures[side].filter((_, i) => i !== index)
          }
        }));
      }
    } else {
      if (formData[field].length > 1) {
        setFormData(prev => ({
          ...prev,
          [field]: prev[field].filter((_, i) => i !== index)
        }));
      }
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'hero') {
        setHeroImageFile(file);
      } else if (type === 'content') {
        setContentImageFile(file);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      author: {
        name: '',
        bio: '',
        avatar: ''
      },
      excerpt: '',
      content: {
        intro: '',
        body: '',
        quote: {
          text: '',
          author: ''
        }
      },
      images: {
        hero: '',
        content: '',
        alt: ''
      },
      keyFeatures: {
        leftColumn: [''],
        rightColumn: ['']
      },
      requirements: [''],
      tags: '',
      navigation: {
        previous: {
          title: '',
          slug: ''
        },
        next: {
          title: '',
          slug: ''
        }
      },
      estimatedReadTime: '',
      metaDescription: '',
      featured: false,
      published: true
    });
    setHeroImageFile(null);
    setContentImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !formData.category || !formData.author.name || !formData.excerpt) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      let submitData = {
        ...formData,
        keyFeatures: {
          leftColumn: formData.keyFeatures.leftColumn.filter(item => item.trim() !== ''),
          rightColumn: formData.keyFeatures.rightColumn.filter(item => item.trim() !== '')
        },
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };

      let response;

      if (uploadMethod === 'file' && (heroImageFile || contentImageFile)) {
        // Use FormData for file uploads
        const formDataToSend = new FormData();
        formDataToSend.append('blogData', JSON.stringify(submitData));
        
        if (heroImageFile) {
          formDataToSend.append('heroImage', heroImageFile);
        }
        if (contentImageFile) {
          formDataToSend.append('contentImage', contentImageFile);
        }

        response = await fetch(`${API_BASE_URL}/blogs`, {
          method: 'POST',
          body: formDataToSend
        });
      } else {
        // Use JSON for URL-based images
        response = await fetch(`${API_BASE_URL}/blogs/json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        });
      }

      const result = await response.json();

      if (result.success) {
        alert('Blog post created successfully!');
        resetForm();
        if (typeof onCreated === 'function') {
          onCreated();
        }
        if (typeof onClose === 'function') {
          onClose();
        }
      } else {
        throw new Error(result.message || 'Failed to create blog post');
      }
    } catch (err) {
      console.error('Error creating blog:', err);
      alert('Error creating blog post: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'content', label: 'Content', icon: Edit },
    { id: 'media', label: 'Images', icon: Image },
    { id: 'seo', label: 'SEO & Meta', icon: Hash }
  ];

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">
            <FileText className="w-4 h-4" />
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your blog title..."
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Tag className="w-4 h-4" />
            Category *
          </label>
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

      <div className="form-group">
        <label className="form-label">
          <FileText className="w-4 h-4" />
          Excerpt *
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleInputChange}
          className="form-textarea"
          rows="3"
          placeholder="Brief description of your blog post..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">
            <User className="w-4 h-4" />
            Author Name *
          </label>
          <input
            type="text"
            name="author.name"
            value={formData.author.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Author name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Clock className="w-4 h-4" />
            Read Time
          </label>
          <input
            type="text"
            name="estimatedReadTime"
            value={formData.estimatedReadTime}
            onChange={handleInputChange}
            className="form-input"
            placeholder="5 min read"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <User className="w-4 h-4" />
          Author Bio
        </label>
        <textarea
          name="author.bio"
          value={formData.author.bio}
          onChange={handleInputChange}
          className="form-textarea"
          rows="2"
          placeholder="Brief author biography..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <Tag className="w-4 h-4" />
          Tags
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="form-input"
          placeholder="tag1, tag2, tag3..."
        />
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="form-group">
        <label className="form-label">
          <FileText className="w-4 h-4" />
          Introduction *
        </label>
        <textarea
          name="content.intro"
          value={formData.content.intro}
          onChange={handleInputChange}
          className="form-textarea"
          rows="4"
          placeholder="Write your blog introduction here..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <FileText className="w-4 h-4" />
          Main Content *
        </label>
        <textarea
          name="content.body"
          value={formData.content.body}
          onChange={handleInputChange}
          className="form-textarea"
          rows="8"
          placeholder="Write your main blog content here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Quote Text</label>
          <textarea
            name="content.quote.text"
            value={formData.content.quote.text}
            onChange={handleInputChange}
            className="form-textarea"
            rows="3"
            placeholder="Inspiring quote..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Quote Author</label>
          <input
            type="text"
            name="content.quote.author"
            value={formData.content.quote.author}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Quote author"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-array">
          <label className="form-label">
            <Plus className="w-4 h-4" />
            Key Features (Left Column)
          </label>
          <div className="space-y-3">
            {formData.keyFeatures.leftColumn.map((feature, i) => (
              <div key={i} className="array-input">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange('keyFeatures', 'leftColumn', i, e.target.value)}
                  className="form-input flex-1"
                  placeholder={`Feature ${i + 1}...`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('keyFeatures', 'leftColumn', i)}
                  disabled={formData.keyFeatures.leftColumn.length === 1}
                  className="btn-icon btn-danger"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => addArrayItem('keyFeatures', 'leftColumn')}
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>
        </div>

        <div className="form-array">
          <label className="form-label">
            <Plus className="w-4 h-4" />
            Key Features (Right Column)
          </label>
          <div className="space-y-3">
            {formData.keyFeatures.rightColumn.map((feature, i) => (
              <div key={i} className="array-input">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange('keyFeatures', 'rightColumn', i, e.target.value)}
                  className="form-input flex-1"
                  placeholder={`Feature ${i + 1}...`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('keyFeatures', 'rightColumn', i)}
                  disabled={formData.keyFeatures.rightColumn.length === 1}
                  className="btn-icon btn-danger"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => addArrayItem('keyFeatures', 'rightColumn')}
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>
        </div>
      </div>

      <div className="form-array">
        <label className="form-label">
          <FileText className="w-4 h-4" />
          Requirements
        </label>
        <div className="space-y-3">
          {formData.requirements.map((req, i) => (
            <div key={i} className="array-input">
              <input
                type="text"
                value={req}
                onChange={(e) => handleArrayChange('requirements', null, i, e.target.value)}
                className="form-input flex-1"
                placeholder={`Requirement ${i + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('requirements', null, i)}
                disabled={formData.requirements.length === 1}
                className="btn-icon btn-danger"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => addArrayItem('requirements')}
          >
            <Plus className="w-4 h-4" />
            Add Requirement
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div className="form-group">
        <label className="form-label">Upload Method</label>
        <div className="flex gap-4">
          <label className="form-checkbox">
            <input
              type="radio"
              name="uploadMethod"
              value="url"
              checked={uploadMethod === 'url'}
              onChange={(e) => setUploadMethod(e.target.value)}
            />
            <span className="checkmark"></span>
            Use URLs
          </label>
          <label className="form-checkbox">
            <input
              type="radio"
              name="uploadMethod"
              value="file"
              checked={uploadMethod === 'file'}
              onChange={(e) => setUploadMethod(e.target.value)}
            />
            <span className="checkmark"></span>
            Upload Files
          </label>
        </div>
      </div>

      {uploadMethod === 'url' ? (
        <>
          <div className="form-group">
            <label className="form-label">
              <Image className="w-4 h-4" />
              Hero Image URL *
            </label>
            <input
              type="url"
              name="images.hero"
              value={formData.images.hero}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://example.com/hero-image.jpg"
            />
            {formData.images.hero && (
              <div className="mt-3 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <img
                  src={formData.images.hero}
                  alt="Hero preview"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Image className="w-4 h-4" />
              Content Image URL
            </label>
            <input
              type="url"
              name="images.content"
              value={formData.images.content}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://example.com/content-image.jpg"
            />
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label className="form-label">
              <Upload className="w-4 h-4" />
              Hero Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'hero')}
              className="form-input"
            />
            {heroImageFile && (
              <p className="text-sm text-green-600 mt-1">Selected: {heroImageFile.name}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Upload className="w-4 h-4" />
              Content Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'content')}
              className="form-input"
            />
            {contentImageFile && (
              <p className="text-sm text-green-600 mt-1">Selected: {contentImageFile.name}</p>
            )}
          </div>
        </>
      )}

      <div className="form-group">
        <label className="form-label">Image Alt Text</label>
        <input
          type="text"
          name="images.alt"
          value={formData.images.alt}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Description of the image"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <User className="w-4 h-4" />
          Author Avatar URL
        </label>
        <input
          type="url"
          name="author.avatar"
          value={formData.author.avatar}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
    </div>
  );

  const renderSEOTab = () => (
    <div className="space-y-6">
      <div className="form-group">
        <label className="form-label">
          <FileText className="w-4 h-4" />
          Meta Description
        </label>
        <textarea
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleInputChange}
          className="form-textarea"
          rows="3"
          placeholder="SEO meta description for search engines..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Previous Post Title</label>
          <input
            type="text"
            name="navigation.previous.title"
            value={formData.navigation.previous.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Previous post title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Previous Post Slug</label>
          <input
            type="text"
            name="navigation.previous.slug"
            value={formData.navigation.previous.slug}
            onChange={handleInputChange}
            className="form-input"
            placeholder="previous-post-slug"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Next Post Title</label>
          <input
            type="text"
            name="navigation.next.title"
            value={formData.navigation.next.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Next post title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Next Post Slug</label>
          <input
            type="text"
            name="navigation.next.slug"
            value={formData.navigation.next.slug}
            onChange={handleInputChange}
            className="form-input"
            placeholder="next-post-slug"
          />
        </div>
      </div>

      <div className="form-checkbox-group">
        <label className="form-checkbox">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
          />
          <span className="checkmark"></span>
          Featured Post
        </label>

        <label className="form-checkbox">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
          />
          <span className="checkmark"></span>
          Published
        </label>
      </div>
    </div>
  );

  return (
    <div className="blog-form-overlay">
      <div className="blog-form-container">
        <div className="form-header">
          <div className="form-title">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2>Create New Blog Post</h2>
          </div>
          <button
            type="button"
            onClick={() => { 
              resetForm(); 
              if (typeof onClose === 'function') {
                onClose();
              }
            }}
            className="btn-icon btn-ghost"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="form-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`form-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="blog-form">
          <div className="form-content">
            {activeTab === 'basic' && renderBasicTab()}
            {activeTab === 'content' && renderContentTab()}
            {activeTab === 'media' && renderMediaTab()}
            {activeTab === 'seo' && renderSEOTab()}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => { 
                resetForm(); 
                if (typeof onClose === 'function') {
                  onClose();
                }
              }}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;