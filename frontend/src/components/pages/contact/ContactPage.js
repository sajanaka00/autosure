import React, { useState, useEffect, useRef } from 'react';
import {
  Facebook, Twitter, Instagram, Linkedin,
  Phone, Mail, MapPin, ExternalLink, Menu
} from 'lucide-react';
import '../../../styles/contact.css'
import Navbar from '../../common/Navbar';
import BoxCarFooter from '../../common/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -37.807425, lng: 144.978247 }, // Melbourne HQ
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: { lat: -37.807425, lng: 144.978247 },
        map,
        title: 'Boxcars HQ',
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#">Home</a> / Contact Us
      </div>

      {/* Hero Section */}
      <div className="contact-hero">
        <h1 className="contact-title">Contact Us</h1>

        {/* Google Map */}
        <div className="map-container" ref={mapRef}></div>
      </div>

      {/* Contact Content */}
      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Get In Touch</h2>
          <p className="form-description">
            Etiam pharetra egestas interdum blandit viverra mauris consequat nu leo bibendum
            molestie ipsum egestas nulla.
          </p>

          <div className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ali"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Tufan"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+90 123 456 789"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button onClick={handleSubmit} className="send-btn">
              Send Message
            </button>
          </div>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <h3>Contact details</h3>
          <p className="contact-details-description">
            Etiam pharetra egestas interdum blandit viverra mauris consequat
            nu leo bibendum molestie ipsum egestas nulla.
          </p>

          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-text">
                <h4>Address</h4>
                <p>123 Queensberry Street, North Melbourne VIC 3051, Australia</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={20} />
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>ali@boxcars.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={20} />
              </div>
              <div className="contact-text">
                <h4>Phone</h4>
                <p>+76 956 123 456</p>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h4>Follow us</h4>
            <div className="social-links">
              <a href="#" className="social-link"><Facebook size={20} /></a>
              <a href="#" className="social-link"><Twitter size={20} /></a>
              <a href="#" className="social-link"><Instagram size={20} /></a>
              <a href="#" className="social-link"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Our Offices Section */}
      <div className="offices-section">
        <h2 className="offices-title">Our Offices</h2>
        <div className="offices-grid">
          <div className="office-card">
            <h3>San Francisco</h3>
            <p className="office-address">48 Dorev Blvd, San Francisco, CA 09414, USA</p>
            <div className="office-actions">
              <a href="#" className="office-link">
                <ExternalLink size={16} /> See on Map
              </a>
              <a href="mailto:alisan@boxcars.com" className="office-link">
                <Mail size={16} /> alisan@boxcars.com
              </a>
              <a href="tel:+85656123456" className="office-link">
                <Phone size={16} /> +85 656 123 456
              </a>
            </div>
          </div>

          <div className="office-card">
            <h3>New York</h3>
            <p className="office-address">232–230 Wilson Ave, Brooklyn, NY 11221, USA</p>
            <div className="office-actions">
              <a href="#" className="office-link">
                <ExternalLink size={16} /> See on Map
              </a>
              <a href="mailto:aliny@boxcars.com" className="office-link">
                <Mail size={16} /> aliny@boxcars.com
              </a>
              <a href="tel:+76956123456" className="office-link">
                <Phone size={16} /> +76 956 123 456
              </a>
            </div>
          </div>

          <div className="office-card">
            <h3>London</h3>
            <p className="office-address">127-143 Borough High St, London SE1 1NP, UK</p>
            <div className="office-actions">
              <a href="#" className="office-link">
                <ExternalLink size={16} /> See on Map
              </a>
              <a href="mailto:alikd@boxcars.com" className="office-link">
                <Mail size={16} /> alikd@boxcars.com
              </a>
              <a href="tel:+76222333888" className="office-link">
                <Phone size={16} /> +76 222 333 888
              </a>
            </div>
          </div>
        </div>
      </div>

      <BoxCarFooter/>
    </div>
  );
};

export default ContactPage;
