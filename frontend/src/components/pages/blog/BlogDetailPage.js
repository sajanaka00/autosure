import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../../styles/blog-detail.css';

const BlogDetailPage = () => {
  // const { id } = useParams();
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  // Blog data based on ID
  const blogData = {
    1: {
      title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
      category: "Sound",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1621135802920-133df287f89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "November 22, 2023",
      content: {
        paragraph1: "The BMW ALPINA XB7 represents the pinnacle of luxury SUV engineering, combining exceptional performance with unparalleled comfort. This extraordinary vehicle showcases ALPINA's commitment to creating the ultimate driving machine for those who demand excellence.",
        paragraph2: "Every detail of the XB7 has been meticulously crafted to deliver an experience that transcends ordinary driving. From its hand-finished interior to its precision-tuned suspension system, the ALPINA XB7 sets new standards in the luxury SUV segment.",
        quote: "The BMW ALPINA XB7 doesn't just meet expectations – it redefines what's possible in a luxury SUV, delivering performance that thrills and comfort that coddles."
      }
    },
    2: {
      title: "BMW X6 M50i is designed to exceed your sportiest.",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1617886903355-9354bb57751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "November 22, 2023",
      content: {
        paragraph1: "The BMW X6 M50i stands as a testament to BMW's ability to blend coupe elegance with SUV practicality. This sports activity coupe delivers thrilling performance while maintaining the versatility that modern drivers demand.",
        paragraph2: "With its distinctive silhouette and aggressive stance, the X6 M50i commands attention on every road. The vehicle's advanced engineering ensures that every drive is an adventure, whether navigating city streets or conquering mountain passes.",
        quote: "The BMW X6 M50i redefines the boundaries between luxury, performance, and practicality in ways that continuously surprise and delight."
      }
    },
    3: {
      title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
      category: "Exterior",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "November 22, 2023",
      content: {
        paragraph1: "The 2024 BMW X5 in its distinctive gold finish represents a bold statement in luxury SUV design. While the sport package adds visual appeal, the real story lies in the vehicle's refined approach to performance and comfort.",
        paragraph2: "This particular configuration prioritizes elegance over aggressive sportiness, making it an ideal choice for those who appreciate understated luxury. The gold exterior finish adds a touch of exclusivity that sets it apart from standard offerings.",
        quote: "Sometimes the most powerful statement is made not through aggressive styling, but through sophisticated restraint and timeless elegance."
      }
    },
    4: {
      title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle",
      category: "Body Kit",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "November 22, 2023",
      content: {
        paragraph1: "The 2024 Kia Sorento Hybrid showcases how modern manufacturers are successfully balancing size and efficiency. This three-row SUV proves that you don't have to sacrifice fuel economy for space and comfort, delivering impressive hybrid technology in a family-friendly package.",
        paragraph2: "What sets the Sorento Hybrid apart is its intelligent powertrain management and spacious interior design. The vehicle seamlessly transitions between electric and gasoline power, providing both environmental benefits and the confidence of extended range for longer journeys.",
        quote: "The Kia Sorento Hybrid demonstrates that eco-consciousness and family practicality can coexist beautifully in today's automotive landscape."
      }
    },
    5: {
      title: "2024 BMW Hybrid gives up nothing with its optimized",
      category: "Fuel Systems",
      image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "November 22, 2023",
      content: {
        paragraph1: "BMW's 2024 hybrid lineup represents a masterclass in optimization, where efficiency meets performance without compromise. The sophisticated hybrid system delivers the driving dynamics BMW is renowned for while significantly reducing environmental impact.",
        paragraph2: "The seamless integration of electric and combustion technologies creates a driving experience that feels both familiar and revolutionary. BMW's commitment to maintaining their signature driving characteristics while embracing electrification sets new industry standards.",
        quote: "BMW proves that the future of performance doesn't require sacrificing the joy of driving – it enhances it through intelligent engineering."
      }
    },
    6: {
      title: "2024 BMW X3 M Sport Seats – available as a standalone option",
      category: "Exterior",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "November 22, 2023",
      content: {
        paragraph1: "The 2024 BMW X3 M Sport seats represent a significant upgrade in both comfort and style, now available as individual options for customization. These performance-oriented seats combine ergonomic excellence with BMW's signature sporty aesthetic.",
        paragraph2: "Designed with input from motorsport engineers, these seats provide exceptional support during dynamic driving while maintaining comfort for daily commuting. The premium materials and precise craftsmanship reflect BMW's commitment to interior excellence.",
        quote: "Great seats don't just support your body – they enhance your connection to the vehicle and elevate every driving experience."
      }
    },
    7: {
      title: "2023 Carnival Standard blind-spot & forward collision avoidance",
      category: "Body Kit",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "November 22, 2023",
      content: {
        paragraph1: "The 2023 Kia Carnival sets new standards for family vehicle safety with its comprehensive suite of advanced driver assistance systems. The standard inclusion of blind-spot monitoring and forward collision avoidance demonstrates Kia's commitment to protecting families.",
        paragraph2: "These safety technologies work seamlessly in the background, providing peace of mind without being intrusive. The system's reliability and accuracy make it an invaluable co-pilot for busy parents navigating today's complex traffic environments.",
        quote: "Advanced safety features should be standard, not optional – the Carnival proves that family protection doesn't have to come at a premium price."
      }
    },
    8: {
      title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
      category: "Sound",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1486326658981-ed68abe5868e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "September 19, 2023",
      content: {
        paragraph1: "The Volkswagen Golf and Polo represent two different approaches to compact car excellence, each with distinct personalities and target audiences. While sharing Volkswagen's commitment to quality, these models serve different lifestyle needs and preferences.",
        paragraph2: "The Golf offers a more premium experience with enhanced performance and technology, while the Polo focuses on efficiency and value. Both vehicles showcase German engineering excellence, but their market positioning creates interesting choices for consumers.",
        quote: "Choosing between the Golf and Polo isn't about better or worse – it's about finding the perfect match for your driving needs and lifestyle."
      }
    },
    9: {
      title: "Battle of the SUVs – Kia Sportage vs Hyundai Tucson",
      category: "Oil & Filters",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      secondImage: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "September 19, 2023",
      content: {
        paragraph1: "The Kia Sportage and Hyundai Tucson represent a fascinating sibling rivalry in the compact SUV segment. Despite sharing platforms and powertrains, these Korean siblings have developed distinct personalities that appeal to different types of buyers.",
        paragraph2: "Both vehicles offer excellent value propositions with comprehensive warranties and modern features. The choice often comes down to design preferences and brand loyalty, as both deliver reliable performance and impressive feature sets for their price points.",
        quote: "When siblings compete this closely, consumers win – both the Sportage and Tucson prove that excellence comes in multiple flavors."
      }
    }
  };

  const { blogId } = useParams();
  const id = parseInt(blogId); // convert to number
  const currentBlog = blogData[id] ?? blogData[1];

  // Related posts data with real images
  const relatedPosts = [
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small Wants",
      date: "November 23, 2023"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      title: "2024 BMW Hybrid gives up nothing with its optimized performance",
      date: "November 23, 2023"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      title: "2024 BMW X3 M Sport Seats – available as a standalone option",
      date: "November 23, 2023"
    }
  ];

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
              <h1 className="blog-title">{currentBlog.title}</h1>
              <div className="blog-meta">
                <div className="author-info">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80" alt="Admin" className="author-avatar" />
                  <span className="author-name">Admin</span>
                  <span className="category">{currentBlog.category}</span>
                  <span className="date">{currentBlog.date}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="featured-image">
              <img src={currentBlog.image} alt={currentBlog.title} className="blog-image" />
            </div>

            {/* Blog Content */}
            <div className="blog-text">
              <p>{currentBlog.content.paragraph1}</p>
              
              <p>{currentBlog.content.paragraph2}</p>

              <blockquote className="quote">
                {currentBlog.content.quote}
              </blockquote>

              <p className="last-paragraph">Continue reading to discover more insights about this exceptional vehicle.</p>
            </div>

            {/* What You'll Learn Section */}
            <div className="learning-section">
              <h3>What you'll learn</h3>
              <div className="learning-content">
                <div className="learning-column">
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Performance specifications and capabilities</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Interior and exterior design features</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Technology and safety innovations</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Driving experience and handling</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Comparison with competitors</span>
                  </div>
                </div>
                <div className="learning-column">
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Fuel efficiency and environmental impact</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Pricing and value proposition</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Maintenance and ownership costs</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Best use cases and target audience</span>
                  </div>
                  <div className="learning-item">
                    <span className="check-icon">✓</span>
                    <span>Future updates and model evolution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Image */}
            <div className="second-image">
              <img src={currentBlog.secondImage} alt="Additional view" className="blog-image" />
            </div>

            {/* Requirements Section */}
            <div className="requirements-section">
              <h3>Key Considerations</h3>
              <ul className="requirements-list">
                <li>Understanding your specific driving needs and preferences before making a decision on luxury vehicle features.</li>
                <li>Budget considerations including purchase price, insurance, and maintenance costs</li>
                <li>Familiarity with advanced automotive technologies and driver assistance systems</li>
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
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80" alt="Admin" className="author-large-avatar" />
              <div className="author-details">
                <h4>Admin</h4>
                <p>
                  Will is a well-known automotive journalist with over a decade of experience in the luxury vehicle segment. 
                  His comprehensive reviews and in-depth analysis have helped thousands of readers make informed decisions 
                  about their automotive purchases. Follow his latest insights on luxury vehicles and automotive trends.
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
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&h=50&q=80" alt="Admin" className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">Admin</span>
                    <span className="comment-date">November 23, 2023</span>
                    <button className="reply-btn">Reply</button>
                  </div>
                  <p>
                    Great article! The detailed analysis really helps understand the vehicle's positioning in the luxury segment. 
                    Looking forward to more comprehensive reviews like this one.
                  </p>
                </div>
              </div>

              <div className="comment reply-comment">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&h=50&q=80" alt="Hi Turk" className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">Hi Turk</span>
                    <span className="comment-date">November 23, 2023</span>
                    <button className="reply-btn">Reply</button>
                  </div>
                  <p>
                    I've been considering this model for months. Your review provided exactly the insights I needed. 
                    The performance comparison was particularly helpful.
                  </p>
                </div>
              </div>

              <div className="comment">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&h=50&q=80" alt="Danny" className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">Danny</span>
                    <span className="comment-date">January 5, 2023</span>
                    <button className="reply-btn">Reply</button>
                  </div>
                  <p>Excellent review! The detailed breakdown of features and performance metrics is very helpful for potential buyers.</p>
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
                {relatedPosts.map((post) => (
                  <div key={post.id} className="related-post">
                    <img src={post.image} alt={post.title} className="related-post-image" />
                    <div className="related-post-content">
                      <span className="related-post-date">{post.date}</span>
                      <h4>{post.title}</h4>
                    </div>
                  </div>
                ))}
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
                <img src="https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=40&q=80" alt="App Store" />
                <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=40&q=80" alt="Google Play" />
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