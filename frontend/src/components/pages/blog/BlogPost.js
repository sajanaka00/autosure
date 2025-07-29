import React from 'react';
import '../../../styles/blog-post.css';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

import CarImg from '../../../assets/images/cars/bmw-series5_1.jpg'
import CarImg2 from '../../../assets/images/cars/bmw-series5_2.jpg'
import AdminAvatar from '../../../assets/images/avatars/avatar1.jpg'
import User1Avatar from '../../../assets/images/avatars/avatar2.jpg'
import User2Avatar from '../../../assets/images/avatars/avatar3.jpg'
import User3Avatar from '../../../assets/images/avatars/avatar1.jpg'

// Reusable Components
const Avatar = ({ src, alt, size = 40 }) => (
  <img 
    className={`bp-av bp-av-${size === 40 ? 'sm' : 'lg'}`}
    src={src} 
    alt={alt}
  />
);

const Badge = ({ children, className = '' }) => (
  <div className={`bp-tag ${className}`}>
    {children}
  </div>
);

const ListItem = ({ children, icon = '✓' }) => (
  <div className="bp-l-item">
    <div className="bp-l-icon">
      <span className="bp-l-symbol">{icon}</span>
    </div>
    <div className="bp-l-text">{children}</div>
  </div>
);

const LearningList = ({ items, className = '' }) => (
  <div className={`bp-l-list ${className}`}>
    {items.map((item, index) => (
      <ListItem key={index}>{item}</ListItem>
    ))}
  </div>
);

const Quote = ({ text, author }) => (
  <blockquote className="bp-quote">
    <div className="bp-q-text">{text}</div>
    <cite className="bp-q-auth">{author}</cite>
  </blockquote>
);

const RequirementItem = ({ children }) => (
  <div className="bp-r-item">
    <div className="bp-r-bullet"></div>
    <div className="bp-r-text">{children}</div>
  </div>
);

const SocialButton = ({ icon, href = "#" }) => (
  <a href={href} className="bp-s-btn">
    <span className="bp-s-icon">{icon}</span>
  </a>
);

const TagButton = ({ children }) => (
  <button className="bp-t-btn">{children}</button>
);

const Comment = ({ avatar, name, date, content, onReply }) => (
  <div className="bp-comment">
    <div className="bp-c-av">
      <Avatar src={avatar} alt={`${name} avatar`} size={40} />
    </div>
    <div className="bp-c-content">
      <div className="bp-c-header">
        <h4 className="bp-c-author">{name}</h4>
        <time className="bp-c-date">{date}</time>
        <button className="bp-c-reply" onClick={onReply}>Reply</button>
      </div>
      <p className="bp-c-text">{content}</p>
    </div>
  </div>
);

const FormInput = ({ label, placeholder, type = "text", required = false }) => (
  <div className="bp-input">
    <input 
      type={type}
      className="bp-field"
      placeholder={placeholder}
      required={required}
    />
    <label className="bp-label">{label}</label>
  </div>
);

const NavigationPost = ({ direction, title, href = "#", icon }) => (
  <a href={href} className={`bp-nav-item bp-nav-${direction === 'previous' ? 'prev' : 'next'}`}>
    {direction === 'previous' && <span className="bp-nav-icon">{icon}</span>}
    <div className="bp-nav-content">
      <span className="bp-nav-label">{direction === 'previous' ? 'Previous Post' : 'Next Post'}</span>
      <h4 className="bp-nav-title">{title}</h4>
    </div>
    {direction === 'next' && <span className="bp-nav-icon">{icon}</span>}
  </a>
);

