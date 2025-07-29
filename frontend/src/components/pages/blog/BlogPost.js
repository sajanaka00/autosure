import React from 'react';
import '../../../styles/blog-post.css';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

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
    "Become a UI/UX designer.",
    "You will be able to start earning money Figma skills.",
    "Build a UI project from beginning to end.",
    "Work with colors & fonts.",
    "You will create your own UI Kit."
  ];

  const rightColumnItems = [
    "Build & test a complete mobile app.",
    "Learn to design mobile apps & websites.",
    "Design 3 different logos.",
    "Create low-fidelity wireframe.",
    "Downloadable exercise files."
  ];

  const requirements = [
    "We do not require any previous experience or pre-defined skills to take this course. A great orientation would be enough to master UI/UX design.",
    "A computer with a good internet connection.",
    "Adobe Photoshop (OPTIONAL)"
  ];

  const comments = [
    {
      id: 1,
      avatar: "test-1-150-x-150-jpg1.png",
      name: "admin",
      date: "November 22, 2023",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
      id: 2,
      avatar: "image0.png",
      name: "Ali Tufan",
      date: "November 22, 2023",
      content: "Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin sagittis dolor sed mi elementum pretium. Donec et justo ante. Vivamus egestas sodales est, eu rhoncus urna semper eu."
    },
    {
      id: 3,
      avatar: "team-2-150-x-150-jpg0.png",
      name: "demo",
      date: "January 3, 2024",
      content: "سي"
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
          BMW X6 M50i is designed to exceed your sportiest.
        </h1>
        
        <div className="bp-meta">
          <div className="bp-author">
            <Avatar 
              src="test-1-150-x-150-jpg0.png" 
              alt="Admin avatar"
              size={40}
            />
            <span className="bp-author-name">admin</span>
          </div>
          
          <div className="bp-tags">
            <Badge className="bp-tag">Accessories</Badge>
            <Badge className="bp-tag">Exterior</Badge>
          </div>
          
          <time className="bp-date">November 22, 2023</time>
        </div>
      </header>

      {/* Featured Image */}
      <div className="bp-hero">
        <img 
          src="blog-9-jpg0.png" 
          alt="BMW X6 M50i"
          className="bp-hero-img"
        />
      </div>

      {/* Content */}
      <div className="bp-content">
        <p className="bp-intro">
          Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque
          bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus 
          sollicitudin cursus. Ut et adipiscing erat. Curabitur{' '}
          <a href="#" className="bp-link">this is a text link</a>{' '}
          libero tempus congue.
        </p>

        <p className="bp-body">
          Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin sagittis
          dolor sed mi elementum pretium. Donec et justo ante. Vivamus egestas 
          sodales est, eu rhoncus urna semper eu. Cum sociis natoque penatibus et 
          magnis dis parturient montes, nascetur ridiculus mus. Integer tristique 
          elit lobortis purus bibendum, quis dictum metus mattis. Phasellus posuere 
          felis sed eros porttitor mattis. Curabitur massa magna, tempor in blandit 
          id, porta in ligula. Aliquam laoreet nisl massa, at interdum mauris 
          sollicitudin et.
        </p>

        <Quote 
          text="Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue."
          author="Luis Pickford"
        />

        {/* Learning Section */}
        <section className="bp-learn">
          <h2 className="bp-learn-title">What you'll learn</h2>
          
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
          <h2 className="bp-req-title">Requirements</h2>
          <div className="bp-req-img-wrap">
            <img src="detail-post-jpg0.png" alt="Course requirements" className="bp-req-img" />
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
              <TagButton>Exterior</TagButton>
              <TagButton>Fuel System</TagButton>
              <TagButton>Sound</TagButton>
            </div>
          </div>
        </section>

        {/* Author Bio Section */}
        <section className="bp-bio">
          <div className="bp-bio-av">
            <Avatar src="test-1-150-x-150-jpg0.png" alt="Admin" size={70} />
          </div>
          <div className="bp-bio-content">
            <h3 className="bp-bio-name">admin</h3>
            <p className="bp-bio-desc">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim 
              ipsam voluptatem quia voluptas sit.
            </p>
          </div>
        </section>

        {/* Post Navigation */}
        <nav className="bp-nav">
          <NavigationPost 
            direction="previous"
            title="BMW X5 Gold 2024 Sport Review: Light on Sport"
            icon="←"
          />
          <NavigationPost 
            direction="next"
            title="2024 BMW ALPINA XB7 with exclusive details,"
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