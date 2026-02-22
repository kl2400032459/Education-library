import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="home-page">


            <section className="hero-section glass">
                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Discover & Share Knowledge
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Access study materials, lecture notes, and resources curated by students and teachers.
                    </motion.p>
                    <motion.div
                        className="search-bar-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <input type="text" placeholder="Search for subjects, topics, or materials..." className="hero-search" />
                        <button className="search-btn">Search</button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