// Main Component
const BlogPost = () => {
  const leftColumnItems = [
    "Powerful inline-6 and V8 engine options.",
    "Advanced air suspension system.",
    "Executive-level interior luxury.",
    "Cutting-edge BMW Driving Assistant Pro.",
    "Elegant and sophisticated exterior design."
  ];

  const rightColumnItems = [
    "BMW Live Cockpit Professional.",
    "Harman Kardon premium sound system.",
    "Four-zone automatic climate control.",
    "Gesture control and voice commands.",
    "Wireless smartphone integration."
  ];

  const requirements = [
    "The BMW 5 Series Sedan requires regular maintenance intervals every 10,000 miles or 12 months to maintain its sophisticated performance and reliability.",
    "Premium fuel (91+ octane) is strongly recommended for optimal engine performance and fuel efficiency.",
    "Professional service and genuine BMW parts are essential for maintaining warranty coverage and vehicle integrity."
  ];

  const comments = [
    {
      id: 1,
      avatar: User1Avatar,
      name: "David Mueller",
      date: "January 15, 2025",
      content: "The 5 Series continues to set the benchmark for executive sedans. The perfect balance of luxury, performance, and technology makes it an outstanding choice."
    },
    {
      id: 2,
      avatar: User2Avatar,
      name: "Jennifer Liu",
      date: "January 12, 2025",
      content: "Just purchased the 540i xDrive and couldn't be happier. The inline-6 engine is smooth and powerful, while the interior is absolutely luxurious."
    },
    {
      id: 3,
      avatar: User3Avatar,
      name: "Carlos Mendez",
      date: "January 10, 2025",
      content: "Excellent review! The 5 Series has always been the gold standard in this segment, and this generation raises the bar even higher."
    }
  ];

  const handleReply = (commentId) => {
    console.log(`Replying to comment ${commentId}`);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('Comment submitted');
  };

  return (
    <article className="bp-post">
      <Navbar/>
      {/* Header */}
      <header className="bp-hdr">
        <h1 className="bp-title">
          BMW 5 Series Sedan: The Ultimate Executive Driving Experience
        </h1>
        
        <div className="bp-meta">
          <div className="bp-author">
            <Avatar 
              src={AdminAvatar}
              alt="Admin avatar"
              size={40}
            />
            <span className="bp-author-name">BMW Enthusiast</span>
          </div>
          
          <div className="bp-tags">
            <Badge className="bp-tag">Executive</Badge>
            <Badge className="bp-tag">Luxury</Badge>
          </div>
          
          <time className="bp-date">January 15, 2025</time>
        </div>
      </header>

      {/* Featured Image */}
      <div className="bp-hero">
        <img 
          src={CarImg}
          alt="BMW 2 Series Gran Coupé"
          className="bp-hero-img"
        />
      </div>

      {/* Content */}
      <div className="bp-content">
        <p className="bp-intro">
          The BMW 5 Series Sedan represents the pinnacle of executive luxury and driving dynamics. 
          As BMW's flagship business sedan, it seamlessly combines cutting-edge technology, refined 
          comfort, and exceptional performance to create the ultimate driving machine for discerning 
          professionals. The{' '}
          <a href="#" className="bp-link">seventh generation</a>{' '}
          sets new standards in sophistication and innovation.
        </p>

        <p className="bp-body">
          Under the sculpted hood, the 5 Series offers a comprehensive range of powertrains, from the 
          efficient 530i with its turbocharged 2.0-liter four-cylinder producing 248 horsepower, to the 
          commanding M550i xDrive with its twin-turbocharged 4.4-liter V8 delivering 523 horsepower. 
          The intelligent xDrive all-wheel drive system and adaptive air suspension ensure optimal 
          traction and ride quality in any condition. Inside, the cabin exemplifies German luxury 
          craftsmanship with premium Nappa leather, real wood trim, and the latest BMW Live Cockpit 
          Professional, creating an environment that elevates every journey into a first-class experience.
        </p>

        <Quote 
          text="The BMW 5 Series doesn't just transport you to your destination—it transforms the journey into an experience of refined luxury and dynamic performance that defines executive motoring excellence."
          author="automotive expert, Automotive News"
        />

        {/* Learning Section */}
        <section className="bp-learn">
          <h2 className="bp-learn-title">Key Features & Benefits</h2>
          
          <div className="bp-learn-grid">
            <LearningList 
              items={leftColumnItems}
              className="bp-learn-col bp-learn-left"
            />
            <LearningList 
              items={rightColumnItems}
              className="bp-learn-col bp-learn-right"
            />
          </div>
        </section>

        {/* Requirements Section */}
        <section className="bp-req">
          <h2 className="bp-req-title">Ownership Considerations</h2>
          <div className="bp-req-img-wrap">
            <img src={CarImg2} alt="BMW 2 Series interior details" className="bp-req-img" />
          </div>
          <div className="bp-req-list">
            {requirements.map((requirement, index) => (
              <RequirementItem key={index}>{requirement}</RequirementItem>
            ))}
          </div>
        </section>

        {/* Social Share Section */}
        <section className="bp-share">
          <div className="bp-share-wrap">
            <span className="bp-share-label"><strong>Share this post</strong></span>
            <div className="bp-share-btns">
              <SocialButton icon="📘" href="#facebook" />
              <SocialButton icon="🐦" href="#twitter" />
              <SocialButton icon="📧" href="#email" />
              <SocialButton icon="📌" href="#pinterest" />
            </div>
            <div className="bp-share-tags">
              <TagButton>Executive</TagButton>
              <TagButton>Technology</TagButton>
              <TagButton>Luxury</TagButton>
            </div>
          </div>
        </section>

        {/* Author Bio Section */}
        <section className="bp-bio">
          <div className="bp-bio-av">
            <Avatar src={AdminAvatar} alt="BMW Enthusiast" size={70} />
          </div>
          <div className="bp-bio-content">
            <h3 className="bp-bio-name">BMW Enthusiast</h3>
            <p className="bp-bio-desc">
              With over a decade of experience in automotive journalism and a passion for German engineering, 
              I specialize in providing comprehensive reviews and insights into BMW's latest innovations. 
              From track testing to daily driving experiences, I bring you authentic perspectives on what 
              makes each BMW model unique and exceptional in today's competitive automotive landscape.
            </p>
          </div>
        </section>

        {/* Post Navigation */}
        <nav className="bp-nav">
          <NavigationPost 
            direction="previous"
            title="BMW X5 M50i: Luxury SUV Performance Redefined"
            icon="←"
          />
          <NavigationPost 
            direction="next"
            title="2025 BMW 7 Series: The Flagship Experience"
            icon="→"
          />
        </nav>

        {/* Comments Section */}
        <section className="bp-comments">
          <h2 className="bp-c-title">3 Comments</h2>
          <div className="bp-c-list">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                avatar={comment.avatar}
                name={comment.name}
                date={comment.date}
                content={comment.content}
                onReply={() => handleReply(comment.id)}
              />
            ))}
          </div>
        </section>

        {/* Comment Form */}
        <section className="bp-form-wrap">
          <h2 className="bp-form-title">Leave a Comment</h2>
          <form className="bp-form" onSubmit={handleCommentSubmit}>
            <div className="bp-form-row">
              <FormInput label="Name" placeholder="Your Name" required />
              <FormInput label="Email" placeholder="Your Email" type="email" required />
            </div>
            <FormInput label="Website" placeholder="Your Website" />
            
            <div className="bp-textarea-wrap">
              <textarea 
                className="bp-textarea"
                placeholder="Write your comment here..."
                required
              ></textarea>
              <label className="bp-textarea-label">Comment</label>
            </div>
            
            <div className="bp-check-wrap">
              <input 
                type="checkbox" 
                id="save-info"
                className="bp-checkbox"
              />
              <label htmlFor="save-info" className="bp-check-label">
                Save my name, email, and website in this browser for the next time I comment.
              </label>
            </div>
            
            <button type="submit" className="bp-submit">
              Submit Comment
            </button>
          </form>
        </section>
      </div>
      <Footer/>
    </article>
  );
};

export default BlogPost;