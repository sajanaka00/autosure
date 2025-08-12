import React from 'react';
import FairPrice from '../../assets/images/about/fair-price.jpg';
import PlayBtn from '../../assets/images/vectors/play-btn.png';
import '../../styles/get-fair-price.css';

const GetFairPrice = () => {
  return (
    <section className="fair-price-section">
      <div className="container">
        <div className="fair-price-content">
          <div className="fair-price-image">
            <img 
              src={FairPrice} 
              alt="Luxury car on mountain road"
            />
            <div className="play-button">
              <img src={PlayBtn} alt="Play Button" />
            </div>
          </div>
          
          <div className="fair-price-text">
            <h2>Get A Fair Price For Your Car Sell To Us Today</h2>
            <p>
              We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of vehicles to choose from.
            </p>
            
            <ul className="benefits-list">
              <li>We are the UK's largest provider, with more patrols in more places</li>
              <li>You get 24/7 roadside assistance</li>
              <li>We fix 4 out of 5 cars at the roadside</li>
            </ul>
            
            <button className="cta-button">Get Started</button>
          </div>
        </div>
        
        <div className="stats-section">
          <div className="stat-item">
            <h3>89M</h3>
            <p>Cars for Sale</p>
          </div>
          <div className="stat-item">
            <h3>740M</h3>
            <p>Dealer Reviews</p>
          </div>
          <div className="stat-item">
            <h3>95M</h3>
            <p>Visitors Per Day</p>
          </div>
          <div className="stat-item">
            <h3>225M</h3>
            <p>Verified Dealers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetFairPrice;