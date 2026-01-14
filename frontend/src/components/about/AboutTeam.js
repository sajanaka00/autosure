import React from 'react';
import { motion } from 'framer-motion';

// Images
import Team1 from '../../assets/images/about/team1.png';
import Team2 from '../../assets/images/about/team2.png';
import Team3 from '../../assets/images/about/team3.png';
import Team4 from '../../assets/images/about/team4.png';

const AboutTeam = () => {
    const team = [
        { name: "Courtney Henry", role: "CEO & Founder", img: Team1 },
        { name: "Jerome Bell", role: "Head of Sales", img: Team2 },
        { name: "Arlene McCoy", role: "Lead Curator", img: Team3 },
        { name: "Jenny Wilson", role: "Client Success", img: Team4 }
    ];

    return (
        <section className="au-team-section">
            <div className="au-container">
                <div className="au-section-header">
                    <h2>Meet The Curators</h2>
                    <p>The visionaries dedicated to finding your perfect drive.</p>
                </div>
                <div className="au-team-grid">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            className="au-team-card-clean"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="au-team-img-wrapper">
                                <img src={member.img} alt={member.name} />
                            </div>
                            <div className="au-team-content">
                                <h3>{member.name}</h3>
                                <span>{member.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutTeam;
