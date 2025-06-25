import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/blog.css';

const BlogPage = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      category: "Sound",
      image: "/api/placeholder/400/250",
      title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
      author: "Admin",
      date: "November 22, 2023"
    },
    {
      id: 2,
      category: "Accessories",
      image: "/api/placeholder/400/250",
      title: "BMW X6 M50i is designed to exceed your sportiest.",
      author: "Admin",
      date: "November 22, 2023"
    },
    {
      id: 3,
      category: "Exterior",
      image: "/api/placeholder/400/250",
      title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
      author: "Admin",
      date: "November 22, 2023"
    },
    {
      id: 4,
      category: "Body Kit",
      image: "/api/placeholder/400/250",
      title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle",
      author: "Admin",
      date: "November 22, 2023"
    },
    {
      id: 5,
      category: "Fuel Systems",
      image: "/api/placeholder/400/250",
      title: "2024 BMW Hybrid gives up nothing with its optimized",
      author: "Admin",
      date: "November 22, 2023"
    },
    {
      id: 6,
      category: "Exterior",
      image: "/api/placeholder/400/250",
      title: "2024 BMW X3 M Sport Seats – available as a standalone option",
      author: "Admin",
      date: "November 22, 2023"
    },
    {
      id: 7,
      category: "Body Kit",
      image: "/api/placeholder/400/250",
      title: "2023 Carnival Standard blind-spot & forward collision avoidance",
      author: "Admin",
      date: "November 22, 2023"
    },
    {
      id: 8,
      category: "Sound",
      image: "/api/placeholder/400/250",
      title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
      author: "Admin",
      date: "September 19, 2023"
    },
    {
      id: 9,
      category: "Oil & Filters",
      image: "/api/placeholder/400/250",
      title: "Battle of the SUVs – Kia Sportage vs Hyundai Tucson",
      author: "Admin",
      date: "September 19, 2023"
    }
  ];

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="blog-container">
      <div className="breadcrumb">
        <span className="breadcrumb-link">Home</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Blog</span>
      </div>
      
      <h1 className="blog-title">Blog</h1>
      
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article 
            key={post.id} 
            className="blog-card"
            onClick={() => handleBlogClick(post.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
              <span className="category-tag">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-meta">
                <span className="blog-author">{post.author}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
            </div>
          </article>
        ))}
      </div>
      
      <div className="pagination">
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn pagination-next">→</button>
      </div>
    </div>
  );
};

export default BlogPage;