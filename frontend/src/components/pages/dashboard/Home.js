import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import backgroundImage from '../../../assets/images/home-bg4.jpg'; 
import whatsappIcon from '../../../assets/images/vectors/whatsapp.png';
import ExploreAllVehicles from '../listings/ExploreAllVehicles'
import Footer from '../../common/Footer'
import '../../../styles/home.css';

export default function FilterBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showWhatsAppCard, setShowWhatsAppCard] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeCondition, setActiveCondition] = useState('all'); // New state for condition tabs

  // WhatsApp configuration for different services
  const whatsappConfig = {
    lease: {
      phoneNumber: '+94773658048',
      message: 'Hello! I am interested in vehicle leasing options. Can you help me with more information?'
    },
    fleet: {
      phoneNumber: '+94778480921',
      message: 'Hello! I am interested in fleet management services. Can you help me with more information?'
    },
    personal: {
      phoneNumber: '+1234567892',
      message: 'Hello! I am interested in purchasing a personal vehicle. Can you help me with more information?'
    }
  };

  const dropdownOptions = {
    makes: ['Any Makes', 'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],
    models: ['Any Models', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Crossover', 'Wagon'],
    prices: ['All Prices', 'Under $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '$30,000 - $50,000', '$50,000+']
  };

  const [selectedValues, setSelectedValues] = useState({
    makes: 'Any Makes',
    models: 'Any Models',
    prices: 'All Prices'
  });

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      title: "Great Work",
      review: "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
      name: "Leslie Alexander",
      position: "Facebook",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9d32e8e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "Awesome Design",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam sed do eiusmod",
      name: "Floyd Miles",
      position: "Designer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      title: "Good Job",
      review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.",
      name: "Dianne Russell",
      position: "Marketing",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const selectOption = (dropdownKey, option) => {
    setSelectedValues(prev => ({
      ...prev,
      [dropdownKey]: option
    }));
    setActiveDropdown(null);
  };

  const handleConditionChange = (condition) => {
    setActiveCondition(condition);
  };

  // WhatsApp functionality
  const openWhatsApp = (serviceType) => {
    const config = whatsappConfig[serviceType];
    
    // Create personalized message based on current filters and service type
    let personalizedMessage = config.message;
    
    if (serviceType === 'personal' && (selectedValues.makes !== 'Any Makes' || selectedValues.models !== 'Any Models' || selectedValues.prices !== 'All Prices')) {
      personalizedMessage = `Hello! I am interested in purchasing a personal vehicle.`;
      
      if (selectedValues.makes !== 'Any Makes') {
        personalizedMessage += ` I'm looking for ${selectedValues.makes}`;
      }
      
      if (selectedValues.models !== 'Any Models') {
        personalizedMessage += ` ${selectedValues.models}`;
      }
      
      if (selectedValues.prices !== 'All Prices') {
        personalizedMessage += ` in the ${selectedValues.prices} range`;
      }
      
      personalizedMessage += `. Can you help me with more information?`;
    }

    // Format phone number (remove any non-digits except +)
    const formattedNumber = config.phoneNumber.replace(/[^\d+]/g, '');
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(personalizedMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab/window
    window.open(whatsappURL, '_blank');
    
    // Close the card
    setShowWhatsAppCard(false);
  };

  const toggleWhatsAppCard = () => {
    setShowWhatsAppCard(!showWhatsAppCard);
  };

  // Testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="filter-bar-wrapper">
      {/* New Hero Section with Filter */}
      <div className="hero-filter-section">
        <div
          className="hero-background"
          style={{
            background: `url(${backgroundImage}) center`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="hero-overlay"></div>
          
          <div className="hero-content-wrapper">
            <div className="hero-subtitle">
              Find cars for sale and for rent near you
            </div>
            <div className="hero-description">
              Lorem ipsum dolor sit amet consectetur. Tellus diam at commodo egestas eu.
            </div>
            <div className="hero-main-title">Find Your Perfect Car</div>
            
            <div className="filter-form">
              <div className="condition-tabs">
                <div className="condition-tab-wrapper">
                  <div 
                    className={`condition-tab ${activeCondition === 'all' ? 'active' : ''}`}
                    onClick={() => handleConditionChange('all')}
                  >
                    <div className="tab-underline"></div>
                    <div className="tab-text">All</div>
                  </div>
                  <div 
                    className={`condition-tab ${activeCondition === 'new' ? 'active' : ''}`}
                    onClick={() => handleConditionChange('new')}
                  >
                    <div className="tab-text">New</div>
                  </div>
                  <div 
                    className={`condition-tab ${activeCondition === 'used' ? 'active' : ''}`}
                    onClick={() => handleConditionChange('used')}
                  >
                    <div className="tab-text">Used</div>
                  </div>
                </div>
              </div>
              
              <div className="filter-container">
                <div className="filter-section makes-section">
                  <div className="filter-vertical-border"></div>
                  <div className="filter-dropdown-container">
                    <div 
                      className="filter-dropdown-textbox"
                      onClick={() => toggleDropdown('makes')}
                    >
                      <div className="filter-dropdown-text">{selectedValues.makes}</div>
                    </div>
                    <div 
                      className={`filter-dropdown-icon ${activeDropdown === 'makes' ? 'rotated' : ''}`}
                      onClick={() => toggleDropdown('makes')}
                    >
                      <ChevronDown size={16} />
                    </div>
                    
                    {activeDropdown === 'makes' && (
                      <div className="filter-dropdown-menu">
                        {dropdownOptions.makes.map((option, index) => (
                          <button
                            key={index}
                            className="filter-dropdown-option"
                            onClick={() => selectOption('makes', option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="filter-section models-section">
                  <div className="filter-vertical-border"></div>
                  <div className="filter-dropdown-container">
                    <div 
                      className="filter-dropdown-textbox"
                      onClick={() => toggleDropdown('models')}
                    >
                      <div className="filter-dropdown-text">{selectedValues.models}</div>
                    </div>
                    <div 
                      className={`filter-dropdown-icon ${activeDropdown === 'models' ? 'rotated' : ''}`}
                      onClick={() => toggleDropdown('models')}
                    >
                      <ChevronDown size={16} />
                    </div>
                    
                    {activeDropdown === 'models' && (
                      <div className="filter-dropdown-menu">
                        {dropdownOptions.models.map((option, index) => (
                          <button
                            key={index}
                            className="filter-dropdown-option"
                            onClick={() => selectOption('models', option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="filter-section prices-section">
                  <div className="prices-label">Prices:</div>
                  <div 
                    className="prices-dropdown"
                    onClick={() => toggleDropdown('prices')}
                  >
                    <div className="prices-text">{selectedValues.prices}</div>
                    <div className={`prices-dropdown-icon ${activeDropdown === 'prices' ? 'rotated' : ''}`}>
                      <ChevronDown size={16} />
                    </div>
                    
                    {activeDropdown === 'prices' && (
                      <div className="filter-dropdown-menu prices-menu">
                        {dropdownOptions.prices.map((option, index) => (
                          <button
                            key={index}
                            className="filter-dropdown-option"
                            onClick={() => selectOption('prices', option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="search-button-section">
                  <button className="search-cars-button">
                    <Search className="search-button-icon" size={15} />
                    <div className="search-button-text">Search Cars</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="navigation-button nav-button-left">
          <ChevronLeft className="nav-button-icon" size={12} />
        </div>
        <div className="navigation-button nav-button-right">
          <ChevronRight className="nav-button-icon" size={12} />
        </div>
      </div>

      {/* Overlay to close dropdowns when clicking outside */}
      {activeDropdown && (
        <div 
          className="dropdown-overlay" 
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Browse by Type Section */}
      <div className="browse-by-type-section">
        <div className="browse-by-type-container">
          <div className="browse-by-type-header">
            <div className="browse-by-type-title">Browse by Type</div>
            <div className="browse-by-type-link"></div>
          </div>
          <div className="vehicle-types-container">
            <div className="vehicle-types-grid">
              <div className="vehicle-type-card">
                <img className="vehicle-type-image" src="suv-jpg0.png" alt="SUV" />
                <div className="vehicle-type-overlay"></div>
                <div className="vehicle-type-count">3 Cars</div>
                <div className="vehicle-type-name">SUV</div>
              </div>
              <div className="vehicle-type-card">
                <img className="vehicle-type-image" src="h-72-jpg0.png" alt="Sedan" />
                <div className="vehicle-type-overlay"></div>
                <div className="vehicle-type-count">7 Cars</div>
                <div className="vehicle-type-name">Sedan</div>
              </div>
              <div className="vehicle-type-card">
                <img className="vehicle-type-image" src="h-73-jpg0.png" alt="Hatchback" />
                <div className="vehicle-type-overlay"></div>
                <div className="vehicle-type-count">1 Car</div>
                <div className="vehicle-type-name">Hatchback</div>
              </div>
              <div className="vehicle-type-card">
                <img className="vehicle-type-image" src="h-74-jpg0.png" alt="Hybrid" />
                <div className="vehicle-type-overlay"></div>
                <div className="vehicle-type-count">0 Cars</div>
                <div className="vehicle-type-name">Hybrid</div>
              </div>
              <div className="vehicle-type-card">
                <img className="vehicle-type-image" src="h-75-jpg0.png" alt="Convertible" />
                <div className="vehicle-type-overlay"></div>
                <div className="vehicle-type-count">3 Cars</div>
                <div className="vehicle-type-name">Convertible</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fair Price Section */}
      <div className="fair-price-section">
        <div className="fair-price-container">
          <div className="fair-price-content">
            <div className="fair-price-images">
              <div className="car-image-card car-image-1">
                <div className="car-image-placeholder">
                  <div className="car-silhouette">🚗</div>
                </div>
              </div>
              <div className="car-image-card car-image-2">
                <div className="car-image-placeholder">
                  <div className="car-silhouette">🚙</div>
                </div>
              </div>
            </div>
            
            <div className="fair-price-text">
              <h2 className="fair-price-title">
                Get A Fair Price For Your Car Sell To Us Today
              </h2>
              <p className="fair-price-description">
                We are committed to providing our customers with exceptional service, 
                competitive pricing, and a wide range of.
              </p>
              
              <div className="fair-price-features">
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span className="feature-text">We are the UK's largest provider, with more patrols in more places</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span className="feature-text">You get 24/7 roadside assistance</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span className="feature-text">We fix 4 out of 5 cars at the roadside</span>
                </div>
              </div>
              
              <button className="get-started-button">
                Get Started
                <ArrowRight className="arrow-icon" />
              </button>
            </div>
          </div>
          
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">836M</div>
              <div className="stat-label">CARS FOR SALE</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">738M</div>
              <div className="stat-label">DEALER REVIEWS</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100M</div>
              <div className="stat-label">VISITORS PER DAY</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">238M</div>
              <div className="stat-label">VERIFIED DEALERS</div>
            </div>
          </div>
        </div>
      </div>

      <ExploreAllVehicles />

      {/* Customer Testimonials Section */}
      <div className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">What our customers say</h2>
            <div className="testimonials-rating">
              <span className="rating-text">Rated 4.7 / 5 based on 28,370 reviews</span>
              <span className="rating-subtext">Showing our 4 & 5 star reviews</span>
            </div>
          </div>
          
          <div className="testimonials-content">
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                  style={{
                    transform: `translateX(${(index - currentTestimonial) * 100}%)`,
                    opacity: Math.abs(index - currentTestimonial) <= 1 ? 1 : 0
                  }}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-header">
                      <h3 className="testimonial-title">{testimonial.title}</h3>
                      <div className="quote-icon">❝</div>
                    </div>
                    <p className="testimonial-review">{testimonial.review}</p>
                    <div className="testimonial-author">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <div className="author-name">{testimonial.name}</div>
                        <div className="author-position">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="testimonials-navigation">
              <button 
                className="nav-button prev-button"
                onClick={prevTestimonial}
                disabled={currentTestimonial === 0}
              >
                <ChevronLeft className="nav-icon" />
              </button>
              <button 
                className="nav-button next-button"
                onClick={nextTestimonial}
                disabled={currentTestimonial === testimonials.length - 1}
              >
                <ChevronRight className="nav-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div 
        className="whatsapp-float-button"
        onClick={toggleWhatsAppCard}
        title="Chat with us on WhatsApp"
      >
        <img 
          src={whatsappIcon} 
          alt="WhatsApp" 
          className="whatsapp-float-icon"
        />
      </div>

      {/* WhatsApp Service Selection Card */}
      {showWhatsAppCard && (
        <>
          <div 
            className="whatsapp-card-overlay"
            onClick={() => setShowWhatsAppCard(false)}
          />
          <div className="whatsapp-service-card">
            <div className="whatsapp-card-header">
              <h3>How can we help you?</h3>
              <button 
                className="whatsapp-card-close"
                onClick={() => setShowWhatsAppCard(false)}
              >
                ×
              </button>
            </div>
            <div className="whatsapp-card-content">
              <button 
                className="whatsapp-service-option"
                onClick={() => openWhatsApp('lease')}
              >
                <div className="service-icon">🏦</div>
                <div className="service-text">
                  <div className="service-title">Vehicle Lease</div>
                  <div className="service-description">Flexible leasing options for your needs</div>
                </div>
              </button>
              
              <button 
                className="whatsapp-service-option"
                onClick={() => openWhatsApp('fleet')}
              >
                <div className="service-icon">🚛</div>
                <div className="service-text">
                  <div className="service-title">Fleet Management</div>
                  <div className="service-description">Comprehensive fleet solutions for businesses</div>
                </div>
              </button>
              
              <button 
                className="whatsapp-service-option"
                onClick={() => openWhatsApp('personal')}
              >
                <div className="service-icon">🚗</div>
                <div className="service-text">
                  <div className="service-title">Personal Vehicle</div>
                  <div className="service-description">Find your perfect personal vehicle</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}