import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import VehicleHeader from '../../components/listings/VehicleDetail/VehicleHeader';
import VehicleImageGrid from '../../components/listings/VehicleDetail/VehicleImageGrid';
import VehicleOverview from '../../components/listings/VehicleDetail/VehicleOverview';
import VehicleDescription from '../../components/listings/VehicleDetail/VehicleDescription';
import VehicleFeatures from '../../components/listings/VehicleDetail/VehicleFeatures';
import VehicleSpecs from '../../components/listings/VehicleDetail/VehicleSpecs';
import VehicleDealerCard from '../../components/listings/VehicleDetail/VehicleDealerCard';
import VehicleReviews from '../../components/listings/VehicleDetail/VehicleReviews';
import VehicleMap from '../../components/listings/VehicleDetail/VehicleMap';

import './VehicleDetailPage.css';

const VehicleDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="modern-vdp">
      <Navbar />

      <main className="modern-vdp-main">
        <section className="modern-vdp-header-section">
          <div className="modern-vdp-wrapper">
            <VehicleHeader />
          </div>
        </section>
        {/* 1. Header & Gallery */}
        <section className="modern-vdp-hero">
          <div className="modern-vdp-wrapper">
            {/* Breadcrumbs or Back can go here */}
            <VehicleImageGrid />
          </div>
        </section>

        {/* 2. Main Body: Split Layout */}
        <section className="modern-vdp-body">
          <div className="modern-vdp-wrapper modern-vdp-main-grid">

            {/* LEFT COLUMN: Main Info */}
            <motion.div
              className="modern-vdp-left-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Title, attributes, simple tags */}
              <div className="vdp-content-section">
                <VehicleOverview /> {/* Key stats strip */}
              </div>

              <div className="vdp-content-section">
                <VehicleDescription />
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Sticky Sidebar */}
            <aside className="modern-vdp-sidebar-col">
              <div className="modern-vdp-sticky">
                <VehicleDealerCard />
              </div>
            </aside>

          </div>
        </section>

        {/* 3. Full Width Features & Specs */}
        <section className="modern-vdp-full-width-block bg-white">
          <div className="modern-vdp-wrapper py-12">
            <VehicleFeatures />
          </div>
        </section>

        <section className="modern-vdp-full-width-block">
          <div className="modern-vdp-wrapper py-12">
            <VehicleSpecs />
          </div>
        </section>

        {/* 4. Full Width immersive sections - Location */}
        <section className="modern-vdp-full-width-block">
          <div className="modern-vdp-wrapper">
            <VehicleLocationBlock />
          </div>
        </section>

        <section className="modern-vdp-full-width-block modern-vdp-reviews-block">
          <div className="modern-vdp-wrapper">
            <VehicleReviews />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Internal Helper for Map Section stability
const VehicleLocationBlock = () => (
  <div className="modern-vdp-location-wrapper">
    <VehicleMap />
  </div>
);

export default VehicleDetailPage;