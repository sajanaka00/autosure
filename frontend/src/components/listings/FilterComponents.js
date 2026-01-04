import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// Reusable Range Slider Component
export const RangeSlider = ({ label, min, max, value, onChange, unit = '' }) => {
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
export const FilterCategory = ({ title, children, isOpen = true }) => {
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
export const FilterOption = ({ label, count, checked, onChange }) => (
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
