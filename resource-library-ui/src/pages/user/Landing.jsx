import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();

    const handleEnter = () => {
        // Simple navigation, framer-motion AnimatePresence in App.jsx handles the transition
        navigate('/home');
    };

    return (
        <div className="landing-page">
            <div className="landing-bg">
                <div className="landing-blob blob-1"></div>
                <div className="landing-blob blob-2"></div>
                <div className="landing-blob blob-3"></div>
            </div>

            <motion.div
                className="landing-content glass"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className="landing-logo-container"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <span className="landing-icon">📚</span>
                </motion.div>

                <motion.h1
                    className="landing-title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    EduLibrary
                </motion.h1>

                <motion.p
                    className="landing-subtitle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    Your Digital Learning Resource Hub
                </motion.p>

                <motion.button
                    className="landing-enter-btn"
                    onClick={handleEnter}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    Explore
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Landing;
