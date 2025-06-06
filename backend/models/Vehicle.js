const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  model: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  transmission: {
    type: String,
    enum: ['manual', 'automatic'],
    required: true
  },
  mileageRange: {
    type: String,
    required: true,
    trim: true // e.g., "145000Km"
  },
  engineCapacity: {
    type: String,
    required: true,
    trim: true // e.g., "1300CC"
  },
  seatingCapacity: {
    type: Number,
    required: true,
    min: 1,
    max: 15
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  yearOfRegistration: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear()
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    required: true,
    lowercase: true
  },
  avgFuelConsumption: {
    type: String,
    trim: true // e.g., "15Km/l"
  },
  numberOfOwners: {
    type: Number,
    required: true,
    min: 1
  },
  vehicleNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true // e.g., "KJ-4088"
  },
  totalValue: {
    type: Number,
    required: true,
    min: 0
  },
  downPayment: {
    type: Number,
    required: true,
    min: 0
  },
  features: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    isPrimary: {
      type: Boolean,
      default: false
    },
    caption: String
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
}, {
  timestamps: true
});

// Indexes for better query performance
vehicleSchema.index({ make: 1, model: 1 });
vehicleSchema.index({ price: 1 });
vehicleSchema.index({ year: 1 });
vehicleSchema.index({ category: 1 });
vehicleSchema.index({ isAvailable: 1 });
vehicleSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
