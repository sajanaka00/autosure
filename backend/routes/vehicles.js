// routes/vehicles.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Vehicle = require('../models/Vehicle');
const Category = require('../models/Category');
const mongoose = require('mongoose');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/vehicles';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files
  }
});

// Get all vehicles with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      minPrice,
      maxPrice,
      fuelType,
      transmission,
      minYear,
      maxYear,
      seatingCapacity,
      numberOfOwners,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (search) {
      filter.$or = [
        { make: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { vehicleNumber: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      filter.totalValue = {};
      if (minPrice) filter.totalValue.$gte = Number(minPrice);
      if (maxPrice) filter.totalValue.$lte = Number(maxPrice);
    }

    if (fuelType) filter.fuelType = fuelType.toLowerCase();
    if (transmission) filter.transmission = transmission;
    if (seatingCapacity) filter.seatingCapacity = Number(seatingCapacity);
    if (numberOfOwners) filter.numberOfOwners = { $lte: Number(numberOfOwners) };

    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = Number(minYear);
      if (maxYear) filter.year.$lte = Number(maxYear);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const vehicles = await Vehicle.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count
    const total = await Vehicle.countDocuments(filter);

    res.json({
      success: true,
      vehicles,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch vehicles',
      details: error.message 
    });
  }
});

// Get single vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('category', 'name slug description');

    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        error: 'Vehicle not found' 
      });
    }

    res.json({
      success: true,
      vehicle
    });
  } catch (error) {
    console.error('Get vehicle error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid vehicle ID format' 
      });
    }
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch vehicle',
      details: error.message 
    });
  }
});

// Create new vehicle with image upload
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      'make', 'model', 'transmission', 'mileageRange', 'engineCapacity',
      'seatingCapacity', 'year', 'yearOfRegistration', 'fuelType',
      'numberOfOwners', 'vehicleNumber', 'totalValue', 'downPayment', 'category'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      // Clean up uploaded files if validation fails
      if (req.files) {
        req.files.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      }
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields
      });
    }

    // Check if vehicle number already exists
    const existingVehicle = await Vehicle.findOne({ 
      vehicleNumber: req.body.vehicleNumber.toUpperCase() 
    });
    
    if (existingVehicle) {
      // Clean up uploaded files
      if (req.files) {
        req.files.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      }
      return res.status(400).json({
        success: false,
        error: 'Vehicle with this number already exists'
      });
    }

    // Handle category - accept either ObjectId or slug
    let categoryId;
    if (mongoose.Types.ObjectId.isValid(req.body.category)) {
      // It's an ObjectId
      const category = await Category.findById(req.body.category);
      if (!category) {
        // Clean up uploaded files
        if (req.files) {
          req.files.forEach(file => {
            fs.unlink(file.path, (err) => {
              if (err) console.error('Error deleting file:', err);
            });
          });
        }
        return res.status(400).json({
          success: false,
          error: 'Invalid category ID'
        });
      }
      categoryId = category._id;
    } else {
      // It's a slug
      const category = await Category.findOne({ slug: req.body.category });
      if (!category) {
        // Clean up uploaded files
        if (req.files) {
          req.files.forEach(file => {
            fs.unlink(file.path, (err) => {
              if (err) console.error('Error deleting file:', err);
            });
          });
        }
        return res.status(400).json({
          success: false,
          error: 'Category not found with slug: ' + req.body.category
        });
      }
      categoryId = category._id;
    }

    // Process uploaded images
    let images = [];
    if (req.files && req.files.length > 0) {
      // Parse image metadata from request body if present
      const imageMetadata = req.body.imageMetadata ? JSON.parse(req.body.imageMetadata) : [];
      
      images = req.files.map((file, index) => {
        const metadata = imageMetadata[index] || {};
        return {
          url: `/uploads/vehicles/${file.filename}`,
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          isPrimary: metadata.isPrimary || index === 0, // First image is primary by default
          caption: metadata.caption || ''
        };
      });

      // Ensure only one primary image
      const primaryImages = images.filter(img => img.isPrimary);
      if (primaryImages.length === 0) {
        images[0].isPrimary = true;
      } else if (primaryImages.length > 1) {
        images.forEach((img, index) => {
          img.isPrimary = index === 0;
        });
      }
    }

    // Parse features if it's a string
    let features = req.body.features;
    if (typeof features === 'string') {
      features = features.split(',').map(feature => feature.trim()).filter(Boolean);
    }

    // Create vehicle with the resolved category ID and processed images
    const vehicleData = { 
      ...req.body, 
      category: categoryId,
      images: images,
      features: features || []
    };

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    await vehicle.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      vehicle
    });
  } catch (error) {
    console.error('Create vehicle error:', error);
    
    // Clean up uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        error: 'Validation error', 
        details: Object.values(error.errors).map(e => e.message) 
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate vehicle number'
      });
    }
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create vehicle',
      details: error.message 
    });
  }
});

