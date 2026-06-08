import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import VehicleListPage from './pages/listings/VehicleListPage';
import AddVehiclePage from './pages/listings/AddVehiclePage'
import VehicleDetailPage from './pages/listings/VehicleDetailPage';
import BlogListPage from './pages/blog/BlogListPage';
import CreateBlogPage from './pages/blog/CreateBlogPage';
import BlogDetailPage from './pages/blog/BlogDetailPage';
import AboutUsPage from './pages/about/AboutUsPage';
import ContactUsPage from './pages/contact/ContactUsPage';
import DealerDashboardPage from './pages/dashboard/DealerDashboardPage';

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
          <Route path="/dealer-dashboard" element={<DealerDashboardPage />} />

          {/* Blog routes */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/create" element={<CreateBlogPage />} />
          <Route path="/blog/:blogId" element={<BlogDetailPage />} />

          {/* Fallback route */}
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;