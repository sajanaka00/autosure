import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ChevronUp } from 'lucide-react';
// Import vector images from assets folder
import AppleStoreIcon from '../../assets/images/vectors/apple.png';
import GooglePlayIcon from '../../assets/images/vectors/google-play.png';
import '../../styles/footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

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
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Join BoxCar</h2>
              <p>Receive pricing updates, shopping tips & more!</p>
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
            {/* Company Section */}
            <div className="footer-column">
              <h3>Company</h3>
              <div className="links-list">
                <a href="#">About Us</a>
                <a href="#">Blog</a>
                <a href="#">Services</a>
                <a href="#">FAQs</a>
                <a href="#">Terms</a>
                <a href="#">Contact Us</a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="footer-column">
              <h3>Quick Links</h3>
              <div className="links-list">
                <a href="#">Get in Touch</a>
                <a href="#">Help center</a>
                <a href="#">Live chat</a>
                <a href="#">How it works</a>
              </div>
            </div>

            {/* Our Brands Section */}
            <div className="footer-column">
              <h3>Our Brands</h3>
              <div className="links-list">
                <a href="#">Toyota</a>
                <a href="#">Porsche</a>
                <a href="#">Audi</a>
                <a href="#">BMW</a>
                <a href="#">Ford</a>
                <a href="#">Nissan</a>
                <a href="#">Peugeot</a>
                <a href="#">Volkswagen</a>
              </div>
            </div>

            {/* Vehicles Type Section */}
            <div className="footer-column">
              <h3>Vehicles Type</h3>
              <div className="links-list">
                <a href="#">Sedan</a>
                <a href="#">Hatchback</a>
                <a href="#">SUV</a>
                <a href="#">Hybrid</a>
                <a href="#">Electric</a>
                <a href="#">Coupe</a>
                <a href="#">Truck</a>
                <a href="#">Convertible</a>
              </div>
            </div>

            {/* Our Mobile App Section */}
            <div className="footer-column mobile-app-section">
              <h3>Our Mobile App</h3>
              <div className="app-buttons">
                {/* App Store Button */}
                <a href="#" className="app-button">
                  <div className="app-icon">
                    <img src={AppleStoreIcon} alt="Apple Store" className="app-icon-img" />
                  </div>
                  <div className="app-text">
                    <div className="app-subtitle">Download on the</div>
                    <div className="app-title">App Store</div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a href="#" className="app-button">
                  <div className="app-icon">
                    <img src={GooglePlayIcon} alt="Google Play" className="app-icon-img" />
                  </div>
                  <div className="app-text">
                    <div className="app-subtitle">Get it on</div>
                    <div className="app-title">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Social Media */}
              <div className="social-section">
                <h4>Connect With Us</h4>
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

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2024 Boxcars.com. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Notice</a>
              <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}