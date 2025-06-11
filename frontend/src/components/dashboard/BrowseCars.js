import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import '../../styles/browse-cars.css';

const BASE_URL = 'http://localhost:3001';

const BrowseCars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = 'YOUR_BEARER_TOKEN_HERE';

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await api.getVehicles(token);
        setVehicles(data.vehicles || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [token]);

  if (loading) return <div className="browse-cars-container">Loading vehicles...</div>;
  if (error) return <div className="browse-cars-container">Error: {error}</div>;

  return (
    <div className="browse-cars-container">
      <h1 className="page-title">Browse Cars</h1>
      <div className="car-grid">
        {vehicles.map((vehicle) => {
          const primaryImage = vehicle.images?.find(img => img.isPrimary);
          const imageUrl = primaryImage ? `${BASE_URL}${primaryImage.url}` : null;

          return (
            <div className="car-card" key={vehicle._id}>
              <div className="car-image-placeholder">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} // ✅ Force scaling
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="car-details">
                <h2 className="car-title">{vehicle.make} {vehicle.model}</h2>
                <p className="car-specs">{vehicle.year} | {vehicle.fuelType || 'N/A'}</p>
                <p className="car-price">${vehicle.price}</p>
                <button className="btn-primary">View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseCars;
