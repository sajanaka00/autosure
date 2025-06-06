const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/:id - Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/slug/:slug - Get category by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/categories - Create new category (single or bulk)
router.post('/', async (req, res) => {
  try {
    // Handle both single object and array of objects
    const isArray = Array.isArray(req.body);
    const categories = isArray ? req.body : [req.body];

    // Validate that all categories have required fields
    for (let i = 0; i < categories.length; i++) {
      const { name, slug } = categories[i];
      if (!name || !slug) {
        return res.status(400).json({ 
          error: `Category at index ${i}: name and slug are required` 
        });
      }
    }

    // Check for duplicate slugs in the request
    const slugs = categories.map(cat => cat.slug);
    const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
    if (duplicateSlugs.length > 0) {
      return res.status(400).json({ 
        error: `Duplicate slugs in request: ${duplicateSlugs.join(', ')}` 
      });
    }

    // Check if any category with same slug already exists in database
    const existingSlugs = await Category.find({ slug: { $in: slugs } }).select('slug');
    if (existingSlugs.length > 0) {
      const existing = existingSlugs.map(cat => cat.slug);
      return res.status(400).json({ 
        error: `Categories with these slugs already exist: ${existing.join(', ')}` 
      });
    }

    // Create categories
    const savedCategories = await Category.insertMany(categories);
    
    // Return single object if single was sent, array if array was sent
    res.status(201).json(isArray ? savedCategories : savedCategories[0]);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/categories/:id - Update category
router.put('/:id', async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    // Check if another category with same slug exists (excluding current category)
    if (slug) {
      const existingCategory = await Category.findOne({ 
        slug, 
        _id: { $ne: req.params.id } 
      });
      if (existingCategory) {
        return res.status(400).json({ error: 'Category with this slug already exists' });
      }
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/categories/:id - Delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;