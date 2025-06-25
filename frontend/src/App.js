import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthApp from './components/auth/AuthApp';
import ExploreAllVehicles from './components/dashboard/ExploreAllVehicles';
import CarListing from './components/dashboard/CarListing';
import BlogPage from './components/dashboard/BlogPage';

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
          <Route path="/news" element={<BlogPage />} />
          
          {/* Fallback route */}
          <Route path="*" element={<AuthApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;