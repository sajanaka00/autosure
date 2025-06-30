import React, { useState } from 'react';
import { X, Plus, Minus, Upload, Eye, Save, FileText, User, Tag, Image, Clock, Hash, Edit } from 'lucide-react';
import '../../../styles/blog-modal.css';

const BlogForm = ({ onClose, onCreated }) => {
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

  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems', 
    'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology'
  ];

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !formData.category || !formData.author || !formData.excerpt) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Blog post created successfully!');
        resetForm();
        onCreated();
        onClose();
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
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Author name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Clock className="w-4 h-4" />
            Read Time (min)
          </label>
          <input
            type="number"
            name="estimatedReadTime"
            value={formData.estimatedReadTime}
            onChange={handleInputChange}
            className="form-input"
            placeholder="5"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <User className="w-4 h-4" />
          Author Bio
        </label>
        <textarea
          name="authorBio"
          value={formData.authorBio}
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
          Main Content
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className="form-textarea"
          rows="8"
          placeholder="Write your blog content here..."
        />
      </div>

      <div className="form-array">
        <label className="form-label">
          <Plus className="w-4 h-4" />
          Key Points
        </label>
        <div className="space-y-3">
          {formData.keyPoints.map((point, i) => (
            <div key={i} className="array-input">
              <input
                type="text"
                value={point}
                onChange={(e) => handleArrayChange('keyPoints', i, e.target.value)}
                className="form-input flex-1"
                placeholder={`Key point ${i + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('keyPoints', i)}
                disabled={formData.keyPoints.length === 1}
                className="btn-icon btn-danger"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => addArrayItem('keyPoints')}
          >
            <Plus className="w-4 h-4" />
            Add Key Point
          </button>
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
                onChange={(e) => handleArrayChange('requirements', i, e.target.value)}
                className="form-input flex-1"
                placeholder={`Requirement ${i + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('requirements', i)}
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
        <label className="form-label">
          <Image className="w-4 h-4" />
          Hero Image URL
        </label>
        <input
          type="url"
          name="heroImage"
          value={formData.heroImage}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://example.com/hero-image.jpg"
        />
        {formData.heroImage && (
          <div className="mt-3 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <img
              src={formData.heroImage}
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
          name="contentImage"
          value={formData.contentImage}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://example.com/content-image.jpg"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <User className="w-4 h-4" />
          Author Avatar URL
        </label>
        <input
          type="url"
          name="authorAvatar"
          value={formData.authorAvatar}
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
          <Hash className="w-4 h-4" />
          URL Slug
        </label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          className="form-input"
          placeholder="blog-post-url-slug"
        />
      </div>

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
            onClick={() => { resetForm(); onClose(); }}
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
              onClick={() => { resetForm(); onClose(); }}
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