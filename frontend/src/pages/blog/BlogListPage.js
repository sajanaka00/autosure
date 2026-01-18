import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BlogHero from '../../components/blog/BlogHero';
import BlogFilterBar from '../../components/blog/BlogFilterBar';
import BlogFeaturedPost from '../../components/blog/BlogFeaturedPost';
import BlogList from '../../components/blog/BlogList';
import BlogNewsletter from '../../components/blog/BlogNewsletter';
import './BlogListPage.css';

// Default images (keeping existing imports for fallback data in case they are needed here or passed down)
import car1Image from '../../assets/images/cars/bmw.jpg';
import car2Image from '../../assets/images/cars/blog2.jpg';
import car3Image from '../../assets/images/cars/blog3.jpg';
import car4Image from '../../assets/images/cars/blog4.jpg';
import car5Image from '../../assets/images/cars/blog5.jpg';
import car6Image from '../../assets/images/cars/blog6.jpg';

import { fallbackBlogPosts } from '../../data/blogData';

import { tokenManager } from '../../utils/tokenManager';

const BlogListPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPost, setFeaturedPost] = useState(null);
  const [user, setUser] = useState(tokenManager.getUser());

  const navigate = useNavigate();

  const handleLogout = () => {
    tokenManager.removeToken();
    tokenManager.removeUser();
    setUser(null);
    navigate('/login');
  };

  const defaultImages = [car1Image, car2Image, car3Image, car4Image, car5Image, car6Image];
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  const categories = [
    'All', 'Reviews', 'Technology', 'Industry News', 'Maintenance', 'Lifestyle'
  ];

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blogs`);

      let data;
      if (response.ok) {
        data = await response.json();
      }

      if (data && data.success && data.data.length > 0) {
        const enhancedData = data.data.map((blog, index) => ({
          ...blog,
          image: blog.heroImage || blog.image || defaultImages[index % defaultImages.length],
          readTime: `${Math.floor(Math.random() * 5) + 3} min read`
        }));

        setFeaturedPost(enhancedData[0]);
        setAllPosts(enhancedData);
        setBlogPosts(enhancedData);
      } else {
        throw new Error('Using fallback data');
      }
    } catch (err) {
      console.log('Using fallback data due to:', err.message);
      setFeaturedPost(fallbackBlogPosts[0]);
      setAllPosts(fallbackBlogPosts);
      setBlogPosts(fallbackBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = allPosts;

    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory || (post.tags && post.tags.includes(selectedCategory)));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    setBlogPosts(result);
  }, [selectedCategory, searchQuery, allPosts]);

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="modern-blog-page">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="blog-main-content">
        <BlogHero />

        <BlogFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <BlogFeaturedPost
          featuredPost={featuredPost}
          formatDate={formatDate}
        />

        <BlogList
          blogPosts={blogPosts}
          loading={loading}
          formatDate={formatDate}
        />

        <BlogNewsletter />
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage;