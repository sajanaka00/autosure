import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';
import TransmissionImg from '../../../assets/images/vectors/transmission.png'
import MileageImg from '../../../assets/images/vectors/mileage.png'
import FuelImg from '../../../assets/images/vectors/fuel.png'
import '../../../styles/explore-all-vehicles.css';

export default function ExploreAllVehicles() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Recent Cars');

  const tabs = ['Recent Cars', 'Featured Cars', 'Popular Cars'];

  const navigateToCarDetail = (carId) => {
    console.log('Navigating to car:', carId); // Debug log
    navigate(`/car-listing/${carId}`);
  };

  // Organized car data by category
  const allCarData = {
    'Recent Cars': [
      {
        id: 1,
        title: 'Toyota Camry New',
        description: '3.5 D5 PowerPulse Momentum 5dr AW...',
        price: '$40,000',
        badge: 'Just Added',
        badgeColor: 'blue',
        mileage: '20 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 2,
        title: 'T-Cross – 2024',
        description: '4.0 D5 PowerPulse Momentum 5dr AW...',
        price: '$28,000',
        badge: 'New Arrival',
        badgeColor: 'blue',
        mileage: '5 Miles',
        fuelType: 'Petrol',
        transmission: 'CVT',
        image: 'https://images.unsplash.com/photo-1549399090-7e1ad5019a5c?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 3,
        title: 'BMW X3 – 2024',
        description: '2.0 TwinPower Turbo xDrive30i...',
        price: '$65,000',
        badge: 'Just Added',
        badgeColor: 'blue',
        mileage: '12 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 4,
        title: 'Honda Accord – 2024',
        description: '1.5 VTEC Turbo Sport CVT...',
        price: '$32,000',
        badge: null,
        mileage: '8 Miles',
        fuelType: 'Petrol',
        transmission: 'CVT',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 5,
        title: 'Audi Q5 – 2024',
        description: '2.0 TFSI quattro S tronic...',
        price: '$58,000',
        badge: 'New Arrival',
        badgeColor: 'blue',
        mileage: '15 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center'
      }
    ],
    'Featured Cars': [
      {
        id: 6,
        title: 'Mercedes C-Class AMG',
        description: '4.0 V8 BiTurbo AMG Performance...',
        price: '$85,000',
        badge: 'Editor\'s Choice',
        badgeColor: 'green',
        mileage: '500 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 7,
        title: 'Porsche Macan S',
        description: '3.0 V6 Twin-Turbo PDK...',
        price: '$72,000',
        badge: 'Premium',
        badgeColor: 'green',
        mileage: '1,200 Miles',
        fuelType: 'Petrol',
        transmission: 'PDK',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 8,
        title: 'Tesla Model S Plaid',
        description: 'Tri Motor All-Wheel Drive...',
        price: '$95,000',
        badge: 'Featured',
        badgeColor: 'green',
        mileage: '2,000 Miles',
        fuelType: 'Electric',
        transmission: 'Auto',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 9,
        title: 'Range Rover Velar',
        description: '3.0 P380 R-Dynamic HSE...',
        price: '$78,000',
        badge: 'Luxury',
        badgeColor: 'green',
        mileage: '800 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1606016159991-722a5d6320c9?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 10,
        title: 'Lexus RX 450h',
        description: '3.5 V6 Hybrid AWD Luxury...',
        price: '$55,000',
        badge: 'Hybrid',
        badgeColor: 'green',
        mileage: '1,500 Miles',
        fuelType: 'Hybrid',
        transmission: 'CVT',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&crop=center'
      }
    ],
    'Popular Cars': [
      {
        id: 11,
        title: 'Toyota Corolla 2023',
        description: '1.8 Hybrid Dynamic Force...',
        price: '$25,000',
        badge: 'Best Seller',
        badgeColor: 'blue',
        mileage: '15,000 Miles',
        fuelType: 'Hybrid',
        transmission: 'CVT',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 12,
        title: 'Ford F-150 Lightning',
        description: 'Dual Motor All-Electric...',
        price: '$52,000',
        badge: 'Top Rated',
        badgeColor: 'blue',
        mileage: '8,000 Miles',
        fuelType: 'Electric',
        transmission: 'Auto',
        image: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 13,
        title: 'Honda CR-V Hybrid',
        description: '2.0 i-MMD Hybrid AWD...',
        price: '$35,000',
        badge: 'Most Popular',
        badgeColor: 'blue',
        mileage: '12,000 Miles',
        fuelType: 'Hybrid',
        transmission: 'CVT',
        image: 'https://images.unsplash.com/photo-1549399090-7e1ad5019a5c?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 14,
        title: 'Nissan Altima 2023',
        description: '2.5 VC-Turbo Platinum...',
        price: '$28,000',
        badge: 'Customer Choice',
        badgeColor: 'blue',
        mileage: '18,000 Miles',
        fuelType: 'Petrol',
        transmission: 'CVT',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 15,
        title: 'Subaru Outback 2023',
        description: '2.5 Boxer AWD Premium...',
        price: '$33,000',
        badge: 'Adventure Ready',
        badgeColor: 'blue',
        mileage: '22,000 Miles',
        fuelType: 'Petrol',
        transmission: 'CVT',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center'
      }
    ]
  };

  // Get current cars based on active tab
  const currentCars = allCarData[activeTab] || [];

  const CarCard = ({ car }) => (
    <div 
      className="car-card" 
      onClick={() => navigateToCarDetail(car.id)}
      style={{ cursor: 'pointer' }} // Make it clear it's clickable
    >
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
        <button 
          className="bookmark-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when bookmarking
            console.log(`Bookmarked car: ${car.title}`);
          }}
        >
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
            <img 
              src={MileageImg}
              alt="Mileage"
              className="spec-icon mileage-icon"
            />
            <span className="spec-text">{car.mileage}</span>
          </div>
          <div className="spec-item">
            <img 
              src={FuelImg}
              alt="Fuel"
              className="spec-icon fuel-icon"
            />
            <span className="spec-text">{car.fuelType}</span>
          </div>
          <div className="spec-item">
            <img 
              src={TransmissionImg}
              alt="Transmission"
              className="spec-icon transmission-icon"
            />
            <span className="spec-text">{car.transmission}</span>
          </div>
        </div>
        
        {/* Price and View Details */}
        <div className="car-footer">
          <span className="car-price">{car.price}</span>
          <button 
            className="view-details-button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking button
              navigateToCarDetail(car.id);
            }}
          >
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
          </button>
        ))}
      </div>
      
      {/* Car Scroll Container */}
      <div className="car-scroll-container">
        <div className="car-scroll">
          {currentCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}