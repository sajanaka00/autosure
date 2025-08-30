import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Star, Image as ImageIcon, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import '../../../styles/add-car.css';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

export default function AddCar({ user }) {
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
    
    // Performance & Condition
    mileage: '',
    avgFuelConsumption: '',
    numberOfOwners: '',
    vehicleNumber: '',
    vin: '',
    color: '',
    
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
        return formData.price && formData.title && formData.description;
      case 4:
        return imageFiles.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 5));
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
          make: '', model: '', year: '', condition: '', bodyType: '',
          engineSize: '', engineType: '', transmission: '', driveType: '', fuelType: '',
          cylinders: '', doors: '', seatingCapacity: '', mileage: '',
          avgFuelConsumption: '', numberOfOwners: '', vehicleNumber: '', vin: '',
          color: '', price: '', originalPrice: '', downPayment: '',
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
    const stepNames = ['Basic Info', 'Specifications', 'Details', 'Images', 'Review'];
    const progress = (activeStep / 5) * 100;
    
    return (
      <div className="add-car-step-indicator">
        <div className="add-car-progress-header">
          <div className="add-car-current-step">
            {stepNames[activeStep - 1]}
          </div>
          <div className="add-car-step-counter">
            Step {activeStep} of 5
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
              className={`add-car-step-item ${
                index + 1 < activeStep ? 'completed' : 
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
    switch (activeStep) {
      case 1:
        return (
          <div className="add-car-form-step">
            <h3 className="add-car-step-title">Basic Information</h3>
            
            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">Make *</label>
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

              <div className="add-car-form-group">
                <label className="add-car-form-label">Model *</label>
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
            </div>

            <div className="add-car-form-grid">
              <div className="add-car-form-group">
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
              </div>

              <div className="add-car-form-group">
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
              </div>
            </div>

            <div className="add-car-form-grid">
              <div className="add-car-form-group">
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
              </div>

              <div className="add-car-form-group">
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
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="add-car-form-step">
            <h3 className="add-car-step-title">Technical Specifications</h3>
            
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
            </div>

            <div className="add-car-form-grid">
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
            </div>

            <div className="add-car-form-grid">
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
                <label className="add-car-form-label">Doors</label>
                <select
                  name="doors"
                  className="add-car-form-input"
                  value={formData.doors}
                  onChange={handleInputChange}
                >
                  <option value="">Select Doors</option>
                  <option value="2">2 Doors</option>
                  <option value="3">3 Doors</option>
                  <option value="4">4 Doors</option>
                  <option value="5">5 Doors</option>
                </select>
              </div>
            </div>

            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">Seating Capacity</label>
                <input
                  type="number"
                  name="seatingCapacity"
                  className="add-car-form-input"
                  min="1"
                  max="15"
                  value={formData.seatingCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                />
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Color</label>
                <input
                  type="text"
                  name="color"
                  className="add-car-form-input"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Storm Bay Metallic"
                />
              </div>
            </div>

            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">VIN</label>
                <input
                  type="text"
                  name="vin"
                  className="add-car-form-input"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder="e.g., WBA53AK07PCG12345"
                />
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  className="add-car-form-input"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., KJ-4088"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="add-car-form-step">
            <h3 className="add-car-step-title">Details & Pricing</h3>
            
            <div className="add-car-form-group">
              <label className="add-car-form-label">Vehicle Title *</label>
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

            <div className="add-car-form-group">
              <label className="add-car-form-label">Description *</label>
              <textarea
                name="description"
                className="add-car-form-textarea"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the vehicle, its condition, and special features..."
                required
              />
            </div>

            <div className="add-car-form-grid">
              <div className="add-car-form-group">
                <label className="add-car-form-label">Price *</label>
                <input
                  type="number"
                  name="price"
                  className="add-car-form-input"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 45900"
                  required
                />
              </div>

              <div className="add-car-form-group">
                <label className="add-car-form-label">Original Price</label>
                <input
                  type="number"
                  name="originalPrice"
                  className="add-car-form-input"
                  min="0"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 49900"
                />
              </div>
            </div>

            <div className="add-car-form-grid">
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

              <div className="add-car-form-group">
                <label className="add-car-form-label">Number of Owners</label>
                <input
                  type="number"
                  name="numberOfOwners"
                  className="add-car-form-input"
                  min="1"
                  value={formData.numberOfOwners}
                  onChange={handleInputChange}
                  placeholder="e.g., 1"
                />
              </div>
            </div>

            <div className="add-car-form-section">
              <h4 className="add-car-section-subtitle">Dealer Information</h4>
              
              <div className="add-car-form-group">
                <label className="add-car-form-label">Dealer Name</label>
                <input
                  type="text"
                  name="dealerName"
                  className="add-car-form-input"
                  value={formData.dealerName}
                  onChange={handleInputChange}
                  placeholder="e.g., BMW of Manhattan"
                />
              </div>

              <div className="add-car-form-grid">
                <div className="add-car-form-group">
                  <label className="add-car-form-label">Dealer Address</label>
                  <input
                    type="text"
                    name="dealerAddress"
                    className="add-car-form-input"
                    value={formData.dealerAddress}
                    onChange={handleInputChange}
                    placeholder="e.g., 555 West 57th Street, New York"
                  />
                </div>

                <div className="add-car-form-group">
                  <label className="add-car-form-label">Dealer Phone</label>
                  <input
                    type="tel"
                    name="dealerPhone"
                    className="add-car-form-input"
                    value={formData.dealerPhone}
                    onChange={handleInputChange}
                    placeholder="e.g., +1-212-586-8787"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="add-car-form-step">
            <h3 className="add-car-step-title">Vehicle Images</h3>
            
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
                  <Upload className="add-car-upload-icon" />
                  <span className="add-car-upload-text">
                    Click to upload images
                  </span>
                  <span className="add-car-upload-subtext">
                    Maximum 5 images, 5MB each
                  </span>
                </label>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="add-car-image-previews">
                <h4 className="add-car-preview-title">
                  Image Previews ({imagePreviews.length}/5)
                </h4>
                
                <div className="add-car-preview-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="add-car-preview-item">
                      <div className="add-car-preview-container">
                        <img
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          className="add-car-preview-image"
                        />
                        
                        {featuredImageIndex === index && (
                          <div className="add-car-featured-badge">
                            <Star className="add-car-featured-icon" />
                            <span>Featured</span>
                          </div>
                        )}
                        
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="add-car-remove-btn"
                          title="Remove image"
                        >
                          <X className="add-car-remove-icon" />
                        </button>
                      </div>
                      
                      <div className="add-car-preview-controls">
                        <input
                          type="text"
                          placeholder="Image caption (optional)"
                          value={preview.caption}
                          onChange={(e) => updateImageCaption(index, e.target.value)}
                          className="add-car-caption-input"
                        />
                        
                        <button
                          type="button"
                          onClick={() => setFeaturedImage(index)}
                          className={`add-car-featured-btn ${featuredImageIndex === index ? 'add-car-featured-btn-active' : ''}`}
                        >
                          <Star className="add-car-star-icon" />
                          Set as Featured
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Section */}
            <div className="add-car-features-section">
              <h4 className="add-car-section-subtitle">Vehicle Features</h4>
              
              <div className="add-car-features-grid">
                {commonFeatures.map(feature => (
                  <div key={feature} className="add-car-feature-item">
                    <label className="add-car-feature-label">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="add-car-feature-checkbox"
                      />
                      <span className="add-car-feature-text">{feature}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="add-car-custom-feature">
                <div className="add-car-custom-input-group">
                  <input
                    type="text"
                    id="customFeature"
                    placeholder="Add custom feature"
                    className="add-car-form-input"
                    onKeyPress={(e) => e.key === 'Enter' && addCustomFeature()}
                  />
                  <button
                    type="button"
                    onClick={addCustomFeature}
                    className="add-car-add-feature-btn"
                  >
                    <Plus className="add-car-plus-icon" />
                    Add
                  </button>
                </div>

                {formData.features.length > 0 && (
                  <div className="add-car-selected-features">
                    <h5>Selected Features ({formData.features.length}):</h5>
                    <div className="add-car-feature-tags">
                      {formData.features.map(feature => (
                        <div key={feature} className="add-car-feature-tag">
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(feature)}
                            className="add-car-feature-remove"
                          >
                            <X className="add-car-x-icon" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="add-car-form-step">
            <h3 className="add-car-step-title">Review & Submit</h3>
            
            <div className="add-car-review-section">
              <div className="add-car-review-card">
                <h4 className="add-car-review-title">Vehicle Summary</h4>
                
                <div className="add-car-review-content">
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Title:</span>
                    <span className="add-car-review-value">{formData.title || 'Not specified'}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Vehicle:</span>
                    <span className="add-car-review-value">{formData.year} {formData.make} {formData.model}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Condition:</span>
                    <span className="add-car-review-value">{formData.condition}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Body Type:</span>
                    <span className="add-car-review-value">{formData.bodyType}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Engine:</span>
                    <span className="add-car-review-value">{formData.engineSize || 'Not specified'}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Transmission:</span>
                    <span className="add-car-review-value">{formData.transmission}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Fuel Type:</span>
                    <span className="add-car-review-value">{formData.fuelType}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Mileage:</span>
                    <span className="add-car-review-value">{formData.mileage || 'Not specified'}</span>
                  </div>
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Price:</span>
                    <span className="add-car-review-value">${parseFloat(formData.price || 0).toLocaleString()}</span>
                  </div>
                  
                  {formData.badge && (
                    <div className="add-car-review-row">
                      <span className="add-car-review-label">Badge:</span>
                      <span className={`add-car-review-badge add-car-review-badge--${formData.badgeColor}`}>
                        {formData.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="add-car-review-row">
                    <span className="add-car-review-label">Images:</span>
                    <span className="add-car-review-value">{imageFiles.length} uploaded</span>
                  </div>
                  
                  {formData.features.length > 0 && (
                    <div className="add-car-review-row">
                      <span className="add-car-review-label">Features:</span>
                      <span className="add-car-review-value">{formData.features.length} selected</span>
                    </div>
                  )}
                </div>
              </div>

              {imagePreviews.length > 0 && (
                <div className="add-car-review-images">
                  <h4 className="add-car-review-subtitle">Images Preview</h4>
                  <div className="add-car-review-image-grid">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="add-car-review-image-item">
                        <img src={preview.url} alt={`Preview ${index + 1}`} />
                        {featuredImageIndex === index && (
                          <div className="add-car-review-featured-badge">Featured</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
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
              {renderStep()}

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

                {activeStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="add-car-nav-btn add-car-nav-btn--primary"
                    disabled={!validateStep(activeStep)}
                  >
                    Next
                    <ArrowLeft className="add-car-nav-icon add-car-nav-icon--right" />
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