import React, { useState } from 'react';
import { Heart, Share2, MessageCircle, Star, Phone, Calendar, Gauge, Fuel, Settings, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import Footer from '../../common/Footer';
import BodyImg from '../../../assets/images/vectors/body.png'
import MileageImg from '../../../assets/images/vectors/mileage.png'
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
import MapImg from '../../../assets/images/vectors/location.png'
import CheckImg from '../../../assets/images/vectors/check.png'
import Navbar from '../../common/Navbar';
import '../../../styles/car-listing.css';

// Reusable Components from CarListingPage
const IconButton = ({ icon, text, variant = 'default', onClick }) => (
  <div className={`icon-button icon-button--${variant}`} onClick={onClick}>
    {text && <span className="icon-button__text">{text}</span>}
    <div className="icon-button__icon-container">
      <img className="icon-button__icon" src={icon} alt="" />
    </div>
  </div>
);

const Badge = ({ text, variant = 'default' }) => (
  <div className={`badge badge--${variant}`}>
    <span className="badge__text">{text}</span>
  </div>
);

const InfoItem = ({ icon, label, value, isLink = false }) => (
  <div className="info-item">
    <img className="info-item__icon" src={icon} alt="" />
    <span className="info-item__label">{label}</span>
    {isLink ? (
      <a href="#" className="info-item__value info-item__value--link">{value}</a>
    ) : (
      <span className="info-item__value">{value}</span>
    )}
  </div>
);

const Breadcrumb = () => (
  <nav className="breadcrumb">
    <a href="#" className="breadcrumb__item breadcrumb__item--link">Home</a>
    <span className="breadcrumb__separator">/</span>
    <a href="#" className="breadcrumb__item breadcrumb__item--link">Listings</a>
    <span className="breadcrumb__separator">/</span>
    <span className="breadcrumb__item">Toyota Camry New</span>
  </nav>
);

const CarHeader = () => (
  <div className="car-header">
    <Breadcrumb />
    
    <div className="car-header__main-content">
      <div className="car-header__left">
        <h1 className="car-header__title">Toyota Camry New</h1>
        <p className="car-header__subtitle">3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate</p>
        
        <div className="car-header__badges">
          <Badge text="2023" />
          <Badge text="20 miles" />
          <Badge text="Automatic" />
          <Badge text="Petrol" />
        </div>
      </div>
      
      <div className="car-header__right">
        <div className="car-header__actions">
          <IconButton icon="icon4.svg" text="Share" />
          <IconButton icon="icon5.svg" text="Save" variant="outlined" />
          <IconButton icon="icon6.svg" text="Compare" variant="outlined" />
        </div>
        
        <div className="car-header__price">
          <span className="car-header__price-amount">$40,000</span>
          <a href="#" className="car-header__offer-link">
            <img className="car-header__offer-icon" src="icon7.svg" alt="" />
            Make An Offer Price
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ImageGallery = () => (
  <div className="image-gallery">
    <div className="image-gallery__main">
      <img 
        className="image-gallery__main-image" 
        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
        alt="Toyota Camry"
      />
      <div className="image-gallery__badges">
        <Badge text="Featured" variant="primary" />
        <Badge text="Great Price" variant="success" />
      </div>
      <div className="image-gallery__video-button">
        <img className="image-gallery__video-icon" src="icon8.svg" alt="" />
        <span>Video</span>
      </div>
    </div>
    
    <div className="image-gallery__thumbnails">
      {[
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1494976688202-2f60c03b46c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlsfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ].map((src, index) => (
        <img key={index} className="image-gallery__thumbnail" src={src} alt={`Car view ${index + 1}`} />
      ))}
    </div>
  </div>
);

const CarOverview = () => {
  const leftColumnItems = [
    { icon: BodyImg, label: "Body", value: "Sedan", isLink: true },
    { icon: MileageImg, label: "Mileage", value: "20", isLink: false },
    { icon: FuelImg, label: "Fuel Type", value: "Petrol", isLink: true },
    { icon: YearImg, label: "Year", value: "2023", isLink: false },
    { icon: TransmissionImg, label: "Transmission", value: "Automatic", isLink: true },
    { icon: DriveTypeImg, label: "Drive Type", value: "All-Wheel Drive (AWD/4WD)", isLink: true }
  ];

  const rightColumnItems = [
    { icon: "icon15.svg", label: "Condition", value: "New", isLink: true },
    { icon: EngineImg, label: "Engine Size", value: "3.5", isLink: false },
    { icon: DoorImg, label: "Door", value: "4 Doors", isLink: true },
    { icon: CylinderImg, label: "Cylinder", value: "12", isLink: true },
    { icon: ColorImg, label: "Color", value: "Black, Blue, White", isLink: true },
    { icon: VINImg, label: "VIN", value: "MCB123818", isLink: false }
  ];

  return (
    <section className="car-overview">
      <h2 className="car-overview__title">Car Overview</h2>
      <div className="car-overview__content">
        <div className="car-overview__column">
          {leftColumnItems.map((item, index) => (
            <InfoItem key={index} {...item} />
          ))}
        </div>
        <div className="car-overview__column">
          {rightColumnItems.map((item, index) => (
            <InfoItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Description = () => (
  <section className="description">
    <h2 className="description__title">Description</h2>
    <div className="description__content">
      <p className="description__paragraph">
        Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus
      </p>
      <p className="description__paragraph">
        Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque.
      </p>
    </div>
    
    <div className="description__downloads">
      <a href="#" className="description__download-link">
        <img className="description__download-icon" src="icon21.svg" alt="" />
        Schedule-Test-Drive.pdf
      </a>
      <a href="#" className="description__download-link">
        <img className="description__download-icon" src="icon22.svg" alt="" />
        Car-Brochure.pdf
      </a>
    </div>
  </section>
);

const DealerCard = () => (
  <div className="dealer-card">
    <div className="dealer-card__header">
      <div className="dealer-card__avatar">
        <img className="dealer-card__avatar-image" src={DealerImg} alt="Admin" />
      </div>
      <h3 className="dealer-card__name">admin</h3>
      <p className="dealer-card__address">943 Broadway, Brooklyn</p>
    </div>
    
    <div className="dealer-card__actions">
      <div className="dealer-card__contact-row">
        <div className="dealer-card__contact-item">
          <div className="dealer-card__contact-icon">
            <img src={MapImg} alt="" />
          </div>
          <span className="dealer-card__contact-text">Get Direction</span>
        </div>
        <div className="dealer-card__contact-item">
          <div className="dealer-card__contact-icon">
            <Phone size={16} />
          </div>
          <span className="dealer-card__contact-text">+88-123456789</span>
        </div>
      </div>
      
      <button className="dealer-card__button dealer-card__button--primary">
        Message Dealer
        <img className="dealer-card__button-icon" src="svg2.svg" alt="" />
      </button>
      
      <button className="dealer-card__button dealer-card__button--whatsapp">
        Chat Via Whatsapp
        <img className="dealer-card__button-icon" src="svg3.svg" alt="" />
      </button>
      
      <a href="#" className="dealer-card__link">
        View All stock at this dealer
        <img className="dealer-card__link-icon" src="svg4.svg" alt="" />
      </a>
    </div>
  </div>
);

const CarListing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Features data
  const features = {
    Interior: [
      'Air Conditioner',
      'Digital Odometer',
      'Heater',
      'Leather Seats',
      'Panoramic Moonroof',
      'Tachometer',
      'Touchscreen Display'
    ],
    Safety: [
      'Anti-lock Braking',
      'Brake Assist',
      'Child Safety Locks',
      'Driver Air Bag',
      'Power Door Locks',
      'Stability Control',
      'Traction Control'
    ],
    Exterior: [
      'Fog Lights Front',
      'Rain Sensing Wiper',
      'Rear Spoiler',
      'Windows - Electric'
    ],
    'Comfort & Convenience': [
      'Android Auto',
      'Apple CarPlay',
      'Bluetooth',
      'HomeLink',
      'Power Steering'
    ]
  };

  return (
    <div className="car-listing">
      <Navbar />
      
      <div className="car-listing-page">
        <div className="car-listing-page__content">
          <CarHeader />
          <ImageGallery />
          <CarOverview />
          <Description />
        </div>
        <aside className="car-listing-page__sidebar">
          <DealerCard />
        </aside>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-title">Features</h2>
        <div className="features-grid">
          {Object.entries(features).map(([category, items]) => (
            <div key={category} className="feature-category">
              <h3 className="feature-category-title">{category}</h3>
              <div className="feature-list">
                {items.map((item, index) => (
                  <div key={index} className="feature-item">
                    <img
                      src={CheckImg}
                      alt="Check"
                      className="check-image"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="reviews-title">Reviews</h2>
        
        <div className="reviews-content">
          <div className="reviews-summary">
            <div className="overall-rating">
              <div className="rating-circle">
                <span className="rating-number">4.5</span>
                <span className="rating-label">Out of 5</span>
                <span className="overall-label">Overall Rating</span>
              </div>
            </div>
            
            <div className="rating-breakdown">
              <div className="rating-categories">
                <div className="rating-row">
                  <div className="category-info">
                    <span className="category-name">Comfort</span>
                    <span className="category-status">Perfect</span>
                  </div>
                  <div className="rating-stars">
                    <Star className="star filled" />
                    <span className="rating-value">5.0</span>
                  </div>
                </div>
                
                <div className="rating-row">
                  <div className="category-info">
                    <span className="category-name">Exterior Styling</span>
                    <span className="category-status">Perfect</span>
                  </div>
                  <div className="rating-stars">
                    <Star className="star filled" />
                    <span className="rating-value">5.0</span>
                  </div>
                </div>
                
                <div className="rating-row">
                  <div className="category-info">
                    <span className="category-name">Performance</span>
                    <span className="category-status">Perfect</span>
                  </div>
                  <div className="rating-stars">
                    <Star className="star filled" />
                    <span className="rating-value">5.0</span>
                  </div>
                </div>
              </div>
              
              <div className="rating-categories">
                <div className="rating-row">
                  <div className="category-info">
                    <span className="category-name">Interior Design</span>
                    <span className="category-status">Good</span>
                  </div>
                  <div className="rating-stars">
                    <Star className="star filled" />
                    <span className="rating-value">4.5</span>
                  </div>
                </div>
                
                <div className="rating-row">
                  <div className="category-info">
                    <span className="category-name">Value For The Money</span>
                    <span className="category-status">Perfect</span>
                  </div>
                  <div className="rating-stars">
                    <Star className="star filled" />
                    <span className="rating-value">5.0</span>
                  </div>
                </div>
                
                <div className="rating-row">
                  <div className="category-info">
                    <span className="category-name">Reliability</span>
                    <span className="category-status">Good</span>
                  </div>
                  <div className="rating-stars">
                    <Star className="star filled" />
                    <span className="rating-value">4.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reviews-count">
            <h3>2 Reviews</h3>
          </div>
        </div>
        
        <div className="individual-reviews">
          <div className="review-item">
            <div className="review-header">
              <div className="reviewer-avatar">D</div>
              <div className="reviewer-info">
                <span className="reviewer-name">Demo</span>
                <span className="review-date">November 30, 2023</span>
              </div>
            </div>
            <div className="review-rating">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="star filled" />
              ))}
              <Star className="star empty" />
              <span className="review-score">4.7</span>
            </div>
            <p className="review-text">
              Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis.
            </p>
          </div>
          
          <div className="review-item">
            <div className="review-header">
              <div className="reviewer-avatar">D</div>
              <div className="reviewer-info">
                <span className="reviewer-name">Demo</span>
                <span className="review-date">December 16, 2023</span>
              </div>
            </div>
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star filled" />
              ))}
              <span className="review-score">5.0</span>
            </div>
            <p className="review-text">qweqeqeq</p>
          </div>
        </div>
        
        <div className="add-review-section">
          <h3 className="add-review-title">Add a review</h3>
          
          <div className="review-form">
            <div className="rating-inputs">
              <div className="rating-input-row">
                <div className="rating-input-group">
                  <label>Comfort</label>
                  <div className="star-input">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-input-item" />
                    ))}
                  </div>
                </div>
                
                <div className="rating-input-group">
                  <label>Interior Design</label>
                  <div className="star-input">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-input-item" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="rating-input-row">
                <div className="rating-input-group">
                  <label>Exterior Styling</label>
                  <div className="star-input">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-input-item" />
                    ))}
                  </div>
                </div>
                
                <div className="rating-input-group">
                  <label>Value For The Money</label>
                  <div className="star-input">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-input-item" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="rating-input-row">
                <div className="rating-input-group">
                  <label>Performance</label>
                  <div className="star-input">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-input-item" />
                    ))}
                  </div>
                </div>
                
                <div className="rating-input-group">
                  <label>Reliability</label>
                  <div className="star-input">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-input-item" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-inputs">
              <div className="input-row">
                <input 
                  type="text" 
                  placeholder="Name"
                  className="form-input"
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  className="form-input"
                />
              </div>
              
              <div className="checkbox-row">
                <input type="checkbox" id="save-info" />
                <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
              </div>
              
              <textarea 
                placeholder="Review"
                className="review-textarea"
                rows="4"
              ></textarea>
              
              <button className="submit-review-btn">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
        
      <Footer/>
    </div>
  );
};

export default CarListing;