import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api'; // Adjust path if needed
import '../../../styles/add-car.css';

export default function AddCar({ user }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    transmission: '',
    mileageRange: '',
    engineCapacity: '',
    seatingCapacity: '',
    year: '',
    yearOfRegistration: '',
    fuelType: '',
    avgFuelConsumption: '',
    numberOfOwners: '',
    vehicleNumber: '',
    totalValue: '',
    downPayment: '',
    features: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

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
        console.error('Unexpected response format:', data);
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 10;
    const maxFileSize = 5 * 1024 * 1024;

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

    if (imageFiles.length + validFiles.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setImageFiles(prev => [...prev, ...validFiles]);

    const newPreviews = validFiles.map(file => ({
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

    if (primaryImageIndex >= index && primaryImageIndex > 0) {
      setPrimaryImageIndex(prev => prev - 1);
    }
  };

  const setPrimaryImage = (index) => {
    setPrimaryImageIndex(index);
  };

  const updateImageCaption = (index, caption) => {
    setImagePreviews(prev => prev.map((img, i) =>
      i === index ? { ...img, caption } : img
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitFormData = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          submitFormData.append(key, formData[key]);
        }
      });

      imageFiles.forEach(file => {
        submitFormData.append('images', file);
      });

      if (imageFiles.length > 0) {
        const imageMetadata = imagePreviews.map((preview, index) => ({
          isPrimary: index === primaryImageIndex,
          caption: preview.caption || ''
        }));
        submitFormData.append('imageMetadata', JSON.stringify(imageMetadata));
      }

      // Use api.createVehicle instead of raw fetch to match your ApiService
      const data = await api.createVehicle(submitFormData, user?.token);

      if (data.success) {
        setSuccess('Vehicle added successfully!');

        setFormData({
          make: '',
          model: '',
          transmission: '',
          mileageRange: '',
          engineCapacity: '',
          seatingCapacity: '',
          year: '',
          yearOfRegistration: '',
          fuelType: '',
          avgFuelConsumption: '',
          numberOfOwners: '',
          vehicleNumber: '',
          totalValue: '',
          downPayment: '',
          features: '',
          category: ''
        });

        setImageFiles([]);
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        setImagePreviews([]);
        setPrimaryImageIndex(0);

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        if (data.missingFields) {
          setError(`Missing required fields: ${data.missingFields.join(', ')}`);
        } else if (data.details && Array.isArray(data.details)) {
          setError(`Validation errors: ${data.details.join(', ')}`);
        } else {
          setError(data.error || 'Failed to add vehicle');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="add-car-container fade-in">
      <h2 className="page-title">Add New Vehicle</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="form-container">
        <form className="car-form" onSubmit={handleSubmit}>
          
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Make *</label>
                <input 
                  type="text" 
                  name="make"
                  className="form-input" 
                  value={formData.make}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Model *</label>
                <input 
                  type="text" 
                  name="model"
                  className="form-input" 
                  value={formData.model}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select 
                  name="category"
                  className="form-input" 
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Vehicle Number *</label>
                <input 
                  type="text" 
                  name="vehicleNumber"
                  className="form-input" 
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., KJ-4088"
                  required 
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="form-section">
            <h3>Technical Specifications</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Year *</label>
                <input 
                  type="number" 
                  name="year"
                  className="form-input" 
                  min="1900" 
                  max={currentYear + 1}
                  value={formData.year}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Year of Registration *</label>
                <input 
                  type="number" 
                  name="yearOfRegistration"
                  className="form-input" 
                  min="1900" 
                  max={currentYear}
                  value={formData.yearOfRegistration}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Transmission *</label>
                <select 
                  name="transmission"
                  className="form-input" 
                  value={formData.transmission}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Transmission</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Fuel Type *</label>
                <select 
                  name="fuelType"
                  className="form-input" 
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Engine Capacity *</label>
                <input 
                  type="text" 
                  name="engineCapacity"
                  className="form-input" 
                  value={formData.engineCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 1300CC"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Seating Capacity *</label>
                <input 
                  type="number" 
                  name="seatingCapacity"
                  className="form-input" 
                  min="1" 
                  max="15"
                  value={formData.seatingCapacity}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Mileage Range *</label>
                <input 
                  type="text" 
                  name="mileageRange"
                  className="form-input" 
                  value={formData.mileageRange}
                  onChange={handleInputChange}
                  placeholder="e.g., 145000Km"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Average Fuel Consumption</label>
                <input 
                  type="text" 
                  name="avgFuelConsumption"
                  className="form-input" 
                  value={formData.avgFuelConsumption}
                  onChange={handleInputChange}
                  placeholder="e.g., 15Km/l"
                />
              </div>
            </div>
          </div>

          {/* Ownership & Pricing */}
          <div className="form-section">
            <h3>Ownership & Pricing</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Number of Owners *</label>
                <input 
                  type="number" 
                  name="numberOfOwners"
                  className="form-input" 
                  min="1"
                  value={formData.numberOfOwners}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Total Value *</label>
                <input 
                  type="number" 
                  name="totalValue"
                  className="form-input" 
                  min="0" 
                  step="0.01"
                  value={formData.totalValue}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Down Payment *</label>
              <input 
                type="number" 
                name="downPayment"
                className="form-input" 
                min="0" 
                step="0.01"
                value={formData.downPayment}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="form-section">
            <h3>Vehicle Images</h3>
            
            <div className="form-group">
              <label className="form-label">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="form-input"
              />
              <small className="form-help">
                Maximum 10 images, 5MB each. Supported formats: JPG, PNG, GIF, WEBP
              </small>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                <h4>Image Previews</h4>
                <div className="preview-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <div className="preview-image-container">
                        <img 
                          src={preview.url} 
                          alt={`Preview ${index + 1}`}
                          className="preview-image"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-image-btn"
                          title="Remove image"
                        >
                          ×
                        </button>
                        {primaryImageIndex === index && (
                          <div className="primary-badge">Primary</div>
                        )}
                      </div>
                      
                      <div className="preview-controls">
                        <input
                          type="text"
                          placeholder="Image caption (optional)"
                          value={preview.caption}
                          onChange={(e) => updateImageCaption(index, e.target.value)}
                          className="caption-input"
                        />
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(index)}
                          className={`primary-btn ${primaryImageIndex === index ? 'active' : ''}`}
                        >
                          Set as Primary
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Features */}
          <div className="form-section">
            <h3>Additional Information</h3>
            
            <div className="form-group">
              <label className="form-label">Features</label>
              <textarea 
                name="features"
                className="form-textarea" 
                rows="3"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="Enter features separated by commas (e.g., Air Conditioning, Power Steering, ABS)"
              />
              <small className="form-help">Separate multiple features with commas</small>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary submit-btn"
            disabled={loading}
          >
            {loading ? 'Adding Vehicle...' : 'Add Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
}