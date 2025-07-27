import React, { useState, useCallback, useMemo } from 'react';
import { Star } from 'lucide-react';

import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import '../../../styles/car-listing.css';

import Share from '../../../assets/images/vectors/share.png'
import Bookmark from '../../../assets/images/vectors/bookmark.png'
import Compare from '../../../assets/images/vectors/compare.png'
import Tag from '../../../assets/images/vectors/tag.png'
import Video from '../../../assets/images/vectors/video.png'
import Print from '../../../assets/images/vectors/print.png'
import Arrow from '../../../assets/images/vectors/arrow.png'
import ArrowGreen from '../../../assets/images/vectors/arrow-green.png'
import ArrowWhite from '../../../assets/images/vectors/arrow-white.png'

import YearBlue from '../../../assets/images/vectors/year-blue.png'
import SpeedometerBlue from '../../../assets/images/vectors/speedometer-blue.png'
import FuelBlueImg from '../../../assets/images/vectors/fuel-blue.png'
import TransmissionBlue from '../../../assets/images/vectors/transmission-blue.png'

import BMW1 from '../../../assets/images/cars/bmw.jpg'
import BMW2 from '../../../assets/images/cars/bmw2.jpg'
import BMW3 from '../../../assets/images/cars/bmw3.jpg'
import BMW4 from '../../../assets/images/cars/bmw4.jpg'
import BMW5 from '../../../assets/images/cars/bmw5.jpg'

import BodyImg from '../../../assets/images/vectors/body.png'
import Speedometer from '../../../assets/images/vectors/speedometer.png'
import FuelImg from '../../../assets/images/vectors/fuel.png'
import YearImg from '../../../assets/images/vectors/year.png'
import TransmissionImg from '../../../assets/images/vectors/transmission.png'
import DriveTypeImg from '../../../assets/images/vectors/drive-type.png'
import EngineImg from '../../../assets/images/vectors/engine.png'
import DoorImg from '../../../assets/images/vectors/door.png'
import CylinderImg from '../../../assets/images/vectors/cylinder.png'
import ColorImg from '../../../assets/images/vectors/color.png'
import VINImg from '../../../assets/images/vectors/vin.png'

import DealerImg from '../../../assets/images/vectors/dealer.png'
import Location from '../../../assets/images/vectors/location.png'
import Phone from '../../../assets/images/vectors/phone.png'

import CheckImg from '../../../assets/images/vectors/check.png'

const Badge = ({ text, variant = 'default' }) => (
  <div className={`cl-badge cl-badge--${variant}`}>
    <span className="cl-badge__text">{text}</span>
  </div>
);

const InfoItem = ({ icon, label, value, isLink = false }) => (
  <div className="cl-info-item">
    <img className="cl-info-item__icon" src={icon} alt="" />
    <span className="cl-info-item__label">{label}</span>
    {isLink ? (
      <a href="#" className="cl-info-item__value cl-info-item__value--link">{value}</a>
    ) : (
      <span className="cl-info-item__value">{value}</span>
    )}
  </div>
);

