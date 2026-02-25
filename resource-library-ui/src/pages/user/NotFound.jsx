import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{ padding: '4rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}
            >
                <h1 style={{ fontSize: '6rem', color: 'var(--primary)', marginBottom: '1rem', lineHeight: '1' }}>404</h1>
                <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/home" style={{ display: 'inline-block', padding: '0.8rem 2rem', background: 'var(--primary)', color: 'white', textDecoration: 'none', borderRadius: '30px', fontWeight: '600', transition: 'transform 0.2s' }}>
                    Return to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
