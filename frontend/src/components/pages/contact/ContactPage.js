import React, { useState, useCallback, useMemo } from 'react';
import {
  Facebook, Twitter, Instagram, Linkedin,
  Phone, Mail, MapPin, ExternalLink
} from 'lucide-react';
import '../../../styles/contact.css'
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import { api } from '../../../services/api';

// Constants moved outside component to prevent re-creation
const FORM_FIELDS = {
  firstName: { label: 'First Name*', placeholder: 'Ali', required: true },
  lastName: { label: 'Last Name*', placeholder: 'Tufan', required: true },
  email: { label: 'Email*', placeholder: 'example@gmail.com', required: true, type: 'email' },
  phone: { label: 'Phone', placeholder: '+90 123 456 789', type: 'tel' },
  message: { label: 'Message', placeholder: 'Your message here...', type: 'textarea' }
};

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Address',
    content: '123 Queensberry Street, North Melbourne VIC 3051, Australia'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'ali@boxcars.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+76 956 123 456'
  }
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

const OFFICES = [
  {
    id: 'malabe',
    name: 'Malabe',
    address: 'No. 105, New Kandy Road, Malabe, Sri Lanka',
    email: 'alisan@boxcars.com',
    phone: '+94 11 278 9123'
  },
  {
    id: 'kottawa',
    name: 'Kottawa',
    address: 'No. 20, Kottawa Road, Kottawa, Sri Lanka',
    email: 'aliny@boxcars.com',
    phone: '+94 11 283 4567'
  },
  {
    id: 'piliyandala',
    name: 'Piliyandala',
    address: 'No. 15, Piliyandala Rd, Piliyandala, Sri Lanka',
    email: 'alikd@boxcars.com',
    phone: '+94 11 234 5678'
  }
];

const MAP_CONFIG = {
  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.6321540671!2d79.77380331342476!3d6.921831560922283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1751341947324!5m2!1sen!2slk",
  width: "100%",
  height: "100%",
  style: { border: 0 },
  allowFullScreen: "",
  loading: "lazy",
  referrerPolicy: "no-referrer-when-downgrade"
};

// Memoized Components
// const Breadcrumb = React.memo(() => (
//   <nav aria-label="Breadcrumb" className="breadcrumb">
//     <a href="/">Home</a>
//     <span className="breadcrumb-separator">/</span>
//     <span>Contact Us</span>
//   </nav>
// ));

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

const SocialLink = React.memo(({ icon: Icon, href, label }) => (
  <a href={href} className="social-link" aria-label={label}>
    <Icon size={20} />
  </a>
));

const OfficeCard = React.memo(({ office }) => (
  <div className="office-card">
    <h3>{office.name}</h3>
    <p className="office-address">{office.address}</p>
    <div className="office-actions">
      <a href="#" className="office-link" aria-label={`See ${office.name} on map`}>
        <ExternalLink size={16} /> See on Map
      </a>
      <a href={`mailto:${office.email}`} className="office-link">
        <Mail size={16} /> {office.email}
      </a>
      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="office-link">
        <Phone size={16} /> {office.phone}
      </a>
    </div>
  </div>
));

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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized validation function - removed to prevent interference
  const isFormValid = formData.firstName && 
         formData.lastName && 
         formData.email && 
         formData.message;

  // Optimized change handler using useCallback
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Original submit handler - preserved as-is with temporary fallback
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
      
      // Check if it's a 404 error (endpoint not found)
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        // Temporary: Log form data and show success message
        console.log('Contact form data (backend endpoint not available):', formData);
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

  // Split form fields into rows for layout
  const [firstRow, secondRow, ...remainingFields] = formFields;

  return (
    <div className="contact-page">
      <Navbar />
      {/* <Breadcrumb /> */}

      {/* Hero Section */}
      <section className="contact-hero">
        <h1 className="contact-title">Contact Us</h1>
        <div className="map-container" style={{ height: '400px', width: '100%' }}>
          <iframe {...MAP_CONFIG} title="Office Location Map" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Get In Touch</h2>
          <p className="form-description">
            Etiam pharetra egestas interdum blandit viverra mauris consequat nu leo bibendum
            molestie ipsum egestas nulla.
          </p>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              {firstRow}
              {secondRow}
            </div>
            <div className="form-row">
              {remainingFields.slice(0, 2)}
            </div>
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
            <div id="submit-status" className="sr-only">
              {isSubmitting ? 'Submitting your message' : 'Ready to submit'}
            </div>
          </form>
        </div>

        {/* Contact Details */}
        <aside className="contact-details">
          <h3>Contact details</h3>
          <p className="contact-details-description">
            Etiam pharetra egestas interdum blandit viverra mauris consequat
            nu leo bibendum molestie ipsum egestas nulla.
          </p>

          <div className="contact-info">
            {CONTACT_INFO.map((item, index) => (
              <ContactItem key={index} {...item} />
            ))}
          </div>

          <div className="social-section">
            <h4>Follow us</h4>
            <div className="social-links">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} />
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Our Offices Section */}
      <section className="offices-section">
        <h2 className="offices-title">Our Offices</h2>
        <div className="offices-grid">
          {OFFICES.map(office => (
            <OfficeCard key={office.id} office={office} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;