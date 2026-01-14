import React from 'react';
import { motion } from 'framer-motion';

// Images
import StoryImg1 from '../../assets/images/cars/car-about2.jpg';
import StoryImg2 from '../../assets/images/cars/car-about3.jpg';

const AboutStory = () => {
    return (
        <section className="au-story-mosaic">
            <div className="au-container">
                <div className="au-mosaic-grid">

                    {/* Block 1: Lead Text */}
                    <div className="au-mosaic-block au-block-text-lead">
                        <h2>The Journey.</h2>
                        <p className="au-lead-p">
                            Founded in a small garage with just five premium vehicles and a clear vision, AutoSure has grown into a global leader in luxury automotive retail.
                        </p>
                    </div>

                    {/* Block 2: Tall Image */}
                    <motion.div
                        className="au-mosaic-block au-block-img-tall"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <img src={StoryImg1} alt="Showroom Interior" />
                    </motion.div>

                    {/* Block 3: Detail Text */}
                    <div className="au-mosaic-block au-block-text-detail">
                        <p>
                            We believed that buying a car should be as exhilarating as driving one.
                            Gone are the days of uncertainty. We built AutoSure on a foundation of radical transparency.
                        </p>
                        <div className="au-signature-swiss">
                            <span>Courtney Henry</span>
                            <small>CEO & Founder</small>
                        </div>
                    </div>

                    {/* Block 4: Wide Image */}
                    <motion.div
                        className="au-mosaic-block au-block-img-wide"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <img src={StoryImg2} alt="Steering Wheel Detail" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutStory;
