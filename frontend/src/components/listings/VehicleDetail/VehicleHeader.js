import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Share2Line, BookmarkLine, GitCompareLine,
    ArrowRightUpLine, EyeLine, FireLine,
    Tag2Line
} from '@mingcute/react';

/* ---------- tiny sub-components ---------- */

const Breadcrumb = () => (
    <motion.nav
        className="vdph-breadcrumb"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
    >
        <span>Home</span>
        <ArrowRightUpLine size={12} className="vdph-breadcrumb__sep" />
        <span>Vehicles</span>
        <ArrowRightUpLine size={12} className="vdph-breadcrumb__sep" />
        <span className="vdph-breadcrumb__current">BMW M235i</span>
    </motion.nav>
);

const LiveBadge = () => (
    <motion.div
        className="vdph-live-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
    >
        <span className="vdph-live-dot" />
        <EyeLine size={13} />
        <span>128 viewing</span>
    </motion.div>
);

const ActionBtn = ({ icon: Icon, label, onClick, variant = 'ghost', delay = 0 }) => {
    const [saved, setSaved] = useState(false);
    const handleClick = () => {
        if (label === 'Save') setSaved(s => !s);
        onClick?.();
    };
    return (
        <motion.button
            className={`vdph-action-btn vdph-action-btn--${variant} ${label === 'Save' && saved ? 'vdph-action-btn--saved' : ''}`}
            onClick={handleClick}
            title={label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
        >
            <Icon size={17} />
            <span className="vdph-action-label">{label === 'Save' && saved ? 'Saved!' : label}</span>
        </motion.button>
    );
};

const StatChip = ({ label, value, delay }) => (
    <motion.div
        className="vdph-stat-chip"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, type: 'spring', stiffness: 200, damping: 18 }}
    >
        <span className="vdph-stat-chip__label">{label}</span>
        <span className="vdph-stat-chip__value">{value}</span>
    </motion.div>
);

/* ---------- main component ---------- */

const titleWords = ['BMW', 'M235i', 'xDrive', 'Gran', 'Coupé'];

const VehicleHeader = () => {
    return (
        <div className="vdph-root">

            {/* Row 1 — Breadcrumb + Live Badge */}
            <div className="vdph-top-row">
                <Breadcrumb />
                <LiveBadge />
            </div>

            {/* Row 2 — Big Animated Title */}
            <div className="vdph-title-block">
                {/* Accent line */}
                <motion.div
                    className="vdph-accent-line"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                />

                <h1 className="vdph-title">
                    {titleWords.map((word, i) => (
                        <motion.span
                            key={word}
                            className={`vdph-title__word ${i < 2 ? 'vdph-title__word--accent' : ''}`}
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {word}{' '}
                        </motion.span>
                    ))}
                </h1>

                {/* Badges row */}
                <motion.div
                    className="vdph-badge-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <motion.span
                        className="vdph-badge vdph-badge--hot"
                        whileHover={{ scale: 1.06 }}
                    >
                        <FireLine size={13} />
                        New Arrival
                    </motion.span>
                    <motion.span
                        className="vdph-badge vdph-badge--cert"
                        whileHover={{ scale: 1.06 }}
                    >
                        Certified Pre-owned
                    </motion.span>
                    <motion.span
                        className="vdph-badge vdph-badge--price"
                        whileHover={{ scale: 1.06 }}
                    >
                        <Tag2Line size={13} />
                        Great Deal
                    </motion.span>
                </motion.div>
            </div>

            {/* Row 3 — Stats + Actions */}
            <div className="vdph-bottom-row">
                {/* Left: stat chips */}
                <div className="vdph-stats-row">
                    <StatChip label="Year"   value="2024"      delay={0.55} />
                    <StatChip label="Body"   value="Sedan"     delay={0.62} />
                    <StatChip label="Engine" value="2.0L Turbo" delay={0.69} />
                    <StatChip label="Drive"  value="AWD"       delay={0.76} />
                    <StatChip label="Miles"  value="850 mi"    delay={0.83} />
                </div>

                {/* Right: action buttons */}
                <div className="vdph-actions-row">
                    <ActionBtn icon={Share2Line}    label="Share"   variant="ghost"   delay={0.55} />
                    <ActionBtn icon={BookmarkLine}  label="Save"    variant="ghost"   delay={0.62} />
                    <ActionBtn icon={GitCompareLine} label="Compare" variant="primary" delay={0.69} />
                </div>
            </div>
        </div>
    );
};

export default VehicleHeader;
