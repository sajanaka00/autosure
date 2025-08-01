import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthApp from './components/auth/AuthApp';
import ExploreAllVehicles from './components/pages/listings/ExploreAllVehicles';
import CarListing from './components/pages/listings/CarListing';
import BlogPage from './components/pages/blog/BlogPage';
import BlogDetailPage from './components/pages/blog/BlogDetailPage';
import BlogPost from './components/pages/blog/BlogPost';
import BlogForm from './components/pages/blog/BlogForm';
import BoxCarsAbout from './components/pages/about/AboutUs';
import ContactPage from './components/pages/contact/ContactPage';

function App() {
  return (  
    <div className="App">
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<AuthApp />} />
          <Route path="/auth/*" element={<AuthApp />} />
          
          {/* Vehicle routes */}
          <Route path="/car-listing/:carId" element={<CarListing />} />
          <Route path="/vehicles" element={<ExploreAllVehicles />} />
          
          {/* About route */}
          <Route path="/about" element={<BoxCarsAbout />} />

          <Route path="/contact" element={<ContactPage />} />
          
          {/* Blog routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="/news" element={<BlogPage />} />
          <Route path="/news/:newsId" element={<BlogDetailPage />} />
          
          {/* Blog Admin routes */}
          <Route path="/blog/create" element={<BlogForm />} />
          
          {/* Fallback route */}
          <Route path="*" element={<AuthApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;