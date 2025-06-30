const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { body, validationResult, param, query } = require('express-validator');

// Helper function to handle async routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validation middleware
const blogValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be less than 200 characters'),
  body('category')
    .isIn(['Sound', 'Accessories', 'Exterior', 'Body Kit', 'Fuel Systems', 
           'Oil & Filters', 'Interior', 'Performance', 'Safety', 'Technology'])
    .withMessage('Invalid category'),
  body('author')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Author is required'),
  body('excerpt')
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Excerpt is required and must be less than 300 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('Meta description must be less than 160 characters')
];

// GET /api/blogs - Get all blogs with filtering, sorting, and pagination
router.get('/', asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    featured,
    published = true,
    search,
    sort = '-createdAt',
    author
  } = req.query;

  // Build filter query
  const filter = {};
  
  if (category) filter.category = category;
  if (featured !== undefined) filter.featured = featured === 'true';
  if (published !== undefined) filter.published = published === 'true';
  if (author) filter.author = new RegExp(author, 'i');
  
  // Search functionality
  if (search) {
    filter.$text = { $search: search };
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    // Get blogs with pagination
    const blogs = await Blog.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-comments') // Exclude comments for list view
      .lean();

    // Get total count for pagination
    const total = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalBlogs: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
}));

// GET /api/blogs/featured - Get featured blogs
router.get('/featured', asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  try {
    const featuredBlogs = await Blog.find({ 
      featured: true, 
      published: true 
    })
      .sort('-createdAt')
      .limit(parseInt(limit))
      .select('-comments -content')
      .lean();

    res.json({
      success: true,
      data: featuredBlogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured blogs',
      error: error.message
    });
  }
}));

// GET /api/blogs/categories - Get all categories with post counts
router.get('/categories', asyncHandler(async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
}));

// GET /api/blogs/:id - Get blog by ID
router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const blog = await Blog.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      // Increment view count
      blog.views += 1;
      await blog.save();

      res.json({
        success: true,
        data: blog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching blog',
        error: error.message
      });
    }
  })
);

// GET /api/blogs/slug/:slug - Get blog by slug
router.get('/slug/:slug', 
  param('slug').trim().isLength({ min: 1 }).withMessage('Invalid slug'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const blog = await Blog.findOne({ 
        slug: req.params.slug, 
        published: true 
      });
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      // Increment view count
      blog.views += 1;
      await blog.save();

      res.json({
        success: true,
        data: blog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching blog',
        error: error.message
      });
    }
  })
);

// GET /api/blogs/:id/related - Get related blogs
router.get('/:id/related',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    const { limit = 3 } = req.query;

    try {
      const currentBlog = await Blog.findById(req.params.id).select('category tags');
      
      if (!currentBlog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      // Find related blogs by category and tags
      const relatedBlogs = await Blog.find({
        _id: { $ne: req.params.id },
        published: true,
        $or: [
          { category: currentBlog.category },
          { tags: { $in: currentBlog.tags } }
        ]
      })
        .sort('-createdAt')
        .limit(parseInt(limit))
        .select('-comments -content')
        .lean();

      res.json({
        success: true,
        data: relatedBlogs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching related blogs',
        error: error.message
      });
    }
  })
);

// POST /api/blogs - Create new blog
router.post('/', blogValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  try {
    const {
      title,
      slug,
      category,
      author,
      authorBio,
      authorAvatar,
      excerpt,
      content,
      heroImage,
      contentImage,
      keyPoints,
      requirements,
      tags,
      estimatedReadTime,
      metaDescription,
      featured,
      published
    } = req.body;

    // Generate slug if not provided
    let blogSlug = slug;
    if (!blogSlug) {
      blogSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: blogSlug });
    if (existingBlog) {
      blogSlug = `${blogSlug}-${Date.now()}`;
    }

    // Process tags
    let processedTags = [];
    if (tags) {
      if (Array.isArray(tags)) {
        processedTags = tags.filter(tag => tag.trim() !== '');
      } else if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      }
    }

    const newBlog = new Blog({
      title,
      slug: blogSlug,
      category,
      author,
      authorBio,
      authorAvatar,
      excerpt,
      content,
      heroImage,
      contentImage,
      keyPoints: keyPoints || [],
      requirements: requirements || [],
      tags: processedTags,
      estimatedReadTime,
      metaDescription,
      featured: featured || false,
      published: published !== undefined ? published : true
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: savedBlog
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Blog with this slug already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error creating blog',
        error: error.message
      });
    }
  }
}));

