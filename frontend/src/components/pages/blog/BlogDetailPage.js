import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import '../../../styles/blog-detail.css';

const BlogDetailPage = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);

  // Base API URL - adjust this to match your backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  // Fetch blog data by ID or slug
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch by ID first, then by slug if ID fails
        let response;
        if (blogId.match(/^[0-9a-fA-F]{24}$/)) {
          // It's a MongoDB ObjectId
          response = await fetch(`${API_BASE_URL}/blogs/${blogId}`);
        } else {
          // It's likely a slug
          response = await fetch(`${API_BASE_URL}/blogs/slug/${blogId}`);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setBlogData(result.data);
          // Fetch related posts
          fetchRelatedPosts(result.data._id);
        } else {
          throw new Error(result.message || 'Failed to fetch blog');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogData();
    }
  }, [blogId, API_BASE_URL]);

  // Fetch related posts
  const fetchRelatedPosts = async (currentBlogId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${currentBlogId}/related?limit=3`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setRelatedPosts(result.data);
        }
      }
    } catch (err) {
      console.error('Error fetching related posts:', err);
    }
  };

  // Handle like functionality
  const handleLike = async () => {
    if (!blogData || likeLoading) return;

    try {
      setLikeLoading(true);
      const response = await fetch(`${API_BASE_URL}/blogs/${blogData._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBlogData(prev => ({
            ...prev,
            likes: result.likes
          }));
        }
      }
    } catch (err) {
      console.error('Error liking blog:', err);
    } finally {
      setLikeLoading(false);
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !comment.trim()) {
      setCommentError('Please fill in all required fields');
      return;
    }

    if (!blogData) return;

    try {
      setCommentLoading(true);
      setCommentError(null);

      const response = await fetch(`${API_BASE_URL}/blogs/${blogData._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: name,
          email: email,
          content: comment
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Clear form
        setComment('');
        if (!saveInfo) {
          setName('');
          setEmail('');
        }
        setSaveInfo(false);
        
        // Show success message with better UX
        setCommentError(null);
        // You could add a success state here instead of alert
        alert('Comment submitted successfully! It will appear after approval.');
        
        // Optionally refresh the blog data to show updated comments
        // You might want to implement a more sophisticated state update here
      } else {
        throw new Error(result.message || 'Failed to submit comment');
      }
    } catch (err) {
      setCommentError(err.message);
      console.error('Error submitting comment:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  // Handle social sharing
  const handleShare = (platform) => {
    if (!blogData) return;
    
    const url = window.location.href;
    const title = blogData.title;
    const text = blogData.excerpt || blogData.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time
  const getReadingTime = (content) => {
    if (!content) return 'N/A';
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="blog-detail-page">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <div className="loading-state">
              <div className="loading-spinner">⟳</div>
              <h2>Loading article...</h2>
              <p>Please wait while we fetch the content</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="blog-detail-page">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <h2>Oops! Something went wrong</h2>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-btn"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No blog data
  if (!blogData) {
    return (
      <div className="blog-detail-page">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <div className="not-found-state">
              <div className="not-found-icon">🔍</div>
              <h2>Article not found</h2>
              <p>The article you're looking for doesn't exist or has been removed.</p>
              <Link to="/blog" className="back-to-blog-btn">
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="blog-content">
            {/* Blog Header */}
            <div className="blog-header">
              <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span>›</span>
                <Link to="/blog">Blog</Link>
                <span>›</span>
                <span>{blogData.category}</span>
              </div>
              <h1 className="blog-title">{blogData.title}</h1>
              <div className="blog-meta">
                <div className="author-info">
                  <img 
                    src={blogData.authorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"} 
                    alt={blogData.author} 
                    className="author-avatar" 
                  />
                  <span className="author-name">{blogData.author}</span>
                  <span className="category">{blogData.category}</span>
                  <span className="date">{formatDate(blogData.createdAt)}</span>
                  <span className="views">{blogData.views} views</span>
                  <button 
                    onClick={handleLike} 
                    className="like-btn"
                    disabled={likeLoading}
                    aria-label="Like this post"
                  >
                    ❤️ {blogData.likes || 0} {likeLoading && '...'}
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {blogData.heroImage && (
              <div className="featured-image">
                <img src={blogData.heroImage} alt={blogData.title} className="blog-image" />
              </div>
            )}

            {/* Blog Excerpt */}
            {blogData.excerpt && (
              <div className="blog-excerpt">
                <p>{blogData.excerpt}</p>
              </div>
            )}

            {/* Blog Content */}
            <div className="blog-text">
              <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
            </div>

            {/* Key Points Section */}
            {blogData.keyPoints && blogData.keyPoints.length > 0 && (
              <div className="learning-section">
                <h3>Key Takeaways</h3>
                <div className="learning-content">
                  <div className="learning-column">
                    {blogData.keyPoints.map((point, index) => (
                      <div key={index} className="learning-item">
                        <span className="check-icon">✓</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content Image */}
            {blogData.contentImage && (
              <div className="second-image">
                <img src={blogData.contentImage} alt="Additional content" className="blog-image" />
              </div>
            )}

            {/* Requirements Section */}
            {blogData.requirements && blogData.requirements.length > 0 && (
              <div className="requirements-section">
                <h3>Prerequisites</h3>
                <ul className="requirements-list">
                  {blogData.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags Section */}
            {blogData.tags && blogData.tags.length > 0 && (
              <div className="tags-section">
                <span className="tags-label">Tags:</span>
                <div className="tags-list">
                  {blogData.tags.map((tag, index) => (
                    <span key={index} className="tag" onClick={() => console.log(`Search tag: ${tag}`)}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="share-section">
              <div className="share-left">
                <span className="share-text">Share this article:</span>
                <div className="social-icons">
                  <button 
                    onClick={() => handleShare('facebook')} 
                    className="social-icon facebook"
                    aria-label="Share on Facebook"
                  >
                    f
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')} 
                    className="social-icon twitter"
                    aria-label="Share on Twitter"
                  >
                    t
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')} 
                    className="social-icon linkedin"
                    aria-label="Share on LinkedIn"
                  >
                    in
                  </button>
                  <button 
                    onClick={() => handleShare('pinterest')} 
                    className="social-icon pinterest"
                    aria-label="Share on Pinterest"
                  >
                    p
                  </button>
                  <button 
                    onClick={handleCopyLink} 
                    className="social-icon copy-link"
                    aria-label="Copy link"
                  >
                    🔗
                  </button>
                </div>
              </div>
              <div className="post-meta">
                <span className="reading-time">
                  📖 {blogData.estimatedReadTime || getReadingTime(blogData.content)}
                </span>
              </div>
            </div>

            {/* Author Section */}
            <div className="author-section">
              <img 
                src={blogData.authorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80"} 
                alt={blogData.author} 
                className="author-large-avatar" 
              />
              <div className="author-details">
                <h4>About {blogData.author}</h4>
                <p>{blogData.authorBio || 'This author hasn\'t provided a bio yet, but their content speaks for itself!'}</p>
                <div className="author-social">
                  <button className="author-follow-btn">Follow</button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h3>
                {blogData.comments?.filter(comment => comment.approved).length || 0} Comments
              </h3>
              
              {blogData.comments?.filter(comment => comment.approved).map((comment, index) => (
                <div key={comment._id || index} className="comment">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&size=50&background=random`} 
                    alt={comment.author} 
                    className="comment-avatar" 
                  />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p>{comment.content}</p>
                    <div className="comment-actions">
                      <button className="comment-reply-btn">Reply</button>
                      <button className="comment-like-btn">👍 {comment.likes || 0}</button>
                    </div>
                  </div>
                </div>
              ))}

              {blogData.comments?.filter(comment => comment.approved).length === 0 && (
                <div className="no-comments">
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>

            {/* Comment Form */}
            <div className="comment-form-section">
              <h3>Join the Discussion</h3>
              {commentError && (
                <div className="error-message">
                  {commentError}
                </div>
              )}
              <form onSubmit={handleSubmitComment} className="comment-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    disabled={commentLoading}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    disabled={commentLoading}
                    required
                  />
                </div>
                <textarea
                  placeholder="Share your thoughts...*"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-textarea"
                  disabled={commentLoading}
                  required
                ></textarea>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="save-info"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    disabled={commentLoading}
                  />
                  <label htmlFor="save-info">
                    Save my name and email for next time
                  </label>
                </div>
                <button 
                  type="submit"
                  className="submit-btn"
                  disabled={commentLoading}
                >
                  {commentLoading ? (
                    <>
                      <span className="spinner">⟳</span>
                      Submitting...
                    </>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </form>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="related-posts-section">
                <h3>You Might Also Like</h3>
                <div className="related-posts-grid">
                  {relatedPosts.map((post) => (
                    <Link 
                      key={post._id} 
                      to={`/blog/${post.slug || post._id}`} 
                      className="related-post"
                    >
                      <div className="related-post-image-container">
                        <img 
                          src={post.heroImage || "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"} 
                          alt={post.title} 
                          className="related-post-image" 
                        />
                        <div className="related-post-overlay">
                          <span className="read-more">Read More →</span>
                        </div>
                      </div>
                      <div className="related-post-content">
                        <span className="related-post-category">{post.category}</span>
                        <span className="related-post-date">{formatDate(post.createdAt)}</span>
                        <h4>{post.title}</h4>
                        <p>{post.excerpt}</p>
                        <div className="related-post-meta">
                          <span className="reading-time">
                            {post.estimatedReadTime || getReadingTime(post.content)}
                          </span>
                          <span className="views">{post.views} views</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
