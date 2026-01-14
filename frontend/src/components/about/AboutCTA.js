import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
    return (
        <section className="au-cta-section">
            <div className="au-container">
                <div className="au-cta-box">
                    <h2>Your Dream Car is Waiting.</h2>
                    <p style={{ marginBottom: '40px', color: '#64748b' }}>
                        Browse our exclusive collection of premium vehicles and find the one that speaks to you.
                    </p>
                    <Link to="/listings" className="au-btn-primary">
                        Explore Inventory <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
