import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BMW1 from '../../../assets/images/cars/bmw.jpg';
import BMW2 from '../../../assets/images/cars/bmw2.jpg';
import BMW3 from '../../../assets/images/cars/bmw3.jpg';
import BMW4 from '../../../assets/images/cars/bmw4.jpg';

const VehicleGallery = () => {
    const images = [BMW1, BMW2, BMW3, BMW4];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="cl-gallery">
            <div className="cl-gallery__main">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeIndex}
                        src={images[activeIndex]}
                        alt="Vehicle"
                        className="cl-gallery__main-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
            </div>
            <div className="cl-gallery__thumbnails">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`cl-gallery__thumbnail ${activeIndex === idx ? 'active' : ''}`}
                        onClick={() => setActiveIndex(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default VehicleGallery;
