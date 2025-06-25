import React, { useState } from 'react';
import '../../styles/blog-detail.css';

const BlogDetailPage = () => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmitComment = () => {
    // Handle comment submission
    console.log('Comment submitted:', { name, email, comment });
    setComment('');
    setName('');
    setEmail('');
    setSaveInfo(false);
  };

  return (
    <div className="blog-detail-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-text">BOXCARS</span>
            </div>
            <nav className="nav">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link">Listings</a>
              <a href="#" className="nav-link">Blog</a>
              <a href="#" className="nav-link">Pages</a>
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Contact</a>
              <a href="#" className="nav-link">Sign In</a>
              <button className="add-listing-btn">Add Listing</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="blog-content">
            {/* Blog Header */}
            <div className="blog-header">
              <h1 className="blog-title">BMW X6 M50i Is Designed To Exceed Your Sportiest.</h1>
              <div className="blog-meta">
                <div className="author-info">
                  <img src="/api/placeholder/40/40" alt="Admin" className="author-avatar" />
                  <span className="author-name">Admin</span>
                  <span className="category">Commercial Vehicles</span>
                  <span className="date">November 23, 2023</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="featured-image">
              <img src="/api/placeholder/800/400" alt="BMW X6 M50i" className="blog-image" />
            </div>

            {/* Blog Content */}
            <div className="blog-text">
              <p>
                Adipisci blanditiis voluptatibus tenetur sunt molestiae est accusamus. Quisque blanditiis quam odio, facilisis quis consectetur sunt 
                recusandae. Pellentesque vulputate pellentesque risus, ut molestiae ante. Praesent. Duis in non erat libero molestie convallis.
              </p>
              
              <p>
                Phasellutem dignissimos vestibulum nulla quod molestue accumsan. Quisque blanditiis quam odio, facilisis molestue consectetur sunt 
                recusandae. Pellentesque vulputate pellentesque risus, ut moleftie ante. Phasellu blanditiis quam odio facilisis molestue consectetur 
                sunt vulputate pellentesque risus, ut. Risque molestue ante. Phasellos. Pellentesque blanditiis quam odio facilisis molestue consectetur sunt 
                vulputate. Pellentesque vulputate pellentesque risus, ut molestue ante. Phasel libero molestue convallis.
              </p>

              <blockquote className="quote">
                Adipisci blanditiis voluptatibus tenetur sunt molestiae est accusamus. Quisque blanditiis quam odio, facilisis quis consectetur sunt 
                recusandae. Pellentesque vulputate pellentesque risus, ut molestiae ante.
              </blockquote>

              <p className="last-paragraph">Last Paragraph</p>
            </div>

            {/* What You'll Learn Section */}
            <div className="learning-section">
              <h3>What you'll learn</h3>
              <div className="learning-content">
                <div className="learning-column">
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Become a UX/UI designer</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>You will be able to start earning money</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Build a portfolio from beginning to end</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Work with clients in Boot</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>We will create your very first UI kit</span>
                  </div>
                </div>
                <div className="learning-column">
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Build a few a complete mobile app</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Learn about mobile and web UI pattern</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Design 3 different logos</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Create mobile first design</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Downloadable exercise files</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Image */}
            <div className="second-image">
              <img src="/api/placeholder/800/400" alt="Car on bridge" className="blog-image" />
            </div>

            {/* Requirements Section */}
            <div className="requirements-section">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                <li>You do not need any previous experience or pre-defined skills to take this course. A great entrepreneur should be enough to start your own startup company.</li>
                <li>A computer with a good internet connection</li>
                <li>Basic Photoshop (PS) Software</li>
              </ul>
            </div>

            {/* Share Section */}
            <div className="share-section">
              <span className="share-text">Share this post:</span>
              <div className="social-icons">
                <a href="#" className="social-icon facebook">f</a>
                <a href="#" className="social-icon twitter">t</a>
                <a href="#" className="social-icon linkedin">in</a>
                <a href="#" className="social-icon pinterest">p</a>
              </div>
              <div className="post-navigation">
                <span className="nav-text">Post Tags:</span>
                <span className="nav-text">Recent</span>
              </div>
            </div>

            {/* Author Section */}
            <div className="author-section">
              <img src="/api/placeholder/80/80" alt="Admin" className="author-large-avatar" />
              <div className="author-details">
                <h4>Admin</h4>
                <p>
                  Will is a well-known name among those who adore the independent ecosystem. Automotive, blockchain, fashion, and 
                  independent culture impact much more than all the extensive websites that have experienced. Renew email 
                  accumulate impact those than all the extensive websites that have experienced various stages.
                </p>
              </div>
            </div>

            {/* Previous/Next Posts */}
            <div className="post-navigation-section">
              <div className="prev-post">
                <span className="nav-label">← Previous post</span>
                <h5>BMW X4 M40i 2022 Sport Variant – got on board</h5>
              </div>
              <div className="next-post">
                <span className="nav-label">Next Post →</span>
                <h5>2023 BMW X4 M40i will set ultimate before</h5>
              </div>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h3>3 Comments</h3>
              
              <div className="comment">
                <img src="/api/placeholder/50/50" alt="Admin" className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">Admin</span>
                    <span className="comment-date">November 23, 2023</span>
                    <button className="reply-btn">Reply</button>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et lacus lorem turpis molestie hendrerit at lobortis et diam mollit aliquam Ut dictum consequat orci non gravida.
                  </p>
                </div>
              </div>

              <div className="comment reply-comment">
                <img src="/api/placeholder/50/50" alt="Hi Turk" className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">Hi Turk</span>
                    <span className="comment-date">November 23, 2023</span>
                    <button className="reply-btn">Reply</button>
                  </div>
                  <p>
                    Duis mollis blandit tempus. Et cursus massa vestiubulum. Et flagellum orci risus urna ex dignissim cursus in sait, cursus of sait cursus mollis bibendum risus massa consequat.
                  </p>
                </div>
              </div>

              <div className="comment">
                <img src="/api/placeholder/50/50" alt="Danny" className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">Danny</span>
                    <span className="comment-date">January 5, 2023</span>
                    <button className="reply-btn">Reply</button>
                  </div>
                  <p>Comment content here...</p>
                </div>
              </div>
            </div>

            {/* Comment Form */}
            <div className="comment-form-section">
              <h3>Leave a Comment</h3>
              <div className="comment-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Your Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
                <textarea
                  placeholder="Your Comment*"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-textarea"
                ></textarea>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="save-info"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                  />
                  <label htmlFor="save-info">Save my name, email and website in this browser for the next time I comment.</label>
                </div>
                <button onClick={handleSubmitComment} className="submit-btn">Submit Comment</button>
              </div>
            </div>

            {/* Related Posts */}
            <div className="related-posts-section">
              <h3>Related Posts</h3>
              <div className="related-posts-grid">
                <div className="related-post">
                  <img src="/api/placeholder/300/200" alt="BMW i8 Quad ORA" className="related-post-image" />
                  <div className="related-post-content">
                    <span className="related-post-date">November 23, 2023</span>
                    <h4>BMW i8 Quad ORA Sport Review: Light on Weight, Big on Price</h4>
                  </div>
                </div>
                <div className="related-post">
                  <img src="/api/placeholder/300/200" alt="2024 Kia Sorento" className="related-post-image" />
                  <div className="related-post-content">
                    <span className="related-post-date">November 23, 2023</span>
                    <h4>2024 Kia Sorento Hybrid Review: Big Vehicle With Small Wants</h4>
                  </div>
                </div>
                <div className="related-post">
                  <img src="/api/placeholder/300/200" alt="2023 BMW X6 xDrive" className="related-post-image" />
                  <div className="related-post-content">
                    <span className="related-post-date">November 23, 2023</span>
                    <h4>2023 BMW X6 xDrive40i Tests – available at a reasonable price</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-newsletter">
              <h3>Join BoxCar</h3>
              <p>Receive pricing updates, shopping tips & more!</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button className="newsletter-btn">Sign Up</button>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Get in Touch</a></li>
                <li><a href="#">Help center</a></li>
                <li><a href="#">Live chat</a></li>
                <li><a href="#">How it works</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Our Brands</h4>
              <ul>
                <li><a href="#">Toyota</a></li>
                <li><a href="#">Porsche</a></li>
                <li><a href="#">Audi</a></li>
                <li><a href="#">BMW</a></li>
                <li><a href="#">Ford</a></li>
                <li><a href="#">Nissan</a></li>
                <li><a href="#">Peugeot</a></li>
                <li><a href="#">Volkswagen</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Vehicles Type</h4>
              <ul>
                <li><a href="#">Sedan</a></li>
                <li><a href="#">Hatchback</a></li>
                <li><a href="#">SUV</a></li>
                <li><a href="#">Hybrid</a></li>
                <li><a href="#">Electric</a></li>
                <li><a href="#">Coupe</a></li>
                <li><a href="#">Truck</a></li>
                <li><a href="#">Convertible</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Our Mobile App</h4>
              <div className="app-links">
                <img src="/api/placeholder/120/40" alt="App Store" />
                <img src="/api/placeholder/120/40" alt="Google Play" />
              </div>
              <div className="social-links">
                <h5>Connect With Us</h5>
                <div className="social-icons-footer">
                  <a href="#" className="social-link">f</a>
                  <a href="#" className="social-link">t</a>
                  <a href="#" className="social-link">in</a>
                  <a href="#" className="social-link">ig</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2023 Boxcarapp. All rights reserved</p>
            <div className="footer-bottom-links">
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Notice</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetailPage;