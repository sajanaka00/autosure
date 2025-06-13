import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import '../../styles/home.css';

export default function CarSearchBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownOptions = {
    cars: ['Used Cars', 'New Cars', 'Certified Pre-Owned'],
    makes: ['Any Makes', 'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen'],
    models: ['Any Models', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck'],
    prices: ['All Prices', 'Under $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '$30,000+']
  };

  const [selectedValues, setSelectedValues] = useState({
    cars: 'Used Cars',
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

  const DropdownSection = ({ dropdownKey, options, isLast = false }) => (
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

      {!isLast && <div className="dropdown-divider" />}

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
    <div className="search-bar-wrapper">
      <div className="search-bar-container">
        <div className="search-bar">
          <DropdownSection 
            dropdownKey="cars" 
            options={dropdownOptions.cars}
          />
          
          <DropdownSection 
            dropdownKey="makes" 
            options={dropdownOptions.makes}
          />
          
          <DropdownSection 
            dropdownKey="models" 
            options={dropdownOptions.models}
          />
          
          <DropdownSection 
            dropdownKey="prices" 
            options={dropdownOptions.prices}
            isLast={true}
          />

          <button className="search-btn">
            <Search size={16} />
          </button>
        </div>

        {activeDropdown && (
          <div 
            className="dropdown-overlay" 
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </div>
    </div>
  );
}
