import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const CircularRating = ({ rating, size = 140, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = (rating / 5) * 100;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    return (
        <div className="modern-rating-circle" style={{ width: size, height: size }}>
            <svg width={size} height={size}>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e2e8f0" strokeWidth={strokeWidth} fill="none" />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={radius} stroke="var(--vdp-accent)" strokeWidth={strokeWidth} fill="none"
                    strokeLinecap="round" strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: strokeDashoffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
            <div className="modern-rating-circle__content">
                <span className="modern-rating-circle__number">{rating}</span>
            </div>
        </div>
    );
};

const StarRating = ({ rating, isInteractive = false, onRatingChange, size = 18 }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const displayRating = isInteractive && hoverRating > 0 ? hoverRating : rating;

    return (
        <div className={`modern-stars ${isInteractive ? 'interactive' : ''}`} onMouseLeave={() => isInteractive && setHoverRating(0)}>
            <div style={{ display: 'flex', gap: '6px' }}>
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={size}
                        className={`modern-star-svg ${index < displayRating ? 'filled' : 'empty'}`}
                        style={{ cursor: isInteractive ? 'pointer' : 'default', strokeWidth: 0, fill: index < displayRating ? 'var(--vdp-accent)' : '#e2e8f0' }}
                        onClick={() => isInteractive && onRatingChange && onRatingChange(index + 1)}
                        onMouseEnter={() => isInteractive && setHoverRating(index + 1)}
                    />
                ))}
            </div>
        </div>
    );
};

const ReviewItem = ({ reviewer, date, rating, text, index }) => (
    <motion.div
        className="modern-review-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="modern-review-card__header">
            <div className="modern-review-card__avatar">{reviewer.charAt(0)}</div>
            <div className="modern-review-card__info">
                <h3>{reviewer}</h3>
                <span>{date}</span>
            </div>
            <div className="modern-review-card__rating">
                <StarRating rating={rating} size={14} />
            </div>
        </div>
        <p className="modern-review-card__text">{text}</p>
    </motion.div>
);

const VehicleReviews = () => {
    const [reviews, setReviews] = useState([
        { id: 1, reviewer: "Michael Thompson", date: "Jan 2024", rating: 4.8, text: "The M235i exceeded all expectations. The balance between track-ready performance and daily comfort is simply unmatched in this segment." },
        { id: 2, reviewer: "Emily Rodriguez", date: "Dec 2023", rating: 4.6, text: "Sublime handling and a tech-forward interior. BMW has truly refined the Gran Coupé experience." }
    ]);

    const [formData, setFormData] = useState({ name: '', email: '', review: '', ratings: { performance: 0, comfort: 0, value: 0, reliability: 0, experience: 0 } });

    const overallRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        return parseFloat(avg.toFixed(1));
    }, [reviews]);

    const handleRatingChange = (category, val) => {
        setFormData(prev => ({ ...prev, ratings: { ...prev.ratings, [category]: val } }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const avg = Object.values(formData.ratings).reduce((s, r) => s + r, 0) / 5 || 5;
        const newRev = {
            id: Date.now(),
            reviewer: formData.name,
            date: "Just now",
            rating: Math.round(avg * 10) / 10,
            text: formData.review
        };
        setReviews([newRev, ...reviews]);
        setFormData({ name: '', email: '', review: '', ratings: { performance: 0, comfort: 0, value: 0, reliability: 0, experience: 0 } });
    };

    return (
        <div className="cl-reviews-section full-width">
            <section className="modern-reviews-intro">
                <h2 className="cl-section-title">Verified Reviews</h2>
                <div className="modern-rating-summary">
                    <CircularRating rating={overallRating} />
                    <div className="modern-rating-summary__text">
                        <span>{reviews.length} Experiences Shared</span>
                        <p>Based on actual owners and performance tests.</p>
                    </div>
                </div>
            </section>

            <div className="modern-reviews-grid">
                <div className="modern-review-submission">
                    <div className="modern-review-submission-wrapper">
                        {/* Sidebar: Purpose Statement */}
                        <div className="modern-submission-sidebar">
                            <h3>Share Your Experience</h3>
                            <p>Your feedback helps other drivers find their perfect vehicle. Share your thoughts on performance, comfort, and daily drivability.</p>
                        </div>

                        {/* Form Content */}
                        <div className="modern-submission-content">
                            <form onSubmit={handleSubmit} className="modern-submission-form">
                                <div className="modern-input-row">
                                    <div className="modern-input-group">
                                        <label className="modern-input-label">Your Name</label>
                                        <input className="modern-input-field" type="text" placeholder="e.g. Alex Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="modern-input-group">
                                        <label className="modern-input-label">Email Address</label>
                                        <input className="modern-input-field" type="email" placeholder="alex@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                                    </div>
                                </div>

                                <div className="modern-input-group">
                                    <label className="modern-input-label">Rate this Vehicle</label>
                                    <div className="modern-rating-group">
                                        {['Performance', 'Comfort', 'Value', 'Reliability', 'Experience'].map(cat => (
                                            <div key={cat} className="modern-rating-item">
                                                <span className="modern-rating-label">{cat}</span>
                                                <StarRating rating={formData.ratings[cat.toLowerCase()] || 0} isInteractive={true} onRatingChange={(v) => handleRatingChange(cat.toLowerCase(), v)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="modern-input-group">
                                    <label className="modern-input-label">Your Review</label>
                                    <textarea className="modern-input-field" placeholder="What's the best part? any downsides? Tell us everything..." value={formData.review} onChange={e => setFormData({ ...formData, review: e.target.value })} required />
                                </div>

                                <button type="submit" className="modern-submit-btn">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modern-reviews-history">
                    <AnimatePresence>
                        {reviews.map((rev, idx) => (
                            <ReviewItem key={rev.id} {...rev} index={idx} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default VehicleReviews;
