import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bookmark, ChevronRight, Grid3X3, LayoutList } from 'lucide-react';
import '../../../styles/vehicles-for-sale.css'
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

// Reusable Price Range Slider Component
const PriceRangeSlider = ({ min, max, value, onChange }) => {
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
    <div className="vehicles-sale-price-range">
      <div className="vehicles-sale-price-values">
        <span className="vehicles-sale-price-min">${minValue}k</span>
        <span className="vehicles-sale-price-max">${maxValue}k</span>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [priceRange, setPriceRange] = useState([15, 85]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (3 per row), 'compact' (4 per row), 'list' (1 per row)
  const [filters, setFilters] = useState({
    categories: [],
    makes: [],
    models: [],
    types: [],
    years: [],
    transmissions: [],
    fuelTypes: []
  });
  
  const itemsPerPage = viewMode === 'list' ? 5 : (viewMode === 'compact' ? 12 : 9);
  
  // Sample vehicle data
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
      year: '2022',
      category: 'Luxury',
      make: 'Tesla',
      model: 'Model S',
      type: 'Sedan',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 2,
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
      year: '2021',
      category: 'SUV',
      make: 'BMW',
      model: 'X5',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 3,
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
      year: '2023',
      category: 'Truck',
      make: 'Ford',
      model: 'F-150',
      type: 'Pickup',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 4,
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
      year: '2022',
      category: 'Economy',
      make: 'Toyota',
      model: 'Camry',
      type: 'Sedan',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 5,
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
      year: '2021',
      category: 'Luxury',
      make: 'Mercedes',
      model: 'C-Class',
      type: 'Sedan',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 6,
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
      year: '2023',
      category: 'SUV',
      make: 'Jeep',
      model: 'Wrangler',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 7,
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
      year: '2022',
      category: 'Sport',
      make: 'Honda',
      model: 'Civic',
      type: 'Sedan',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 8,
      title: '2021 Chevrolet Tahoe LT',
      description: 'Full-size SUV with three rows of seating and excellent towing capacity',
      price: '$48,700',
      originalPrice: '$52,000',
      badge: 'Family Ready',
      badgeColor: 'green',
      rating: 4.2,
      reviewCount: 11,
      mileage: '28,900 mi',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      year: '2021',
      category: 'SUV',
      make: 'Chevrolet',
      model: 'Tahoe',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 9,
      title: '2023 Porsche 911 Carrera',
      description: 'Iconic sports car with rear-engine layout and exceptional driving dynamics',
      price: '$115,800',
      originalPrice: null,
      badge: 'Performance',
      badgeColor: 'blue',
      rating: 4.9,
      reviewCount: 6,
      mileage: '3,200 mi',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      year: '2023',
      category: 'Sport',
      make: 'Porsche',
      model: '911',
      type: 'Coupe',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 10,
      title: '2022 Audi Q7 Premium Plus',
      description: 'Luxury three-row SUV with sophisticated technology and all-wheel drive',
      price: '$61,900',
      originalPrice: null,
      badge: 'Premium',
      badgeColor: 'blue',
      rating: 4.6,
      reviewCount: 13,
      mileage: '19,500 mi',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      year: '2022',
      category: 'Luxury',
      make: 'Audi',
      model: 'Q7',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1549399090-7e1ad5019a5c?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 11,
      title: '2021 Subaru Outback Limited',
      description: 'Adventure-ready wagon with standard all-wheel drive and excellent ground clearance',
      price: '$33,200',
      originalPrice: null,
      badge: 'Adventure Ready',
      badgeColor: 'green',
      rating: 4.4,
      reviewCount: 19,
      mileage: '25,100 mi',
      fuelType: 'Gasoline',
      transmission: 'CVT',
      year: '2021',
      category: 'Wagon',
      make: 'Subaru',
      model: 'Outback',
      type: 'Wagon',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 12,
      title: '2023 Ram 1500 Laramie',
      description: 'Full-size pickup with luxurious interior and impressive hauling capabilities',
      price: '$56,400',
      originalPrice: null,
      badge: 'Luxury Truck',
      badgeColor: 'blue',
      rating: 4.5,
      reviewCount: 7,
      mileage: '8,900 mi',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      year: '2023',
      category: 'Truck',
      make: 'Ram',
      model: '1500',
      type: 'Pickup',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
    }
  ];

  // Filter options data
  const filterOptions = {
    categories: [
      { value: 'Luxury', count: 3 },
      { value: 'SUV', count: 4 },
      { value: 'Sport', count: 2 },
      { value: 'Economy', count: 1 },
      { value: 'Truck', count: 2 },
      { value: 'Wagon', count: 1 }
    ],
    makes: [
      { value: 'Tesla', count: 1 },
      { value: 'BMW', count: 1 },
      { value: 'Ford', count: 1 },
      { value: 'Toyota', count: 1 },
      { value: 'Mercedes', count: 1 },
      { value: 'Jeep', count: 1 },
      { value: 'Honda', count: 1 },
      { value: 'Chevrolet', count: 1 },
      { value: 'Porsche', count: 1 },
      { value: 'Audi', count: 1 },
      { value: 'Subaru', count: 1 },
      { value: 'Ram', count: 1 }
    ],
    types: [
      { value: 'Sedan', count: 4 },
      { value: 'SUV', count: 5 },
      { value: 'Pickup', count: 2 },
      { value: 'Coupe', count: 1 },
      { value: 'Wagon', count: 1 }
    ],
    years: [
      { value: '2023', count: 4 },
      { value: '2022', count: 4 },
      { value: '2021', count: 4 }
    ],
    transmissions: [
      { value: 'Automatic', count: 7 },
      { value: 'Manual', count: 3 },
      { value: 'CVT', count: 2 }
    ],
    fuelTypes: [
      { value: 'Gasoline', count: 8 },
      { value: 'Electric', count: 2 },
      { value: 'Hybrid', count: 1 }
    ]
  };

  // Filter and sort vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = allVehicles.filter(vehicle => {
      // Price filter
      const price = parseInt(vehicle.price.replace(/[$,]/g, ''));
      if (price < priceRange[0] * 1000 || price > priceRange[1] * 1000) return false;
      
      // Category filters
      if (filters.categories.length > 0 && !filters.categories.includes(vehicle.category)) return false;
      if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false;
      if (filters.types.length > 0 && !filters.types.includes(vehicle.type)) return false;
      if (filters.years.length > 0 && !filters.years.includes(vehicle.year)) return false;
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(vehicle.transmission)) return false;
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
      
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
      case 'latest':
      default:
        // Keep original order for latest
        break;
    }

    return filtered;
  }, [allVehicles, filters, priceRange, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVehicles = filteredAndSortedVehicles.slice(startIndex, startIndex + itemsPerPage);

  // Filter handlers
  const handleFilterChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleVehicleClick = (vehicleId) => {
    navigate(`/car-listing/${vehicleId}`);
  };

  const removeFilter = (category, value) => {
    if (category === 'priceRange') {
      setPriceRange([15, 85]);
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
      categories: [],
      makes: [],
      models: [],
      types: [],
      years: [],
      transmissions: [],
      fuelTypes: []
    });
    setPriceRange([15, 85]);
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

    return activeFilters;
  };

  const getFilterColor = (category) => {
    const colors = {
      categories: { bg: '#e0f2fe', text: '#0369a1' }, // Light blue bg, dark blue text
      makes: { bg: '#dcfce7', text: '#166534' }, // Light green bg, dark green text
      types: { bg: '#fef3c7', text: '#d97706' }, // Light amber bg, dark amber text
      years: { bg: '#ede9fe', text: '#7c3aed' }, // Light purple bg, dark purple text
      transmissions: { bg: '#fee2e2', text: '#dc2626' }, // Light red bg, dark red text
      fuelTypes: { bg: '#fce7f3', text: '#c2185b' }, // Light pink bg, dark pink text
      priceRange: { bg: '#e0e7ff', text: '#4338ca' } // Light indigo bg, dark indigo text
    };
    return colors[category] || { bg: '#f3f4f6', text: '#374151' };
  };

  return (
    <div>
      <Navbar/>
      <div className="vehicles-sale-page">
        {/* Sidebar Filters */}
        <aside className="vehicles-sale-sidebar">
          {/* Categories */}
          <FilterCategory title="Categories">
            {filterOptions.categories.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.categories.includes(option.value)}
                onChange={(e) => handleFilterChange('categories', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Price Range */}
          <FilterCategory title="Price Range">
            <PriceRangeSlider
              min={15}
              max={120}
              value={priceRange}
              onChange={setPriceRange}
            />
          </FilterCategory>

          {/* Makes */}
          <FilterCategory title="Makes">
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

          {/* Types */}
          <FilterCategory title="Vehicle Types">
            {filterOptions.types.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.types.includes(option.value)}
                onChange={(e) => handleFilterChange('types', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Years */}
          <FilterCategory title="Years" isOpen={false}>
            {filterOptions.years.map(option => (
              <FilterOption
                key={option.value}
                label={option.value}
                count={option.count}
                checked={filters.years.includes(option.value)}
                onChange={(e) => handleFilterChange('years', option.value, e.target.checked)}
              />
            ))}
          </FilterCategory>

          {/* Transmissions */}
          <FilterCategory title="Transmissions" isOpen={false}>
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

          {/* Fuel Types */}
          <FilterCategory title="Fuel Types" isOpen={false}>
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