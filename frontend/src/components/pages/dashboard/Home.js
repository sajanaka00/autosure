import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import backgroundImage from '../../../assets/images/home-bg4.jpg'; 
import whatsappIcon from '../../../assets/images/vectors/whatsapp.png';
import ExploreAllVehicles from '../listings/ExploreAllVehicles'
import Footer from '../../common/Footer'
import '../../../styles/home.css';

export default function FilterBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showWhatsAppCard, setShowWhatsAppCard] = useState(false);

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

      <ExploreAllVehicles />

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