// Update vehicle by ID with image upload
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      // Clean up uploaded files
      if (req.files) {
        req.files.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      }
      return res.status(404).json({ 
        success: false, 
        error: 'Vehicle not found' 
      });
    }

    // If updating category, verify it exists
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        // Clean up uploaded files
        if (req.files) {
          req.files.forEach(file => {
            fs.unlink(file.path, (err) => {
              if (err) console.error('Error deleting file:', err);
            });
          });
        }
        return res.status(400).json({
          success: false,
          error: 'Invalid category ID'
        });
      }
    }

    // Handle image updates
    let updateData = { ...req.body };
    
    if (req.files && req.files.length > 0) {
      // Process new uploaded images
      const imageMetadata = req.body.imageMetadata ? JSON.parse(req.body.imageMetadata) : [];
      
      const newImages = req.files.map((file, index) => {
        const metadata = imageMetadata[index] || {};
        return {
          url: `/uploads/vehicles/${file.filename}`,
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          isPrimary: metadata.isPrimary || false,
          caption: metadata.caption || ''
        };
      });

      // Handle existing images and image replacement logic
      if (req.body.replaceImages === 'true') {
        // Delete old image files
        vehicle.images.forEach(image => {
          if (image.filename) {
            const filePath = path.join('uploads/vehicles', image.filename);
            fs.unlink(filePath, (err) => {
              if (err) console.error('Error deleting old file:', err);
            });
          }
        });
        
        // Replace with new images
        updateData.images = newImages;
      } else {
        // Append new images to existing ones
        updateData.images = [...vehicle.images, ...newImages];
      }

      // Ensure only one primary image
      if (updateData.images.length > 0) {
        const primaryImages = updateData.images.filter(img => img.isPrimary);
        if (primaryImages.length === 0) {
          updateData.images[0].isPrimary = true;
        } else if (primaryImages.length > 1) {
          updateData.images.forEach((img, index) => {
            img.isPrimary = index === 0;
          });
        }
      }
    }

    // Parse features if it's a string
    if (updateData.features && typeof updateData.features === 'string') {
      updateData.features = updateData.features.split(',').map(feature => feature.trim()).filter(Boolean);
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      vehicle: updatedVehicle
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
    
    // Clean up uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        error: 'Validation error', 
        details: Object.values(error.errors).map(e => e.message) 
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate vehicle number'
      });
    }
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update vehicle',
      details: error.message 
    });
  }
});

// Delete vehicle by ID
router.delete('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        error: 'Vehicle not found' 
      });
    }

    // Delete associated image files
    if (vehicle.images && vehicle.images.length > 0) {
      vehicle.images.forEach(image => {
        if (image.filename) {
          const filePath = path.join('uploads/vehicles', image.filename);
          fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        }
      });
    }

    await Vehicle.findByIdAndDelete(req.params.id);

    res.json({ 
      success: true, 
      message: 'Vehicle deleted successfully' 
    });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid vehicle ID format' 
      });
    }
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete vehicle',
      details: error.message 
    });
  }
});

