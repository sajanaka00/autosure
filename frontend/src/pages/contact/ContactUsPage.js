import React, { useState, useCallback, useMemo } from 'react';
import {
  Facebook, Twitter, Instagram, Linkedin,
  Phone, Mail, MapPin, ExternalLink
} from 'lucide-react';
import './ContactUsPage.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { api } from '../../services/api';

// Form field configuration - moved outside component to prevent re-creation on each render
const FORM_FIELDS = {
  firstName: { label: 'First Name*', placeholder: 'John', required: true },
  lastName: { label: 'Last Name*', placeholder: 'Smith', required: true },
  email: { label: 'Email*', placeholder: 'john.smith@email.com', required: true, type: 'email' },
  phone: { label: 'Phone', placeholder: '+1 (555) 123-4567', type: 'tel' },
  message: { label: 'Message', placeholder: 'Tell us about the vehicle you\'re interested in or any questions you have...', type: 'textarea' }
};

// Contact information displayed in the sidebar
const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Main Dealership',
    content: '2456 Grand Avenue, Downtown Metro City, CA 90210, United States'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'sales@premiumautodealer.com'
  },
  {
    icon: Phone,
    title: 'Sales Hotline',
    content: '+1 (555) CAR-SALE'
  }
];

// Social media links for the dealership
const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/premiumautodealer', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/premiumautodealer', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/premiumautodealer', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/premiumautodealer', label: 'LinkedIn' }
];

// Office locations with their respective map embed URLs
const OFFICES = [
  {
    id: 'downtown',
    name: 'Downtown Showroom',
    address: '2456 Grand Avenue, Downtown Metro City, CA 90210',
    email: 'downtown@premiumautodealer.com',
    phone: '+1 (555) 123-4567',
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.5362!2d-118.2436849!3d34.052234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sDowntown%20Los%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
  },
  {
    id: 'westside',
    name: 'Westside Location',
    address: '789 Pacific Boulevard, Westside District, CA 90211',
    email: 'westside@premiumautodealer.com',
    phone: '+1 (555) 234-5678',
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.2!2d-118.4912!3d34.0194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2a4cec3ed2bd7%3A0x7b3c9c5e4a8d6f2a!2sSanta%20Monica%2C%20CA!5e0!3m2!1sen!2sus!4v1640995300000!5m2!1sen!2sus"
  },
  {
    id: 'northgate',
    name: 'Northgate Service Center',
    address: '1024 Industrial Drive, Northgate Business Park, CA 90212',
    email: 'service@premiumautodealer.com',
    phone: '+1 (555) 345-6789',
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.1!2d-118.2687!3d34.1422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c632a8765431%3A0x9e4f7d8c2b1a5e6f!2sGlendale%2C%20CA!5e0!3m2!1sen!2sus!4v1640995400000!5m2!1sen!2sus"
  }
];

// Reusable component for displaying contact information items
const ContactItem = React.memo(({ icon: Icon, title, content }) => (
  <div className="contact-item">
    <div className="contact-icon">
      <Icon size={20} />
    </div>
    <div className="contact-text">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  </div>
));

// Reusable component for social media links
const SocialLink = React.memo(({ icon: Icon, href, label }) => (
  <a href={href} className="social-link" aria-label={label}>
    <Icon size={20} />
  </a>
));

// Office location card component with interactive map functionality
const OfficeCard = React.memo(({ office, onLocationSelect }) => (
  <div className="office-card">
    <h3>{office.name}</h3>
    <p className="office-address">{office.address}</p>
    <div className="office-actions">
      {/* Button to select location and update map */}
      <button
        onClick={() => onLocationSelect(office)}
        className="office-link"
        aria-label={`See ${office.name} on map`}
      >
        <ExternalLink size={16} /> See on Map
      </button>
      <a href={`mailto:${office.email}`} className="office-link">
        <Mail size={16} /> {office.email}
      </a>
      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="office-link">
        <Phone size={16} /> {office.phone}
      </a>
    </div>
  </div>
));