const CarHeader = () => (
  <div className="cl-car-header">    
    <div className="cl-car-header__main">
      <div className="cl-car-header__left">
        <h1 className="cl-car-header__title">BMW M235i xDrive Gran Coupé</h1>
        <p className="cl-car-header__subtitle">2.0L 4-Cylinder TwinPower Turbo All-Wheel Drive 8-Speed Automatic</p>
        
        <div className="cl-car-header__badges">
          <div className="cl-car-header__badge">
            <img className="cl-car-header__badge-icon" src={YearBlue} alt="" />
            <span className="cl-car-header__badge-text">2024</span>
          </div>
          <div className="cl-car-header__badge">
            <img className="cl-car-header__badge-icon" src={SpeedometerBlue} alt="" />
            <span className="cl-car-header__badge-text">850 miles</span>
          </div>
          <div className="cl-car-header__badge">
            <img className="cl-car-header__badge-icon" src={TransmissionBlue} alt="" />
            <span className="cl-car-header__badge-text">8-Speed Automatic</span>
          </div>
          <div className="cl-car-header__badge">
            <img className="cl-car-header__badge-icon" src={FuelBlueImg} alt="" />
            <span className="cl-car-header__badge-text">Premium Gasoline</span>
          </div>
        </div>
      </div>
      
      <div className="cl-car-header__right">
        <div className="cl-car-header__actions">
          <div className="cl-car-header__action">
            <span className="cl-car-header__action-text">Share</span>
            <img className="cl-car-header__action-icon" src={Share} alt="" />
          </div>
          <div className="cl-car-header__action cl-car-header__action--outlined">
            <span className="cl-car-header__action-text">Save</span>
            <img className="cl-car-header__action-icon" src={Bookmark} alt="" />
          </div>
          <div className="cl-car-header__action cl-car-header__action--outlined">
            <span className="cl-car-header__action-text">Compare</span>
            <img className="cl-car-header__action-icon" src={Compare} alt="" />
          </div>
        </div>
        
        <div className="cl-car-header__price">
          <span className="cl-car-header__price-amount">$45,900</span>
          <a href="#" className="cl-car-header__offer-link">
            <img className="cl-car-header__offer-icon" src={Tag} alt="" />
            Make An Offer Price
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ImageGallery = () => (
  <div className="cl-gallery">
    <div className="cl-gallery__main">
      <img 
        className="cl-gallery__main-image" 
        src={BMW1} 
        alt="BMW M235i xDrive Gran Coupé"
      />
      <div className="cl-gallery__badges">
        <Badge text="M Performance" variant="primary" />
      </div>
      <div className="cl-gallery__video-btn">
        <img className="cl-gallery__video-icon" src={Video} alt="" />
        <span>Video</span>
      </div>
    </div>
    
    <div className="cl-gallery__thumbnails">
      {[
        BMW2,
        BMW4,
        BMW5,
        BMW3
      ].map((src, index) => (
        <img key={index} className="cl-gallery__thumbnail" src={src} alt={`BMW M235i view ${index + 1}`} />
      ))}
    </div>
  </div>
);

const CarOverview = () => {
  const leftColumnItems = [
    { icon: BodyImg, label: "Body", value: "4-Door Gran Coupé", isLink: true },
    { icon: Speedometer, label: "Mileage", value: "850", isLink: false },
    { icon: FuelImg, label: "Fuel Type", value: "Premium Gasoline", isLink: true },
    { icon: YearImg, label: "Year", value: "2024", isLink: false },
    { icon: TransmissionImg, label: "Transmission", value: "8-Speed Automatic", isLink: true },
    { icon: DriveTypeImg, label: "Drive Type", value: "All-Wheel Drive (xDrive)", isLink: true }
  ];

  const rightColumnItems = [
    { icon: "icon15.svg", label: "Condition", value: "Used", isLink: true },
    { icon: EngineImg, label: "Engine Size", value: "2.0L", isLink: false },
    { icon: DoorImg, label: "Door", value: "4 Doors", isLink: true },
    { icon: CylinderImg, label: "Cylinder", value: "4", isLink: true },
    { icon: ColorImg, label: "Color", value: "Storm Bay Metallic", isLink: true },
    { icon: VINImg, label: "VIN", value: "WBA53AK07PCG12345", isLink: false }
  ];

  return (
    <section className="cl-overview">
      <h2 className="cl-overview__title">Car Overview</h2>
      <div className="cl-overview__content">
        <div className="cl-overview__column">
          {leftColumnItems.map((item, index) => (
            <InfoItem key={index} {...item} />
          ))}
        </div>
        <div className="cl-overview__column">
          {rightColumnItems.map((item, index) => (
            <InfoItem key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="cl-section-divider"></div>
    </section>
  );
};

const Description = () => (
  <section className="cl-description">
    <h2 className="cl-description__title">Description</h2>
    <div className="cl-description__content">
      <p className="cl-description__paragraph">
        Experience the perfect blend of luxury and performance with this BMW M235i xDrive Gran Coupé. Featuring a 2.0-liter TwinPower Turbo 4-cylinder engine producing 301 horsepower, this vehicle delivers exceptional driving dynamics with the confidence of xDrive all-wheel drive.
      </p>
      <p className="cl-description__paragraph">
        This M Performance model comes equipped with premium features including Dakota leather upholstery, M Sport Package, adaptive LED headlights, and the latest BMW iDrive 7.0 infotainment system. The Gran Coupé body style offers a perfect balance of sporty aesthetics and practical functionality with four doors and generous rear seating.
      </p>
    </div>
    
    <div className="cl-description__downloads">
      <a href="#" className="cl-description__download-link">
        <img className="cl-description__download-icon" src={Print} alt="" />
        BMW-M235i-Brochure.pdf
      </a>
      <a href="#" className="cl-description__download-link">
        <img className="cl-description__download-icon" src={Print} alt="" />
        Vehicle-History-Report.pdf
      </a>
    </div>
    <div className="cl-section-divider"></div>
  </section>
);

const DealerCard = () => (
  <div className="cl-dealer">
    <div className="cl-dealer__header">
      <div className="cl-dealer__avatar">
        <img className="cl-dealer__avatar-image" src={DealerImg} alt="BMW Dealership" />
      </div>
      <h3 className="cl-dealer__name">BMW of Manhattan</h3>
      <p className="cl-dealer__address">555 West 57th Street, New York</p>
    </div>
    
    <div className="cl-dealer__actions">
      <div className="cl-dealer__contact-row">
        <div className="cl-dealer__contact-item">
          <div className="cl-dealer__contact-icon">
            <img src={Location} alt="" />
          </div>
          <span className="cl-dealer__contact-text">Get Direction</span>
        </div>
        <div className="cl-dealer__contact-item">
          <div className="cl-dealer__contact-icon">
            <img src={Phone} alt="" />
          </div>
          <span className="cl-dealer__contact-text">+1-212-586-8787</span>
        </div>
      </div>
      
      <button className="cl-dealer__btn cl-dealer__btn--primary">
        Message Dealer
        <img className="cl-dealer__btn-icon" src={ArrowWhite} alt="" />
      </button>
      
      <button className="cl-dealer__btn cl-dealer__btn--whatsapp">
        Chat Via Whatsapp
        <img className="cl-dealer__btn-icon" src={ArrowGreen} alt="" />
      </button>
      
      <a href="#" className="cl-dealer__link">
        View All BMW inventory
        <img className="cl-dealer__link-icon" src={Arrow} alt="" />
      </a>
    </div>
  </div>
);

// Car Features Components
const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`cl-section-title ${className}`}>{children}</h2>
);

const CategoryTitle = ({ children }) => (
  <h3 className="cl-feature-category-title">{children}</h3>
);

const FeatureItem = ({ name, isSpecial = false }) => (
  <div className="cl-feature-item">
    <img className="cl-feature-check" src={CheckImg} alt="" />
    <div className="cl-feature-name">{name}</div>
  </div>
);

const FeatureList = ({ features }) => (
  <div className="cl-feature-list">
    {features.map((feature, index) => (
      <FeatureItem 
        key={index} 
        name={feature.name} 
        isSpecial={feature.isSpecial}
      />
    ))}
  </div>
);

const FeatureCategory = ({ title, features }) => (
  <div className="cl-feature-category">
    <CategoryTitle>{title}</CategoryTitle>
    <FeatureList features={features} />
  </div>
);

const SpecItem = ({ label, value, isMultiline = false }) => (
  <div className={`cl-spec-item ${isMultiline ? 'cl-spec-item--multiline' : ''}`}>
    <div className="cl-spec-label">
      {typeof label === 'string' ? label : label}
    </div>
    <div className="cl-spec-value">{value}</div>
  </div>
);

const SpecColumn = ({ specs }) => (
  <div className="cl-spec-column">
    {specs.map((spec, index) => (
      <SpecItem
        key={index}
        label={spec.label}
        value={spec.value}
        isMultiline={spec.isMultiline}
      />
    ))}
  </div>
);

const SpecSection = ({ title, leftSpecs, rightSpecs, className = "" }) => (
  <div className={`cl-spec-section ${className}`}>
    <SectionTitle>{title}</SectionTitle>
    <div className="cl-spec-columns">
      <SpecColumn specs={leftSpecs} />
      <SpecColumn specs={rightSpecs} />
    </div>
    <div className="cl-section-divider"></div>
  </div>
);

const MapContainer = () => {
  const MAP_CONFIG = {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.7503476847757!2d-73.98194228459467!3d40.76592997932637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1651341947324!5m2!1sen!2sus",
    width: "100%",
    height: "100%",
    style: { border: 0 },
    allowFullScreen: "",
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade"
  };

  return (
    <div className="cl-map-container" style={{ height: '400px', width: '100%' }}>
      <iframe {...MAP_CONFIG} title="BMW Dealership Location Map" />
    </div>
  );
};

const CarFeatures = () => {
  // Data Configuration
  const featureCategories = [
    {
      title: "Interior",
      features: [
        { name: "3-Zone Automatic Climate Control" },
        { name: "Dakota Leather Upholstery" },
        { name: "Heated Front Seats" },
        { name: "M Sport Steering Wheel" },
        { name: "Ambient Lighting" },
        { name: "Wireless Charging Pad" },
        { name: "BMW Live Cockpit Professional", isSpecial: true }
      ]
    },
    {
      title: "Safety",
      features: [
        { name: "Active Driving Assistant" },
        { name: "Frontal Collision Warning" },
        { name: "Automatic Emergency Braking" },
        { name: "Blind Spot Detection" },
        { name: "Lane Departure Warning" },
        { name: "Dynamic Stability Control" },
        { name: "Run-Flat Tires" }
      ]
    },
    {
      title: "Exterior",
      features: [
        { name: "Adaptive LED Headlights" },
        { name: "LED Fog Lights" },
        { name: "M Aerodynamics Package" },
        { name: "18-inch M Double-Spoke Wheels" },
        { name: "Shadowline Exterior Trim" },
        { name: "Rain-Sensing Wipers" }
      ]
    },
    {
      title: "Technology & Convenience",
      features: [
        { name: "Apple CarPlay & Android Auto" },
        { name: "BMW iDrive 7.0" },
        { name: "Harman Kardon Sound System" },
        { name: "Gesture Control" },
        { name: "BMW ConnectedDrive Services" },
        { name: "Remote Engine Start" }
      ]
    }
  ];

  const dimensionsSpecs = {
    left: [
      { label: "Length", value: "4,526 mm (178.2 in)" },
      { label: "Height", value: "1,420 mm (55.9 in)" },
      { label: "Wheelbase", value: "2,670 mm (105.1 in)" },
      { label: "Ground Clearance", value: "140 mm (5.5 in)" },
      { label: "Cargo Capacity", value: "430 liters (15.2 cu ft)" },
      { label: "Fuel Tank Capacity", value: "51 liters (13.5 gal)" }
    ],
    right: [
      { label: "Width", value: "1,800 mm (70.9 in)" },
      { label: "Width (including mirrors)", value: "2,020 mm (79.5 in)" },
      { label: "Curb Weight", value: "1,520 kg (3,351 lbs)" },
      { label: "Gross Vehicle Weight", value: "1,995 kg (4,398 lbs)" },
      { label: "Max. Roof Load", value: "75 kg (165 lbs)" },
      { label: "Seating Capacity", value: "5 passengers" }
    ]
  };

  const engineSpecs = {
    left: [
      { label: "Engine Type", value: "2.0L TwinPower Turbo I4" },
      { label: "Horsepower", value: "301 hp @ 5,000-6,500 rpm" },
      { label: "Torque", value: "332 lb-ft @ 1,400-4,000 rpm" },
      { label: "Compression Ratio", value: "9.5:1" },
      { label: "Valvetrain", value: "DOHC, 16 valves" }
    ],
    right: [
      { label: "Transmission", value: "8-Speed Steptronic Automatic" },
      { label: "Drive Type", value: "xDrive All-Wheel Drive" },
      { label: "0-60 mph", value: "4.6 seconds" },
      { label: "Top Speed", value: "155 mph (electronically limited)" },
      { label: "Fuel Economy (Combined)", value: "26 mpg" }
    ]
  };

  return (
    <div className="cl-features-container">
      {/* Features Section */}
      <div className="cl-features-section">
        <SectionTitle>Features</SectionTitle>
        <div className="cl-features-grid">
          {featureCategories.map((category, index) => (
            <FeatureCategory
              key={index}
              title={category.title}
              features={category.features}
            />
          ))}
        </div>
        <div className="cl-section-divider"></div>
      </div>

      {/* Specifications Sections */}
      <SpecSection
        title="Dimensions & Capacity"
        leftSpecs={dimensionsSpecs.left}
        rightSpecs={dimensionsSpecs.right}
      />

      <SpecSection
        title="Engine & Performance"
        leftSpecs={engineSpecs.left}
        rightSpecs={engineSpecs.right}
      />

      {/* Location Section */}
      <div className="cl-location-section">
        <SectionTitle>Location</SectionTitle>
        <div className="cl-location-address">
          <div className="cl-address-text">555 West 57th Street, New York, NY 10019</div>
        </div>
        <div className="cl-directions-link">
          <div className="cl-directions-text">Get Direction</div>
          <svg className="cl-directions-icon" width="14" height="14" viewBox="0 0 14 14">
            <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#405ff2"/>
          </svg>
        </div>
        <MapContainer />
        <div className="cl-section-divider"></div>
      </div>
    </div>
  );
};

// Enhanced Circular Progress Rating Component
const CircularRating = ({ rating, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Calculate the correct progress based on rating out of 5
  const percentage = (rating / 5) * 100;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  
  return (
    <div 
      className="cl-circular-rating" 
      style={{ 
        width: size, 
        height: size,
        '--rating-percentage': percentage
      }}
    >
      <svg width={size} height={size} className="cl-circular-rating__svg">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
          className="cl-circular-rating__background"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="cl-circular-rating__progress"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            '--circumference': circumference,
            '--offset': strokeDashoffset
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#405ff2" />
            <stop offset="100%" stopColor="#2d4dcc" />
          </linearGradient>
        </defs>
      </svg>
      <div className="cl-circular-rating__content">
        <span className="cl-circular-rating__number">{rating}</span>
        <span className="cl-circular-rating__label">Out of 5</span>
      </div>
    </div>
  );
};

// Optimized Reviews Components
const StarRating = ({ rating, isInteractive = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleStarClick = useCallback((index) => {
    if (isInteractive && onRatingChange) {
      onRatingChange(index + 1);
    }
  }, [isInteractive, onRatingChange]);

  const handleStarHover = useCallback((index) => {
    if (isInteractive) {
      setHoverRating(index + 1);
    }
  }, [isInteractive]);

  const handleMouseLeave = useCallback(() => {
    if (isInteractive) {
      setHoverRating(0);
    }
  }, [isInteractive]);

  const displayRating = isInteractive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div 
      className={`cl-star-rating ${isInteractive ? 'cl-star-rating--interactive' : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`cl-star ${index < displayRating ? 'cl-star--filled' : 'cl-star--empty'} ${
            isInteractive ? 'cl-star--clickable' : ''
          }`}
          onClick={isInteractive ? () => handleStarClick(index) : undefined}
          onMouseEnter={isInteractive ? () => handleStarHover(index) : undefined}
        />
      ))}
    </div>
  );
};

const RatingCategory = ({ name, status, rating }) => (
  <div className="cl-rating-row">
    <div className="cl-category-info">
      <span className="cl-category-name">{name}</span>
      <span className="cl-category-status">{status}</span>
    </div>
    <div className="cl-rating-stars">
      <Star className="cl-star cl-star--filled" />
      <span className="cl-rating-value">{rating}</span>
    </div>
  </div>
);

const ReviewItem = ({ reviewer, date, rating, text }) => (
  <div className="cl-review-item">
    <div className="cl-review-header">
      <div className="cl-reviewer-avatar">{reviewer.charAt(0).toUpperCase()}</div>
      <div className="cl-reviewer-info">
        <span className="cl-reviewer-name">{reviewer}</span>
        <span className="cl-review-date">{date}</span>
      </div>
    </div>
    <div className="cl-review-rating">
      <StarRating rating={rating} />
      <span className="cl-review-score">{rating}.0</span>
    </div>
    <p className="cl-review-text">{text}</p>
  </div>
);

const RatingInput = ({ label, rating, onRatingChange }) => (
  <div className="cl-rating-input-group">
    <label>{label}</label>
    <StarRating 
      rating={rating} 
      isInteractive={true} 
      onRatingChange={onRatingChange}
    />
  </div>
);

// Updated ReviewsSection component
const ReviewsSection = () => {
  // State management for reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewer: "Michael Thompson",
      date: "January 15, 2024",
      rating: 4.8,
      text: "Amazing performance from the M235i! The TwinPower Turbo engine delivers incredible power and the xDrive system provides excellent grip in all conditions. The Gran Coupé styling is stunning and the interior quality is top-notch."
    },
    {
      id: 2,
      reviewer: "Sarah Johnson",
      date: "January 22, 2024",
      rating: 4.5,
      text: "Love this BMW! Perfect blend of luxury and sportiness. The 8-speed automatic is smooth and the M Sport package really enhances the driving experience. Only minor complaint is the rear headroom could be better."
    }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    saveInfo: false,
    ratings: {
      comfort: 0,
      interiorDesign: 0,
      exteriorStyling: 0,
      valueForMoney: 0,
      performance: 0,
      reliability: 0
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate overall rating from reviews
  const overallRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);

  // Calculate dynamic rating categories based on actual reviews
  const ratingCategories = useMemo(() => {
    // These would typically come from individual category ratings in reviews
    // For now, I'll create dynamic values based on the overall rating with some variation
    const baseRating = parseFloat(overallRating);
    const variations = [0.2, -0.1, 0.3, -0.2, 0.4, 0.1];
    
    const categories = [
      "Comfort", "Interior Design", "Exterior Styling", 
      "Value For The Money", "Performance", "Reliability"
    ];
    
    return categories.map((category, index) => {
      const categoryRating = Math.max(1, Math.min(5, baseRating + variations[index]));
      const roundedRating = Math.round(categoryRating * 10) / 10;
      let status = "Good";
      
      if (roundedRating >= 4.5) status = "Perfect";
      else if (roundedRating >= 4.0) status = "Excellent";
      else if (roundedRating >= 3.5) status = "Very Good";
      else if (roundedRating >= 3.0) status = "Good";
      else status = "Fair";
      
      return {
        name: category,
        status: status,
        rating: roundedRating.toFixed(1)
      };
    });
  }, [overallRating]);

  // Handle form input changes
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle rating changes
  const handleRatingChange = useCallback((category, rating) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: rating
      }
    }));
  }, []);

  // Validate form
  const isFormValid = useMemo(() => {
    const { name, email, review, ratings } = formData;
    const hasBasicInfo = name.trim() && email.trim() && review.trim();
    const hasRatings = Object.values(ratings).some(rating => rating > 0);
    return hasBasicInfo && hasRatings;
  }, [formData]);

  // Submit review
  const submitReview = useCallback(async (e) => {
    e.preventDefault();
    
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Calculate average rating from form ratings
      const ratingValues = Object.values(formData.ratings).filter(r => r > 0);
      const averageRating = ratingValues.length > 0 
        ? Math.round(ratingValues.reduce((sum, r) => sum + r, 0) / ratingValues.length * 10) / 10
        : 5;

      // Create new review object
      const newReview = {
        id: Date.now(),
        reviewer: formData.name,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        rating: averageRating,
        text: formData.review
      };

      // Add to reviews list
      setReviews(prev => [newReview, ...prev]);

      // Reset form
      setFormData({
        name: '',
        email: '',
        review: '',
        saveInfo: false,
        ratings: {
          comfort: 0,
          interiorDesign: 0,
          exteriorStyling: 0,
          valueForMoney: 0,
          performance: 0,
          reliability: 0
        }
      });

      // Here you would typically send the data to your backend
      console.log('Review submitted:', newReview);
      
      // Show success message (you could use a toast or alert)
      alert('Review submitted successfully!');

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isFormValid, isSubmitting]);

  return (
    <div className="cl-reviews-section">
      <SectionTitle>Reviews</SectionTitle>
      
      {/* New layout structure */}
      <div className="cl-reviews-main-content">
        {/* Left side - Reviews count and overall rating */}
        <div className="cl-reviews-left">
          <div className="cl-reviews-count">
            <h3>{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</h3>
          </div>
          
          <div className="cl-overall-rating">
            <CircularRating rating={parseFloat(overallRating)} />
            <span className="cl-overall-label">Overall Rating</span>
          </div>
        </div>
        
        {/* Right side - Rating breakdown in 2 columns */}
        <div className="cl-rating-breakdown">
          <div className="cl-rating-categories">
            {ratingCategories.slice(0, 3).map((category, index) => (
              <div key={index} className="cl-rating-row">
                <div className="cl-category-info">
                  <span className="cl-category-name">{category.name}</span>
                  <span className="cl-category-status">{category.status}</span>
                </div>
                <div className="cl-rating-stars">
                  <Star className="cl-star cl-star--filled" />
                  <span className="cl-rating-value">{category.rating}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cl-rating-categories">
            {ratingCategories.slice(3).map((category, index) => (
              <div key={index + 3} className="cl-rating-row">
                <div className="cl-category-info">
                  <span className="cl-category-name">{category.name}</span>
                  <span className="cl-category-status">{category.status}</span>
                </div>
                <div className="cl-rating-stars">
                  <Star className="cl-star cl-star--filled" />
                  <span className="cl-rating-value">{category.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Individual reviews */}
      <div className="cl-individual-reviews">
        {reviews.map((review) => (
          <div key={review.id} className="cl-review-item">
            <div className="cl-review-header">
              <div className="cl-reviewer-avatar">{review.reviewer.charAt(0).toUpperCase()}</div>
              <div className="cl-reviewer-info">
                <span className="cl-reviewer-name">{review.reviewer}</span>
                <span className="cl-review-date">{review.date}</span>
              </div>
            </div>
            <div className="cl-review-rating">
              <StarRating rating={Math.floor(review.rating)} />
              <span className="cl-review-score">{review.rating}</span>
            </div>
            <p className="cl-review-text">{review.text}</p>
          </div>
        ))}
      </div>
      
      {/* Add review form */}
      <div className="cl-add-review-section">
        <h3 className="cl-add-review-title">Add a review</h3>
        
        <form className="cl-review-form" onSubmit={submitReview}>
          <div className="cl-rating-inputs">
            <div className="cl-rating-input-row">
              <RatingInput
                label="Comfort"
                rating={formData.ratings.comfort}
                onRatingChange={(rating) => handleRatingChange('comfort', rating)}
              />
              <RatingInput
                label="Interior Design"
                rating={formData.ratings.interiorDesign}
                onRatingChange={(rating) => handleRatingChange('interiorDesign', rating)}
              />
            </div>
            
            <div className="cl-rating-input-row">
              <RatingInput
                label="Exterior Styling"
                rating={formData.ratings.exteriorStyling}
                onRatingChange={(rating) => handleRatingChange('exteriorStyling', rating)}
              />
              <RatingInput
                label="Value For The Money"
                rating={formData.ratings.valueForMoney}
                onRatingChange={(rating) => handleRatingChange('valueForMoney', rating)}
              />
            </div>
            
            <div className="cl-rating-input-row">
              <RatingInput
                label="Performance"
                rating={formData.ratings.performance}
                onRatingChange={(rating) => handleRatingChange('performance', rating)}
              />
              <RatingInput
                label="Reliability"
                rating={formData.ratings.reliability}
                onRatingChange={(rating) => handleRatingChange('reliability', rating)}
              />
            </div>
          </div>
          
          <div className="cl-form-inputs">
            <div className="cl-input-row">
              <input 
                type="text" 
                placeholder="Name"
                className="cl-form-input"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <input 
                type="email" 
                placeholder="Email"
                className="cl-form-input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <div className="cl-checkbox-row">
              <input 
                type="checkbox" 
                id="save-info"
                checked={formData.saveInfo}
                onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
              />
              <label htmlFor="save-info">
                Save my name, email, and website in this browser for the next time I comment.
              </label>
            </div>
            
            <textarea 
              placeholder="Review"
              className="cl-review-textarea"
              rows="4"
              value={formData.review}
              onChange={(e) => handleInputChange('review', e.target.value)}
              required
            />
            
            <button 
              type="submit"
              className="cl-submit-review-btn"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CarListing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
      <Navbar />

      <div className="cl-listing">
        <div className="cl-listing-page">
          <div className="cl-listing-page__content">
            <CarHeader />
            <ImageGallery />
            
            {/* New wrapper for main content and DealerCard side by side */}
            <div className="cl-overview-section">
              <div className="cl-overview-section__main">
                <CarOverview />
                <Description />
              </div>
              <aside className="cl-listing-page__sidebar">
                <DealerCard />
              </aside>
            </div>
          </div>
        </div>  

        <CarFeatures />    

        {/* Optimized Reviews Section */}
        <ReviewsSection />
      </div>
        
      <Footer/>
    </div>
  );
};

export default CarListing;