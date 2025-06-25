import { Car } from 'lucide-react';
import '../../../styles/my-cars.css';

export default function MyCars({ user }) {
  return (
    <div className="my-cars-container fade-in">
      <h2 className="page-title">My Cars</h2>
      <div className="car-grid">
        {[1, 2, 3].map((car) => (
          <div key={car} className="car-card">
            <div className="car-image-placeholder">
              <Car className="car-placeholder-icon" />
            </div>
            <div className="car-details">
              <h3 className="car-title">My Car {car}</h3>
              <p className="car-specs">2023 Model • Automatic</p>
              <p className="car-price">$25,000</p>
              <div className="btn-group">
                <button className="btn-secondary">
                  Edit
                </button>
                <button className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}