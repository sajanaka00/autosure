import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Search,
  ArrowRight,
  Zap,
  Shield,
  Star,
  MessageCircle,
  Car,
  Award,
  TrendingUp
} from 'lucide-react';
import backgroundImage from '../../assets/images/cars/bmw6.jpg';
import ExploreAllVehicles from '../listings/ExploreAllVehicles';
import Footer from '../../components/layout/Footer';
import TestimonialsSection from '../../components/common/TestimonialsSection';
import GetFairPrice from '../../components/common/GetFairPrice';
import WhyChooseUs from '../../components/common/WhyChooseUs';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    make: 'Any Make',
    model: 'Any Model',
    price: 'All Prices'
  });

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoadingMakes, setIsLoadingMakes] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  const priceRanges = [
    'All Prices',
    '$0 - $20,000',
    '$20,000 - $40,000',
    '$40,000 - $60,000',
    '$60,000 - $80,000',
    '$80,000 - $100,000',
    '$100,000+'
  ];

  // Fetch Makes on mount
  useEffect(() => {
    const fetchMakes = async () => {
      setIsLoadingMakes(true);
      try {
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/passenger%20car?format=json');
        const data = await response.json();
        // Take top 50 popular makes for better performance/UI
        const popularMakes = data.Results.slice(0, 50).map(m => m.MakeName).sort();
        setMakes(['Any Make', ...popularMakes]);
      } catch (error) {
        console.error('Error fetching makes:', error);
        setMakes(['Any Make', 'Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford']); // Fallback
      } finally {
        setIsLoadingMakes(false);
      }
    };
    fetchMakes();
  }, []);

  // Fetch Models when make changes
  useEffect(() => {
    const fetchModels = async () => {
      if (filters.make === 'Any Make') {
        setModels(['Any Model']);
        setFilters(prev => ({ ...prev, model: 'Any Model' }));
        return;
      }

      setIsLoadingModels(true);
      try {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${filters.make}?format=json`);
        const data = await response.json();
        const modelNames = data.Results.map(m => m.Model_Name).sort();
        setModels(['Any Model', ...modelNames]);
      } catch (error) {
        console.error('Error fetching models:', error);
        setModels(['Any Model']);
      } finally {
        setIsLoadingModels(false);
      }
    };
    fetchModels();
  }, [filters.make]);

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSearch = () => {
    navigate(`/vehicles?make=${filters.make}&model=${filters.model}`);
  };

  const vehicleCategories = [
    { name: 'SUVs', icon: <Car />, count: '120+', desc: 'Spacious & Powerful' },
    { name: 'Sedans', icon: <Award />, count: '85+', desc: 'Elegant & Comfortable' },
    { name: 'Electric', icon: <Zap />, count: '40+', desc: 'Future Ready' },
    { name: 'Sports', icon: <TrendingUp />, count: '25+', desc: 'High Performance' },
    { name: 'Luxury', icon: <Star />, count: '15+', desc: 'Premium Experience' },
  ];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <div className="h-hero">
        {/* Dynamic Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) saturate(1.1)',
          transform: 'scale(1.05)',
          zIndex: 0
        }} />

        <div className="h-hero-content">
          <div className="h-hero-eyebrow">
            Autosure Premium
          </div>

          <h1 className="h-hero-title">
            Driving the <br />
            <span>Extraordinary.</span>
          </h1>

          <p className="h-hero-desc">
            Discover a curated collection of the world's finest automobiles.
            Experience transparent pricing, instant booking, and premium service.
          </p>

          {/* SEARCH COMPONENT */}
          <div className="h-search-container">
            <div className="h-search-row">
              {['Make', 'Model', 'Price'].map((label, idx) => (
                <React.Fragment key={label}>
                  <div className="h-dropdown-group">
                    <button
                      className="h-dropdown-btn"
                      onClick={() => setActiveDropdown(activeDropdown === label ? null : label)}
                    >
                      <span>{filters[label.toLowerCase()] || `Any ${label}`}</span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === label ? 'rotate-180' : ''}`} />
                    </button>

                    {activeDropdown === label && (
                      <div className="h-dropdown-menu">
                        {label === 'Make' && (
                          isLoadingMakes ? <div className="h-dropdown-item">Loading...</div> :
                            makes.map((m) => (
                              <div
                                key={m}
                                className="h-dropdown-item"
                                onClick={() => {
                                  setFilters({ ...filters, make: m, model: 'Any Model' });
                                  setActiveDropdown(null);
                                }}
                              >
                                {m}
                              </div>
                            ))
                        )}

                        {label === 'Model' && (
                          isLoadingModels ? <div className="h-dropdown-item">Loading...</div> :
                            models.length <= 1 && filters.make !== 'Any Make' ? <div className="h-dropdown-item">No models found</div> :
                              models.length <= 1 && filters.make === 'Any Make' ? <div className="h-dropdown-item">Select a Make first</div> :
                                models.map((m) => (
                                  <div
                                    key={m}
                                    className="h-dropdown-item"
                                    onClick={() => {
                                      setFilters({ ...filters, model: m });
                                      setActiveDropdown(null);
                                    }}
                                  >
                                    {m}
                                  </div>
                                ))
                        )}

                        {label === 'Price' && (
                          priceRanges.map((p) => (
                            <div
                              key={p}
                              className="h-dropdown-item"
                              onClick={() => {
                                setFilters({ ...filters, price: p });
                                setActiveDropdown(null);
                              }}
                            >
                              {p}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  {idx < 2 && <div className="h-search-divider" />}
                </React.Fragment>
              ))}

              <button className="h-search-action-btn" onClick={handleSearch}>
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <section className="h-section bg-dark-alt">
        <div className="h-container">
          <div className="h-section-header reveal-on-scroll">
            <span className="h-section-label">Browse by Type</span>
            <h2 className="h-section-title">Find Your Perfect Match</h2>
          </div>

          <div className="h-cat-grid reveal-on-scroll">
            {vehicleCategories.map((cat, i) => (
              <div key={i} className={`h-cat-card stagger-${(i % 4) + 1}`}>
                <div className="h-cat-icon">
                  {cat.icon}
                </div>
                <div className="h-cat-info">
                  <h3>{cat.name}</h3>
                  <p>{cat.count} Vehicles</p>
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#60a5fa' }}>{cat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE ALL VEHICLES */}
      <section className="h-section">
        <div className="h-container">
          <ExploreAllVehicles theme="dark" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      {/* <section className="h-section reveal-on-scroll">
        <div className="h-container">
          <WhyChooseUs />
        </div>
      </section> */}

      {/* GET FAIR PRICE */}
      <section className="h-section reveal-on-scroll">
        <div className="h-container">
          <GetFairPrice />
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="h-section reveal-on-scroll">
        <div className="h-container">
          <TestimonialsSection />
        </div>
      </section> */}

      <Footer />

      {/* FAB */}
      <div className="h-fab" title="Chat with Us">
        <MessageCircle size={28} />
      </div>
    </div>
  );
}