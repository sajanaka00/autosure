import React, { useState } from 'react';
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
              <p>Flexible financing options with competitive rates &  customized payment plans to fit your budget and needs.</p>
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

      {/* Premium Brands Section */}
      <section className="about-page-brands-section">
        <div className="about-page-container-inner">
          <div className="about-page-brands-header">
            <h2>Explore Our Premium Brands</h2>
            <a href="#" className="about-page-view-all-link">View All Brands →</a>
          </div>
          
          <div className="about-page-brands-grid">
            <div className="about-page-brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png" alt="Audi" />
              <span>Audi</span>
            </div>
            <div className="about-page-brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2020/03/BMW-Logo.png" alt="BMW" />
              <span>BMW</span>
            </div>
            <div className="about-page-brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2021/08/Ford-Logo.png" alt="Ford" />
              <span>Ford</span>
            </div>
            <div className="about-page-brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2020/04/Mercedes-Logo.png" alt="Mercedes Benz" />
              <span>Mercedes Benz</span>
            </div>
            <div className="about-page-brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2021/08/Peugeot-Logo.png" alt="Peugeot" />
              <span>Peugeot</span>
            </div>
            <div className="about-page-brand-item">
              <img src="https://logos-world.net/wp-content/uploads/2020/09/Volkswagen-Logo.png" alt="Volkswagen" />
              <span>Volkswagen</span>
            </div>
          </div>
        </div>
      </section>

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
              Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews
            </p>
          </div>

          <div className="about-page-testimonials-grid">
            <div className="about-page-testimonial-item">
              <h4>Great Work</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer1} 
                  alt="Ralph Edwards"
                />
                <div>
                  <strong>Ralph Edwards</strong>
                  <span>Tesla Driver</span>
                </div>
              </div>
            </div>
            
            <div className="about-page-testimonial-item">
              <h4>Awesome Design</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance that didn't on our original designs."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer2} 
                  alt="Jenna Watson"
                />
                <div>
                  <strong>Jenna Watson</strong>
                  <span>Audi Driver</span>
                </div>
              </div>
            </div>

            <div className="about-page-testimonial-item">
              <h4>Great Work</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer3} 
                  alt="Ralph Edwards"
                />
                <div>
                  <strong>Michael Johnson</strong>
                  <span>BMW Driver</span>
                </div>
              </div>
            </div>

            <div className="about-page-testimonial-item">
              <h4>Perfect Service</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer4} 
                  alt="Sarah Wilson"
                />
                <div>
                  <strong>Sarah Wilson</strong>
                  <span>Mercedes Driver</span>
                </div>
              </div>
            </div>
            
            <div className="about-page-testimonial-item">
              <h4>Perfect Quality</h4>
              <p>"Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance and we didn't on our original designs."</p>
              <div className="about-page-testimonial-author">
                <img 
                  src={Customer5} 
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