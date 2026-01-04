import React from 'react';
import { FilterCategory, FilterOption, RangeSlider } from './FilterComponents';

const VehicleFilterSidebar = ({
    filters,
    filterOptions,
    getAvailableModels,
    onFilterChange,
    onMakeChange,
    onModelChange,
    yearRange,
    setYearRange,
    priceRange,
    setPriceRange,
    mileageRange,
    setMileageRange,
    clearAllFilters
}) => {
    return (
        <aside className="vehicles-sale-sidebar">
            {/* Make Filter */}
            <FilterCategory title="Make">
                <div className="v-search-box">
                    <select
                        className="v-sidebar-select"
                        value={filters.makes[0] || ''}
                        onChange={(e) => onMakeChange(e.target.value)}
                    >
                        <option value="">Any Make</option>
                        {filterOptions.makes.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.value} ({m.count})
                            </option>
                        ))}
                    </select>
                </div>
            </FilterCategory>

            {/* Model Filter */}
            <FilterCategory title="Model">
                <div className="v-search-box">
                    <select
                        className="v-sidebar-select"
                        value={filters.models[0] || ''}
                        onChange={(e) => onModelChange(e.target.value)}
                        disabled={filters.makes.length === 0}
                    >
                        <option value="">
                            {filters.makes.length === 0 ? 'Select Make First' : 'Any Model'}
                        </option>
                        {getAvailableModels().map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.value}
                            </option>
                        ))}
                    </select>
                </div>
            </FilterCategory>

            {/* Body Type */}
            <FilterCategory title="Body Type">
                {filterOptions.bodyTypes.map((option) => (
                    <FilterOption
                        key={option.value}
                        label={option.value}
                        count={option.count}
                        checked={filters.bodyTypes.includes(option.value)}
                        onChange={(e) =>
                            onFilterChange('bodyTypes', option.value, e.target.checked)
                        }
                    />
                ))}
            </FilterCategory>

            {/* Year Range */}
            <FilterCategory title="Year Range">
                <RangeSlider
                    label="Year Range"
                    min={2020}
                    max={2025}
                    value={yearRange}
                    onChange={setYearRange}
                    unit=""
                />
            </FilterCategory>

            {/* Price Range */}
            <FilterCategory title="Price Range">
                <RangeSlider
                    label="Price Range"
                    min={0}
                    max={150}
                    value={priceRange}
                    onChange={setPriceRange}
                    unit="k"
                />
            </FilterCategory>

            {/* Mileage Range */}
            <FilterCategory title="Mileage Range">
                <RangeSlider
                    label="Mileage"
                    min={0}
                    max={100}
                    value={mileageRange}
                    onChange={setMileageRange}
                    unit="k"
                />
            </FilterCategory>

            {/* Transmission */}
            <FilterCategory title="Transmission" isOpen={false}>
                {filterOptions.transmissions.map((option) => (
                    <FilterOption
                        key={option.value}
                        label={option.value}
                        count={option.count}
                        checked={filters.transmissions.includes(option.value)}
                        onChange={(e) =>
                            onFilterChange('transmissions', option.value, e.target.checked)
                        }
                    />
                ))}
            </FilterCategory>

            {/* Fuel Type */}
            <FilterCategory title="Fuel Type" isOpen={false}>
                {filterOptions.fuelTypes.map((option) => (
                    <FilterOption
                        key={option.value}
                        label={option.value}
                        count={option.count}
                        checked={filters.fuelTypes.includes(option.value)}
                        onChange={(e) =>
                            onFilterChange('fuelTypes', option.value, e.target.checked)
                        }
                    />
                ))}
            </FilterCategory>

            {/* Engine Size */}
            <FilterCategory title="Engine Size" isOpen={false}>
                {filterOptions.engineSizes.map((option) => (
                    <FilterOption
                        key={option.value}
                        label={option.value}
                        count={option.count}
                        checked={filters.engineSizes.includes(option.value)}
                        onChange={(e) =>
                            onFilterChange('engineSizes', option.value, e.target.checked)
                        }
                    />
                ))}
            </FilterCategory>

            {/* Condition */}
            <FilterCategory title="Condition" isOpen={false}>
                {filterOptions.conditions.map((option) => (
                    <FilterOption
                        key={option.value}
                        label={option.value}
                        count={option.count}
                        checked={filters.conditions.includes(option.value)}
                        onChange={(e) =>
                            onFilterChange('conditions', option.value, e.target.checked)
                        }
                    />
                ))}
            </FilterCategory>

            <button className="v-sidebar-clear-filters" onClick={clearAllFilters}>
                Clear All Filters
            </button>
        </aside>
    );
};

export default VehicleFilterSidebar;
