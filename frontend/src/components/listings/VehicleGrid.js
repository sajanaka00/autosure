import React from 'react';
import VehicleCard from './VehicleCard';

const VehicleGrid = ({ vehicles, viewMode, onVehicleClick }) => {
    return (
        <div
            className={`vehicles-sale-grid ${viewMode === 'compact'
                ? 'vehicles-sale-grid-compact'
                : viewMode === 'list'
                    ? 'vehicles-sale-grid-list'
                    : 'vehicles-sale-grid-normal'
                }`}
        >
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    viewMode={viewMode}
                    onClick={onVehicleClick}
                />
            ))}
        </div>
    );
};

export default VehicleGrid;
