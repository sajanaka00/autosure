import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, MessageCircle, Star, MapPin, Phone, Calendar, Gauge, Fuel, Users, Palette, Settings, Car, ChevronLeft, ChevronRight, FileText, Check } from 'lucide-react';
import '../../styles/car-listing.css';
import Footer from '../common/Footer';

const CarListing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carData] = useState({
    title: 'Toyota Camry New',
    description: '3.5 D5 PowerPulse Momentum 5dr AW...',
    price: '$40,000',
    year: '2023',
    mileage: '20 Miles',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    body: 'Sedan',
    condition: 'New',
    engineSize: '3.5',
    doors: '4 Doors',
    cylinders: '6',
    colors: 'Black, Blue, White',
    driveType: 'AWD',
    vin: 'HCB123158'
  });

  const images = [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1494976688202-2f60c03b46c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHj8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Car overview data for two columns
  const leftOverviewItems = [
    { icon: Car, label: 'Body', value: carData.body },
    { icon: Gauge, label: 'Mileage', value: carData.mileage },
    { icon: Fuel, label: 'Fuel Type', value: carData.fuelType },
    { icon: Calendar, label: 'Year', value: carData.year },
    { icon: Settings, label: 'Transmission', value: carData.transmission },
    { icon: Car, label: 'Drive Type', value: carData.driveType }
  ];

  const rightOverviewItems = [
    { icon: Settings, label: 'Condition', value: carData.condition },
    { icon: Settings, label: 'Engine Size', value: carData.engineSize },
    { icon: Users, label: 'Door', value: carData.doors },
    { icon: Settings, label: 'Cylinder', value: carData.cylinders },
    { icon: Palette, label: 'Color', value: carData.colors },
    { icon: Settings, label: 'VIN', value: carData.vin }
  ];

  // Features data
  const features = {
    Interior: [
      'Air Conditioner',
      'Digital Odometer',
      'Heater',
      'Leather Seats',
      'Panoramic Moonroof',
      'Tachometer',
      'Touchscreen Display'
    ],
    Safety: [
      'Anti-lock Braking',
      'Brake Assist',
      'Child Safety Locks',
      'Driver Air Bag',
      'Power Door Locks',
      'Stability Control',
      'Traction Control'
    ],
    Exterior: [
      'Fog Lights Front',
      'Rain Sensing Wiper',
      'Rear Spoiler',
      'Windows - Electric'
    ],
    'Comfort & Convenience': [
      'Android Auto',
      'Apple CarPlay',
      'Bluetooth',
      'HomeLink',
      'Power Steering'
    ]
  };

  return (
    <div className="car-listing">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-content">
          <div className="breadcrumb-text">
            <span>Home</span> › <span>Listings</span> › <span className="breadcrumb-current">{carData.title}</span>
          </div>
        </div>
      </div>

      <div className="main-container">
        {/* Title and Actions */}
        <div className="title-section">
          <div className="title-header">
            <div className="title-info">
              <h1>{carData.title}</h1>
              <p>{carData.description}</p>
            </div>
            <div className="price-info">
              {/* Action buttons moved here - above the price */}
              <div className="action-buttons">
                <button className="action-button">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
                <button className="action-button">
                  <Heart size={16} />
                  <span>Save</span>
                </button>
                <button className="action-button">
                  <MessageCircle size={16} />
                  <span>Compare</span>
                </button>
                <button className="action-button">
                  Print
                </button>
              </div>
              
              {/* Price comes after action buttons */}
              <div className="price">{carData.price}</div>
              <div className="price-label">Make An Offer Price</div>
            </div>
          </div>
          
          <div className="car-stats">
            <div className="stat-badge">
              <Calendar size={16} />
              <span>{carData.year}</span>
            </div>
            <div className="stat-badge">
              <Gauge size={16} />
              <span>{carData.mileage}</span>
            </div>
            <div className="stat-badge">
              <Settings size={16} />
              <span>{carData.transmission}</span>
            </div>
            <div className="stat-badge">
              <Fuel size={16} />
              <span>{carData.fuelType}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="gallery-content">
            {/* Main Image */}
            <div className="main-image-container">
              <img 
                src={images[currentImageIndex]} 
                alt={carData.title} 
                className="main-image"
              />
              <div className="price-badge">
                Great Price
              </div>
              <button 
                onClick={prevImage}
                className="nav-button prev"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="nav-button next"
              >
                <ChevronRight size={20} />
              </button>
              <div className="image-counter">
                {currentImageIndex + 1}/{images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="thumbnail-grid">
              {images.slice(1, 5).map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Car view ${index + 2}`} 
                  className="thumbnail"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid - 3 Columns */}
        <div className="content-grid">
          {/* Car Overview Section - Spans 2 columns */}
          <div className="overview-section">
            <h2 className="overview-title">Car Overview</h2>
            <div className="overview-grid">
              <div className="overview-column">
                {leftOverviewItems.map((item, index) => (
                  <div key={index} className="overview-item">
                    <div className="overview-left-content">
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    <span className="overview-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="overview-column">
                {rightOverviewItems.map((item, index) => (
                  <div key={index} className="overview-item">
                    <div className="overview-left-content">
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    <span className="overview-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dealer Info Column */}
          <div className="dealer-card">
            <div className="dealer-avatar">
              J
            </div>
            <h3 className="dealer-name">admin</h3>
            <p className="text-xs text-gray-500 mb-3">863 Broadway, Brooklyn</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star" />
              ))}
              <span className="rating-text">5.0 (2 Reviews)</span>
            </div>
            <div className="dealer-info">
              <div className="info-item">
                <MapPin size={14} />
                <span>Get Direction</span>
              </div>
              <div className="info-item">
                <Phone size={14} />
                <span>+88-123456789</span>
              </div>
            </div>

            <button className="message-button">
              Message Dealer
            </button>

            <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors mb-3 text-sm">
              Chat Via WhatsApp
            </button>

            <a href="#" className="view-stock-link">
              View All stock at this dealer
            </a>
          </div>
        </div>

        {/* Description Section */}
        <div className="description-section">
          <h2 className="description-title">Description</h2>
          <div className="description-text">
            <p>
              Quisque imperdiet dignissim enim dictum finibus. Sed consectetur convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit orci, eget maximus.
            </p>
            <p>
              Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus sit nunc pretium scelerisque.
            </p>
          </div>
          <div className="description-buttons">
            <a href="#" className="pdf-button">
              <FileText size={16} />
              <span>Schedule-Test-Drive Pdf</span>
            </a>
            <a href="#" className="pdf-button">
              <FileText size={16} />
              <span>Car-Brochure Pdf</span>
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="features-title">Features</h2>
          <div className="features-grid">
            {Object.entries(features).map(([category, items]) => (
              <div key={category} className="feature-category">
                <h3 className="feature-category-title">{category}</h3>
                <div className="feature-list">
                  {items.map((item, index) => (
                    <div key={index} className="feature-item">
                      <Check className="feature-check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2 className="reviews-title">Reviews</h2>
          
          <div className="reviews-content">
            <div className="reviews-summary">
              <div className="overall-rating">
                <div className="rating-circle">
                  <span className="rating-number">4.5</span>
                  <span className="rating-label">Out of 5</span>
                  <span className="overall-label">Overall Rating</span>
                </div>
              </div>
              
              <div className="rating-breakdown">
                <div className="rating-categories">
                  <div className="rating-row">
                    <div className="category-info">
                      <span className="category-name">Comfort</span>
                      <span className="category-status">Perfect</span>
                    </div>
                    <div className="rating-stars">
                      <Star className="star filled" />
                      <span className="rating-value">5.0</span>
                    </div>
                  </div>
                  
                  <div className="rating-row">
                    <div className="category-info">
                      <span className="category-name">Exterior Styling</span>
                      <span className="category-status">Perfect</span>
                    </div>
                    <div className="rating-stars">
                      <Star className="star filled" />
                      <span className="rating-value">5.0</span>
                    </div>
                  </div>
                  
                  <div className="rating-row">
                    <div className="category-info">
                      <span className="category-name">Performance</span>
                      <span className="category-status">Perfect</span>
                    </div>
                    <div className="rating-stars">
                      <Star className="star filled" />
                      <span className="rating-value">5.0</span>
                    </div>
                  </div>
                </div>
                
                <div className="rating-categories">
                  <div className="rating-row">
                    <div className="category-info">
                      <span className="category-name">Interior Design</span>
                      <span className="category-status">Good</span>
                    </div>
                    <div className="rating-stars">
                      <Star className="star filled" />
                      <span className="rating-value">4.5</span>
                    </div>
                  </div>
                  
                  <div className="rating-row">
                    <div className="category-info">
                      <span className="category-name">Value For The Money</span>
                      <span className="category-status">Perfect</span>
                    </div>
                    <div className="rating-stars">
                      <Star className="star filled" />
                      <span className="rating-value">5.0</span>
                    </div>
                  </div>
                  
                  <div className="rating-row">
                    <div className="category-info">
                      <span className="category-name">Reliability</span>
                      <span className="category-status">Good</span>
                    </div>
                    <div className="rating-stars">
                      <Star className="star filled" />
                      <span className="rating-value">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="reviews-count">
              <h3>2 Reviews</h3>
            </div>
          </div>
          
          <div className="individual-reviews">
            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-avatar">D</div>
                <div className="reviewer-info">
                  <span className="reviewer-name">Demo</span>
                  <span className="review-date">November 30, 2023</span>
                </div>
              </div>
              <div className="review-rating">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="star filled" />
                ))}
                <Star className="star empty" />
                <span className="review-score">4.7</span>
              </div>
              <p className="review-text">
                Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis.
              </p>
            </div>
            
            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-avatar">D</div>
                <div className="reviewer-info">
                  <span className="reviewer-name">Demo</span>
                  <span className="review-date">December 16, 2023</span>
                </div>
              </div>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star filled" />
                ))}
                <span className="review-score">5.0</span>
              </div>
              <p className="review-text">qweqeqeq</p>
            </div>
          </div>
          
          <div className="add-review-section">
            <h3 className="add-review-title">Add a review</h3>
            
            <div className="review-form">
              <div className="rating-inputs">
                <div className="rating-input-row">
                  <div className="rating-input-group">
                    <label>Comfort</label>
                    <div className="star-input">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="star-input-item" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="rating-input-group">
                    <label>Interior Design</label>
                    <div className="star-input">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="star-input-item" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="rating-input-row">
                  <div className="rating-input-group">
                    <label>Exterior Styling</label>
                    <div className="star-input">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="star-input-item" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="rating-input-group">
                    <label>Value For The Money</label>
                    <div className="star-input">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="star-input-item" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="rating-input-row">
                  <div className="rating-input-group">
                    <label>Performance</label>
                    <div className="star-input">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="star-input-item" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="rating-input-group">
                    <label>Reliability</label>
                    <div className="star-input">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="star-input-item" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-inputs">
                <div className="input-row">
                  <input 
                    type="text" 
                    placeholder="Name"
                    className="form-input"
                  />
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="form-input"
                  />
                </div>
                
                <div className="checkbox-row">
                  <input type="checkbox" id="save-info" />
                  <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>
                
                <textarea 
                  placeholder="Review"
                  className="review-textarea"
                  rows="4"
                ></textarea>
                
                <button className="submit-review-btn">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
        
      <Footer/>
    </div>
  );
};

export default CarListing;