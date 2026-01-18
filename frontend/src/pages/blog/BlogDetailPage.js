import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './BlogDetailPage.css';
import { tokenManager } from '../../utils/tokenManager';

// Components
import BlogDetailHero from '../../components/blog/BlogDetailHero';
import BlogAuthorBox from '../../components/blog/BlogAuthorBox';
import BlogComments from '../../components/blog/BlogComments';
import StaticActionBar from '../../components/blog/StaticActionBar';
import BlogFeatures from '../../components/blog/BlogFeatures';

import { fallbackBlogPosts } from '../../data/blogData';

// Local Fallback Assets
import contentFallback from '../../assets/images/cars/blog-des2.jpg';

const BlogPost = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(tokenManager.getUser());

  useEffect(() => {
    fetchBlogPost();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  const handleLogout = () => {
    tokenManager.removeToken();
    tokenManager.removeUser();
    setUser(null);
    navigate('/login');
  };

  const fetchBlogPost = async () => {
    setLoading(true);

    // 1. Check local fallback first (avoids API call for demo IDs like '1', '2')
    const localPost = fallbackBlogPosts.find(p => p._id === blogId);
    if (localPost) {
      setBlog(localPost);
      setLoading(false);
      return;
    }

    // 2. Try API
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/blogs/${blogId}`);

      if (!response.ok) throw new Error("Article not found");
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      // 3. Last resort - maybe ID was somehow valid but API failed?
      // Since we already checked localPost by ID, we likely just fail here.
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="luxury-loader">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="loader-dot"
      />
    </div>
  );

  if (error || !blog) return (
    <div className="error-container">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="error-content">
        <h1>404</h1>
        <p>The story you're looking for has vanished into the horizon.</p>
        <button onClick={() => navigate('/blog')} className="luxury-button">Return to Blog</button>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="luxury-blog-detail">
      <Navbar user={user} onLogout={handleLogout} />

      <BlogDetailHero blog={blog} />

      {/* Overlapping Content Card */}
      <motion.main
        className="luxury-content-card"
      >
        <div className="content-inner">
          <div className="editorial-lead">
            {blog.content.intro}
          </div>

          <div className="article-body">
            {blog.content.body.split('\n').map((para, i) => (
              para.trim() && (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  {para}
                </motion.p>
              )
            ))}
          </div>

          {blog.content.quote?.text && (
            <motion.div
              className="editorial-quote"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="line" />
              <blockquote>"{blog.content.quote.text}"</blockquote>
              <cite>— {blog.content.quote.author || blog.author.name}</cite>
            </motion.div>
          )}

          {blog.images.content && (
            <motion.div
              className="featured-article-image"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img
                src={blog.images.content || contentFallback}
                alt="Article visual"
                onError={(e) => e.target.src = contentFallback}
              />
              <div className="image-caption">Behind the scenes of the automotive industry.</div>
            </motion.div>
          )}

          <BlogFeatures
            keyFeatures={blog.keyFeatures}
            requirements={blog.requirements}
          />

          <StaticActionBar
            liked={liked}
            onLike={() => setLiked(!liked)}
            likes={blog.likes}
            commentsCount={blog.approvedComments?.length || 0}
          />

          <BlogAuthorBox author={blog.author} />

          <BlogComments comments={blog.approvedComments} />

          <div className="article-navigation">
            <Link to="/blog" className="back-to-all">
              <ArrowLeft size={16} /> Back to Insights
            </Link>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default BlogPost;