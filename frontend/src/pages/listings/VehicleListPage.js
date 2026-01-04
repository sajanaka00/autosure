import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid3X3, LayoutList, Plus } from 'lucide-react';
import './VehicleListPage.css';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { tokenManager } from '../../utils/tokenManager';

// Extracted Components
import VehicleCard from '../../components/listings/VehicleCard';
import Pagination from '../../components/listings/Pagination';
import VehicleFilterSidebar from '../../components/listings/VehicleFilterSidebar';
import VehicleGrid from '../../components/listings/VehicleGrid';
import ActiveFilterTags from '../../components/listings/ActiveFilterTags';

// Data
import { allVehicles } from '../../data/vehicleListingData';

// Main VehiclesForSale Component
const VehicleListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(tokenManager.getUser());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');

  const [priceRange, setPriceRange] = useState([0, 150]);
  const [yearRange, setYearRange] = useState([2020, 2025]);
  const [mileageRange, setMileageRange] = useState([0, 100]);
  const [viewMode, setViewMode] = useState('grid');
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

  // Fetching effects removed to use local data from allVehicles

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

  const filterOptions = useMemo(() => {
    const getOptions = (key) => {
      const counts = allVehicles.reduce((acc, vehicle) => {
        const val = vehicle[key];
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(counts).map(([value, count]) => ({ value, count }));
    };

    // Special handling for models to include make information and count
    const allModelsOptions = allVehicles.reduce((acc, vehicle) => {
      const existingModel = acc.find(item => item.value === vehicle.model && item.make === vehicle.make);
      if (existingModel) {
        existingModel.count++;
      } else {
        acc.push({ value: vehicle.model, make: vehicle.make, count: 1 });
      }
      return acc;
    }, []);

    return {
      makes: getOptions('make'),
      allModels: allModelsOptions,
      bodyTypes: getOptions('bodyType'),
      transmissions: getOptions('transmission'),
      fuelTypes: getOptions('fuelType'),
      engineSizes: getOptions('engineSize'),
      conditions: getOptions('condition'),
    };
  }, [allVehicles]);

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

  const handleMakeChange = (val) => {
    setFilters(prev => ({ ...prev, makes: val ? [val] : [], models: [] }));
    setCurrentPage(1);
  };

  const handleModelChange = (val) => {
    setFilters(prev => ({ ...prev, models: val ? [val] : [] }));
    setCurrentPage(1);
  };

  const handleLogout = () => {
    tokenManager.clearAll();
    setUser(null);
    navigate('/');
  };

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  const handleAddVehicle = () => {
    // Navigate to add vehicle page or open modal
    navigate('/vehicles/add');
  };

  const removeFilter = (category, value) => {
    if (category === 'priceRange') {
      setPriceRange([0, 150]);
      setCurrentPage(1);
    } else if (category === 'yearRange') {
      setYearRange([2020, 2025]);
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
    setPriceRange([0, 150]);
    setYearRange([2020, 2025]);
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
    if (priceRange[0] !== 0 || priceRange[1] !== 150) {
      activeFilters.push({
        category: 'priceRange',
        value: `${priceRange[0]}k - ${priceRange[1]}k`
      });
    }

    // Add year range if not default
    if (yearRange[0] !== 2020 || yearRange[1] !== 2025) {
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
    <div className="vehicles-page-wrapper" >
      <Navbar user={user} onLogout={handleLogout} />
      <div className="vehicles-sale-page">
        {/* Sidebar Filters */}
        <VehicleFilterSidebar
          filters={filters}
          filterOptions={filterOptions}
          getAvailableModels={getAvailableModels}
          onFilterChange={handleFilterChange}
          onMakeChange={handleMakeChange}
          onModelChange={handleModelChange}
          yearRange={yearRange}
          setYearRange={setYearRange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          mileageRange={mileageRange}
          setMileageRange={setMileageRange}
          clearAllFilters={clearAllFilters}
        />

        {/* Main Content */}
        <main className="vehicles-sale-main">
          {/* Header */}
          <div className="vehicles-sale-header">
            <div className="vehicles-sale-results-info">
              Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, filteredAndSortedVehicles.length)} of{' '}
              {filteredAndSortedVehicles.length} vehicles
            </div>

            <div className="vehicles-sale-controls">
              <div className="vehicles-sale-view-buttons">
                <button
                  className={`vehicles-sale-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('list');
                    setCurrentPage(1);
                  }}
                  title="List View (1 per row)"
                >
                  <LayoutList className="vehicles-sale-view-icon" />
                </button>
                <button
                  className={`vehicles-sale-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('grid');
                    setCurrentPage(1);
                  }}
                  title="Grid View (3 per row)"
                >
                  <div className="vehicles-sale-grid-icon">
                    <div className="vehicles-sale-grid-dots">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </button>
                <button
                  className={`vehicles-sale-view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('compact');
                    setCurrentPage(1);
                  }}
                  title="Compact View (4 per row)"
                >
                  <Grid3X3 className="vehicles-sale-view-icon" />
                </button>
              </div>

              <div className="vehicles-sale-sort-container">
                <span className="vehicles-sale-sort-label">Sort by:</span>
                <select
                  className="vehicles-sale-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                  <option value="mileage">Lowest Mileage</option>
                  <option value="year">Newest Year</option>
                </select>
              </div>

              <button
                className="vehicles-sale-add-btn"
                onClick={handleAddVehicle}
                title="Add Vehicle"
              >
                <Plus className="vehicles-sale-add-icon" />
                <span className="vehicles-sale-add-text">Add Vehicle</span>
              </button>
            </div>
          </div>

          {/* Active Filters Section */}
          <ActiveFilterTags
            activeFilters={getActiveFilters()}
            getFilterColor={getFilterColor}
            removeFilter={removeFilter}
            clearAllFilters={clearAllFilters}
          />

          {/* Vehicle Grid */}
          <VehicleGrid
            vehicles={currentVehicles}
            viewMode={viewMode}
            onVehicleClick={handleVehicleClick}
          />

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
      <Footer />
    </div >
  );
};

export default VehicleListPage;