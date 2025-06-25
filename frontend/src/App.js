import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthApp from './components/auth/AuthApp';
import ExploreAllVehicles from './components/pages/listings/ExploreAllVehicles';
import CarListing from './components/pages/listings/CarListing';
import BlogPage from './components/pages/blog/BlogPage';
import BlogDetailPage from './/components/pages/blog/BlogDetailPage';

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
          
          {/* Blog routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<BlogDetailPage />} />
          <Route path="/news" element={<BlogPage />} />
          <Route path="/news/:newsId" element={<BlogDetailPage />} />
          
          {/* Fallback route */}
          <Route path="*" element={<AuthApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;