// PUT /api/blogs/:id - Update blog
router.put('/:id', 
  param('id').isMongoId().withMessage('Invalid blog ID'),
  blogValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const {
        title,
        slug,
        category,
        author,
        authorBio,
        authorAvatar,
        excerpt,
        content,
        heroImage,
        contentImage,
        keyPoints,
        requirements,
        tags,
        estimatedReadTime,
        metaDescription,
        featured,
        published
      } = req.body;

      // Process tags
      let processedTags = [];
      if (tags) {
        if (Array.isArray(tags)) {
          processedTags = tags.filter(tag => tag.trim() !== '');
        } else if (typeof tags === 'string') {
          processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        }
      }

      const updateData = {
        title,
        category,
        author,
        authorBio,
        authorAvatar,
        excerpt,
        content,
        heroImage,
        contentImage,
        keyPoints: keyPoints || [],
        requirements: requirements || [],
        tags: processedTags,
        estimatedReadTime,
        metaDescription,
        featured: featured || false,
        published: published !== undefined ? published : true,
        updatedAt: Date.now()
      };

      // Handle slug update
      if (slug) {
        const existingBlog = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
        if (existingBlog) {
          return res.status(400).json({
            success: false,
            message: 'Blog with this slug already exists'
          });
        }
        updateData.slug = slug;
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      res.json({
        success: true,
        message: 'Blog updated successfully',
        data: updatedBlog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating blog',
        error: error.message
      });
    }
  })
);

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

      if (!deletedBlog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      res.json({
        success: true,
        message: 'Blog deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting blog',
        error: error.message
      });
    }
  })
);

// POST /api/blogs/:id/like - Like/Unlike blog
router.post('/:id/like',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      blog.likes += 1;
      await blog.save();

      res.json({
        success: true,
        message: 'Blog liked successfully',
        likes: blog.likes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error liking blog',
        error: error.message
      });
    }
  })
);

// POST /api/blogs/:id/comments - Add comment to blog
router.post('/:id/comments',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  [
    body('author').trim().isLength({ min: 1 }).withMessage('Author name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('content').trim().isLength({ min: 1 }).withMessage('Comment content is required')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const { author, email, content } = req.body;
      
      const blog = await Blog.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      const newComment = {
        author,
        email,
        content,
        createdAt: new Date(),
        approved: false // Comments need approval by default
      };

      blog.comments.push(newComment);
      await blog.save();

      res.status(201).json({
        success: true,
        message: 'Comment added successfully (pending approval)',
        comment: newComment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding comment',
        error: error.message
      });
    }
  })
);

// PUT /api/blogs/:blogId/comments/:commentId/approve - Approve comment
router.put('/:blogId/comments/:commentId/approve',
  [
    param('blogId').isMongoId().withMessage('Invalid blog ID'),
    param('commentId').isMongoId().withMessage('Invalid comment ID')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const blog = await Blog.findById(req.params.blogId);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      const comment = blog.comments.id(req.params.commentId);
      
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: 'Comment not found'
        });
      }

      comment.approved = true;
      await blog.save();

      res.json({
        success: true,
        message: 'Comment approved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error approving comment',
        error: error.message
      });
    }
  })
);

// DELETE /api/blogs/:blogId/comments/:commentId - Delete comment
router.delete('/:blogId/comments/:commentId',
  [
    param('blogId').isMongoId().withMessage('Invalid blog ID'),
    param('commentId').isMongoId().withMessage('Invalid comment ID')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const blog = await Blog.findById(req.params.blogId);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      blog.comments.id(req.params.commentId).remove();
      await blog.save();

      res.json({
        success: true,
        message: 'Comment deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting comment',
        error: error.message
      });
    }
  })
);

module.exports = router;