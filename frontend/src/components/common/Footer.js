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
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2 className="newsletter-title">Join BoxCar</h2>
              <p className="newsletter-subtitle">
                Receive pricing updates, shopping tips & more!
              </p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="email-input"
              />
              <button onClick={handleSignUp} className="signup-btn">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Links */}
            <div className="footer-column">
              <h3 className="section-title">Company</h3>
              <div className="links-list">
                {companyLinks.map((link, index) => (
                  <a key={index} href="#" className="footer-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3 className="section-title">Quick Links</h3>
              <div className="links-list">
                {quickLinks.map((link, index) => (
                  <a key={index} href="#" className="footer-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Our Brands */}
            <div className="footer-column">
              <h3 className="section-title">Our Brands</h3>
              <div className="links-list">
                {brands.map((brand, index) => (
                  <a key={index} href="#" className="footer-link">
                    {brand}
                  </a>
                ))}
              </div>
            </div>

            {/* Vehicle Types */}
            <div className="footer-column">
              <h3 className="section-title">Vehicles Type</h3>
              <div className="links-list">
                {vehicleTypes.map((type, index) => (
                  <a key={index} href="#" className="footer-link">
                    {type}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile App & Social */}
            <div className="footer-column mobile-app-section">
              <h3 className="section-title">Our Mobile App</h3>
              <div className="app-buttons">
                {/* App Store Button */}
                <a href="#" className="app-button">
                  <div className="app-icon">
                    📱
                  </div>
                  <div className="app-text">
                    <div className="app-subtitle">Download on the</div>
                    <div className="app-title">App Store</div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a href="#" className="app-button">
                  <div className="app-icon">
                    📱
                  </div>
                  <div className="app-text">
                    <div className="app-subtitle">Get it on</div>
                    <div className="app-title">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Social Media */}
              <div className="social-section">
                <h4 className="social-title">Connect With Us</h4>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2025 Boxcars.com. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#" className="legal-link">Terms & Conditions</a>
              <a href="#" className="legal-link">Privacy Notice</a>
              <button 
                onClick={scrollToTop} 
                className="scroll-top-btn" 
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