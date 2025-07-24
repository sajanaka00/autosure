import React, { useState } from 'react';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import AboutGrid1 from '../../../assets/images/about/about-grid1.jpg'
import AboutGrid2 from '../../../assets/images/about/about-grid2.jpg'
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

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#">Home</a> / About Us
      </div>

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
              <div className="images-grid">
                {/* Column 1: years badge + one image below */}
                <div className="column-1">
                  <div className="years-badge">
                    <span className="years-number">45</span>
                    <span className="years-text">Years in Business</span>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1580654712603-eb43273aff33?w=400&h=300&fit=crop" 
                    alt="Luxury car interior"
                    className="image-2"
                  />
                </div>

                {/* Column 2 */}
                <div className="column-2">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face" 
                    alt="Professional car salesman"
                    className="image-3"
                  />
                </div>

                {/* Column 3 */}
                <div className="column-3">
                  <img 
                    src={AboutGrid2} 
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
      <section class="why-choose-section">
        <div class="container">
          <h2 class="section-title">Why Choose Us?</h2>
          
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <img src={ChooseUs1} alt="Special Financing Offers" />
              </div>
              <h3>Special Financing Offers</h3>
              <p>Flexible financing options with competitive rates &  customized payment plans to fit your budget and needs.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <img src={ChooseUs2} alt="Trusted Car Dealership" />
              </div>
              <h3>Trusted Car Dealership</h3>
              <p>Years of experience & thousands of satisfied customers who trust us for honest dealings and reliable service.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <img src={ChooseUs3} alt="Transparent Pricing" />
              </div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees or surprise charges. Clear, upfront pricing with detailed breakdowns so you know exactly what you're paying.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <img src={ChooseUs4} alt="Expert Car Service" />
              </div>
              <h3>Expert Car Service</h3>
              <p>Certified technicians providing comprehensive maintenance and repair services to keep your vehicle running smoothly.</p>
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
                src={FairPrice} 
                alt="Luxury car on mountain road"
              />
              <div className="play-button">
                <img src={PlayBtn} alt="Play Button" />
              </div>
            </div>
            
            <div className="fair-price-text">
              <h2>Get A Fair Price For Your Car Sell To Us Today</h2>
              <p>
                We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of vehicles to choose from.
              </p>
              
              <ul className="benefits-list">
                <li>We are the UK’s largest provider, with more patrols in more places</li>
                <li>You get 24/7 roadside assistance</li>
                <li>We fix 4 out of 5 cars at the roadside</li>
              </ul>
              
              <button className="cta-button">Get Started</button>
            </div>
          </div>
          
          <div className="stats-section">
            <div className="stat-item">
              <h3>89M</h3>
              <p>Cars for Sale</p>
            </div>
            <div className="stat-item">
              <h3>740M</h3>
              <p>Dealer Reviews</p>
            </div>
            <div className="stat-item">
              <h3>95M</h3>
              <p>Visitors Per Day</p>
            </div>
            <div className="stat-item">
              <h3>225M</h3>
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
            <a href="#" className="view-all-link">View All</a>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <img 
                src={Team1} 
                alt="Courtney Henry"
              />
              <div className="team-member-info">
                <h3>Courtney Henry</h3>
                <p>Development Manager</p>
              </div>
            </div>
            
            <div className="team-member">
              <img 
                src={Team2} 
                alt="Jerome Bell"
              />
              <div className="team-member-info">
                <h3>Jerome Bell</h3>
                <p>Software Tester</p>
              </div>
            </div>
            
            <div className="team-member">
              <img 
                src={Team3} 
                alt="Arlene McCoy"
              />
              <div className="team-member-info">
                <h3>Arlene McCoy</h3>
                <p>Software Developer</p>
              </div>
            </div>
            
            <div className="team-member">
              <img 
                src={Team4} 
                alt="Jenny Wilson"
              />
              <div className="team-member-info">
                <h3>Jenny Wilson</h3>
                <p>UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-heading">
            <h2>What our customers say</h2>
            <p className="testimonials-subtitle">
              Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews
            </p>
          </div>

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