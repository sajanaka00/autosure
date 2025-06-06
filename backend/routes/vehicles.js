// routes/vehicles.js
const express = require('express');
const Vehicle = require('../models/Vehicle');
const Category = require('../models/Category');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

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

// Create new vehicle
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      'make', 'model', 'transmission', 'mileageRange', 'engineCapacity',
      'seatingCapacity', 'year', 'yearOfRegistration', 'fuelType',
      'numberOfOwners', 'vehicleNumber', 'totalValue', 'downPayment', 'category'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
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
        return res.status(400).json({
          success: false,
          error: 'Category not found with slug: ' + req.body.category
        });
      }
      categoryId = category._id;
    }

    // Create vehicle with the resolved category ID
    const vehicleData = { ...req.body, category: categoryId };
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

// Update vehicle by ID
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        error: 'Vehicle not found' 
      });
    }

    // If updating category, verify it exists
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).json({
          success: false,
          error: 'Invalid category ID'
        });
      }
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      vehicle: updatedVehicle
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
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