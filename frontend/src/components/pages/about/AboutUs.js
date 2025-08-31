import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import AboutGrid1 from '../../../assets/images/cars/car-about1.jpeg'
import AboutGrid2 from '../../../assets/images/cars/car-about2.jpg'
import AboutGrid3 from '../../../assets/images/cars/car-about3.jpg'
import AboutGrid4 from '../../../assets/images/cars/car-about4.jpeg'
import AboutGrid5 from '../../../assets/images/cars/car-about5.jpeg'
import ChooseUs1 from '../../../assets/images/vectors/choose-us1.png'
import ChooseUs2 from '../../../assets/images/vectors/choose-us2.png'
import ChooseUs3 from '../../../assets/images/vectors/choose-us3.png'
import ChooseUs4 from '../../../assets/images/vectors/choose-us4.png'
import FairPrice from '../../../assets/images/about/fair-price.jpg'
import PlayBtn from '../../../assets/images/vectors/play-btn.png'
import Team1 from '../../../assets/images/about/team1.png'
import Team2 from '../../../assets/images/about/team2.png'
import Team3 from '../../../assets/images/about/team3.png'
import Team4 from '../../../assets/images/about/team4.png'
import Customer1 from '../../../assets/images/avatars/avatar1.jpg'
import Customer2 from '../../../assets/images/avatars/avatar2.jpg'
import Customer3 from '../../../assets/images/avatars/avatar3.jpg'
import Customer4 from '../../../assets/images/avatars/avatar4.jpg'
import Customer5 from '../../../assets/images/avatars/avatar5.jpg'
import BrandsSection from './BrandsSection'
import '../../../styles/about-us.css';

