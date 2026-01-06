import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, X, Star, Image as ImageIcon, Plus, Info, CheckCircle, ChevronRight, ChevronLeft, Camera, LayoutGrid, Settings, Gauge, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './AddVehiclePage.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function AddVehiclePage({ user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Basic Information
    make: '',
    model: '',
    year: '',
    condition: '',
    bodyType: '',

    // Technical Specifications
    engineSize: '',
    engineType: '',
    transmission: '',
    driveType: '',
    fuelType: '',
    cylinders: '',
    doors: '',
    seatingCapacity: '',

    // Performance
    horsepower: '',
    torque: '',
    topSpeed: '',
    acceleration060: '',

    // Dimensions
    length: '',
    width: '',
    height: '',
    wheelbase: '',
    curbWeight: '',
    cargoCapacity: '',

    // Efficiency & Capacity
    fuelTankCapacity: '',
    cityMPG: '',
    highwayMPG: '',

    // Warranty
    warrantyBasic: '',
    warrantyDrivetrain: '',
    warrantyRoadside: '',
    warrantyRust: '',

    // Color & Aesthetics
    color: '',
    interiorColor: '',

    // Pricing
    price: '',
    originalPrice: '',
    downPayment: '',

    // Location & Contact
    dealerName: '',
    dealerAddress: '',
    dealerPhone: '',

    // Description & Features
    title: '',
    description: '',
    features: [],

    // Additional
    category: '',
    badge: '',
    badgeColor: 'blue'
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  // Predefined options
  const makeOptions = ['BMW', 'Mercedes-Benz', 'Toyota', 'Honda', 'Ford', 'Tesla', 'Audi', 'Jeep', 'Nissan', 'Hyundai'];
  const conditionOptions = ['New', 'Used', 'CPO'];
  const bodyTypeOptions = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Pickup Truck', 'Wagon', 'Van'];
  const transmissionOptions = ['Manual', 'Automatic', 'CVT'];
  const fuelTypeOptions = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'];
  const driveTypeOptions = ['Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive', 'Four-Wheel Drive'];
  const badgeOptions = [
    { value: 'New Arrival', color: 'blue' },
    { value: 'Best Value', color: 'green' },
    { value: 'Great Deal', color: 'green' },
    { value: 'Low Mileage', color: 'blue' },
    { value: 'Premium', color: 'blue' },
    { value: 'Sport Package', color: 'blue' },
    { value: 'Certified', color: 'blue' },
    { value: 'Eco-Friendly', color: 'green' }
  ];

  const commonFeatures = [
    'Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Power Windows',
    'Central Locking', 'Leather Seats', 'Sunroof', 'Navigation System',
    'Bluetooth', 'Backup Camera', 'Heated Seats', 'Cruise Control',
    'Keyless Entry', 'Remote Start', 'Parking Sensors', 'Lane Departure Warning',
    'Blind Spot Monitoring', 'Automatic Emergency Braking', 'Apple CarPlay',
    'Android Auto', 'Wireless Charging', 'Premium Sound System'
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories(user?.token);
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data.success && data.categories) {
        setCategories(data.categories);
      } else if (data.categories) {
        setCategories(data.categories);
      } else {
        setError('Failed to load categories - unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const addCustomFeature = () => {
    const customFeatureInput = document.getElementById('customFeature');
    const customFeature = customFeatureInput?.value.trim();
    if (customFeature && !formData.features.includes(customFeature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, customFeature]
      }));
      customFeatureInput.value = '';
    }
  };

  const removeFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5;
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (imageFiles.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return false;
      }
      if (file.size > maxFileSize) {
        setError(`File ${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    const remainingSlots = maxImages - imageFiles.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (validFiles.length > remainingSlots) {
      setError(`Only ${remainingSlots} more images can be added`);
    }

    setImageFiles(prev => [...prev, ...filesToAdd]);

    const newPreviews = filesToAdd.map(file => ({
      file,
      url: URL.createObjectURL(file),
      caption: ''
    }));

    setImagePreviews(prev => [...prev, ...newPreviews]);
    setError('');
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index].url);

    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));

    if (featuredImageIndex >= index && featuredImageIndex > 0) {
      setFeaturedImageIndex(prev => prev - 1);
    }
  };

  const setFeaturedImage = (index) => {
    setFeaturedImageIndex(index);
  };

  const updateImageCaption = (index, caption) => {
    setImagePreviews(prev => prev.map((img, i) =>
      i === index ? { ...img, caption } : img
    ));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.make && formData.model && formData.year && formData.condition && formData.bodyType;
      case 2:
        return formData.engineSize && formData.transmission && formData.fuelType && formData.mileage;
      case 3:
        return true; // Optional fields for performance
      case 4:
        return formData.price && formData.title && formData.description;
      case 5:
        return imageFiles.length > 0;
      case 6:
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 6));
      setError('');
    } else {
      setError('Please fill in all required fields before proceeding');
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitFormData = new FormData();

      // Map form data to match expected fields
      const vehicleData = {
        ...formData,
        mileageRange: formData.mileage,
        totalValue: formData.price,
        features: formData.features.join(', '),
        yearOfRegistration: formData.year
      };

      Object.keys(vehicleData).forEach(key => {
        if (vehicleData[key] !== '' && vehicleData[key] !== null && vehicleData[key] !== undefined) {
          submitFormData.append(key, vehicleData[key]);
        }
      });

      imageFiles.forEach(file => {
        submitFormData.append('images', file);
      });

      if (imageFiles.length > 0) {
        const imageMetadata = imagePreviews.map((preview, index) => ({
          isFeatured: index === featuredImageIndex,
          caption: preview.caption || ''
        }));
        submitFormData.append('imageMetadata', JSON.stringify(imageMetadata));
      }

      const data = await api.createVehicle(submitFormData, user?.token);

      if (data.success) {
        setSuccess('Vehicle added successfully!');

        // Reset form
        setFormData({
          // Basic Info
          make: '', model: '', year: '', condition: '', bodyType: '',
          // Engine & Transmission
          engineSize: '', engineType: '', transmission: '', driveType: '', fuelType: '', cylinders: '',
          // Performance
          horsepower: '', torque: '', topSpeed: '', acceleration060: '',
          // Dimensions
          length: '', width: '', height: '', wheelbase: '', curbWeight: '', cargoCapacity: '',
          // Capacities & Fuel
          fuelTankCapacity: '', cityMPG: '', highwayMPG: '', doors: '', seatingCapacity: '',
          // Warranty
          warrantyBasic: '', warrantyDrivetrain: '', warrantyRoadside: '', warrantyRust: '',
          // Pricing & Misc
          mileage: '', avgFuelConsumption: '', numberOfOwners: '', vehicleNumber: '', vin: '',
          color: '', interiorColor: '', price: '', originalPrice: '', downPayment: '',
          dealerName: '', dealerAddress: '', dealerPhone: '',
          title: '', description: '', features: [], category: '', badge: '', badgeColor: 'blue'
        });

        setImageFiles([]);
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        setImagePreviews([]);
        setFeaturedImageIndex(0);
        setActiveStep(1);

        // Redirect after success
        setTimeout(() => {
          navigate('/vehicles-for-sale');
        }, 2000);
      } else {
        setError(data.error || 'Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const renderStepIndicator = () => {
    const stepNames = ['Basic Info', 'Engine & Trans', 'Perf & Dimensions', 'Details & Price', 'Images', 'Review'];
    const progress = (activeStep / 6) * 100;

    return (
      <div className="add-car-step-indicator">
        <div className="add-car-progress-header">
          <div className="add-car-current-step">
            {stepNames[activeStep - 1]}
          </div>
          <div className="add-car-step-counter">
            Step {activeStep} of 6
          </div>
        </div>

        <div className="add-car-progress-container">
          <div
            className="add-car-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="add-car-steps-list">
          {stepNames.map((name, index) => (
            <li
              key={index}
              className={`add-car-step-item ${index + 1 < activeStep ? 'completed' :
                index + 1 === activeStep ? 'active' : ''
                }`}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderStep = () => {
    const stepVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    };

    const containerVariants = {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    };

    const itemVariants = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 }
    };

    switch (activeStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            className="add-car-form-step"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="add-car-step-header">
              <div className="add-car-step-icon-wrapper">
                <Info size={24} className="add-car-step-icon" />
              </div>
              <div>
                <h3 className="add-car-step-title">Basic Information</h3>
                <p className="add-car-step-desc">Establish the core identity of the vehicle</p>
              </div>
            </div>

            <motion.div className="add-car-form-grid" variants={containerVariants} animate="animate">
              <motion.div className="add-car-form-group" variants={itemVariants}>
                <label className="add-car-form-label">Make *</label>
                <div className="add-car-input-wrapper">
                  <select
                    name="make"
                    className="add-car-form-input"
                    value={formData.make}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Make</option>
                    {makeOptions.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>
              </motion.div>

              <motion.div className="add-car-form-group" variants={itemVariants}>
                <label className="add-car-form-label">Model *</label>
                <div className="add-car-input-wrapper">
                  <input
                    type="text"
                    name="model"
                    className="add-car-form-input"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g., M235i xDrive Gran Coupé"
                    required
                  />
                </div>
              </motion.div>

              <motion.div className="add-car-form-group" variants={itemVariants}>
                <label className="add-car-form-label">Year *</label>
                <input
                  type="number"
                  name="year"
                  className="add-car-form-input"
                  min="1900"
                  max={currentYear + 1}
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              <motion.div className="add-car-form-group" variants={itemVariants}>
                <label className="add-car-form-label">Condition *</label>
                <select
                  name="condition"
                  className="add-car-form-input"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Condition</option>
                  {conditionOptions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div className="add-car-form-group" variants={itemVariants}>
                <label className="add-car-form-label">Body Type *</label>
                <select
                  name="bodyType"
                  className="add-car-form-input"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Body Type</option>
                  {bodyTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div className="add-car-form-group" variants={itemVariants}>
                <label className="add-car-form-label">Category</label>
                <select
                  name="category"
                  className="add-car-form-input"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            className="add-car-form-step"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="add-car-step-header">
              <div className="add-car-step-icon-wrapper">
                <Settings size={24} className="add-car-step-icon" />
              </div>
              <div>
                <h3 className="add-car-step-title">Engine & Transmission</h3>
                <p className="add-car-step-desc">Technical specifications and drivetrain details</p>
              </div>
            </div>

            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">Engine Size *</label>
                <input
                  type="text"
                  name="engineSize"
                  className="add-car-form-input"
                  value={formData.engineSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 2.0L Turbo I4"
                  required
                />
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Transmission *</label>
                <select
                  name="transmission"
                  className="add-car-form-input"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Transmission</option>
                  {transmissionOptions.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Fuel Type *</label>
                <select
                  name="fuelType"
                  className="add-car-form-input"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Fuel Type</option>
                  {fuelTypeOptions.map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Drive Type</label>
                <select
                  name="driveType"
                  className="add-car-form-input"
                  value={formData.driveType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Drive Type</option>
                  {driveTypeOptions.map(drive => (
                    <option key={drive} value={drive}>{drive}</option>
                  ))}
                </select>
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Mileage *</label>
                <input
                  type="text"
                  name="mileage"
                  className="add-car-form-input"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="e.g., 8,500 mi"
                  required
                />
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Seating Capacity</label>
                <input
                  type="number"
                  name="seatingCapacity"
                  className="add-car-form-input"
                  value={formData.seatingCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            className="add-car-form-step"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="add-car-step-header">
              <div className="add-car-step-icon-wrapper">
                <Gauge size={24} className="add-car-step-icon" />
              </div>
              <div>
                <h3 className="add-car-step-title">Performance & Warranty</h3>
                <p className="add-car-step-desc">Advanced technical data and coverage</p>
              </div>
            </div>

            <div className="add-car-form-section-title">Performance Metrics</div>
            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">Horsepower (HP)</label>
                <input
                  type="text"
                  name="horsepower"
                  className="add-car-form-input"
                  value={formData.horsepower}
                  onChange={handleInputChange}
                  placeholder="e.g., 301"
                />
              </div>
              <div className="add-car-form-group">
                <label className="add-car-form-label">Torque (lb-ft)</label>
                <input
                  type="text"
                  name="torque"
                  className="add-car-form-input"
                  value={formData.torque}
                  onChange={handleInputChange}
                  placeholder="e.g., 331"
                />
              </div>
              <div className="add-car-form-group">
                <label className="add-car-form-label">0-60 mph (sec)</label>
                <input
                  type="text"
                  name="acceleration060"
                  className="add-car-form-input"
                  value={formData.acceleration060}
                  onChange={handleInputChange}
                  placeholder="e.g., 4.7"
                />
              </div>
              <div className="add-car-form-group">
                <label className="add-car-form-label">Top Speed (mph)</label>
                <input
                  type="text"
                  name="topSpeed"
                  className="add-car-form-input"
                  value={formData.topSpeed}
                  onChange={handleInputChange}
                  placeholder="e.g., 155"
                />
              </div>
            </div>

            <div className="add-car-form-section-title">Warranty Coverage</div>
            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">Basic Warranty</label>
                <input
                  type="text"
                  name="warrantyBasic"
                  className="add-car-form-input"
                  value={formData.warrantyBasic}
                  onChange={handleInputChange}
                  placeholder="e.g., 4 Years / 50,000 Miles"
                />
              </div>
              <div className="add-car-form-group">
                <label className="add-car-form-label">Drivetrain Warranty</label>
                <input
                  type="text"
                  name="warrantyDrivetrain"
                  className="add-car-form-input"
                  value={formData.warrantyDrivetrain}
                  onChange={handleInputChange}
                  placeholder="e.g., 4 Years / 50,000 Miles"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            className="add-car-form-step"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="add-car-step-header">
              <div className="add-car-step-icon-wrapper">
                <LayoutGrid size={24} className="add-car-step-icon" />
              </div>
              <div>
                <h3 className="add-car-step-title">Details & Pricing</h3>
                <p className="add-car-step-desc">Dimensions, visibility, and market value</p>
              </div>
            </div>

            <div className="add-car-form-group">
              <label className="add-car-form-label">Vehicle Listing Title *</label>
              <input
                type="text"
                name="title"
                className="add-car-form-input"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., 2024 BMW M235i xDrive Gran Coupé"
                required
              />
            </div>

            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  className="add-car-form-input"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="45900"
                  required
                />
              </div>
              <div className="add-car-form-group">
                <label className="add-car-form-label">Exterior Color</label>
                <input
                  type="text"
                  name="color"
                  className="add-car-form-input"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Brooklyn Grey"
                />
              </div>
              <div className="add-car-form-group">
                <label className="add-car-form-label">Interior Color</label>
                <input
                  type="text"
                  name="interiorColor"
                  className="add-car-form-input"
                  value={formData.interiorColor}
                  onChange={handleInputChange}
                  placeholder="e.g., Magma Red"
                />
              </div>
              <div className="add-car-form-group">
                <label className="add-car-form-label">Badge</label>
                <select
                  name="badge"
                  className="add-car-form-input"
                  value={formData.badge}
                  onChange={(e) => {
                    const selectedBadge = badgeOptions.find(b => b.value === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      badge: e.target.value,
                      badgeColor: selectedBadge ? selectedBadge.color : 'blue'
                    }));
                  }}
                >
                  <option value="">No Badge</option>
                  {badgeOptions.map(badge => (
                    <option key={badge.value} value={badge.value}>{badge.value}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="add-car-form-group">
              <label className="add-car-form-label">Description *</label>
              <textarea
                name="description"
                className="add-car-form-textarea"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your vehicle's standout features and condition..."
                required
              />
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            className="add-car-form-step"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="add-car-step-header">
              <div className="add-car-step-icon-wrapper">
                <Camera size={24} className="add-car-step-icon" />
              </div>
              <div>
                <h3 className="add-car-step-title">Images & Features</h3>
                <p className="add-car-step-desc">Visual presentation and equipment list</p>
              </div>
            </div>

            <div className="add-car-upload-section">
              <div className="add-car-upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="add-car-upload-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="add-car-upload-label">
                  <div className="add-car-upload-icon-circle">
                    <Upload className="add-car-upload-icon" />
                  </div>
                  <span className="add-car-upload-text">Upload Vehicle Photos</span>
                  <span className="add-car-upload-subtext">Max 5 photos, up to 5MB each</span>
                </label>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="add-car-image-previews">
                <div className="add-car-preview-grid">
                  {imagePreviews.map((preview, index) => (
                    <motion.div
                      key={index}
                      className="add-car-preview-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="add-car-preview-container">
                        <img src={preview.url} alt={`Preview ${index + 1}`} className="add-car-preview-image" />
                        <button type="button" onClick={() => removeImage(index)} className="add-car-remove-btn">
                          <X size={14} />
                        </button>
                        {featuredImageIndex === index && <div className="add-car-featured-tag">Main Photo</div>}
                      </div>
                      <button
                        type="button"
                        onClick={() => setFeaturedImage(index)}
                        className={`add-car-set-main-btn ${featuredImageIndex === index ? 'active' : ''}`}
                      >
                        {featuredImageIndex === index ? 'Main Photo' : 'Set as Main'}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="add-car-features-section">
              <h4 className="add-car-section-subtitle">Key Features</h4>
              <div className="add-car-features-grid">
                {commonFeatures.map(feature => (
                  <label key={feature} className={`add-car-feature-chip ${formData.features.includes(feature) ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      hidden
                    />
                    {formData.features.includes(feature) && <CheckCircle size={14} />}
                    {feature}
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step6"
            className="add-car-form-step"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="add-car-step-header">
              <div className="add-car-step-icon-wrapper">
                <Sparkles size={24} className="add-car-step-icon" />
              </div>
              <div>
                <h3 className="add-car-step-title">Review & Submit</h3>
                <p className="add-car-step-desc">Confirm your vehicle details before listing</p>
              </div>
            </div>

            <div className="add-car-review-summary">
              <div className="add-car-review-main">
                <div className="add-car-review-images-mini">
                  {imagePreviews.map((img, i) => (
                    <img key={i} src={img.url} alt="Review" className={i === featuredImageIndex ? 'featured' : ''} />
                  ))}
                </div>
                <div className="add-car-review-info">
                  <h4>{formData.title}</h4>
                  <div className="add-car-review-stats">
                    <span>{formData.year} {formData.make} {formData.model}</span>
                    <span>•</span>
                    <span>${parseFloat(formData.price || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="add-car-review-grid-detailed">
                <div className="review-group">
                  <h6>Mechanical</h6>
                  <p>{formData.engineSize} • {formData.horsepower} HP • {formData.transmission}</p>
                </div>
                <div className="review-group">
                  <h6>Condition</h6>
                  <p>{formData.condition} • {formData.mileage} miles</p>
                </div>
                <div className="review-group">
                  <h6>Dimensions</h6>
                  <p>{formData.length}" L x {formData.width}" W</p>
                </div>
                <div className="review-group">
                  <h6>Aesthetics</h6>
                  <p>Ext: {formData.color} • Int: {formData.interiorColor}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

    }
  };

  return (
    <div>
      <Navbar />

      <div className="add-car-page">
        <div className="add-car-container">
          {/* Header */}
          <div className="add-car-header">
            <button
              onClick={() => navigate('/vehicles-for-sale')}
              className="add-car-back-btn"
            >
              <ArrowLeft className="add-car-back-icon" />
              Back to Listings
            </button>

            <h1 className="add-car-title">Add New Vehicle</h1>
            <p className="add-car-subtitle">Fill in the details to list your vehicle</p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Error/Success Messages */}
          {error && (
            <div className="add-car-message add-car-message--error">
              {error}
            </div>
          )}

          {success && (
            <div className="add-car-message add-car-message--success">
              {success}
            </div>
          )}

          {/* Form */}
          <div className="add-car-form-container">
            <form onSubmit={handleSubmit} className="add-car-form">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="add-car-form-navigation">
                {activeStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="add-car-nav-btn add-car-nav-btn--secondary"
                  >
                    <ArrowLeft className="add-car-nav-icon" />
                    Previous
                  </button>
                )}

                <div className="add-car-nav-spacer" />

                {activeStep < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="add-car-nav-btn add-car-nav-btn--primary"
                    disabled={!validateStep(activeStep)}
                  >
                    Next
                    <ChevronRight className="add-car-nav-icon--right" size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="add-car-submit-btn"
                    disabled={loading || !imageFiles.length}
                  >
                    {loading ? 'Adding Vehicle...' : 'Add Vehicle'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}