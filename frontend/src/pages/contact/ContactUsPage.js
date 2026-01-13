import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Facebook, Instagram, Linkedin, Youtube,
  Phone, Mail, MapPin, ArrowUpRight, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import './ContactUsPage.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { tokenManager } from '../../utils/tokenManager';

// Enhanced Office Data
const OFFICES = [
  {
    id: 'flagship',
    name: 'Colombo Flagship',
    type: 'Headquarters',
    address: '123 Galle Road, Colombo 03',
    email: 'flagship@autosure.lk',
    phone: '+94 11 234 5678',
    hours: 'Mon - Sun: 9AM - 8PM',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2673&auto=format&fit=crop',
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.0610301484!2d79.8450143!3d6.9186641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25941913840eb%3A0xe54f67b57b49cf52!2sGalle%20Face%20Green!5e0!3m2!1sen!2slk!4v1704876000000!5m2!1sen!2slk"
  },
  {
    id: 'kandy',
    name: 'Kandy Premium',
    type: 'Sales Center',
    address: '45 Peradeniya Road, Kandy',
    email: 'kandy@autosure.lk',
    phone: '+94 81 222 3344',
    hours: 'Mon - Sat: 9AM - 6PM',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31611.5878416801!2d80.6200!3d7.2906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy!5e0!3m2!1sen!2slk!4v1704877000000!5m2!1sen!2slk"
  },
  {
    id: 'galle',
    name: 'Galle Coastal',
    type: 'Experience Center',
    address: '88 Matara Road, Galle',
    email: 'galle@autosure.lk',
    phone: '+94 91 223 4455',
    hours: 'Tue - Sun: 10AM - 7PM',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop',
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63457.02645672044!2d80.190!3d6.032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sGalle!5e0!3m2!1sen!2slk!4v1704878000000!5m2!1sen!2slk"
  }
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' }
];

const OfficeGridItem = ({ office, onSelect, isSelected }) => (
  <motion.div
    className={`office-grid-item-v2 ${isSelected ? 'active' : ''}`}
    onClick={() => onSelect(office)}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
  >
    <div className="v2-office-image">
      <img src={office.image} alt={office.name} />
      <div className="v2-office-badge">{office.type}</div>
    </div>
    <div className="v2-office-content">
      <div className="v2-office-header">
        <h3>{office.name}</h3>
        <ArrowUpRight className="arrow-icon" size={20} />
      </div>
      <p className="v2-address">{office.address}</p>

      <div className="v2-meta-row">
        <div className="v2-meta">
          <Clock size={14} /> <span>{office.hours}</span>
        </div>
        <div className="v2-meta">
          <Phone size={14} /> <span>{office.phone}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactUsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(tokenManager.getUser());

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(OFFICES[0]);

  const handleLogout = () => {
    tokenManager.clearAll();
    setUser(null);
    navigate('/');
  };

  const handleLocationSelect = useCallback((office) => {
    setSelectedLocation(office);
    const mapSection = document.getElementById('map-view');
    if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Message sent successfully!');
    setIsSubmitting(false);
    setFormData({
      firstName: '', lastName: '', email: '', phone: '',
      subject: 'General Inquiry', message: ''
    });
  };

  return (
    <div className="contact-page-v2">
      <Navbar user={user} onLogout={handleLogout} />

      {/* 1. V2 Hero Section */}
      <section className="contact-hero-v2">
        <div className="container">
          <motion.div
            className="hero-v2-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-v2-pill">24/7 Assistance</span>
            <h1>Let's Start a <br /><span className="highlight-text">Conversation</span></h1>
            <p>From vehicle inquiries to service requests, our global team is ready to assist you on your automotive journey.</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Unified Split Card Section */}
      <section className="contact-unified-section">
        <div className="container">
          <motion.div
            className="unified-contact-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >

            {/* Left Panel: Contact Info (Dark) */}
            <div className="unified-card-left">
              <div className="left-content-stack">
                <div>
                  <h3>Contact Information</h3>
                  <p className="left-subtitle">Fill up the form and our Team will get back to you within 24 hours.</p>
                </div>

                <div className="contact-info-rows">
                  <div className="info-row">
                    <Phone className="icon" size={20} />
                    <span>+94 11 234 5678</span>
                  </div>
                  <div className="info-row">
                    <Mail className="icon" size={20} />
                    <span>hello@autosure.lk</span>
                  </div>
                  <div className="info-row">
                    <MapPin className="icon" size={20} />
                    <span>123 Galle Road, Colombo 03</span>
                  </div>
                </div>

                <div className="social-links-row">
                  {SOCIAL_LINKS.map((sl, i) => (
                    <a key={i} href={sl.href} className="social-circle">
                      <sl.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative circle overlay */}
              <div className="decorative-circle-1" />
              <div className="decorative-circle-2" />
            </div>

            {/* Right Panel: Form (Light) */}
            <div className="unified-card-right">
              <form onSubmit={handleSubmit}>
                <div className="form-grid-v2">
                  <div className="form-field-v2">
                    <label>First Name</label>
                    <input
                      type="text" name="firstName" placeholder="John"
                      value={formData.firstName} onChange={handleInputChange} required
                    />
                  </div>
                  <div className="form-field-v2">
                    <label>Last Name</label>
                    <input
                      type="text" name="lastName" placeholder="Doe"
                      value={formData.lastName} onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-grid-v2">
                  <div className="form-field-v2">
                    <label>Email</label>
                    <input
                      type="email" name="email" placeholder="john@domain.com"
                      value={formData.email} onChange={handleInputChange} required
                    />
                  </div>
                  <div className="form-field-v2">
                    <label>Phone</label>
                    <input
                      type="tel" name="phone" placeholder="+94 77 123 4567"
                      value={formData.phone} onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-field-v2 full-width">
                  <label>Subject</label>
                  <div className="select-wrapper">
                    <select
                      name="subject"
                      value={formData.subject} onChange={handleInputChange}
                    >
                      <option>General Inquiry</option>
                      <option>Sales Department</option>
                      <option>Service Center</option>
                    </select>
                  </div>
                </div>

                <div className="form-field-v2 full-width">
                  <label>Message</label>
                  <textarea
                    name="message" placeholder="Write your message.." rows="4"
                    value={formData.message} onChange={handleInputChange} required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn-v2" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 3. Locations Grid */}
      <section className="locations-v2-section">
        <div className="container">
          <div className="section-header-v2">
            <h2>Our Global Presence</h2>
            <p>Visit our showrooms for an exclusive experience.</p>
          </div>

          <div className="locations-grid-v2">
            {OFFICES.map(office => (
              <OfficeGridItem
                key={office.id}
                office={office}
                isSelected={selectedLocation.id === office.id}
                onSelect={handleLocationSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Map View (Full Width / Container) */}
      <section id="map-view" className="map-v2-section">
        <div className="container">
          <motion.div
            className="map-v2-container"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <iframe
              key={selectedLocation.id}
              src={selectedLocation.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            />
            <div className="map-overlay-card">
              <span className="live-dot"></span>
              <div>
                <strong>Viewing: {selectedLocation.name}</strong>
                <p>{selectedLocation.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
