import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../../styles/brands-section.css';

const ModernBrandsSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const brands = [
    { name: "Audi", logo: "https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png" },
    { name: "BMW", logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png" },
    { name: "Ford", logo: "https://logos-world.net/wp-content/uploads/2021/05/Ford-Logo.png" },
    { name: "Mercedes", logo: "https://logos-world.net/wp-content/uploads/2020/05/Mercedes-Benz-Logo.png" },
    { name: "Peugeot", logo: "https://logos-world.net/wp-content/uploads/2021/10/Peugeot-Logo.png" },
    { name: "Volkswagen", logo: "https://logos-world.net/wp-content/uploads/2021/04/Volkswagen-Logo.png" },
    { name: "Tesla", logo: "https://logos-world.net/wp-content/uploads/2020/10/Tesla-Logo.png" },
    { name: "Porsche", logo: "https://logos-world.net/wp-content/uploads/2021/06/Porsche-Logo.png" },
    { name: "Jaguar", logo: "https://logos-world.net/wp-content/uploads/2021/04/Jaguar-Logo.png" },
    { name: "Lexus", logo: "https://logos-world.net/wp-content/uploads/2021/10/Lexus-Logo.png" }
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const targetScroll = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, []);

  return (
    <section className="modern-brands-section">
      <div className="brands-container">
        {/* Header */}
        <div className="brands-header">
          <h2 className="brands-title">Explore Our Premium Brands</h2>
          <a href="#" className="view-all-link">
            View All Brands
            <span className="arrow">→</span>
          </a>
        </div>
        
        {/* Scrollable Content */}
        <div className="brands-scroll-wrapper">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`scroll-btn scroll-btn-left ${!canScrollLeft ? 'disabled' : ''}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`scroll-btn scroll-btn-right ${!canScrollRight ? 'disabled' : ''}`}
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Brands Grid */}
          <div 
            ref={scrollContainerRef}
            className="brands-scroll-container"
          >
            {brands.map((brand, index) => (
              <BrandCard key={index} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BrandCard = ({ brand }) => {
  return (
    <div className="brand-card">
      <div className="brand-card-shine" />
      
      <div className="brand-logo-container">
        <img 
          src={brand.logo} 
          alt={`${brand.name} logo`}
          className="brand-logo"
        />
      </div>
      
      <h3 className="brand-name">{brand.name}</h3>
    </div>
  );
};

export default ModernBrandsSection;