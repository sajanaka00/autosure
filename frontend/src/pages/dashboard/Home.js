import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import backgroundImage from '../../assets/images/cars/bmw6.jpg';
import whatsappIcon from '../../assets/images/vectors/whatsapp.png';
import sedanImg from '../../assets/images/cars/bmw.jpg';
import ExploreAllVehicles from '../listings/ExploreAllVehicles';
import Footer from '../../components/layout/Footer';
import TestimonialsSection from '../../components/common/TestimonialsSection';
import GetFairPrice from '../../components/common/GetFairPrice';
import WhyChooseUs from '../../components/common/WhyChooseUs';
import './Home.css';

export default function FilterBar() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showWhatsAppCard, setShowWhatsAppCard] = useState(false);
  const [activeCondition, setActiveCondition] = useState('all');

  // Dropdown refs
  const dropdownRefs = useRef({});
  const optionRefs = useRef({});

  // Configuration data
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
    makes: ['Any Makes', 'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai', 'Lexus', 'Infiniti', 'Acura', 'Mazda', 'Subaru', 'Mitsubishi', 'Kia', 'Genesis', 'Volvo', 'Jaguar', 'Tesla', 'Jeep'],
    models: ['Any Models', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Crossover', 'Wagon', 'Compact', 'Midsize', 'Full-size', 'Luxury', 'Sports Car', 'Electric', 'Hybrid'],
    prices: ['All Prices', 'Under $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '$30,000 - $50,000', '$50,000 - $75,000', '$75,000 - $100,000', '$100,000+']
  };

  const vehicleTypes = [
    { name: 'SUV', count: 3, image: sedanImg },
    { name: 'Sedan', count: 7, image: sedanImg },
    { name: 'Hatchback', count: 1, image: sedanImg },
    { name: 'Hybrid', count: 0, image: sedanImg },
    { name: 'Convertible', count: 3, image: sedanImg }
  ];

  const whatsappServices = [
    {
      key: 'lease',
      icon: '🏦',
      title: 'Vehicle Lease',
      description: 'Flexible leasing options for your needs'
    },
    {
      key: 'fleet',
      icon: '🚛',
      title: 'Fleet Management',
      description: 'Comprehensive fleet solutions for businesses'
    },
    {
      key: 'personal',
      icon: '🚗',
      title: 'Personal Vehicle',
      description: 'Find your perfect personal vehicle'
    }
  ];

  const conditionTabs = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'used', label: 'Used' }
  ];

  // State for dropdown values
  const [dropdownValues, setDropdownValues] = useState({
    makes: 'Any Makes',
    models: 'Any Models',
    prices: 'All Prices'
  });

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (activeDropdown) {
        let clickedInside = false;

        // Check if click was inside any dropdown
        Object.values(dropdownRefs.current).forEach(ref => {
          if (ref && ref.contains(event.target)) {
            clickedInside = true;
          }
        });

        if (!clickedInside) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [activeDropdown]);

  // Handle option selection with useCallback
  const handleOptionSelect = useCallback((dropdownKey, option) => {
    setDropdownValues(prev => ({
      ...prev,
      [dropdownKey]: option
    }));

    // Close dropdown after a brief delay to ensure selection is visible
    setTimeout(() => {
      setActiveDropdown(null);
    }, 50);
  }, []);

  // Toggle dropdown
  const toggleDropdown = useCallback((dropdownKey) => {
    setActiveDropdown(current => current === dropdownKey ? null : dropdownKey);
  }, []);

  const handleConditionChange = (condition) => {
    setActiveCondition(condition);
  };

  const openWhatsApp = (serviceType) => {
    const config = whatsappConfig[serviceType];
    let message = config.message;

    if (serviceType === 'personal') {
      message = `Hello! I am interested in purchasing a personal vehicle.`;

      if (dropdownValues.makes !== 'Any Makes') message += ` I'm looking for ${dropdownValues.makes}`;
      if (dropdownValues.models !== 'Any Models') message += ` ${dropdownValues.models}`;
      if (dropdownValues.prices !== 'All Prices') message += ` in the ${dropdownValues.prices} range`;

      message += `. Can you help me with more information?`;
    }

    const formattedNumber = config.phoneNumber.replace(/[^\d+]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
    setShowWhatsAppCard(false);
  };

  const toggleWhatsAppCard = () => {
    setShowWhatsAppCard(!showWhatsAppCard);
  };

  // Modified handleSearch function to navigate to VehiclesForSale page with filters
  const handleSearch = () => {
    // Build search parameters
    const searchParams = new URLSearchParams();

    // Add make filter if not default
    if (dropdownValues.makes !== 'Any Makes') {
      searchParams.append('make', dropdownValues.makes);
    }

    // Add model filter if not default (and if it's a specific model, not a category)
    if (dropdownValues.models !== 'Any Models') {
      // Check if it's a specific model name rather than a body type
      const specificModels = [
        'Model S', 'Model 3', 'X5', '3 Series', 'F-150 Lightning', 'Mustang',
        'Camry', 'RAV4', 'C-Class', 'GLE', 'Wrangler', 'Civic', 'CR-V'
      ];

      if (specificModels.includes(dropdownValues.models)) {
        searchParams.append('model', dropdownValues.models);
      } else {
        // If it's a body type, add it as bodyType filter
        searchParams.append('bodyType', dropdownValues.models);
      }
    }

    // Add price range filter if not default
    if (dropdownValues.prices !== 'All Prices') {
      let priceRange = '';
      switch (dropdownValues.prices) {
        case 'Under $10,000':
          priceRange = '0-10';
          break;
        case '$10,000 - $20,000':
          priceRange = '10-20';
          break;
        case '$20,000 - $30,000':
          priceRange = '20-30';
          break;
        case '$30,000 - $50,000':
          priceRange = '30-50';
          break;
        case '$50,000 - $75,000':
          priceRange = '50-75';
          break;
        case '$75,000 - $100,000':
          priceRange = '75-100';
          break;
        case '$100,000+':
          priceRange = '100-120';
          break;
      }
      if (priceRange) {
        searchParams.append('priceRange', priceRange);
      }
    }

    // Add condition filter if not 'all'
    if (activeCondition !== 'all') {
      const conditionMap = {
        'new': 'New',
        'used': 'Used'
      };
      searchParams.append('condition', conditionMap[activeCondition]);
    }

    // Navigate to vehicles page with search parameters
    const queryString = searchParams.toString();
    navigate(`/vehicles${queryString ? `?${queryString}` : ''}`);
  };

  // Render dropdown with better event handling
  const renderDropdown = (key, label = null) => {
    const isActive = activeDropdown === key;
    const currentValue = dropdownValues[key];
    const options = dropdownOptions[key];

    return (
      <div className={`filter-section filter-${key}`} key={key}>
        <div className="filter-border"></div>
        <div
          className="filter-container"
          ref={el => dropdownRefs.current[key] = el}
        >
          {label && <div className="filter-label">{label}</div>}
          <div
            className="filter-dropdown"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown(key);
            }}
          >
            <div className="filter-text">
              {currentValue}
            </div>
            <div className={`filter-icon ${isActive ? 'rotated' : ''}`}>
              <ChevronDown size={12} />
            </div>
          </div>

          {isActive && (
            <div className="dropdown-menu dropdown-show">
              <div className="dropdown-content">
                {options.map((option, index) => (
                  <div
                    key={`${key}-${index}`}
                    className={`dropdown-option ${currentValue === option ? 'selected' : ''}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOptionSelect(key, option);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="home-page">
      <div className="h-main">
        {/* Hero Section with Filter */}
        <div className="h-hero" style={{
          background: `url(${backgroundImage}) center`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
          <div className="h-hero-overlay"></div>
          <div className="h-hero-content">
            <div className="h-hero-subtitle">
              Find cars for sale and for rent near you
            </div>
            <div className="h-hero-desc">
              Lorem ipsum dolor sit amet consectetur. Tellus diam at commodo egestas eu.
            </div>
            <div className="h-hero-title">Find Your Perfect Car</div>

            <div className="h-form">
              <div className="h-tabs">
                {conditionTabs.map(tab => (
                  <div
                    key={tab.key}
                    className={`h-tab ${activeCondition === tab.key ? 'h-tab-active' : ''}`}
                    onClick={() => handleConditionChange(tab.key)}
                  >
                    {activeCondition === tab.key && <div className="h-tab-line"></div>}
                    <div className="h-tab-text">{tab.label}</div>
                  </div>
                ))}
              </div>

              <div className="h-form-container">
                {renderDropdown('makes')}
                {renderDropdown('models')}
                {renderDropdown('prices', 'Prices:')}

                <div className="h-search-btn" onClick={handleSearch}>
                  <Search className="h-search-icon" size={15} />
                  <div className="h-search-text">Search Cars</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Browse by Type Section */}
        <div className="h-browse" id="browse-by-type">
          <div className="h-browse-container">
            <div className="h-browse-header">
              <div className="h-browse-title">Browse by Type</div>
            </div>
            <div className="h-browse-grid">
              {vehicleTypes.map((vehicle, index) => (
                <div key={index} className="h-vehicle-card" onClick={() => navigate(`/vehicles?bodyType=${vehicle.name}`)}>
                  <img className="h-vehicle-img" src={vehicle.image} alt={vehicle.name} />
                  <div className="h-vehicle-overlay"></div>
                  <div className="h-vehicle-count">{vehicle.count} Car{vehicle.count !== 1 ? 's' : ''}</div>
                  <div className="h-vehicle-name">{vehicle.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="get-fair-price">
          <GetFairPrice />
        </div>

        <div id="why-choose-us">
          <WhyChooseUs />
        </div>

        <div id="explore-vehicles">
          <ExploreAllVehicles />
        </div>

        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="h-whatsapp-btn" onClick={toggleWhatsAppCard} title="Chat with us on WhatsApp">
        <img src={whatsappIcon} alt="WhatsApp" className="h-whatsapp-icon" />
      </div>

      {/* WhatsApp Service Card */}
      {showWhatsAppCard && (
        <>
          <div className="h-whatsapp-overlay" onClick={() => setShowWhatsAppCard(false)} />
          <div className="h-whatsapp-card">
            <div className="h-whatsapp-header">
              <h3>How can we help you?</h3>
              <button className="h-whatsapp-close" onClick={() => setShowWhatsAppCard(false)}>
                ×
              </button>
            </div>
            <div className="h-whatsapp-content">
              {whatsappServices.map(service => (
                <button
                  key={service.key}
                  className="h-service-option"
                  onClick={() => openWhatsApp(service.key)}
                >
                  <div className="h-service-icon">{service.icon}</div>
                  <div className="h-service-text">
                    <div className="h-service-title">{service.title}</div>
                    <div className="h-service-desc">{service.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}