import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Bookmark, ChevronRight, Grid3X3, LayoutList } from 'lucide-react';
import '../../../styles/vehicles-for-sale.css'
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

// Reusable Range Slider Component
const RangeSlider = ({ label, min, max, value, onChange, unit = '' }) => {
  const [minValue, maxValue] = value;
  
  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 1);
    onChange([newMin, maxValue]);
  };
  
  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + 1);
    onChange([minValue, newMax]);
  };
  
  return (
    <div className="vehicles-sale-range-slider">
      <div className="vehicles-sale-range-values">
        <span className="vehicles-sale-range-min">{minValue}{unit}</span>
        <span className="vehicles-sale-range-max">{maxValue}{unit}</span>
      </div>
      <div className="vehicles-sale-slider-container">
        <div className="vehicles-sale-slider-track">
          <div 
            className="vehicles-sale-slider-range"
            style={{
              left: `${((minValue - min) / (max - min)) * 100}%`,
              width: `${((maxValue - minValue) / (max - min)) * 100}%`
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="vehicles-sale-range-input vehicles-sale-range-min"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="vehicles-sale-range-input vehicles-sale-range-max"
        />
      </div>
    </div>
  );
};

// Filter Category Component
const FilterCategory = ({ title, children, isOpen = true }) => {
  const [expanded, setExpanded] = useState(isOpen);
  
  // Check if this category should have scroll (more than 5 children)
  const shouldScroll = React.Children.count(children) > 5;
  
  return (
    <div className="vehicles-sale-filter-category">
      <div 
        className="vehicles-sale-filter-header"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="vehicles-sale-filter-title">{title}</h3>
        <ChevronRight 
          className={`vehicles-sale-filter-chevron ${expanded ? 'vehicles-sale-filter-chevron-expanded' : ''}`} 
        />
      </div>
      {expanded && (
        <div className={`vehicles-sale-filter-content ${shouldScroll ? 'vehicles-sale-filter-content-scrollable' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

// Filter Option Component
const FilterOption = ({ label, count, checked, onChange }) => (
  <div className="vehicles-sale-filter-option">
    <label className="vehicles-sale-filter-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="vehicles-sale-filter-checkbox"
      />
      <span className="vehicles-sale-filter-text">{label}</span>
    </label>
    <span className="vehicles-sale-filter-count">({count})</span>
  </div>
);

// Vehicle Card Component
const VehicleCard = ({ vehicle, onClick, viewMode }) => (
  <div className={`vehicles-sale-card ${viewMode === 'list' ? 'vehicles-sale-card-list' : ''}`} onClick={() => onClick(vehicle.id)}>
    {/* Image Container */}
    <div className="vehicles-sale-img-container">
      <div className="vehicles-sale-img-wrapper">
        <img 
          src={vehicle.image} 
          alt={vehicle.title}
          className="vehicles-sale-img"
        />
      </div>
      
      {/* Badge */}
      {vehicle.badge && (
        <div className={`vehicles-sale-badge ${vehicle.badgeColor === 'green' ? 'vehicles-sale-badge-green' : 'vehicles-sale-badge-blue'}`}>
          <span className="vehicles-sale-badge-text">
            {vehicle.badge}
          </span>
        </div>
      )}
      
      {/* Bookmark Icon */}
      <div className="vehicles-sale-bookmark" onClick={(e) => {
        e.stopPropagation();
        console.log(`Bookmarked vehicle: ${vehicle.title}`);
      }}>
        <div className="vehicles-sale-bookmark-bg">
          <Bookmark className="vehicles-sale-bookmark-icon" />
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="vehicles-sale-content">
      {/* Title */}
      <div className="vehicles-sale-title-container">
        <h3 className="vehicles-sale-title">{vehicle.title}</h3>
      </div>
      
      {/* Description */}
      <div className="vehicles-sale-desc-container">
        <p className="vehicles-sale-desc">
          {vehicle.description}
        </p>
      </div>
      
      {/* Specifications Row 1 */}
      <div className="vehicles-sale-specs-row">
        <div className="vehicles-sale-spec-item">
          <svg className="vehicles-sale-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span className="vehicles-sale-spec-text">{vehicle.mileage}</span>
        </div>
        <div className="vehicles-sale-spec-item">
          <svg className="vehicles-sale-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
          <span className="vehicles-sale-spec-text">{vehicle.fuelType}</span>
        </div>
      </div>
      
      {/* Specifications Row 2 */}
      <div className="vehicles-sale-specs-row">
        <div className="vehicles-sale-spec-item">
          <svg className="vehicles-sale-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
          </svg>
          <span className="vehicles-sale-spec-text">{vehicle.transmission}</span>
        </div>
        <div className="vehicles-sale-spec-item">
          <svg className="vehicles-sale-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
          <span className="vehicles-sale-spec-text">{vehicle.year}</span>
        </div>
      </div>
      
      {/* Price and Action */}
      <div className="vehicles-sale-footer">
        <div className="vehicles-sale-price-section">
          <div className="vehicles-sale-price">{vehicle.price}</div>
        </div>
        <div 
          className="vehicles-sale-view-details"
          onClick={(e) => {
            e.stopPropagation();
            onClick(vehicle.id);
          }}
        >
          <span className="vehicles-sale-view-details-text">View Details</span>
          <ArrowRight className="vehicles-sale-view-details-icon" />
        </div>
      </div>
    </div>
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Always show first page
  if (totalPages > 0) pages.push(1);
  
  // Add current page and surrounding pages
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  
  // Always show last page
  if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
  
  return (
    <div className="vehicles-sale-pagination">
      {pages.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 && pages[index - 1] !== page - 1 && (
            <span className="vehicles-sale-pagination-ellipsis">...</span>
          )}
          <button
            className={`vehicles-sale-pagination-btn ${currentPage === page ? 'vehicles-sale-pagination-active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </React.Fragment>
      ))}
      
      {currentPage < totalPages && (
        <button
          className="vehicles-sale-pagination-btn vehicles-sale-pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="vehicles-sale-pagination-icon" />
        </button>
      )}
    </div>
  );
};

// Main VehiclesForSale Component
const VehiclesForSale = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [priceRange, setPriceRange] = useState([15, 85]);
  const [yearRange, setYearRange] = useState([2020, 2024]);
  const [mileageRange, setMileageRange] = useState([0, 100]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (3 per row), 'compact' (4 per row), 'list' (1 per row)
  const [filters, setFilters] = useState({
    makes: [],
    models: [],
    bodyTypes: [],
    transmissions: [],
    fuelTypes: [],
    engineSizes: [],
    conditions: []
  });
  
  const itemsPerPage = viewMode === 'list' ? 5 : (viewMode === 'compact' ? 12 : 9);
  
  // Parse URL parameters and apply filters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Apply filters from URL parameters
    const newFilters = {
      makes: [],
      models: [],
      bodyTypes: [],
      transmissions: [],
      fuelTypes: [],
      engineSizes: [],
      conditions: []
    };
    
    // Parse make filter
    const make = searchParams.get('make');
    if (make) {
      newFilters.makes = [make];
    }
    
    // Parse model filter
    const model = searchParams.get('model');
    if (model) {
      newFilters.models = [model];
    }
    
    // Parse bodyType filter
    const bodyType = searchParams.get('bodyType');
    if (bodyType) {
      newFilters.bodyTypes = [bodyType];
    }
    
    // Parse condition filter
    const condition = searchParams.get('condition');
    if (condition) {
      newFilters.conditions = [condition];
    }
    
    // Parse price range filter
    const priceRangeParam = searchParams.get('priceRange');
    if (priceRangeParam) {
      const [min, max] = priceRangeParam.split('-').map(Number);
      setPriceRange([min, max]);
    }
    
    // Set the filters
    setFilters(newFilters);
    
  }, [location.search]);
  
  // Enhanced vehicle data with multiple models per make
  const allVehicles = [
    {
      id: 1,
      title: '2022 Tesla Model S Plaid',
      description: 'Ultra-high performance electric sedan with autopilot capabilities and premium interior',
      price: '$89,900',
      originalPrice: null,
      badge: 'Low Mileage',
      badgeColor: 'blue',
      rating: 4.8,
      reviewCount: 12,
      mileage: '8,500 mi',
      fuelType: 'Electric',
      transmission: 'Automatic',
      year: 2022,
      make: 'Tesla',
      model: 'Model S',
      bodyType: 'Sedan',
      engineSize: 'Electric Motor',
      condition: 'Used',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 2,
      title: '2023 Tesla Model 3 Performance',
      description: 'High-performance compact electric sedan with advanced autopilot features',
      price: '$54,900',
      originalPrice: null,
      badge: 'New Arrival',
      badgeColor: 'blue',
      rating: 4.7,
      reviewCount: 18,
      mileage: '2,100 mi',
      fuelType: 'Electric',
      transmission: 'Automatic',
      year: 2023,
      make: 'Tesla',
      model: 'Model 3',
      bodyType: 'Sedan',
      engineSize: 'Electric Motor',
      condition: 'New',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 3,
      title: '2021 BMW X5 xDrive40i',
      description: 'Premium SUV with all-wheel drive, panoramic sunroof, and advanced safety features',
      price: '$52,900',
      originalPrice: '$58,900',
      badge: 'Great Deal',
      badgeColor: 'green',
      rating: 4.5,
      reviewCount: 8,
      mileage: '23,400 mi',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      year: 2021,
      make: 'BMW',
      model: 'X5',
      bodyType: 'SUV',
      engineSize: '3.0L Turbo I6',
      condition: 'CPO',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 4,
      title: '2022 BMW 3 Series 330i',
      description: 'Luxury compact sedan with sporty handling and premium amenities',
      price: '$43,500',
      originalPrice: null,
      badge: 'Premium',
      badgeColor: 'blue',
      rating: 4.6,
      reviewCount: 12,
      mileage: '15,800 mi',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      year: 2022,
      make: 'BMW',
      model: '3 Series',
      bodyType: 'Sedan',
      engineSize: '2.0L Turbo I4',
      condition: 'Used',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 5,
      title: '2023 Ford F-150 Lightning',
      description: 'All-electric pickup truck with impressive towing capacity and innovative features',
      price: '$67,500',
      originalPrice: null,
      badge: 'New Arrival',
      badgeColor: 'blue',
      rating: 4.6,
      reviewCount: 15,
      mileage: '5,200 mi',
      fuelType: 'Electric',
      transmission: 'Automatic',
      year: 2023,
      make: 'Ford',
      model: 'F-150 Lightning',
      bodyType: 'Pickup Truck',
      engineSize: 'Electric Motor',
      condition: 'New',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 6,
      title: '2022 Ford Mustang GT',
      description: 'Classic American muscle car with powerful V8 engine and iconic styling',
      price: '$38,900',
      originalPrice: null,
      badge: 'Sport Package',
      badgeColor: 'blue',
      rating: 4.4,
      reviewCount: 9,
      mileage: '12,500 mi',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      year: 2022,
      make: 'Ford',
      model: 'Mustang',
      bodyType: 'Coupe',
      engineSize: '5.0L V8',
      condition: 'Used',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 7,
      title: '2022 Toyota Camry Hybrid',
      description: 'Fuel-efficient hybrid sedan with reliable performance and modern technology',
      price: '$28,900',
      originalPrice: null,
      badge: 'Best Value',
      badgeColor: 'green',
      rating: 4.3,
      reviewCount: 22,
      mileage: '18,500 mi',
      fuelType: 'Hybrid',
      transmission: 'CVT',
      year: 2022,
      make: 'Toyota',
      model: 'Camry',
      bodyType: 'Sedan',
      engineSize: '2.5L Hybrid I4',
      condition: 'Used',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 8,
      title: '2023 Toyota RAV4 Hybrid',
      description: 'Compact hybrid SUV with excellent fuel economy and all-wheel drive capability',
      price: '$32,400',
      originalPrice: null,
      badge: 'Eco-Friendly',
      badgeColor: 'green',
      rating: 4.5,
      reviewCount: 16,
      mileage: '8,900 mi',
      fuelType: 'Hybrid',
      transmission: 'CVT',
      year: 2023,
      make: 'Toyota',
      model: 'RAV4',
      bodyType: 'SUV',
      engineSize: '2.5L Hybrid I4',
      condition: 'New',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 9,
      title: '2021 Mercedes-Benz C-Class',
      description: 'Luxury compact sedan with premium materials and advanced driver assistance',
      price: '$41,800',
      originalPrice: null,
      badge: 'Certified',
      badgeColor: 'blue',
      rating: 4.7,
      reviewCount: 9,
      mileage: '31,200 mi',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      year: 2021,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      bodyType: 'Sedan',
      engineSize: '2.0L Turbo I4',
      condition: 'CPO',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 10,
      title: '2022 Mercedes-Benz GLE 350',
      description: 'Luxury mid-size SUV with advanced technology and premium comfort features',
      price: '$58,700',
      originalPrice: null,
      badge: 'Luxury',
      badgeColor: 'blue',
      rating: 4.6,
      reviewCount: 11,
      mileage: '19,600 mi',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      year: 2022,
      make: 'Mercedes-Benz',
      model: 'GLE',
      bodyType: 'SUV',
      engineSize: '2.0L Turbo I4',
      condition: 'CPO',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 11,
      title: '2023 Jeep Wrangler Unlimited',
      description: 'Rugged off-road SUV with removable doors and roof for outdoor adventures',
      price: '$45,300',
      originalPrice: null,
      badge: 'Off-Road Ready',
      badgeColor: 'green',
      rating: 4.4,
      reviewCount: 18,
      mileage: '12,800 mi',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      year: 2023,
      make: 'Jeep',
      model: 'Wrangler',
      bodyType: 'SUV',
      engineSize: '3.6L V6',
      condition: 'New',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 12,
      title: '2022 Honda Civic Si',
      description: 'Sporty compact sedan with manual transmission and performance-tuned suspension',
      price: '$26,500',
      originalPrice: null,
      badge: 'Sport Package',
      badgeColor: 'blue',
      rating: 4.5,
      reviewCount: 14,
      mileage: '15,600 mi',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      year: 2022,
      make: 'Honda',
      model: 'Civic',
      bodyType: 'Sedan',
      engineSize: '1.5L Turbo I4',
      condition: 'Used',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 13,
      title: '2023 Honda CR-V Hybrid',
      description: 'Reliable compact SUV with hybrid powertrain and spacious interior',
      price: '$34,200',
      originalPrice: null,
      badge: 'Best Seller',
      badgeColor: 'green',
      rating: 4.4,
      reviewCount: 20,
      mileage: '6,800 mi',
      fuelType: 'Hybrid',
      transmission: 'CVT',
      year: 2023,
      make: 'Honda',
      model: 'CR-V',
      bodyType: 'SUV',
      engineSize: '2.0L Hybrid I4',
      condition: 'New',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop&crop=center'
    }
  ];

  // Updated filter options with multiple models per make
  const filterOptions = {
    makes: [
      { value: 'Tesla', count: 2 },
      { value: 'BMW', count: 2 },
      { value: 'Ford', count: 2 },
      { value: 'Toyota', count: 2 },
      { value: 'Mercedes-Benz', count: 2 },
      { value: 'Jeep', count: 1 },
      { value: 'Honda', count: 2 }
    ],
    // Models will be filtered based on selected makes
    allModels: [
      { value: 'Model S', make: 'Tesla', count: 1 },
      { value: 'Model 3', make: 'Tesla', count: 1 },
      { value: 'X5', make: 'BMW', count: 1 },
      { value: '3 Series', make: 'BMW', count: 1 },
      { value: 'F-150 Lightning', make: 'Ford', count: 1 },
      { value: 'Mustang', make: 'Ford', count: 1 },
      { value: 'Camry', make: 'Toyota', count: 1 },
      { value: 'RAV4', make: 'Toyota', count: 1 },
      { value: 'C-Class', make: 'Mercedes-Benz', count: 1 },
      { value: 'GLE', make: 'Mercedes-Benz', count: 1 },
      { value: 'Wrangler', make: 'Jeep', count: 1 },
      { value: 'Civic', make: 'Honda', count: 1 },
      { value: 'CR-V', make: 'Honda', count: 1 }
    ],
    bodyTypes: [
      { value: 'Sedan', count: 6 },
      { value: 'SUV', count: 5 },
      { value: 'Pickup Truck', count: 1 },
      { value: 'Coupe', count: 1 }
    ],
    transmissions: [
      { value: 'Automatic', count: 9 },
      { value: 'Manual', count: 2 },
      { value: 'CVT', count: 4 }
    ],
    fuelTypes: [
      { value: 'Gasoline', count: 6 },
      { value: 'Electric', count: 3 },
      { value: 'Hybrid', count: 4 }
    ],
    engineSizes: [
      { value: '1.5L Turbo I4', count: 1 },
      { value: '2.0L Turbo I4', count: 3 },
      { value: '2.0L Hybrid I4', count: 1 },
      { value: '2.5L Hybrid I4', count: 2 },
      { value: '3.0L Turbo I6', count: 1 },
      { value: '3.6L V6', count: 1 },
      { value: '5.0L V8', count: 1 },
      { value: 'Electric Motor', count: 3 }
    ],
    conditions: [
      { value: 'New', count: 6 },
      { value: 'Used', count: 5 },
      { value: 'CPO', count: 2 }
    ]
  };

  // Get available models based on selected makes
  const getAvailableModels = () => {
    if (filters.makes.length === 0) {
      // If no makes selected, show all models
      return filterOptions.allModels;
    }
    
    // Filter models based on selected makes
    return filterOptions.allModels.filter(model => 
      filters.makes.includes(model.make)
    );
  };

  // Filter and sort vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = allVehicles.filter(vehicle => {
      // Price filter
      const price = parseInt(vehicle.price.replace(/[$,]/g, ''));
      if (price < priceRange[0] * 1000 || price > priceRange[1] * 1000) return false;
      
      // Year filter
      if (vehicle.year < yearRange[0] || vehicle.year > yearRange[1]) return false;
      
      // Mileage filter (convert to thousands)
      const mileage = parseInt(vehicle.mileage.replace(/[^0-9]/g, '')) / 1000;
      if (mileage < mileageRange[0] || mileage > mileageRange[1]) return false;
      
      // Category filters
      if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false;
      if (filters.models.length > 0 && !filters.models.includes(vehicle.model)) return false;
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(vehicle.bodyType)) return false;
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(vehicle.transmission)) return false;
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
      if (filters.engineSizes.length > 0 && !filters.engineSizes.includes(vehicle.engineSize)) return false;
      if (filters.conditions.length > 0 && !filters.conditions.includes(vehicle.condition)) return false;
      
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseInt(a.price.replace(/[$,]/g, '')) - parseInt(b.price.replace(/[$,]/g, '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseInt(b.price.replace(/[$,]/g, '')) - parseInt(a.price.replace(/[$,]/g, '')));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'mileage':
        filtered.sort((a, b) => parseInt(a.mileage.replace(/[^0-9]/g, '')) - parseInt(b.mileage.replace(/[^0-9]/g, '')));
        break;
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'latest':
      default:
        // Keep original order for latest
        break;
    }

    return filtered;
  }, [allVehicles, filters, priceRange, yearRange, mileageRange, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVehicles = filteredAndSortedVehicles.slice(startIndex, startIndex + itemsPerPage);

  // Filter handlers
  const handleFilterChange = (category, value, checked) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [category]: checked 
          ? [...prev[category], value]
          : prev[category].filter(item => item !== value)
      };

      // If make is deselected, remove associated models
      if (category === 'makes' && !checked) {
        // Get models that belong to the deselected make
        const modelsToRemove = filterOptions.allModels
          .filter(model => model.make === value)
          .map(model => model.value);
        
        // Remove those models from selected models
        newFilters.models = newFilters.models.filter(model => 
          !modelsToRemove.includes(model)
        );
      }

      return newFilters;
    });
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleVehicleClick = (vehicleId) => {
    navigate(`/car-listing/${vehicleId}`);
  };

  const removeFilter = (category, value) => {
    if (category === 'priceRange') {
      setPriceRange([15, 85]);
      setCurrentPage(1);
    } else if (category === 'yearRange') {
      setYearRange([2020, 2024]);
      setCurrentPage(1);
    } else if (category === 'mileageRange') {
      setMileageRange([0, 100]);
      setCurrentPage(1);
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].filter(item => item !== value)
      }));
      setCurrentPage(1);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      makes: [],
      models: [],
      bodyTypes: [],
      transmissions: [],
      fuelTypes: [],
      engineSizes: [],
      conditions: []
    });
    setPriceRange([15, 85]);
    setYearRange([2020, 2024]);
    setMileageRange([0, 100]);
    setCurrentPage(1);
  };

  const getActiveFilters = () => {
    const activeFilters = [];
    
    Object.entries(filters).forEach(([category, values]) => {
      values.forEach(value => {
        activeFilters.push({ category, value });
      });
    });

    // Add price range if not default
    if (priceRange[0] !== 15 || priceRange[1] !== 85) {
      activeFilters.push({ 
        category: 'priceRange', 
        value: `${priceRange[0]}k - ${priceRange[1]}k` 
      });
    }

    // Add year range if not default
    if (yearRange[0] !== 2020 || yearRange[1] !== 2024) {
      activeFilters.push({ 
        category: 'yearRange', 
        value: `${yearRange[0]} - ${yearRange[1]}` 
      });
    }

    // Add mileage range if not default
    if (mileageRange[0] !== 0 || mileageRange[1] !== 100) {
      activeFilters.push({ 
        category: 'mileageRange', 
        value: `${mileageRange[0]}k - ${mileageRange[1]}k mi` 
      });
    }

    return activeFilters;
  };

  const getFilterColor = (category) => {
    const colors = {
      makes: { bg: '#dcfce7', text: '#166534' }, // Light green bg, dark green text
      models: { bg: '#fef3c7', text: '#d97706' }, // Light amber bg, dark amber text
      bodyTypes: { bg: '#e0f2fe', text: '#0369a1' }, // Light blue bg, dark blue text
      transmissions: { bg: '#fee2e2', text: '#dc2626' }, // Light red bg, dark red text
      fuelTypes: { bg: '#fce7f3', text: '#c2185b' }, // Light pink bg, dark pink text
      engineSizes: { bg: '#ede9fe', text: '#7c3aed' }, // Light purple bg, dark purple text
      conditions: { bg: '#f0fdf4', text: '#15803d' }, // Light emerald bg, dark emerald text
      priceRange: { bg: '#e0e7ff', text: '#4338ca' }, // Light indigo bg, dark indigo text
      yearRange: { bg: '#fef7ff', text: '#a21caf' }, // Light fuchsia bg, dark fuchsia text
      mileageRange: { bg: '#ecfccb', text: '#65a30d' } // Light lime bg, dark lime text
    };
    return colors[category] || { bg: '#f3f4f6', text: '#374151' };
  };

  return (
    <div>
      <Navbar/>
      <div className="vehicles-sale-page">
        {/* Sidebar Filters */}
        <aside className="vehicles-sale-sidebar">
          {/* Make */}
          <FilterCategory title="Make">
            {filterOptions.makes.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.makes.includes(option.value)}
                onChange={(e) => handleFilterChange('makes', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Model */}
          <FilterCategory title="Model">
            {getAvailableModels().length > 0 ? (
              getAvailableModels().map(option => (
                <FilterOption
                  key={option.value}
                  label={option.value}
                  count={option.count}
                  checked={filters.models.includes(option.value)}
                  onChange={(e) => handleFilterChange('models', option.value, e.target.checked)}
                />
              ))
            ) : (
              <div className="vehicles-sale-no-options">
                {filters.makes.length > 0 
                  ? "No models available for selected makes"
                  : "Select a make to see available models"
                }
              </div>
            )}
          </FilterCategory>

          {/* Year Range */}
          <FilterCategory title="Year Range">
            <RangeSlider
              label="Year Range"
              min={2020}
              max={2024}
              value={yearRange}
              onChange={setYearRange}
              unit=""
            />
          </FilterCategory>

          {/* Price Range */}
          <FilterCategory title="Price Range">
            <RangeSlider
              label="Price Range"
              min={15}
              max={120}
              value={priceRange}
              onChange={setPriceRange}
              unit="k"
            />
          </FilterCategory>

          {/* Mileage Range */}
          <FilterCategory title="Mileage Range">
            <RangeSlider
              label="Mileage Range"
              min={0}
              max={100}
              value={mileageRange}
              onChange={setMileageRange}
              unit="k mi"
            />
          </FilterCategory>

          {/* Body Type */}
          <FilterCategory title="Body Type">
            {filterOptions.bodyTypes.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.bodyTypes.includes(option.value)}
                onChange={(e) => handleFilterChange('bodyTypes', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Transmission */}
          <FilterCategory title="Transmission">
            {filterOptions.transmissions.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.transmissions.includes(option.value)}
                onChange={(e) => handleFilterChange('transmissions', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Fuel Type */}
          <FilterCategory title="Fuel Type">
            {filterOptions.fuelTypes.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.fuelTypes.includes(option.value)}
                onChange={(e) => handleFilterChange('fuelTypes', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Engine Size / Cylinders */}
          <FilterCategory title="Engine Size" isOpen={false}>
            {filterOptions.engineSizes.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.engineSizes.includes(option.value)}
                onChange={(e) => handleFilterChange('engineSizes', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Condition */}
          <FilterCategory title="Condition" isOpen={false}>
            {filterOptions.conditions.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.conditions.includes(option.value)}
                onChange={(e) => handleFilterChange('conditions', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>
        </aside>

        {/* Main Content */}
        <main className="vehicles-sale-main">
          {/* Header */}
          <div className="vehicles-sale-header">
            <div className="vehicles-sale-results-info">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredAndSortedVehicles.length)} of {filteredAndSortedVehicles.length} vehicles
            </div>
            
            <div className="vehicles-sale-controls">
              <div className="vehicles-sale-view-buttons">
                <button 
                  className={`vehicles-sale-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => {setViewMode('list'); setCurrentPage(1);}}
                  title="List View (1 per row)"
                >
                  <LayoutList className="vehicles-sale-view-icon" />
                </button>
                <button 
                  className={`vehicles-sale-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => {setViewMode('grid'); setCurrentPage(1);}}
                  title="Grid View (3 per row)"
                >
                  <div className="vehicles-sale-grid-icon">
                    <div className="vehicles-sale-grid-dots">
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </button>
                <button 
                  className={`vehicles-sale-view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                  onClick={() => {setViewMode('compact'); setCurrentPage(1);}}
                  title="Compact View (4 per row)"
                >
                  <Grid3X3 className="vehicles-sale-view-icon" />
                </button>
              </div>
              
              <div className="vehicles-sale-sort-container">
                <label className="vehicles-sale-sort-label">Sort by:</label>
                <select 
                  className="vehicles-sale-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Sort by latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="mileage">Lowest Mileage</option>
                  <option value="year">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Section */}
          {getActiveFilters().length > 0 && (
            <div className="vehicles-sale-active-filters">
              <div className="vehicles-sale-filter-tags">
                {getActiveFilters().map((filter, index) => {
                  const colors = getFilterColor(filter.category);
                  return (
                    <div 
                      key={`${filter.category}-${filter.value}-${index}`}
                      className="vehicles-sale-filter-tag"
                      style={{ 
                        backgroundColor: colors.bg,
                        color: colors.text
                      }}
                    >
                      <span className="vehicles-sale-filter-tag-text">{filter.value}</span>
                      <button
                        className="vehicles-sale-filter-tag-remove"
                        onClick={() => removeFilter(filter.category, filter.value)}
                        title="Remove filter"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                className="vehicles-sale-clear-filters"
                onClick={clearAllFilters}
                title="Clear all filters"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Vehicle Grid */}
          <div className={`vehicles-sale-grid ${viewMode === 'compact' ? 'vehicles-sale-grid-compact' : viewMode === 'list' ? 'vehicles-sale-grid-list' : 'vehicles-sale-grid-normal'}`}>
            {currentVehicles.map(vehicle => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onClick={handleVehicleClick}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default VehiclesForSale;