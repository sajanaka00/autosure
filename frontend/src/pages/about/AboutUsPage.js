import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { tokenManager } from '../../utils/tokenManager';

// Components
import AboutHero from '../../components/about/AboutHero';
import AboutStory from '../../components/about/AboutStory';
import AboutStats from '../../components/about/AboutStats';
import AboutValues from '../../components/about/AboutValues';
import AboutTeam from '../../components/about/AboutTeam';
import AboutMarquee from '../../components/about/AboutMarquee';
import AboutCTA from '../../components/about/AboutCTA';

import './AboutUsPage.css';

const AboutUsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(tokenManager.getUser());

  const handleLogout = () => {
    tokenManager.clearAll();
    setUser(null);
    navigate('/');
  };

  return (
    <div className="about-page-wrapper">
      <Navbar user={user} onLogout={handleLogout} />

      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <AboutMarquee />
      <AboutCTA />

      <Footer />
    </div>
  );
};

export default AboutUsPage;