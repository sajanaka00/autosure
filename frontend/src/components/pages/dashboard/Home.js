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

  const DropdownSection = ({ dropdownKey, options, label }) => (
    <div className="dropdown-section">
      <button
        onClick={() => toggleDropdown(dropdownKey)}
        className="dropdown-button"
      >
        <span className="dropdown-text">{selectedValues[dropdownKey]}</span>
        <ChevronDown 
          className={`dropdown-icon ${activeDropdown === dropdownKey ? 'rotated' : ''}`} 
        />
      </button>

      {activeDropdown === dropdownKey && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <button
              key={index}
              className="dropdown-option"
              onClick={() => selectOption(dropdownKey, option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="filter-bar-wrapper">
      {/* Background Image */}
      <div className="image-background">
        <img src={backgroundImage} alt="Background" />
      </div>

      {/* Dark Overlay */}
      <div className="image-overlay"></div>

      <div className="filter-bar-container">
        <div className="filter-bar">
          {/* Makes Dropdown */}
          <DropdownSection 
            dropdownKey="makes" 
            options={dropdownOptions.makes}
          />
          
          {/* Divider */}
          <div className="filter-divider"></div>
          
          {/* Models Dropdown */}
          <DropdownSection 
            dropdownKey="models" 
            options={dropdownOptions.models}
          />
          
          {/* Divider */}
          <div className="filter-divider"></div>
          
          {/* Price Section */}
          <div className="price-section">
            <span className="price-label">Price:</span>
            <div className="price-dropdown">
              <button
                onClick={() => toggleDropdown('prices')}
                className="price-button"
              >
                <span className="price-text">{selectedValues.prices}</span>
                <ChevronDown 
                  className={`price-icon ${activeDropdown === 'prices' ? 'rotated' : ''}`} 
                />
              </button>

              {activeDropdown === 'prices' && (
                <div className="price-menu">
                  {dropdownOptions.prices.map((option, index) => (
                    <button
                      key={index}
                      className="price-option"
                      onClick={() => selectOption('prices', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Search Button */}
          <div className="search-section">
            <button className="search-button">
              <Search className="search-icon" />
              Search
            </button>
          </div>
        </div>

        {/* Overlay to close dropdowns when clicking outside */}
        {activeDropdown && (
          <div 
            className="dropdown-overlay" 
            onClick={() => setActiveDropdown(null)}
          />
        )}
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

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">We Make Finding The Right Car Simple</h1>
            <button className="hero-button">
              Find Out More <ArrowRight className="hero-arrow-icon" />
            </button>
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
