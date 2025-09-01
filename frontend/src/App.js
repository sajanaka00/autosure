import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import VehicleListPage from './components/pages/listings/VehicleListPage';
import AddVehiclePage from './components/pages/listings/AddVehiclePage'
import VehicleDetailPage from './components/pages/listings/VehicleDetailPage';
import BlogListPage from './components/pages/blog/BlogListPage';
import CreateBlogPage from './components/pages/blog/CreateBlogPage';
import BlogDetailPage from './components/pages/blog/BlogDetailPage';
import AboutUsPage from './components/pages/about/AboutUsPage';
import ContactUsPage from './components/pages/contact/ContactUsPage';
// import NewsDetailPage from './components/pages/blog/NewsDetailPage';

function App() {
  return (  
    <div className="App">
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth/*" element={<AuthPage />} />
          
          {/* Vehicle routes */}
          <Route path="/vehicles" element={<VehicleListPage />} />
          <Route path="/vehicles/add" element={<AddVehiclePage />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleDetailPage />} />
          
          {/* About US route */}
          <Route path="/about-us" element={<AboutUsPage />} />

          {/* Contact US route */}
          <Route path="/contact-us" element={<ContactUsPage />} />
          
          {/* Blog routes */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/create" element={<CreateBlogPage />} />
          <Route path="/blog/:blogId" element={<BlogDetailPage />} />

          {/* <Route path="/news" element={<BlogListPage />} />
          <Route path="/news/:newsId" element={<NewsDetailPage />} /> */}
                    
          {/* Fallback route */}
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;