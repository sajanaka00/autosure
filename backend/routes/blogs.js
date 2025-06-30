const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { body, validationResult, param } = require('express-validator');

// Async wrapper
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/blogs - List blogs with filtering and pagination
router.get('/', asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    featured,
    search,
    sort = '-createdAt',
    author
  } = req.query;

  const filter = { published: true }; // always return only published posts

  if (category) filter.category = category;
  if (author) filter.author = new RegExp(author, 'i');
  if (featured !== undefined) filter.featured = featured === 'true';
  if (search) filter.$text = { $search: search };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const blogs = await Blog.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .select('-comments')
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
    .select('-comments -content')
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

    blog.views += 1;
    await blog.save();

    res.json({ success: true, data: blog });
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

    res.json({ success: true, data: relatedBlogs });
}));

// GET /api/blogs/:id - Blog detail by ID
router.get('/:id',
  param('id').isMongoId().withMessage('Invalid blog ID'),
  asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.views += 1;
    await blog.save();

    res.json({ success: true, data: blog });
}));

module.exports = router;