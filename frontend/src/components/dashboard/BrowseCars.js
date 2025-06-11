import { Car } from 'lucide-react';
import '../../styles/browse-cars.css';

export default function BrowseCars({ user }) {
  return (
    <div className="browse-cars-container fade-in">
      <h2 className="page-title">Browse Cars</h2>
      <div className="car-grid">
        {[1, 2, 3, 4, 5, 6].map((car) => (
          <div key={car} className="car-card">
            <div className="car-image-placeholder">
              <Car className="car-placeholder-icon" />
            </div>
            <div className="car-details">
              <h3 className="car-title">Sample Car {car}</h3>
              <p className="car-specs">2023 Model • Automatic</p>
              <p className="car-price">$25,000</p>
              <button className="btn-primary">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}