// Dynamic form field component that renders different input types
const FormField = React.memo(({ field, value, onChange, name }) => {
  if (field.type === 'textarea') {
    return (
      <div className="form-group">
        <label htmlFor={name}>{field.label}</label>
        <textarea
          id={name}
          name={name}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          required={field.required}
        />
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{field.label}</label>
      <input
        id={name}
        type={field.type || 'text'}
        name={name}
        placeholder={field.placeholder}
        value={value}
        onChange={onChange}
        required={field.required}
      />
    </div>
  );
});

const ContactUsPage = () => {
  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track currently selected location for map display - defaults to first office
  const [selectedLocation, setSelectedLocation] = useState(OFFICES[0]);

  // Form validation check
  const isFormValid = formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.message;

  // Handle location selection and smooth scroll to map
  const handleLocationSelect = useCallback((office) => {
    console.log('Location selected:', office.name);
    setSelectedLocation(office);

    // Smooth scroll to map section when location is selected
    const mapContainer = document.querySelector('.contact-hero');
    if (mapContainer) {
      mapContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, []);

  // Handle form input changes with useCallback for performance optimization
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle form submission with error handling and fallbacks
  const handleSubmit = async () => {
    // Client-side validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.submitContact(formData);

      if (response.success) {
        alert('Thank you for your inquiry! One of our sales representatives will contact you within 24 hours.');
        // Reset form on successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again or call us directly.');
      }
    } catch (error) {
      console.error('Error:', error);

      // Fallback for development when API endpoint is not available
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        console.log('Contact form data (backend endpoint not available):', formData);
        alert('Thank you for your inquiry! One of our sales representatives will contact you within 24 hours.');
        // Reset form even on fallback
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again or call us directly at +1 (555) CAR-SALE.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized form fields to prevent unnecessary re-renders
  const formFields = useMemo(() =>
    Object.entries(FORM_FIELDS).map(([name, field]) => (
      <FormField
        key={name}
        field={field}
        value={formData[name]}
        onChange={handleInputChange}
        name={name}
      />
    )), [formData, handleInputChange]
  );

  // Split form fields into rows for responsive layout
  const [firstRow, secondRow, ...remainingFields] = formFields;

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero Section with Interactive Map */}
      <section className="contact-hero">
        <h1 className="contact-title">Contact Us</h1>
        <div className="map-container" style={{ height: '400px', width: '100%' }}>
          {/* Dynamic map that updates based on selected location */}
          <iframe
            src={selectedLocation.mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${selectedLocation.name} Location Map`}
          />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Ready to Find Your Perfect Vehicle?</h2>
          <p className="form-description">
            Whether you're looking for a new car, need financing information, or want to schedule a test drive,
            our experienced team is here to help. Fill out the form below and we'll get back to you promptly.
          </p>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            {/* First row: First Name and Last Name */}
            <div className="form-row">
              {firstRow}
              {secondRow}
            </div>
            {/* Second row: Email and Phone */}
            <div className="form-row">
              {remainingFields.slice(0, 2)}
            </div>
            {/* Message field (full width) */}
            {remainingFields.slice(2)}

            <button
              type="button"
              onClick={handleSubmit}
              className="send-btn"
              disabled={isSubmitting}
              aria-describedby="submit-status"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Information Sidebar */}
        <aside className="contact-details">
          <h3>Visit Our Showroom</h3>
          <p className="contact-details-description">
            Stop by our state-of-the-art showroom to browse our extensive inventory,
            speak with our knowledgeable sales team, and take a test drive. We're open
            7 days a week to serve you better.
          </p>

          {/* Contact Information Items */}
          <div className="contact-info">
            {CONTACT_INFO.map((item, index) => (
              <ContactItem key={index} {...item} />
            ))}
          </div>

          {/* Social Media Links */}
          <div className="social-section">
            <h4>Follow us for the latest deals</h4>
            <div className="social-links">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} />
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Office Locations Section */}
      <section className="offices-section">
        <h2 className="offices-title">Our Locations</h2>
        <div className="offices-grid">
          {/* Render office cards with interactive map functionality */}
          {OFFICES.map(office => (
            <OfficeCard
              key={office.id}
              office={office}
              onLocationSelect={handleLocationSelect}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;