import React, { useState, useEffect } from 'react';
import '../../../styles/blog-detail.css';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

import Facebook from '../../../assets/images/vectors/facebook.png'
import Instagram from '../../../assets/images/vectors/instagram.png'
import Twitter from '../../../assets/images/vectors/twitter.png'
import Pinterest from '../../../assets/images/vectors/pinterest.png'

// Reusable Components
const Avatar = ({ src, alt, size = 40 }) => (
  <img 
    className={`bp-av bp-av-${size === 40 ? 'sm' : 'lg'}`}
    src={src} 
    alt={alt}
  />
);

const Badge = ({ children }) => (
  <div className="bp-tag">
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

const LearningList = ({ items }) => (
  <div className="bp-l-list">
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
        <time className="bp-c-date">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        <button className="bp-c-reply" onClick={onReply}>Reply</button>
      </div>
      <p className="bp-c-text">{content}</p>
    </div>
  </div>
);

const FormInput = ({ label, placeholder, type = "text", required = false, name, value, onChange }) => (
  <div className="bp-input">
    <input 
      type={type}
      name={name}
      className="bp-field"
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
    <label className="bp-label">{label}</label>
  </div>
);

const NavigationPost = ({ direction, title, slug, icon }) => (
  <a href={`/blog/${slug}`} className={`bp-nav-item bp-nav-${direction === 'previous' ? 'prev' : 'next'}`}>
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
  // Extract ID from URL
  const getBlogIdFromUrl = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1]; // Get the last part of the URL
  };

  const [blogId] = useState(getBlogIdFromUrl());
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentForm, setCommentForm] = useState({
    author: '',
    email: '',
    website: '',
    content: ''
  });
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    fetchBlogPost();
  }, [blogId]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/blogs/${blogId}`);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check content type before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON. The API endpoint may not exist or is returning HTML.");
      }
      
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
      } else {
        setError(data.message || 'Blog post not found');
      }
    } catch (err) {
      setError(`Error loading blog post: ${err.message}`);
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentSubmitting(true);
    setCommentSuccess(false);

    try {
      const response = await fetch(`/api/blogs/${blog._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentForm)
      });

      const data = await response.json();

      if (data.success) {
        setCommentSuccess(true);
        setCommentForm({
          author: '',
          email: '',
          website: '',
          content: ''
        });
        // Optionally refresh blog data to show new comment count
        setTimeout(() => setCommentSuccess(false), 5000);
      } else {
        alert('Error submitting comment: ' + (data.message || 'Please try again'));
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Error submitting comment. Please try again.');
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleReply = (commentId) => {
    console.log(`Replying to comment ${commentId}`);
    // You can implement reply functionality here
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blogs/${blog._id}/like`, {
        method: 'PUT'
      });
      const data = await response.json();
      
      if (data.success) {
        setBlog(prev => ({
          ...prev,
          likes: data.data.likes
        }));
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleShare = async (platform) => {
    try {
      const response = await fetch(`/api/blogs/${blog._id}/share`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform })
      });
      const data = await response.json();
      
      if (data.success) {
        setBlog(prev => ({
          ...prev,
          socialShares: data.data.socialShares
        }));
      }
    } catch (err) {
      console.error('Error tracking share:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <p>Loading blog post...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Blog Post Not Found</h2>
          <p>{error || 'The blog post you are looking for does not exist.'}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <article className="bp-post">
      <Navbar/>
      {/* Header */}
      <header className="bp-hdr">
        <h1 className="bp-title">
          {blog.title}
        </h1>
        
        <div className="bp-meta">
          <div className="bp-author">
            <Avatar 
              src={blog.author.avatar || '/default-avatar.jpg'}
              alt={`${blog.author.name} avatar`}
              size={40}
            />
            <span className="bp-author-name">{blog.author.name}</span>
          </div>
          
          <div className="bp-tags">
            {blog.tags && blog.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
          
          <time className="bp-date">
            {new Date(blog.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>
      </header>

      {/* Featured Image */}
      <div className="bp-hero">
        <img 
          src={blog.images.hero}
          alt={blog.images.alt || blog.title}
          className="bp-hero-img"
        />
      </div>

      {/* Content */}
      <div className="bp-content">
        <p className="bp-intro">
          {blog.content.intro}
        </p>

        <p className="bp-body">
          {blog.content.body}
        </p>

        {blog.content.quote && blog.content.quote.text && (
          <Quote 
            text={blog.content.quote.text}
            author={blog.content.quote.author}
          />
        )}

        {/* Learning Section */}
        {(blog.keyFeatures?.leftColumn?.length > 0 || blog.keyFeatures?.rightColumn?.length > 0) && (
          <section className="bp-learn">
            <h2 className="bp-learn-title">Key Features & Benefits</h2>
            
            <div className="bp-learn-grid">
              {blog.keyFeatures.leftColumn && (
                <LearningList items={blog.keyFeatures.leftColumn} />
              )}
              {blog.keyFeatures.rightColumn && (
                <LearningList items={blog.keyFeatures.rightColumn} />
              )}
            </div>
          </section>
        )}

        {/* Requirements Section */}
        {blog.requirements && blog.requirements.length > 0 && (
          <section className="bp-req">
            <h2 className="bp-req-title">Ownership Considerations</h2>
            {blog.images.content && (
              <div className="bp-req-img-wrap">
                <img src={blog.images.content} alt={blog.images.alt || 'Content image'} className="bp-req-img" />
              </div>
            )}
            <div className="bp-req-list">
              {blog.requirements.map((requirement, index) => (
                <RequirementItem key={index}>{requirement}</RequirementItem>
              ))}
            </div>
          </section>
        )}

        {/* Social Share Section */}
        <section className="bp-share">
          <div className="bp-share-wrap">
            <span className="bp-share-label"><strong>Share this post</strong></span>
            <div className="bp-share-btns">
              <img src={Facebook} alt="Facebook" onClick={() => handleShare('facebook')} style={{cursor: 'pointer'}} />
              <img src={Instagram} alt="Instagram" style={{cursor: 'pointer'}} />
              <img src={Twitter} alt="Twitter" onClick={() => handleShare('twitter')} style={{cursor: 'pointer'}} />
              <img src={Pinterest} alt="Pinterest" onClick={() => handleShare('pinterest')} style={{cursor: 'pointer'}} />
            </div>
            <div className="bp-share-tags">
              {blog.tags && blog.tags.map((tag, index) => (
                <TagButton key={index}>{tag}</TagButton>
              ))}
            </div>
          </div>
        </section>

        {/* Author Bio Section */}
        {blog.author.bio && (
          <section className="bp-bio">
            <div className="bp-bio-av">
              <Avatar src={blog.author.avatar || '/default-avatar.jpg'} alt={blog.author.name} size={70} />
            </div>
            <div className="bp-bio-content">
              <h3 className="bp-bio-name">{blog.author.name}</h3>
              <p className="bp-bio-desc">
                {blog.author.bio}
              </p>
            </div>
          </section>
        )}

        {/* Post Navigation */}
        {(blog.navigation?.previous || blog.navigation?.next) && (
          <nav className="bp-nav">
            {blog.navigation.previous && blog.navigation.previous.title && (
              <NavigationPost 
                direction="previous"
                title={blog.navigation.previous.title}
                slug={blog.navigation.previous.slug}
                icon="←"
              />
            )}
            {blog.navigation.next && blog.navigation.next.title && (
              <NavigationPost 
                direction="next"
                title={blog.navigation.next.title}
                slug={blog.navigation.next.slug}
                icon="→"
              />
            )}
          </nav>
        )}

        {/* Comments Section */}
        {blog.approvedComments && blog.approvedComments.length > 0 && (
          <section className="bp-comments">
            <h2 className="bp-c-title">{blog.approvedComments.length} Comment{blog.approvedComments.length !== 1 ? 's' : ''}</h2>
            <div className="bp-c-list">
              {blog.approvedComments.map((comment) => (
                <Comment
                  key={comment._id}
                  avatar={'/default-avatar.jpg'} // You can add avatar field to comment schema
                  name={comment.author}
                  date={comment.createdAt}
                  content={comment.content}
                  onReply={() => handleReply(comment._id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Comment Form */}
        <section className="bp-form-wrap">
          <h2 className="bp-form-title">Leave a Comment</h2>
          {commentSuccess && (
            <div style={{ padding: '15px', marginBottom: '20px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px' }}>
              Comment submitted successfully! It will be visible after approval.
            </div>
          )}
          <form className="bp-form" onSubmit={handleCommentSubmit}>
            <div className="bp-form-row">
              <FormInput 
                label="Name" 
                placeholder="Your Name" 
                name="author"
                value={commentForm.author}
                onChange={handleCommentInputChange}
                required 
              />
              <FormInput 
                label="Email" 
                placeholder="Your Email" 
                type="email" 
                name="email"
                value={commentForm.email}
                onChange={handleCommentInputChange}
                required 
              />
            </div>
            <FormInput 
              label="Website" 
              placeholder="Your Website" 
              name="website"
              value={commentForm.website}
              onChange={handleCommentInputChange}
            />
            
            <div className="bp-textarea-wrap">
              <textarea 
                className="bp-textarea"
                name="content"
                placeholder="Write your comment here..."
                value={commentForm.content}
                onChange={handleCommentInputChange}
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
            
            <button type="submit" className="bp-submit" disabled={commentSubmitting}>
              {commentSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        </section>
      </div>
      <Footer/>
    </article>
  );
};

export default BlogPost;