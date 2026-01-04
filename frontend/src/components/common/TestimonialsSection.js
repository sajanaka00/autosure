import React, { useState, useEffect } from 'react';
import './TestimonialsSection.css';

import Avatar1 from '../../assets/images/avatars/avatar1.jpg'
import Avatar2 from '../../assets/images/avatars/avatar2.jpg'
import Avatar3 from '../../assets/images/avatars/avatar3.jpg'
import Avatar4 from '../../assets/images/avatars/avatar4.jpg'
import Avatar5 from '../../assets/images/avatars/avatar5.jpg'
import Avatar6 from '../../assets/images/avatars/avatar6.jpg'

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  // Create avatar mapping object
  const avatarMap = {
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6
  };

  const testimonials = [
    {
      id: 1,
      title: "Great Work",
      review: "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
      name: "Leslie Alexander",
      position: "Facebook",
      avatar: "Avatar1"
    },
    {
      id: 2,
      title: "Awesome Design",
      review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et.",
      name: "Jenny Wilson",
      position: "UI/UX Designer",
      avatar: "Avatar2"
    },
    {
      id: 3,
      title: "Perfect Quality",
      review: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.",
      name: "Courtney Henry",
      position: "Software Developer",
      avatar: "Avatar3"
    },
    {
      id: 4,
      title: "Excellent Service",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      name: "Robert Fox",
      position: "Product Manager",
      avatar: "Avatar4"
    },
    {
      id: 5,
      title: "Outstanding Work",
      review: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      name: "Esther Howard",
      position: "Marketing Director",
      avatar: "Avatar5"
    },
    {
      id: 6,
      title: "Amazing Results",
      review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
      name: "Devon Lane",
      position: "CEO & Founder",
      avatar: "Avatar6"
    }
  ];

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Initialize visible cards on mount
  useEffect(() => {
    const currentTestimonials = testimonials.slice(currentIndex, currentIndex + testimonialsPerPage);
    setVisibleCards(currentTestimonials);

    // Trigger stagger animation for initial load
    setTimeout(() => {
      const cards = document.querySelectorAll('.testimonial-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 200);
      });
    }, 100);
  }, []);

  const handleNavigation = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Fade out current cards
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-out');
      }, index * 100);
    });

    setTimeout(() => {
      let newIndex;
      if (direction === 'prev') {
        newIndex = Math.max(0, currentIndex - testimonialsPerPage);
      } else {
        newIndex = Math.min((totalPages - 1) * testimonialsPerPage, currentIndex + testimonialsPerPage);
      }

      setCurrentIndex(newIndex);
      const newTestimonials = testimonials.slice(newIndex, newIndex + testimonialsPerPage);
      setVisibleCards(newTestimonials);

      // Fade in new cards with stagger
      setTimeout(() => {
        const newCards = document.querySelectorAll('.testimonial-card');
        newCards.forEach((card, index) => {
          card.classList.remove('fade-out');
          setTimeout(() => {
            card.classList.add('animate-in');
          }, index * 150);
        });
        setIsAnimating(false);
      }, 100);
    }, 500);
  };

  const handlePrev = () => handleNavigation('prev');
  const handleNext = () => handleNavigation('next');

  return (
    <div className="testimonials-section animate-section">
      <div className="testimonials-header animate-header">
        <h2 className="testimonials-title slide-in-left">What our customers say</h2>
        <div className="testimonials-rating slide-in-right">
          Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews
        </div>
      </div>

      <div className="testimonials-container">
        <div className="testimonials-grid">
          {visibleCards.map((testimonial, index) => (
            <div key={`${testimonial.id}-${currentIndex}`} className="testimonial-card" data-index={index}>
              <div className="card-header">
                <h3 className="card-title">{testimonial.title}</h3>
                <div className="quote-icon pulse-icon">
                  <svg width="37" height="26" viewBox="0 0 37 26" fill="none">
                    <path d="M8.5 16.5C8.5 20.5 5.5 23.5 1.5 23.5V26H16V16.5C16 12.5 13 9.5 9 9.5H8.5V0H0V9.5C4 9.5 8.5 12.5 8.5 16.5ZM29.5 16.5C29.5 20.5 26.5 23.5 22.5 23.5V26H37V16.5C37 12.5 34 9.5 30 9.5H29.5V0H21V9.5C25 9.5 29.5 12.5 29.5 16.5Z" fill="#405FF2" />
                  </svg>
                </div>
              </div>
              <p className="card-review typewriter">"{testimonial.review}"</p>
              <div className="card-author">
                <img
                  className="author-avatar float-avatar"
                  src={avatarMap[testimonial.avatar]}
                  alt={testimonial.name}
                />
                <div className="testimonial-author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-position">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-navigation slide-in-up">
          <button
            className={`nav-btn prev-btn ${currentIndex === 0 ? 'disabled' : ''} ${isAnimating ? 'animating' : ''}`}
            onClick={handlePrev}
            disabled={currentIndex === 0 || isAnimating}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 3L4.5 6L7.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={`nav-btn next-btn ${currentIndex >= (totalPages - 1) * testimonialsPerPage ? 'disabled' : ''} ${isAnimating ? 'animating' : ''}`}
            onClick={handleNext}
            disabled={currentIndex >= (totalPages - 1) * testimonialsPerPage || isAnimating}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;