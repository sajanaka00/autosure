import React from 'react';
import { Bookmark, Car, Zap, Award, Star, ArrowRight } from 'lucide-react';

const VehicleCard = ({ vehicle, onClick, viewMode }) => (
    <div
        className={`eav-card ${viewMode === 'list' ? 'eav-card-list' : ''}`}
        onClick={() => onClick(vehicle.id)}
    >
        {/* Card Image */}
        <img
            src={vehicle.image}
            alt={vehicle.title}
            className="eav-card-bg"
        />

        {/* Gradient Overlay */}
        <div className="eav-card-overlay" />

        {/* Top Actions */}
        <div className="eav-top-actions">
            {vehicle.badge ? (
                <span className={`eav-badge ${vehicle.badgeColor === 'green' ? 'eav-badge-green' : 'eav-badge-blue'}`}>
                    {vehicle.badge}
                </span>
            ) : <span />}

            <button
                className="eav-bookmark-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Bookmarked: ${vehicle.title}`);
                }}
            >
                <Bookmark size={18} />
            </button>
        </div>

        {/* Content Bottom */}
        <div className="eav-card-content">
            <div className="eav-main-info">
                <h3 className="eav-card-title">{vehicle.title}</h3>
                <p className="eav-card-price">{vehicle.price}</p>
            </div>

            {/* Revealed on hover or always in list view */}
            <div className={`eav-specs-reveal ${viewMode === 'list' ? 'visible' : ''}`}>
                <div className="eav-specs-grid">
                    <div className="eav-spec">
                        <Car size={16} className="spec-icon-lucide" />
                        <span>{vehicle.mileage}</span>
                    </div>
                    <div className="eav-spec">
                        <Zap size={16} className="spec-icon-lucide" />
                        <span>{vehicle.fuelType}</span>
                    </div>
                    <div className="eav-spec">
                        <Award size={16} className="spec-icon-lucide" />
                        <span>{vehicle.transmission}</span>
                    </div>
                    <div className="eav-spec">
                        <Star size={16} className="spec-icon-lucide" />
                        <span>{vehicle.year}</span>
                    </div>
                </div>

                <div className="eav-card-footer">
                    <span className="eav-view-link">
                        View Details <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </div>
    </div>
);

export default VehicleCard;
