import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Apple, Smartphone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="boxcar-footer">
      <div className="boxcar-footer-container">

        {/* Newsletter Section */}
        <div className="footer-newsletter-section">
          <div>
            <div className="footer-newsletter-title">Join our newsletter</div>
            <div className="footer-newsletter-desc">Get the latest updates and offers directly to your inbox.</div>
          </div>
          <div className="footer-newsletter-form">
            <input type="email" placeholder="Enter your email" className="footer-input" />
            <button className="footer-submit-btn">Subscribe</button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-logo">BOXCARS.</div>
            <div className="footer-brand-desc">
              Premium vehicle marketplace redefining the journey with elegance, reliability, and modern convenience.
            </div>
            {/* Socials moved here for density */}
            <div className="footer-socials" style={{ marginTop: 10 }}>
              <a href="#" className="footer-social-icon"><Twitter size={16} /></a>
              <a href="#" className="footer-social-icon"><Facebook size={16} /></a>
              <a href="#" className="footer-social-icon"><Instagram size={16} /></a>
              <a href="#" className="footer-social-icon"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <div className="footer-col-title">Marketplace</div>
            <div className="footer-links">
              <a href="#" className="footer-link">Browse Cars</a>
              <a href="#" className="footer-link">Sell Your Car</a>
              <a href="#" className="footer-link">Car Valuation</a>
              <a href="#" className="footer-link">Verified Dealers</a>
            </div>
          </div>

          {/* Links Col 2 */}
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>

          {/* Links Col 3 */}
          <div>
            <div className="footer-col-title">Support</div>
            <div className="footer-links">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Safety Guidelines</a>
            </div>
          </div>

          {/* Mobile App Col - NEW */}
          <div>
            <div className="footer-col-title">Mobile App</div>
            <div className="footer-links">
              <a href="#" className="footer-app-btn">
                <Apple size={24} />
                <div className="app-btn-text">
                  <span className="app-btn-sub">Download on the</span>
                  <span className="app-btn-main">App Store</span>
                </div>
              </a>
              <a href="#" className="footer-app-btn">
                <Smartphone size={24} />
                <div className="app-btn-text">
                  <span className="app-btn-sub">Get it on</span>
                  <span className="app-btn-main">Google Play</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">© 2025 Boxcars Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: '#71717a', fontSize: 13, textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#71717a', fontSize: 13, textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#71717a', fontSize: 13, textDecoration: 'none' }}>Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;