// Delete specific image from vehicle
router.delete('/:id/images/:imageIndex', async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        error: 'Vehicle not found' 
      });
    }

    const index = parseInt(imageIndex);
    if (index < 0 || index >= vehicle.images.length) {
      return res.status(400).json({
        success: false,
        error: 'Invalid image index'
      });
    }

    const imageToDelete = vehicle.images[index];
    
    // Delete the physical file
    if (imageToDelete.filename) {
      const filePath = path.join('uploads/vehicles', imageToDelete.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    // Remove from array
    vehicle.images.splice(index, 1);

    // If the deleted image was primary and there are other images, make the first one primary
    if (imageToDelete.isPrimary && vehicle.images.length > 0) {
      vehicle.images[0].isPrimary = true;
    }

    await vehicle.save();

    res.json({
      success: true,
      message: 'Image deleted successfully',
      vehicle
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete image',
      details: error.message 
    });
  }
});

// Get vehicles by category
router.get('/category/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found' 
      });
    }

    const vehicles = await Vehicle.find({ category: category._id })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      category: category,
      vehicles,
      count: vehicles.length
    });
  } catch (error) {
    console.error('Get vehicles by category error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch vehicles by category',
      details: error.message 
    });
  }
});

// Get vehicle statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    
    const vehiclesByCategory = await Vehicle.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $unwind: '$categoryInfo'
      },
      {
        $group: {
          _id: '$categoryInfo.name',
          count: { $sum: 1 },
          avgPrice: { $avg: '$totalValue' }
        }
      }
    ]);

    const vehiclesByFuelType = await Vehicle.aggregate([
      {
        $group: {
          _id: '$fuelType',
          count: { $sum: 1 }
        }
      }
    ]);

    const vehiclesByTransmission = await Vehicle.aggregate([
      {
        $group: {
          _id: '$transmission',
          count: { $sum: 1 }
        }
      }
    ]);

    const priceRange = await Vehicle.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$totalValue' },
          maxPrice: { $max: '$totalValue' },
          avgPrice: { $avg: '$totalValue' }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalVehicles,
        vehiclesByCategory,
        vehiclesByFuelType,
        vehiclesByTransmission,
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0, avgPrice: 0 }
      }
    });
  } catch (error) {
    console.error('Get vehicle stats error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch vehicle statistics',
      details: error.message 
    });
  }
});

// Search vehicles with advanced filters
router.post('/search', async (req, res) => {
  try {
    const {
      filters = {},
      sort = { createdAt: -1 },
      page = 1,
      limit = 12
    } = req.body;

    const skip = (page - 1) * limit;

    // Build MongoDB query from filters
    const query = {};

    if (filters.make) {
      query.make = { $regex: filters.make, $options: 'i' };
    }
    
    if (filters.model) {
      query.model = { $regex: filters.model, $options: 'i' };
    }

    if (filters.priceRange) {
      query.totalValue = {};
      if (filters.priceRange.min) query.totalValue.$gte = filters.priceRange.min;
      if (filters.priceRange.max) query.totalValue.$lte = filters.priceRange.max;
    }

    if (filters.yearRange) {
      query.year = {};
      if (filters.yearRange.min) query.year.$gte = filters.yearRange.min;
      if (filters.yearRange.max) query.year.$lte = filters.yearRange.max;
    }

    if (filters.fuelType && filters.fuelType.length > 0) {
      query.fuelType = { $in: filters.fuelType };
    }

    if (filters.transmission && filters.transmission.length > 0) {
      query.transmission = { $in: filters.transmission };
    }

    if (filters.seatingCapacity) {
      query.seatingCapacity = filters.seatingCapacity;
    }

    if (filters.maxOwners) {
      query.numberOfOwners = { $lte: filters.maxOwners };
    }

    const vehicles = await Vehicle.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Vehicle.countDocuments(query);

    res.json({
      success: true,
      vehicles,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      appliedFilters: filters
    });
  } catch (error) {
    console.error('Search vehicles error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search vehicles',
      details: error.message 
    });
  }
});

module.exports = router;