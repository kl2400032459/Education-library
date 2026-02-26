import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const categories = [
        { icon: "💻", title: "Computer Science", count: "1.2k+" },
        { icon: "📐", title: "Mathematics", count: "850+" },
        { icon: "🔬", title: "Physics", count: "640+" },
        { icon: "🧬", title: "Biology", count: "420+" },
    ];

    const featuredResources = [
        { id: 1, title: "Data Structures & Algorithms", author: "Dr. Smith", type: "PDF", rating: "4.9" },
        { id: 2, title: "Quantum Mechanics Basics", author: "Prof. Johnson", type: "Video", rating: "4.8" },
        { id: 3, title: "Advanced Calculus Notes", author: "Alice M.", type: "Doc", rating: "4.7" },
    ];

    return (
        <div className="home-page">
            <section className="hero-section glass">
                <div className="hero-bg-gradient"></div>
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="hero-badge"
                    >
                        Welcome to KL University Library
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="hero-title"
                    >
                        Discover & Share <br /> <span className="text-highlight">Limitless Knowledge</span>
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Access premium study materials, lecture notes, and academic resources curated specifically for students and faculty.
                    </motion.p>
                    <motion.form
                        onSubmit={handleSearch}
                        className="search-bar-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <svg className="hero-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input
                            type="text"
                            placeholder="Search by keyword, subject, or author..."
                            className="hero-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="search-btn">Search</button>
                    </motion.form>


                </div>
            </section>

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="full-layout-sections"
            >
                {/* Browse by Category */}
                <section className="home-section popular-subjects">
                    <h2 className="section-title">Top Categories</h2>
                    <p className="section-subtitle">Explore resources across major disciplines.</p>
                    <div className="category-grid">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                className="category-card glass-card hoverable"
                                whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0,0,0,0.1)' }}
                                onClick={() => navigate(`/browse?subject=${encodeURIComponent(cat.title)}`)}
                                role="button"
                                tabIndex={0}
                            >
                                <div className="cat-icon-wrapper">
                                    <span className="cat-icon">{cat.icon}</span>
                                </div>
                                <h3 className="cat-title">{cat.title}</h3>
                                <p className="cat-count">{cat.count} Resources</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Featured Resources */}
                <section className="home-section featured-resources">
                    <h2 className="section-title">Featured Resources</h2>
                    <p className="section-subtitle">Highly rated materials reviewed by faculty.</p>
                    <div className="resource-grid">
                        {featuredResources.map((res, idx) => (
                            <motion.div
                                key={res.id}
                                className="resource-card glass-card hoverable"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="res-type-badge">{res.type}</div>
                                <h3 className="res-title">{res.title}</h3>
                                <p className="res-author">By {res.author}</p>
                                <div className="res-footer">
                                    <span className="res-rating">⭐ {res.rating}</span>
                                    <Link to={`/resource/${res.id}`} className="res-link">View Details →</Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Recently Added Section */}
                <section className="home-section recently-added">
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                        <div>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Recently Added</h2>
                            <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '0' }}>Fresh study materials uploaded this week.</p>
                        </div>
                        <Link to="/browse" className="view-all-link" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>View All →</Link>
                    </div>
                    <div className="resource-grid">
                        {[
                            { id: 4, title: "Introduction to Cyber Security", author: "Dr. L. Davis", type: "PDF", date: "2 days ago" },
                            { id: 5, title: "Microeconomics 101", author: "Prof. E. Chen", type: "Notes", date: "3 days ago" },
                            { id: 6, title: "World History: WW2", author: "M. Thompson", type: "Video", date: "5 days ago" }
                        ].map((res, idx) => (
                            <motion.div
                                key={res.id}
                                className="resource-card glass-card hoverable"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className="res-type-badge" style={{ margin: 0 }}>{res.type}</div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{res.date}</span>
                                </div>
                                <h3 className="res-title">{res.title}</h3>
                                <p className="res-author">By {res.author}</p>
                                <div className="res-footer" style={{ paddingTop: '1rem', marginTop: 'auto' }}>
                                    <Link to={`/resource/${res.id}`} className="res-link" style={{ width: '100%', textAlign: 'center', display: 'inline-block', padding: '0.5rem 0', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '6px' }}>View Resource</Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Call-to-action */}
                <section className="home-section call-to-action-section glass">
                    <div className="cta-content">
                        <h2 className="cta-title">Have something valuable to share?</h2>
                        <p className="cta-desc">Join our community by uploading your notes, exam papers, and comprehensive guides.</p>
                        <Link to="/register" className="cta-btn primary large shadow-glow">Get Started Today</Link>
                    </div>
                </section>
            </motion.div>
        </div>
    );
};

export default Home;
