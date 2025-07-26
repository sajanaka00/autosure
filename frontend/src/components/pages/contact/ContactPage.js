import React, { useState } from 'react';
import {
  Facebook, Twitter, Instagram, Linkedin,
  Phone, Mail, MapPin, ExternalLink
} from 'lucide-react';
import '../../../styles/contact.css'
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import { api } from '../../../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.submitContact(formData);
      
      if (response.success) {
        alert('Message sent successfully! We will get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Google Map iframe embed */}
        <div className="map-container" style={{ height: '400px', width: '100%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.6321540671!2d79.77380331342476!3d6.921831560922283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1751341947324!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
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
            <h3>Malabe</h3>
            <p className="office-address">No. 105, New Kandy Road, Malabe, Sri Lanka</p>
            <div className="office-actions">
              <a href="#" className="office-link">
                <ExternalLink size={16} /> See on Map
              </a>
              <a href="mailto:alisan@boxcars.com" className="office-link">
                <Mail size={16} /> alisan@boxcars.com
              </a>
              <a href="tel:+85656123456" className="office-link">
                <Phone size={16} /> +94 11 278 9123
              </a>
            </div>
          </div>

          <div className="office-card">
            <h3>Kottawa</h3>
            <p className="office-address">No. 20, Kottawa Road, Kottawa, Sri Lanka</p>
            <div className="office-actions">
              <a href="#" className="office-link">
                <ExternalLink size={16} /> See on Map
              </a>
              <a href="mailto:aliny@boxcars.com" className="office-link">
                <Mail size={16} /> aliny@boxcars.com
              </a>
              <a href="tel:+76956123456" className="office-link">
                <Phone size={16} /> +94 11 283 4567
              </a>
            </div>
          </div>

          <div className="office-card">
            <h3>Piliyandala</h3>
            <p className="office-address">No. 15, Piliyandala Rd, Piliyandala, Sri Lanka</p>
            <div className="office-actions">
              <a href="#" className="office-link">
                <ExternalLink size={16} /> See on Map
              </a>
              <a href="mailto:alikd@boxcars.com" className="office-link">
                <Mail size={16} /> alikd@boxcars.com
              </a>
              <a href="tel:+76222333888" className="office-link">
                <Phone size={16} /> +94 11 234 5678
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default ContactPage;