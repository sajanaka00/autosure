import React, { useState } from 'react';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
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
    <div className="boxcars-container">
      <Navbar />
      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <h1 className="section-title">About Us</h1>
          
          <div className="about-content">
            <div className="about-text">
              <h2>We Value Our Clients And Want Them To Have A Nice Experience</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur. Convallis integer enim eget sit urna. Eu duis lectus amet 
                vestibulum varius. Nibh tellus sit sit at lorem facilisis. Nunc vulputate ac interdum aliquet 
                vestibulum in tellus.
              </p>
              <p>
                Sit convallis rhoncus dolor purus amet orci urna. Lobortis vulputate vestibulum consectetur donec 
                ipsum egestas velit laoreet justo. Eu dignissim egestas egestas ipsum. Sit est nunc pellentesque at 
                a aliquam ultrices consequat. Velit duis velit nec amet eget eu morbi. Libero non diam sit viverra 
                dignissim. Aliquam tincidunt in cursus euismod enim.
              </p>
              <p>
                Magna odio sed ornare ultrices. Id lectus mi amet sit at sit arcu mi nisl. Mauris egestas arcu mauris.
              </p>
            </div>
            
            <div className="about-images">
              <div className="years-badge">
                <span className="years-number">45</span>
                <span className="years-text">Years in Business</span>
              </div>
              
              <div className="images-grid">
                {/* Column 1: Two images stacked */}
                <div className="column-1">
                  <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop" 
                    alt="Handshake deal"
                    className="image-1"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1580654712603-eb43273aff33?w=400&h=300&fit=crop" 
                    alt="Luxury car interior"
                    className="image-2"
                  />
                </div>
                
                {/* Column 2: One large square image */}
                <div className="column-2">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face" 
                    alt="Professional car salesman"
                    className="image-3"
                  />
                </div>
                
                {/* Column 3: One long image on top, two smaller below */}
                <div className="column-3">
                  <img 
                    src="https://images.unsplash.com/photo-1562141961-4b5a5a5e8f7e?w=500&h=250&fit=crop" 
                    alt="Car showroom interior"
                    className="image-4"
                  />
                  <div className="bottom-images">
                    <img 
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&h=200&fit=crop" 
                      alt="Car details"
                      className="image-5"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=240&h=200&fit=crop" 
                      alt="Car handover"
                      className="image-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon blue-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 20h16M16 24h12M16 28h8" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="38" cy="10" r="6" fill="currentColor"/>
                  <path d="M36 10l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <h3>Special Financing Offers</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon purple-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 8l-3 6h-6l5 4-2 6 6-4 6 4-2-6 5-4h-6l-3-6z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 32c4-4 8-6 12-6s8 2 12 6" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Trusted Car Dealership</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon pink-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="16" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 24h16M20 28h8" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="36" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M32 12h8M36 8v8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Transparent Pricing</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon cyan-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 40c0-8 7.2-14.4 16-14.4S40 32 40 40" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="36" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M32 12l3 3 6-6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <h3>Expert Car Service</h3>
              <p>Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Fair Price Section */}
      <section className="fair-price-section">
        <div className="container">
          <div className="fair-price-content">
            <div className="fair-price-image">
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=800&fit=crop" 
                alt="Luxury car on mountain road"
              />
              <div className="play-button">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                  <polygon points="9,3 20,12 9,21"/>
                </svg>
              </div>
            </div>
            
            <div className="fair-price-text">
              <h2>Get A Fair Price For Your Car Sell To Us Today</h2>
              <p>
                We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of vehicles to choose from.
              </p>
              
              <ul className="benefits-list">
                <li>We are the UK's largest retailer of quality used cars</li>
                <li>Deliver to your door</li>
                <li>Part-exchange welcome</li>
                <li>Sell your car and all the options online</li>
              </ul>
              
              <button className="cta-button">Get Started</button>
            </div>
          </div>
          
          <div className="stats-section">
            <div className="stat-item">
              <h3>836M</h3>
              <p>Cars for Sale</p>
            </div>
            <div className="stat-item">
              <h3>738M</h3>
              <p>Dealer Reviews</p>
            </div>
            <div className="stat-item">
              <h3>85M</h3>
              <p>Visitors Per Day</p>
            </div>
            <div className="stat-item">
              <h3>238M</h3>
              <p>Verified Dealers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Brands Section */}
      <section className="brands-section">
        <div className="container">
          <div className="brands-header">
            <h2>Explore Our Premium Brands</h2>
            <a href="#" className="view-all-link">View All Brands →</a>
          </div>
          
          <div className="brands-grid">
            <div className="brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png" alt="Audi" />
              <span>Audi</span>
            </div>
            <div className="brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2020/03/BMW-Logo.png" alt="BMW" />
              <span>BMW</span>
            </div>
            <div className="brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2021/08/Ford-Logo.png" alt="Ford" />
              <span>Ford</span>
            </div>
            <div className="brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2020/04/Mercedes-Logo.png" alt="Mercedes Benz" />
              <span>Mercedes Benz</span>
            </div>
            <div className="brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2021/08/Peugeot-Logo.png" alt="Peugeot" />
              <span>Peugeot</span>
            </div>
            <div className="brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2020/09/Volkswagen-Logo.png" alt="Volkswagen" />
              <span>Volkswagen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="team-header">
            <h2>Our Team</h2>
            <a href="#" className="view-all-link">View All →</a>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b526?w=300&h=300&fit=crop&crop=face" 
                alt="Courtney Henry"
              />
              <h3>Courtney Henry</h3>
              <p>President of Sales</p>
            </div>
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" 
                alt="Jerome Bell"
              />
              <h3>Jerome Bell</h3>
              <p>Manager</p>
            </div>
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                alt="Arlene McCoy"
              />
              <h3>Arlene McCoy</h3>
              <p>Manager</p>
            </div>
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face" 
                alt="Jenny Wilson"
              />
              <h3>Jenny Wilson</h3>
              <p>Vice President</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What our customers say</h2>
          <p className="testimonials-subtitle">Based on 1,209 reviews on 75+ review channels and 4.6 star average</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <h4>Great Work</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs."</p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                  alt="Ralph Edwards"
                />
                <div>
                  <strong>Ralph Edwards</strong>
                  <span>Tesla Driver</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-item">
              <h4>Awesome Design</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance that didn't on our original designs."</p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b526?w=50&h=50&fit=crop&crop=face" 
                  alt="Jenna Watson"
                />
                <div>
                  <strong>Jenna Watson</strong>
                  <span>Audi Driver</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-item">
              <h4>Perfect Quality</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance and we didn't on our original designs."</p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                  alt="Courtney Henry"
                />
                <div>
                  <strong>Courtney Henry</strong>
                  <span>Ferrari Driver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
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