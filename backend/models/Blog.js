const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: false
  }
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: { 
    type: String, 
    required: true 
  },
  category: {
    type: String,
    required: true,
    enum: ['Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems', 
           'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology']
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  authorBio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  authorAvatar: {
    type: String,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  heroImage: {
    type: String,
    trim: true
  },
  contentImage: {
    type: String,
    trim: true
  },
  keyPoints: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  estimatedReadTime: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better search performance
blogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
blogSchema.index({ category: 1, published: 1 });
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ featured: 1, published: 1 });

// Pre-save middleware to update slug and updatedAt
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.isModified('slug')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  if (this.isModified() && !this.isNew) {
    this.updatedAt = Date.now();
  }
  
  next();
});

module.exports = mongoose.model('Blog', blogSchema);