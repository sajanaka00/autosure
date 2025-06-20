import React, { useState } from 'react';
import { ArrowRight, Gauge, Fuel, Settings, Bookmark } from 'lucide-react';
import '../../styles/explore-all-vehicles.css';
import car1 from '../../assets/images/cars/car1.png';
import car2 from '../../assets/images/cars/car2.png';
import car3 from '../../assets/images/cars/car3.png';
import car4 from '../../assets/images/cars/car4.png';
// import car5 from '../../assets/cars/car5.jpg';
// import car6 from '../../assets/cars/car6.jpg';
// import car7 from '../../assets/cars/car7.jpg';
// import car8 from '../../assets/cars/car8.jpg';


export default function ExploreAllVehicles() {
  const [activeTab, setActiveTab] = useState('Recent Cars');

  const tabs = ['Recent Cars', 'Featured Cars', 'Popular Cars'];

  const carData = [
    {
      id: 1,
      title: 'Toyota Camry New',
      description: '3.5 D5 PowerPulse Momentum 5dr AW...',
      price: '$40,000',
      badge: 'Great Price',
      badgeColor: 'green',
      mileage: '20 Miles',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: car1
    },
    {
      id: 2,
      title: 'T-Cross – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      price: '$15,000',
      badge: null,
      mileage: '15 Miles',
      fuelType: 'Petrol',
      transmission: 'CVT',
      image: car2
    },
    {
      id: 3,
      title: 'C-Class – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      price: '$150,000',
      badge: null,
      mileage: '50 Miles',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: car3
    },
    {
      id: 4,
      title: 'Ford Transit – 2021',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      price: '$22,000',
      badge: 'Great Price',
      badgeColor: 'green',
      mileage: '2500 Miles',
      fuelType: 'Diesel',
      transmission: 'Manual',
      image: car4
    },
    {
      id: 5,
      title: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      price: '$95,000',
      badge: 'Low Mileage',
      badgeColor: 'blue',
      mileage: '50 Miles',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: '/api/placeholder/327/218'
    },
    {
      id: 6,
      title: 'Audi A6 3.5 – New',
      description: '3.5 D5 PowerPulse Momentum 5dr AW...',
      price: '$58,000',
      badge: null,
      mileage: '100 Miles',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      image: '/api/placeholder/327/218'
    },
    {
      id: 7,
      title: 'Corolla Altis – 2023',
      description: '3.5 D5 PowerPulse Momentum 5dr AW...',
      price: '$45,000',
      badge: null,
      mileage: '15000 Miles',
      fuelType: 'Petrol',
      transmission: 'CVT',
      image: '/api/placeholder/327/218'
    },
    {
      id: 8,
      title: 'Ford Explorer 2023',
      description: '3.5 D5 PowerPulse Momentum 5dr AW...',
      price: '$35,000',
      badge: 'Great Price',
      badgeColor: 'green',
      mileage: '10 Miles',
      fuelType: 'Diesel',
      transmission: 'CVT',
      image: '/api/placeholder/327/218'
    }
  ];

  const CarCard = ({ car }) => (
    <div className="car-card">
      {/* Image Container */}
      <div className="car-image-container">
        <img 
          src={car.image} 
          alt={car.title}
          className="car-image"
        />
        
        {/* Badge */}
        {car.badge && (
          <div className={`car-badge ${car.badgeColor === 'green' ? 'badge-green' : 'badge-blue'}`}>
            {car.badge}
          </div>
        )}
        
        {/* Bookmark Icon */}
        <button className="bookmark-button">
          <Bookmark className="bookmark-icon" />
        </button>
      </div>
      
      {/* Content */}
      <div className="car-content">
        {/* Title and Description */}
        <div className="car-info">
          <h3 className="car-title">{car.title}</h3>
          <p className="car-description">{car.description}</p>
        </div>
        
        {/* Specifications */}
        <div className="car-specs">
          <div className="spec-item">
            <Gauge className="spec-icon" />
            <span className="spec-text">{car.mileage}</span>
          </div>
          <div className="spec-item">
            <Fuel className="spec-icon" />
            <span className="spec-text">{car.fuelType}</span>
          </div>
          <div className="spec-item">
            <Settings className="spec-icon" />
            <span className="spec-text">{car.transmission}</span>
          </div>
        </div>
        
        {/* Price and View Details */}
        <div className="car-footer">
          <span className="car-price">{car.price}</span>
          <button className="view-details-button">
            View Details
            <ArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="explore-vehicles-container">
      {/* Header */}
      <div className="header">
        <h1 className="main-title">Explore All Vehicles</h1>
        <button className="view-all-button">
          View All
          <ArrowRight className="arrow-icon" />
        </button>
      </div>
      
      {/* Tabs */}
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'tab-active' : ''}`}
          >
            {tab}
            {activeTab === tab && <div className="tab-indicator" />}
          </button>
        ))}
      </div>
      
      {/* Car Grid */}
      <div className="car-grid">
        {carData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}