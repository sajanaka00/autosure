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
  website: {
    type: String,
    trim: true,
    default: ''
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
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
    unique: true 
  },
  category: {
    type: String,
    required: true,
    enum: ['Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems', 
           'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology',
           'Executive', 'Luxury', 'SUV', 'Sedan', 'Reviews']
  },
  author: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    avatar: {
      type: String,
      trim: true
    }
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  content: {
    intro: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    quote: {
      text: {
        type: String,
        trim: true
      },
      author: {
        type: String,
        trim: true
      }
    }
  },
  images: {
    hero: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      trim: true
    },
    alt: {
      type: String,
      trim: true
    }
  },
  keyFeatures: {
    leftColumn: [{
      type: String,
      trim: true
    }],
    rightColumn: [{
      type: String,
      trim: true
    }]
  },
  requirements: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  navigation: {
    previous: {
      title: {
        type: String,
        trim: true
      },
      slug: {
        type: String,
        trim: true
      }
    },
    next: {
      title: {
        type: String,
        trim: true
      },
      slug: {
        type: String,
        trim: true
      }
    }
  },
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
  socialShares: {
    facebook: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    linkedin: { type: Number, default: 0 },
    pinterest: { type: Number, default: 0 }
  },
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
blogSchema.index({ title: 'text', 'content.intro': 'text', 'content.body': 'text', excerpt: 'text' });
blogSchema.index({ category: 1, published: 1 });
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ featured: 1, published: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });

// Virtual for comment count
blogSchema.virtual('commentCount').get(function() {
  return this.comments.filter(comment => comment.approved).length;
});

// Pre-save middleware to auto-generate slug from title
blogSchema.pre('save', function(next) {
  // Always generate slug from title if slug is empty
  if (!this.slug || this.isModified('title')) {
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

// Method to get approved comments
blogSchema.methods.getApprovedComments = function() {
  return this.comments.filter(comment => comment.approved);
};

// Static method to find similar blogs
blogSchema.statics.findSimilar = function(blogId, category, tags, limit = 3) {
  return this.find({
    _id: { $ne: blogId },
    published: true,
    $or: [
      { category: category },
      { tags: { $in: tags } }
    ]
  })
  .sort('-createdAt')
  .limit(limit)
  .select('-comments -content');
};

module.exports = mongoose.model('Blog', blogSchema);