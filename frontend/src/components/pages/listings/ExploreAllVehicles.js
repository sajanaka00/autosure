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
    console.log('Navigating to car:', carId);
    
    // Scroll to top before navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Small delay to ensure smooth scroll completes before navigation
    setTimeout(() => {
      navigate(`/car-listing/${carId}`);
    }, 100);
  };

  // Alternative approach: Immediate navigation with instant scroll
  const navigateToCarDetailInstant = (carId) => {
    console.log('Navigating to car:', carId);
    
    // Navigate immediately
    navigate(`/car-listing/${carId}`);
    
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  // Organized car data by category
  const allCarData = {
    'Recent Cars': [
      {
        id: 1,
        title: 'Toyota Camry New',
        description: '3.5 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$40,000',
        badge: 'Great Price',
        badgeColor: 'green',
        mileage: '20 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 2,
        title: 'T-Cross – 2023',
        description: '4.0 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$15,000',
        badge: null,
        mileage: '15 Miles',
        fuelType: 'Petrol',
        transmission: 'CVT',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1549399090-7e1ad5019a5c?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 3,
        title: 'C-Class – 2023',
        description: '4.0 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$150,000',
        badge: null,
        mileage: '50 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 4,
        title: 'Ford Transit – 2021',
        description: '4.0 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$22,000',
        badge: 'Great Price',
        badgeColor: 'green',
        mileage: '2500 Miles',
        fuelType: 'Diesel',
        transmission: 'Manual',
        year: '2021',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 5,
        title: 'New GLC – 2023',
        description: '4.0 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$95,000',
        badge: 'Low Mileage',
        badgeColor: 'blue',
        mileage: '50 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 6,
        title: 'Audi A6 3.5 – New',
        description: '3.5 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$58,000',
        badge: null,
        mileage: '100 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 7,
        title: 'Corolla Altis – 2023',
        description: '3.5 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$45,000',
        badge: null,
        mileage: '15000 Miles',
        fuelType: 'Petrol',
        transmission: 'CVT',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 8,
        title: 'Ford Explorer 2023',
        description: '3.5 D5 PowerPulse Momentum 5dr AW…\nGeartronic Estate',
        price: '$35,000',
        badge: 'Great Price',
        badgeColor: 'green',
        mileage: '10 Miles',
        fuelType: 'Diesel',
        transmission: 'CVT',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&crop=center'
      }
    ],
    'Featured Cars': [
      {
        id: 9,
        title: 'Mercedes C-Class AMG',
        description: '4.0 V8 BiTurbo AMG Performance…',
        price: '$85,000',
        badge: 'Editor\'s Choice',
        badgeColor: 'green',
        mileage: '500 Miles',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center'
      }
    ],
    'Popular Cars': [
      {
        id: 10,
        title: 'Toyota Corolla 2023',
        description: '1.8 Hybrid Dynamic Force…',
        price: '$25,000',
        badge: 'Best Seller',
        badgeColor: 'blue',
        mileage: '15,000 Miles',
        fuelType: 'Hybrid',
        transmission: 'CVT',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center'
      }
    ]
  };

  // Get current cars based on active tab
  const currentCars = allCarData[activeTab] || [];

  const CarCard = ({ car, index }) => (
    <div 
      className="eav-card"
      onClick={() => navigateToCarDetail(car.id)}
    >
      {/* Image Container */}
      <div className="eav-img-container">
        <div className="eav-img-wrapper">
          <img 
            src={car.image} 
            alt={car.title}
            className="eav-img"
          />
        </div>
        
        {/* Badge */}
        {car.badge && (
          <div className={`eav-badge ${car.badgeColor === 'green' ? 'eav-badge-green' : 'eav-badge-blue'}`}>
            <div className="eav-badge-text">
              {car.badge}
            </div>
          </div>
        )}
        
        {/* Bookmark Icon */}
        <div className="eav-bookmark" onClick={(e) => {
          e.stopPropagation();
          console.log(`Bookmarked car: ${car.title}`);
        }}>
          <div className="eav-bookmark-bg">
            <Bookmark className="eav-bookmark-icon" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="eav-content">
        {/* Title */}
        <div className="eav-title-container">
          <div className="eav-title">{car.title}</div>
        </div>
        
        {/* Description */}
        <div className="eav-desc-container">
          <div className="eav-desc">
            {car.description}
          </div>
        </div>
        
        {/* Specifications */}
        <div className="eav-specs">
          {/* First Row */}
          <div className="eav-spec-row">
            <div className="eav-spec-item">
              <img className="eav-spec-icon" src={MileageImg} alt="Mileage" />
              <div className="eav-spec-text">{car.mileage}</div>
            </div>
            <div className="eav-spec-item">
              <img className="eav-spec-icon" src={FuelImg} alt="Fuel" />
              <div className="eav-spec-text">{car.fuelType}</div>
            </div>
          </div>
          
          {/* Second Row */}
          <div className="eav-spec-row">
            <div className="eav-spec-item">
              <img className="eav-spec-icon" src={TransmissionImg} alt="Transmission" />
              <div className="eav-spec-text">{car.transmission}</div>
            </div>
            <div className="eav-spec-item">
              <img className="eav-spec-icon" src={MileageImg} alt="Year" />
              <div className="eav-spec-text">{car.year}</div>
            </div>
          </div>
        </div>
        
        {/* Price and View Details */}
        <div className="eav-footer">
          <div className="eav-price">{car.price}</div>
          <div className="eav-view-details" onClick={(e) => {
            e.stopPropagation();
            navigateToCarDetail(car.id);
          }}>
            <div className="eav-view-text">View Details</div>
            <ArrowRight className="eav-view-arrow" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="eav-section">
      {/* Header */}
      <div className="eav-header-title">Explore All Vehicles</div>
      <div className="eav-view-all">
        <div className="eav-view-all-text">View All</div>
        <ArrowRight className="eav-view-all-arrow" />
      </div>
      
      {/* Tabs */}
      <div className="eav-tabs">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`eav-tab eav-tab-${index + 1}`}
          >
            <div className="eav-tab-text">
              {tab}
            </div>
            {activeTab === tab && <div className="eav-tab-line" />}
          </div>
        ))}
      </div>
      
      {/* Car Cards Grid */}
      <div className="eav-grid">
        {currentCars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} />
        ))}
      </div>
    </div>
  );
}