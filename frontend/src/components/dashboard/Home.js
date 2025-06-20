import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import backgroundImage from '../../assets/images/home-bg.jpg'; 
import ExploreAllVehicles from '../dashboard/ExploreAllVehicles'
import '../../styles/home.css';

export default function FilterBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    </div>
  );
}