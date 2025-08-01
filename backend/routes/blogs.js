const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { body, validationResult, param } = require('express-validator');
const { blog: blogUpload } = require('../middleware/uploads'); // Import organized blog upload

// Async wrapper
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// POST /api/blogs - Create a new blog post with image uploads
router.post('/', blogUpload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'contentImage', maxCount: 1 }
]), asyncHandler(async (req, res) => {
  try {
    // Parse the blog data from the form
    const blogData = JSON.parse(req.body.blogData);
    
    // Handle uploaded images
    if (req.files) {
      if (req.files.heroImage) {
        blogData.images = blogData.images || {};
        blogData.images.hero = `/uploads/blogs/${req.files.heroImage[0].filename}`;
      }
      if (req.files.contentImage) {
        blogData.images = blogData.images || {};
        blogData.images.content = `/uploads/blogs/${req.files.contentImage[0].filename}`;
      }
    }
    
    const blog = new Blog(blogData);
    await blog.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Blog created successfully',
      data: blog 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Blog with this slug already exists' 
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
}));

// POST /api/blogs/json - Create blog with JSON body (no file uploads)
router.post('/json', asyncHandler(async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Blog created successfully',
      data: blog 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Blog with this slug already exists' 
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
}));

// POST /api/blogs/upload-only - Upload blog images only (for testing)
router.post('/upload-only', blogUpload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'contentImage', maxCount: 1 }
]), asyncHandler(async (req, res) => {
  try {
    const uploadedFiles = {};
    
    if (req.files) {
      if (req.files.heroImage) {
        uploadedFiles.heroImage = `/uploads/blogs/${req.files.heroImage[0].filename}`;
      }
      if (req.files.contentImage) {
        uploadedFiles.contentImage = `/uploads/blogs/${req.files.contentImage[0].filename}`;
      }
    }
    
    res.json({
      success: true,
      message: 'Blog images uploaded successfully',
      data: uploadedFiles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error uploading blog images',
      error: error.message
    });
  }
}));

// GET /api/blogs - List blogs with filtering and pagination
router.get('/', asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    featured,
    search,
    sort = '-createdAt',
    author,
    tags
  } = req.query;

  const filter = { published: true };

  if (category) filter.category = category;
  if (author) filter['author.name'] = new RegExp(author, 'i');
  if (featured !== undefined) filter.featured = featured === 'true';
  if (tags) filter.tags = { $in: tags.split(',') };
  if (search) filter.$text = { $search: search };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const blogs = await Blog.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .select('-comments -content.body')
    .lean();

  const total = await Blog.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

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
}));

// GET /api/blogs/featured - List featured blogs
router.get('/featured', asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const featuredBlogs = await Blog.find({ featured: true, published: true })
    .sort('-createdAt')
    .limit(parseInt(limit))
    .select('-comments -content.body')
    .lean();

  res.json({ success: true, data: featuredBlogs });
}));

// GET /api/blogs/categories - Categories with count
router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Blog.aggregate([
    { $match: { published: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  res.json({ success: true, data: categories });
}));

// GET /api/blogs/tags - Popular tags
router.get('/tags', asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;

  const tags = await Blog.aggregate([
    { $match: { published: true } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: parseInt(limit) }
  ]);

  res.json({ success: true, data: tags });
}));

// GET /api/blogs/slug/:slug - Get blog by slug
router.get('/slug/:slug', 
  param('slug').trim().isLength({ min: 1 }).withMessage('Invalid slug'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    // Increment views
    blog.views += 1;
    await blog.save();

    // Get related blogs
    const relatedBlogs = await Blog.findSimilar(blog._id, blog.category, blog.tags, 3);

    res.json({ 
      success: true, 
      data: {
        ...blog.toObject(),
        approvedComments: blog.getApprovedComments(),
        related: relatedBlogs
      }
    });
}));

// GET /api/blogs/:id/related - Related blogs
router.get('/:id/related',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    const { limit = 3 } = req.query;

    const currentBlog = await Blog.findById(req.params.id).select('category tags');
    if (!currentBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const relatedBlogs = await Blog.findSimilar(currentBlog._id, currentBlog.category, currentBlog.tags, parseInt(limit));

    res.json({ success: true, data: relatedBlogs });
}));

// POST /api/blogs/:id/comments - Add comment
router.post('/:id/comments',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  [
    body('author').trim().isLength({ min: 2, max: 50 }).withMessage('Author name must be 2-50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('website').optional().isURL().withMessage('Valid website URL required'),
    body('content').trim().isLength({ min: 10, max: 1000 }).withMessage('Comment must be 10-1000 characters'),
    body('parentId').optional().isMongoId().withMessage('Invalid parent comment ID')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const { author, email, website, content, parentId } = req.body;

    const newComment = {
      author,
      email,
      website: website || '',
      content,
      parentId: parentId || null,
      createdAt: new Date(),
      approved: false // Comments need approval
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json({ 
      success: true, 
      message: 'Comment submitted successfully. It will be visible after approval.',
      data: newComment
    });
}));

// PUT /api/blogs/:id/like - Like a blog post
router.put('/:id/like',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.likes += 1;
    await blog.save();

    res.json({ 
      success: true, 
      data: { likes: blog.likes } 
    });
}));

// PUT /api/blogs/:id/share - Track social shares
router.put('/:id/share',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  body('platform').isIn(['facebook', 'twitter', 'linkedin', 'pinterest']).withMessage('Invalid platform'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { platform } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.socialShares[platform] += 1;
    await blog.save();

    res.json({ 
      success: true, 
      data: { socialShares: blog.socialShares } 
    });
}));

// GET /api/blogs/:id - Blog detail by ID
router.get('/:id',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    // Increment views
    blog.views += 1;
    await blog.save();

    // Get related blogs
    const relatedBlogs = await Blog.findSimilar(blog._id, blog.category, blog.tags, 3);

    res.json({ 
      success: true, 
      data: {
        ...blog.toObject(),
        approvedComments: blog.getApprovedComments(),
        related: relatedBlogs
      }
    });
}));

// Error handling middleware
router.use((error, req, res, next) => {
  console.error('Blog routes error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

module.exports = router;