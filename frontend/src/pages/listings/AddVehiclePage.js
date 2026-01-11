import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, X, Star, Image as ImageIcon, Plus, Info, CheckCircle, ChevronRight, ChevronLeft, Camera, LayoutGrid, Settings, Gauge, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import './AddVehiclePage.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Sub-components
import SidebarStepper from '../../components/listings/add-vehicle/SidebarStepper';
import FormNavigation from '../../components/listings/add-vehicle/FormNavigation';
import BasicInfoStep from '../../components/listings/add-vehicle/BasicInfoStep';
import EngineTransStep from '../../components/listings/add-vehicle/EngineTransStep';
import PerfDimensionsStep from '../../components/listings/add-vehicle/PerfDimensionsStep';
import DetailsPriceStep from '../../components/listings/add-vehicle/DetailsPriceStep';
import ImageUploadStep from '../../components/listings/add-vehicle/ImageUploadStep';
import ReviewStep from '../../components/listings/add-vehicle/ReviewStep';

export default function AddVehiclePage({ user: propUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(propUser || tokenManager.getUser());

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

    // Technical Specs (added mileage here)
    mileage: '',
    numberOfOwners: '1',
    vehicleNumber: '',

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

  useEffect(() => {
    console.log('Current Image Previews:', imagePreviews);
  }, [imagePreviews]);

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

  const stepNames = ['Basic Info', 'Engine & Trans', 'Perf & Dimensions', 'Details & Price', 'Images', 'Review'];

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.make && formData.model && formData.year && formData.condition && formData.bodyType && formData.vehicleNumber && formData.category;
      case 2:
        return formData.engineSize && formData.transmission && formData.fuelType && formData.mileage && formData.seatingCapacity;
      case 3:
        return true;
      case 4:
        return formData.price && formData.title && formData.description && formData.downPayment;
      case 5:
        return imageFiles.length > 0;
      default:
        return true;
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

    console.log('Files to add:', filesToAdd);
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

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 6));
      window.scrollTo(0, 0);
      setError('');
    } else {
      setError('Please fill in all required fields before proceeding');
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitFormData = new FormData();

      const getTransmission = (val) => {
        if (val === 'Manual') return 'manual';
        return 'automatic'; // Handles Automatic, CVT
      };

      const getFuelType = (val) => {
        if (val === 'Gasoline') return 'petrol';
        if (val === 'Diesel') return 'diesel';
        if (val === 'Electric') return 'electric';
        return 'hybrid'; // Handles Hybrid, Plug-in Hybrid
      };

      const vehicleData = {
        ...formData,
        transmission: getTransmission(formData.transmission),
        fuelType: getFuelType(formData.fuelType),
        mileageRange: formData.mileage,
        engineCapacity: formData.engineSize, // Map engineSize to engineCapacity
        totalValue: formData.price,
        features: formData.features.join(', '),
        yearOfRegistration: parseInt(formData.year),
        year: parseInt(formData.year),
        numberOfOwners: parseInt(formData.numberOfOwners || 1),
        seatingCapacity: parseInt(formData.seatingCapacity || 5),
        downPayment: parseFloat(formData.downPayment || 0)
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

  return (
    <div className="titanium-layout">
      <Navbar user={user} onLogout={() => navigate('/login')} />

      <div className="titanium-content">
        <SidebarStepper steps={stepNames} activeStep={activeStep} />

        <main className="titanium-main">
          <div className="titanium-form-container">
            {/* Messages */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="titanium-alert error"
                >
                  <Info size={18} />
                  <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="titanium-alert success"
                >
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="titanium-form">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeStep === 1 && (
                    <BasicInfoStep
                      formData={formData}
                      handleInputChange={handleInputChange}
                      makeOptions={makeOptions}
                      conditionOptions={conditionOptions}
                      bodyTypeOptions={bodyTypeOptions}
                      categories={categories}
                    />
                  )}
                  {activeStep === 2 && (
                    <EngineTransStep
                      formData={formData}
                      handleInputChange={handleInputChange}
                      transmissionOptions={transmissionOptions}
                      fuelTypeOptions={fuelTypeOptions}
                      driveTypeOptions={driveTypeOptions}
                    />
                  )}
                  {activeStep === 3 && (
                    <PerfDimensionsStep
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}
                  {activeStep === 4 && (
                    <DetailsPriceStep
                      formData={formData}
                      handleInputChange={handleInputChange}
                      badgeOptions={badgeOptions}
                      setFormData={setFormData}
                    />
                  )}
                  {activeStep === 5 && (
                    <ImageUploadStep
                      handleImageUpload={handleImageUpload}
                      imagePreviews={imagePreviews}
                      removeImage={removeImage}
                      featuredImageIndex={featuredImageIndex}
                      setFeaturedImage={setFeaturedImage}
                      commonFeatures={commonFeatures}
                      formData={formData}
                      handleFeatureToggle={handleFeatureToggle}
                    />
                  )}
                  {activeStep === 6 && (
                    <ReviewStep
                      formData={formData}
                      imagePreviews={imagePreviews}
                      featuredImageIndex={featuredImageIndex}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <FormNavigation
                activeStep={activeStep}
                totalSteps={6}
                prevStep={prevStep}
                nextStep={nextStep}
                loading={loading}
                isValid={validateStep(activeStep)}
              />
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}