const BoxCarsAbout = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Does BoxCar own the cars I see online or are they owned by others?",
      answer: "Our cars on our site have been hand-picked by dealers nationwide based in up to wide taste of shopper. Wherever respective retailers list on our store. Together, all managed and sold."
    },
    {
      question: "How do you choose the cars that you sell?",
      answer: "We carefully select vehicles based on quality, reliability, and customer demand to ensure the best options for our customers."
    },
    {
      question: "Can I see my favorite cars a lot list I can view now?",
      answer: "Yes, you can save your favorite vehicles to your wishlist and view them anytime from your account dashboard."
    },
    {
      question: "Can I be notified when you take a new car shipment or inventory?",
      answer: "Absolutely! You can subscribe to our notifications to get alerts about new inventory and special offers."
    },
    {
      question: "What stock do you have in the lot and can I put my car on budget?",
      answer: "Our inventory changes regularly. You can browse our current stock online and we offer flexible financing options to fit your budget."
    }
  ];

  return (
    <div className="about-page-container">
      <Navbar />

      {/* About Us Section */}
      <section className="about-us-hero-section">
        <div className="about-page-container-inner">
          <h1 className="about-page-main-title">About Us</h1>
          
          <div className="about-us-content-wrapper">
            <div className="about-us-text-content">
              <h2>We value our clients and want them to have a nice experience</h2>
              <p>
                At our dealership, we understand that buying a car is one of life's most important decisions. 
                That's why we're committed to making your vehicle shopping experience as smooth and enjoyable as 
                possible. Our knowledgeable team takes the time to listen to your needs, whether you're looking 
                for a reliable family sedan, an efficient commuter car, or a powerful truck for work. We believe 
                every customer deserves honest advice and transparent pricing from the moment you step onto our lot.
              </p>
              <p>
                With over two decades of experience in the automotive industry, we've built our reputation on 
                trust and quality service. Every vehicle in our inventory undergoes a comprehensive inspection 
                to ensure it meets our high standards before we offer it to our customers. We work with trusted 
                financing partners to help you secure competitive rates, and our service department is staffed 
                with certified technicians who use genuine parts. From your first visit through years of ownership, 
                we're here to support you with maintenance, repairs, and any questions you might have.
              </p>
              <p>
                Our goal is simple: to help you find the perfect vehicle that fits your lifestyle and budget while 
                providing exceptional service that keeps you coming back. We're proud to be your neighborhood dealership.
              </p>
            </div>
            
            <div className="about-us-images-section">
              <div className="about-us-images-grid">
                {/* Column 1: years badge + one image below */}
                <div className="about-us-grid-column-1">
                  <div className="about-us-years-badge">
                    <span className="about-us-years-number">45</span>
                    <span className="about-us-years-text">Years in Business</span>
                  </div>
                  <img 
                    src={AboutGrid1} 
                    alt="Luxury car interior"
                    className="about-us-grid-image-2"
                  />
                </div>

                {/* Column 2 */}
                <div className="about-us-grid-column-2">
                  <img 
                    src={AboutGrid2} 
                    alt="Professional car salesman"
                    className="about-us-grid-image-3"
                  />
                </div>

                {/* Column 3 */}
                <div className="about-us-grid-column-3">
                  <img 
                    src={AboutGrid3} 
                    alt="Car showroom interior"
                    className="about-us-grid-image-4"
                  />
                  <div className="about-us-bottom-images">
                    <img 
                      src={AboutGrid4} 
                      alt="Car details"
                      className="about-us-grid-image-5"
                    />
                    <img 
                      src={AboutGrid5} 
                      alt="Car handover"
                      className="about-us-grid-image-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-page-features-section">
        <div className="about-page-container-inner">
          <h2 className="about-page-section-title">Why Choose Us?</h2>
          
          <div className="about-page-features-grid">
            <div className="about-page-feature-item">
              <div className="about-page-feature-icon">
                <img src={ChooseUs1} alt="Special Financing Offers" />
              </div>
              <h3>Special Financing Offers</h3>
              <p>Flexible financing options with competitive rates & customized payment plans to fit your budget and needs.</p>
            </div>

            <div className="about-page-feature-item">
              <div className="about-page-feature-icon">
                <img src={ChooseUs2} alt="Trusted Car Dealership" />
              </div>
              <h3>Trusted Car Dealership</h3>
              <p>Years of experience & thousands of satisfied customers who trust us for honest dealings and reliable service.</p>
            </div>

            <div className="about-page-feature-item">
              <div className="about-page-feature-icon">
                <img src={ChooseUs3} alt="Transparent Pricing" />
              </div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees or surprise charges. Clear, upfront pricing with detailed breakdowns so you know exactly what you're paying.</p>
            </div>

            <div className="about-page-feature-item">
              <div className="about-page-feature-icon">
                <img src={ChooseUs4} alt="Expert Car Service" />
              </div>
              <h3>Expert Car Service</h3>
              <p>Certified technicians providing comprehensive maintenance and repair services to keep your vehicle running smoothly.</p>
            </div>
          </div>
        </div>
      </section>  

      {/* Get Fair Price Section */}
      <section className="about-page-pricing-section">
        <div className="about-page-container-inner">
          <div className="about-page-pricing-content">
            <div className="about-page-pricing-image">
              <img 
                src={FairPrice} 
                alt="Luxury car on mountain road"
              />
              <div className="about-page-play-button">
                <img src={PlayBtn} alt="Play Button" />
              </div>
            </div>
            
            <div className="about-page-pricing-text">
              <h2>Get A Fair Price For Your Car Sell To Us Today</h2>
              <p>
                We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of vehicles to choose from.
              </p>
              
              <ul className="about-page-benefits-list">
                <li>We are the UK's largest provider, with more patrols in more places</li>
                <li>You get 24/7 roadside assistance</li>
                <li>We fix 4 out of 5 cars at the roadside</li>
              </ul>
              
              <button className="about-page-cta-button">Get Started</button>
            </div>
          </div>
          
          <div className="about-page-stats-section">
            <div className="about-page-stat-item">
              <h3>89M</h3>
              <p>Cars for Sale</p>
            </div>
            <div className="about-page-stat-item">
              <h3>740M</h3>
              <p>Dealer Reviews</p>
            </div>
            <div className="about-page-stat-item">
              <h3>95M</h3>
              <p>Visitors Per Day</p>
            </div>
            <div className="about-page-stat-item">
              <h3>225M</h3>
              <p>Verified Dealers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Premium Brands Section */}
      <BrandsSection />

      {/* Our Team Section */}
      <section className="about-page-team-section">
        <div className="about-page-container-inner">
          <div className="about-page-team-header">
            <h2>Our Team</h2>
            <a href="#" className="about-page-view-all-link">View All</a>
          </div>
          
          <div className="about-page-team-grid">
            <div className="about-page-team-member">
              <img 
                src={Team1} 
                alt="Courtney Henry"
              />
              <div className="about-page-team-member-info">
                <h3>Courtney Henry</h3>
                <p>Development Manager</p>
              </div>
            </div>
            
            <div className="about-page-team-member">
              <img 
                src={Team2} 
                alt="Jerome Bell"
              />
              <div className="about-page-team-member-info">
                <h3>Jerome Bell</h3>
                <p>Software Tester</p>
              </div>
            </div>
            
            <div className="about-page-team-member">
              <img 
                src={Team3} 
                alt="Arlene McCoy"
              />
              <div className="about-page-team-member-info">
                <h3>Arlene McCoy</h3>
                <p>Software Developer</p>
              </div>
            </div>
            
            <div className="about-page-team-member">
              <img 
                src={Team4} 
                alt="Jenny Wilson"
              />
              <div className="about-page-team-member-info">
                <h3>Jenny Wilson</h3>
                <p>UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="about-page-testimonials-section">
        <div className="about-page-container-inner">
          <div className="about-page-testimonials-heading">
            <h2>What our customers say</h2>
            <p className="about-page-testimonials-subtitle">
              Rated 4.8 / 5 based on 3,247 reviews Showing our 4 & 5 star reviews
            </p>
          </div>

          <div className="about-page-testimonials-grid">
            <div className="about-page-testimonial-item">
              <h4>Outstanding Service</h4>
              <p>"The team here made buying my first car such an easy experience. They were patient, answered all my questions, and helped me find the perfect vehicle within my budget. No pressure tactics, just genuine care for their customers."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer1} 
                  alt="Ralph Edwards"
                />
                <div>
                  <strong>Ralph Edwards</strong>
                  <span>Honda Civic Owner</span>
                </div>
              </div>
            </div>
            
            <div className="about-page-testimonial-item">
              <h4>Trustworthy Dealership</h4>
              <p>"After visiting several dealerships, this place stood out for their honesty and transparency. They showed me the full vehicle history, explained every detail, and their financing options were the best I found anywhere."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer2} 
                  alt="Jenna Watson"
                />
                <div>
                  <strong>Jenna Watson</strong>
                  <span>Toyota Camry Owner</span>
                </div>
              </div>
            </div>

            <div className="about-page-testimonial-item">
              <h4>Excellent Experience</h4>
              <p>"From test drive to paperwork, everything was handled professionally. The car was in perfect condition as promised, and they even threw in some extras. I'll definitely be coming back for my next purchase."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer3} 
                  alt="Michael Johnson"
                />
                <div>
                  <strong>Michael Johnson</strong>
                  <span>Ford F-150 Owner</span>
                </div>
              </div>
            </div>

            <div className="about-page-testimonial-item">
              <h4>Top-Notch Service</h4>
              <p>"Their service department is amazing! Quick, efficient, and they always explain what needs to be done. Fair pricing and they never try to sell you services you don't need. Highly recommend this dealership."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer4} 
                  alt="Sarah Wilson"
                />
                <div>
                  <strong>Sarah Wilson</strong>
                  <span>Subaru Outback Owner</span>
                </div>
              </div>
            </div>
            
            <div className="about-page-testimonial-item">
              <h4>Perfect Experience</h4>
              <p>"Bought my dream car here and couldn't be happier! The sales team was knowledgeable, the process was smooth, and they made sure I understood all the features. Great selection and competitive prices too."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer5} 
                  alt="Courtney Henry"
                />
                <div>
                  <strong>Courtney Henry</strong>
                  <span>Mazda CX-5 Owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about-page-faq-section">
        <div className="about-page-container-inner">
          <h2>Frequently Asked Questions</h2>
          
          <div className="about-page-faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className={`about-page-faq-item ${openFaq === index ? 'active' : ''}`}>
                <button 
                  className="about-page-faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="about-page-faq-toggle">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="about-page-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BoxCarsAbout;