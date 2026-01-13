import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap, Heart, Linkedin, Twitter, Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { tokenManager } from '../../utils/tokenManager';

// Images
import ShowroomImg from '../../assets/images/cars/car-about2.jpg';
import DetailImg from '../../assets/images/cars/car-about1.jpeg';
import Team1 from '../../assets/images/about/team1.png';
import Team2 from '../../assets/images/about/team2.png';
import Team3 from '../../assets/images/about/team3.png';
import Team4 from '../../assets/images/about/team4.png';

import './AboutUsPage.css';

const AboutUsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(tokenManager.getUser());

  const handleLogout = () => {
    tokenManager.clearAll();
    setUser(null);
    navigate('/');
  };

  const team = [
    { name: "Courtney Henry", role: "CEO & Founder", img: Team1 },
    { name: "Jerome Bell", role: "Head of Sales", img: Team2 },
    { name: "Arlene McCoy", role: "Lead Curator", img: Team3 },
    { name: "Jenny Wilson", role: "Client Success", img: Team4 }
  ];

  const brands = [
    { name: "Audi", logo: "https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png" },
    { name: "BMW", logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png" },
    { name: "Mercedes", logo: "https://logos-world.net/wp-content/uploads/2020/05/Mercedes-Benz-Logo.png" },
    { name: "Porsche", logo: "https://logos-world.net/wp-content/uploads/2021/06/Porsche-Logo.png" },
    { name: "Tesla", logo: "https://logos-world.net/wp-content/uploads/2020/10/Tesla-Logo.png" },
    { name: "Lexus", logo: "https://logos-world.net/wp-content/uploads/2021/10/Lexus-Logo.png" },
    { name: "Jaguar", logo: "https://logos-world.net/wp-content/uploads/2021/04/Jaguar-Logo.png" },
    { name: "Land Rover", logo: "https://logos-world.net/wp-content/uploads/2021/04/Land-Rover-Logo.png" }
  ];

  const timeline = [
    { year: "1985", title: "The Beginning", desc: "Founded in a small garage with just 5 premium vehicles and a vision." },
    { year: "1998", title: "Regional Expansion", desc: "Opened our flagship showroom and became the region's top luxury dealer." },
    { year: "2010", title: "Digital Pioneer", desc: "Launched one of the first fully verified online car buying platforms." },
    { year: "2024", title: "Global Reach", desc: "Serving clients in over 30 countries with our verified export program." }
  ];

  return (
    <div className="about-bento-page">
      <Navbar user={user} onLogout={handleLogout} />

      {/* 1. Hero */}
      <section className="bento-hero">
        <div className="bento-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>We Don't Just Sell Cars.<br /><span>We Sell Dreams.</span></h1>
            <p>
              AutoSure is redefining the luxury automotive landscape.
              Meticulously curated, expertly verified, and delivered with passion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Brands Marquee */}
      <section className="brands-marquee-section">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {brands.map((brand, i) => (
              <div key={i} className="brand-logo-item">
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
            {/* Duplicated for smooth infinite scroll */}
            {brands.map((brand, i) => (
              <div key={`d-${i}`} className="brand-logo-item">
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Bento Grid */}
      <section className="bento-grid-wrapper">
        <div className="bento-container">
          <div className="bento-grid">

            {/* Mission */}
            <motion.div
              className="bento-card card-vision"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>The New Standard.</h2>
              <p>
                Gone are the days of uncertainty. We built AutoSure on a foundation of radical transparency
                and obsessive quality control. Every vehicle in our inventory isn't just "stock"—it's a
                masterpiece waiting for its next driver.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="bento-card card-stats"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="stat-number">45+</div>
                <div className="stat-label">Years of Legacy</div>
              </div>
              <div style={{ marginTop: '24px' }}>
                <div className="stat-number">15K</div>
                <div className="stat-label">Verified Sales</div>
              </div>
            </motion.div>

            {/* Images */}
            <motion.div className="bento-card card-image-small" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <img src={DetailImg} alt="Car Detail" />
            </motion.div>

            <motion.div className="bento-card card-image-tall" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <img src={ShowroomImg} alt="AutoSure Showroom" />
            </motion.div>

            {/* Values */}
            <motion.div
              className="bento-card card-values"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <h2>Our Core Promises</h2>
              <div className="values-grid">
                <div className="value-item">
                  <Shield size={24} color="#2563eb" className="mb-2" />
                  <h3>100% Verified</h3>
                  <p>Every bolt checked. Verified history.</p>
                </div>
                <div className="value-item">
                  <Zap size={24} color="#2563eb" className="mb-2" />
                  <h3>Instant Process</h3>
                  <p>No paperwork headaches. Digital-first.</p>
                </div>
                <div className="value-item">
                  <Star size={24} color="#2563eb" className="mb-2" />
                  <h3>Premium Only</h3>
                  <p>Top 1% of vehicles we find.</p>
                </div>
                <div className="value-item">
                  <Heart size={24} color="#2563eb" className="mb-2" />
                  <h3>Satisfaction</h3>
                  <p>7-day money-back guarantee.</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="bento-card card-cta"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <h3>Found your dream car?</h3>
              <a href="/listings" className="bento-btn">
                Browse Inventory <ArrowRight size={18} />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. The Journey (Timeline) */}
      <section className="history-section">
        <div className="bento-container">
          <div className="history-header">
            <h2>Our Journey</h2>
            <p>From humble beginnings to a global leader.</p>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Curators (Premium Grid) */}
      <section className="curators-section">
        <div className="bento-container">
          <div className="history-header">
            <h2>The Curators</h2>
            <p>Meet the visionaries behind our standard of excellence.</p>
          </div>

          <div className="curator-magazine-grid">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="curator-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img src={member.img} alt={member.name} />
                <div className="curator-overlay">
                  <div className="curator-info">
                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
                  </div>
                  <div className="curator-socials">
                    <div className="c-social-icon"><Linkedin size={18} /></div>
                    <div className="c-social-icon"><Twitter size={18} /></div>
                    <div className="c-social-icon"><Mail size={18} /></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;