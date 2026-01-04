import React from 'react';

const ActiveFilterTags = ({ activeFilters, getFilterColor, removeFilter, clearAllFilters }) => {
    if (activeFilters.length === 0) return null;

    return (
        <div className="vehicles-sale-active-filters">
            <div className="vehicles-sale-filter-tags">
                {activeFilters.map((filter, index) => {
                    const colors = getFilterColor(filter.category);
                    return (
                        <div
                            key={`${filter.category}-${filter.value}-${index}`}
                            className="vehicles-sale-filter-tag"
                            style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
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
    );
};

export default ActiveFilterTags;
