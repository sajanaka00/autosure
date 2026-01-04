import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';
import TransmissionImg from '../../assets/images/vectors/transmission.png'
import MileageImg from '../../assets/images/vectors/mileage.png'
import FuelImg from '../../assets/images/vectors/fuel.png'

import EAV1 from '../../assets/images/cars/eav1.jpg'
import EAV2 from '../../assets/images/cars/eav2.jpg'
import EAV3 from '../../assets/images/cars/eav3.jpg'
import EAV4 from '../../assets/images/cars/eav4.jpg'
import EAV5 from '../../assets/images/cars/eav5.jpg'
import EAV6 from '../../assets/images/cars/eav6.jpg'
import EAV7 from '../../assets/images/cars/eav7.jpg'
import EAV8 from '../../assets/images/cars/eav8.jpg'
import EAV9 from '../../assets/images/cars/eav9.jpg'
import EAV10 from '../../assets/images/cars/eav10.jpg'

import './ExploreAllVehicles.css';

export default function ExploreAllVehicles({ theme = 'light' }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Recent Cars');

  const tabs = ['Recent Cars', 'Featured Cars', 'Popular Cars'];

  const navigateToCarDetail = (carId) => {
    console.log('Navigating to car:', carId);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      navigate(`/car-listing/${carId}`);
    }, 100);
  };

  const navigateToVehiclesPage = () => {
    console.log('Navigating to all vehicles page');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      navigate('/vehicles');
    }, 100);
  };

  const allCarData = {
    'Recent Cars': [
      {
        id: 1,
        title: 'Toyota Camry XSE',
        description: 'Sporty and reliable sedan with premium interior and advanced safety features.',
        price: '$35,800',
        badge: 'Top Rated',
        badgeColor: 'blue',
        mileage: '12 Miles',
        fuelType: 'Hybrid',
        transmission: 'CVT',
        year: '2024',
        image: EAV1
      },
      {
        id: 2,
        title: 'Audi A4 Premium',
        description: 'Elegant luxury sedan with sophisticated technology and smooth performance.',
        price: '$41,200',
        badge: 'New Arrival',
        badgeColor: 'green',
        mileage: '8 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2024',
        image: EAV2
      },
      {
        id: 3,
        title: 'BMW 5 Series',
        description: 'The ultimate driving machine with unmatched handling and luxury finish.',
        price: '$57,900',
        badge: 'Editor\'s Choice',
        badgeColor: 'green',
        mileage: '15 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2024',
        image: EAV3
      },
      {
        id: 4,
        title: 'Mercedes-Benz C-Class',
        description: 'Modern luxury redefined with a digital cockpit and premium comfort.',
        price: '$46,950',
        badge: 'Bestseller',
        badgeColor: 'blue',
        mileage: '5 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2024',
        image: EAV4
      },
      {
        id: 5,
        title: 'Tesla Model 3',
        description: 'Fully electric performance with cutting-edge autopilot technology.',
        price: '$38,990',
        badge: 'Electric',
        badgeColor: 'green',
        mileage: '2,500 Miles',
        fuelType: 'Electric',
        transmission: 'Single Speed',
        year: '2023',
        image: EAV5
      },
      {
        id: 6,
        title: 'Lexus RX 350',
        description: 'Spacious and reliable luxury SUV with a focus on ride quality and silence.',
        price: '$49,950',
        badge: 'Family Pick',
        badgeColor: 'blue',
        mileage: '10 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2024',
        image: EAV6
      },
      {
        id: 7,
        title: 'Volvo XC90',
        description: 'The pinnacle of safety and Scandinavian design in a 7-seater SUV.',
        price: '$56,000',
        badge: 'Safe Choice',
        badgeColor: 'green',
        mileage: '45 Miles',
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        year: '2024',
        image: EAV7
      },
      {
        id: 8,
        title: 'Honda CR-V Hybrid',
        description: 'Versatile and efficient crossover perfect for urban and outdoor adventures.',
        price: '$34,050',
        badge: 'Eco Friendly',
        badgeColor: 'green',
        mileage: '100 Miles',
        fuelType: 'Hybrid',
        transmission: 'E-CVT',
        year: '2024',
        image: EAV8
      }
    ],
    'Featured Cars': [
      {
        id: 9,
        title: 'Porsche 911 Carrera',
        description: 'Iconic sports car performance with everyday usability and timeless design.',
        price: '$114,400',
        badge: 'High Performance',
        badgeColor: 'blue',
        mileage: '500 Miles',
        fuelType: 'Petrol',
        transmission: 'PDK',
        year: '2023',
        image: EAV9
      }
    ],
    'Popular Cars': [
      {
        id: 10,
        title: 'Ford Mustang GT',
        description: 'American muscle with modern tech and an unmistakable V8 rumble.',
        price: '$42,495',
        badge: 'Iconic',
        badgeColor: 'blue',
        mileage: '1,200 Miles',
        fuelType: 'Petrol',
        transmission: 'Manual',
        year: '2023',
        image: EAV10
      }
    ]
  };

  const currentCars = allCarData[activeTab] || [];

  const CarCard = ({ car }) => (
    <div
      className="eav-card"
      onClick={() => navigateToCarDetail(car.id)}
    >
      {/* Card Image */}
      <img
        src={car.image}
        alt={car.title}
        className="eav-card-bg"
      />

      {/* Gradient Overlay */}
      <div className="eav-card-overlay" />

      {/* Top Actions */}
      <div className="eav-top-actions">
        {car.badge ? (
          <span className={`eav-badge ${car.badgeColor === 'green' ? 'eav-badge-green' : 'eav-badge-blue'}`}>
            {car.badge}
          </span>
        ) : <span />}

        <button
          className="eav-bookmark-btn"
          onClick={(e) => {
            e.stopPropagation();
            // Implement bookmark functionality
          }}
        >
          <Bookmark size={18} />
        </button>
      </div>

      {/* Content Bottom */}
      <div className="eav-card-content">
        <div className="eav-main-info">
          <h3 className="eav-card-title">{car.title}</h3>
          <p className="eav-card-price">{car.price}</p>
        </div>

        {/* Revealed on hover */}
        <div className="eav-specs-reveal">
          <div className="eav-specs-grid">
            <div className="eav-spec">
              <img src={MileageImg} alt="Mileage" className="spec-icon" />
              <span>{car.mileage}</span>
            </div>
            <div className="eav-spec">
              <img src={FuelImg} alt="Fuel" className="spec-icon" />
              <span>{car.fuelType}</span>
            </div>
            <div className="eav-spec">
              <img src={TransmissionImg} alt="Transmission" className="spec-icon" />
              <span>{car.transmission}</span>
            </div>
            <div className="eav-spec">
              <img src={MileageImg} alt="Year" className="spec-icon" />
              <span>{car.year}</span>
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

  return (
    <div className={`eav-section ${theme === 'dark' ? 'eav-dark' : ''}`}>
      <div className="eav-header">
        <h2 className="eav-header-title">Explore All Vehicles</h2>

        {/* Filter Pills */}
        <div className="eav-filter-pills">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`eav-pill ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="eav-view-all-btn" onClick={navigateToVehiclesPage}>
          <span>View All</span>
          <ArrowRight size={16} />
        </div>
      </div>

      <div className="eav-grid">
        {currentCars.map((car, idx) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}