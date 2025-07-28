import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ChevronUp } from 'lucide-react';
import '../../styles/footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const companyLinks = [
    'About Us', 'Blog', 'Services', 'FAQs', 'Terms', 'Contact Us'
  ];

  const quickLinks = [
    'Get in Touch', 'Help center', 'Live chat', 'How it works'
  ];

  const brands = [
    'Toyota', 'Porsche', 'Audi', 'BMW', 'Ford', 'Nissan', 'Peugeot', 'Volkswagen'
  ];

  const vehicleTypes = [
    'Sedan', 'Hatchback', 'SUV', 'Hybrid', 'Electric', 'Coupe', 'Truck', 'Convertible'
  ];

  const handleSignUp = () => {
    if (email) {
      console.log('Email signed up:', email);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="boxcar-footer">
      {/* Newsletter Section */}
      <div className="boxcar-footer-newsletter">
        <div className="boxcar-footer-container">
          <div className="boxcar-footer-newsletter-content">
            <div className="boxcar-footer-newsletter-text">
              <h2 className="boxcar-footer-newsletter-title">Join BoxCar</h2>
              <p className="boxcar-footer-newsletter-subtitle">
                Receive pricing updates, shopping tips & more!
              </p>
            </div>
            <div className="boxcar-footer-newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="boxcar-footer-email-input"
              />
              <button onClick={handleSignUp} className="boxcar-footer-signup-btn">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="boxcar-footer-main">
        <div className="boxcar-footer-container">
          <div className="boxcar-footer-grid">
            {/* Company Links */}
            <div className="boxcar-footer-column">
              <h3 className="boxcar-footer-section-title">Company</h3>
              <div className="boxcar-footer-links-list">
                {companyLinks.map((link, index) => (
                  <a key={index} href="#" className="boxcar-footer-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="boxcar-footer-column">
              <h3 className="boxcar-footer-section-title">Quick Links</h3>
              <div className="boxcar-footer-links-list">
                {quickLinks.map((link, index) => (
                  <a key={index} href="#" className="boxcar-footer-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Our Brands */}
            <div className="boxcar-footer-column">
              <h3 className="boxcar-footer-section-title">Our Brands</h3>
              <div className="boxcar-footer-links-list">
                {brands.map((brand, index) => (
                  <a key={index} href="#" className="boxcar-footer-link">
                    {brand}
                  </a>
                ))}
              </div>
            </div>

            {/* Vehicle Types */}
            <div className="boxcar-footer-column">
              <h3 className="boxcar-footer-section-title">Vehicles Type</h3>
              <div className="boxcar-footer-links-list">
                {vehicleTypes.map((type, index) => (
                  <a key={index} href="#" className="boxcar-footer-link">
                    {type}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile App & Social */}
            <div className="boxcar-footer-column boxcar-footer-mobile-app-section">
              <h3 className="boxcar-footer-section-title">Our Mobile App</h3>
              <div className="boxcar-footer-app-buttons">
                {/* App Store Button */}
                <a href="#" className="boxcar-footer-app-button">
                  <div className="boxcar-footer-app-icon">
                    📱
                  </div>
                  <div className="boxcar-footer-app-text">
                    <div className="boxcar-footer-app-subtitle">Download on the</div>
                    <div className="boxcar-footer-app-title">App Store</div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a href="#" className="boxcar-footer-app-button">
                  <div className="boxcar-footer-app-icon">
                    📱
                  </div>
                  <div className="boxcar-footer-app-text">
                    <div className="boxcar-footer-app-subtitle">Get it on</div>
                    <div className="boxcar-footer-app-title">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Social Media */}
              <div className="boxcar-footer-social-section">
                <h4 className="boxcar-footer-social-title">Connect With Us</h4>
                <div className="boxcar-footer-social-links">
                  <a href="#" className="boxcar-footer-social-link">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="boxcar-footer-social-link">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="boxcar-footer-social-link">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="boxcar-footer-social-link">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="boxcar-footer-bottom">
        <div className="boxcar-footer-container">
          <div className="boxcar-footer-bottom-content">
            <div className="boxcar-footer-copyright">
              © 2025 Boxcars.com. All rights reserved.
            </div>
            <div className="boxcar-footer-bottom-links">
              <a href="#" className="boxcar-footer-legal-link">Terms & Conditions</a>
              <a href="#" className="boxcar-footer-legal-link">Privacy Notice</a>
              <button 
                onClick={scrollToTop} 
                className="boxcar-footer-scroll-top-btn" 
                aria-label="Scroll to top"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;