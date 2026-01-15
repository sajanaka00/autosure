import React, { useState, useEffect } from 'react';
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

const BlogListPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPost, setFeaturedPost] = useState(null);

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
      const fallbackData = [
        { _id: '1', category: "Technology", title: "The Future of Electric Architecture", excerpt: "Exploring how EV platforms are revolutionizing vehicle design and interior space.", author: "Alex Morgan", createdAt: "2024-03-15", image: car1Image, readTime: "5 min read" },
        { _id: '2', category: "Reviews", title: "2024 BMW X5: A Masterclass in Luxury", excerpt: "Detailed breakdown of the new X5's performance, comfort, and tech features.", author: "Sarah Jenkins", createdAt: "2024-03-12", image: car2Image, readTime: "8 min read" },
        { _id: '3', category: "Industry News", title: "Global Automotive Trends Report 2024", excerpt: "Key insights into where the automotive industry is heading in the next decade.", author: "David Chen", createdAt: "2024-03-10", image: car3Image, readTime: "12 min read" },
        { _id: '4', category: "Maintenance", title: "Essential Spring Car Care Guide", excerpt: "Get your vehicle ready for the warmer months with this comprehensive checklist.", author: "Mike Ross", createdAt: "2024-03-08", image: car4Image, readTime: "4 min read" },
        { _id: '5', category: "Lifestyle", title: "Best Road Trip Routes for Summer", excerpt: "Discover hidden gems and scenic routes across the country for your next adventure.", author: "Emma Wilson", createdAt: "2024-03-05", image: car5Image, readTime: "6 min read" },
        { _id: '6', category: "Technology", title: "AI in Automotive Safety Systems", excerpt: "How artificial intelligence is making our roads safer than ever before.", author: "James Lee", createdAt: "2024-03-01", image: car6Image, readTime: "7 min read" },
      ];
      setFeaturedPost(fallbackData[0]);
      setAllPosts(fallbackData);
      setBlogPosts(fallbackData);
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
      <Navbar />

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