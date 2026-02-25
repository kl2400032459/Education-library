import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="global-footer glass">
            <div className="footer-content">
                <div className="footer-section brand-section">
                    <h2 className="footer-brand">EduLibrary</h2>
                    <p className="footer-desc">
                        Empowering students and educators through collaborative knowledge sharing and comprehensive resource management.
                    </p>
                </div>

                <div className="footer-section links-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/browse">Browse Resources</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
                    </ul>
                </div>

                <div className="footer-section support-section">
                    <h3>Support & Legal</h3>
                    <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact-section">
                    <h3>Contact Info</h3>
                    <p>Email: mpravaliswaraj@gmail.com</p>
                    <p>Phone: 9182920647</p>
                    <p>Address: kl university</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} EduLibrary. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
