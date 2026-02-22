import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role, setRole }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleLogout = () => {
        setRole('guest');
        navigate('/home');
        setIsMobileMenuOpen(false);
    };

    const navLinks = {
        guest: [
            { label: 'Home', path: '/home' },
            { label: 'Browse', path: '/browse' }
        ],
        user: [
            { label: 'Home', path: '/home' },
            { label: 'Browse', path: '/browse' },
            { label: 'Bookmarks', path: '/profile#bookmarks' }
        ],
        admin: [
            { label: 'Dashboard', path: '/admin/dashboard' },
            { label: 'Upload', path: '/admin/upload' },
            { label: 'Resources', path: '/admin/resources' },
            { label: 'Users', path: '/admin/users' },
            { label: 'Feedback', path: '/admin/feedback' }
        ]
    };

    const currentLinks = navLinks[role] || navLinks.guest;

    // A simple role switcher for debug purposes, since we don't have a real backend yet
    const handleRoleSwitch = (e) => {
        const newRole = e.target.value;
        setRole(newRole);
        if (newRole === 'admin') navigate('/admin/dashboard');
        else navigate('/home');
    };

    return (
        <header className="global-navbar">
            <div className="nav-container">
                <div className="logo cursor-pointer" onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/home')}>
                    EduLibrary
                </div>

                <div className="desktop-view">
                    <nav className="nav-links">
                        {currentLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {(role === 'admin' || role === 'user') && (
                        <div className="nav-search-center">
                            <div className="search-input-wrapper">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search resources, users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="nav-actions">
                        <select className="role-switcher" value={role} onChange={handleRoleSwitch} title="Debug Role Switcher">
                            <option value="guest">Guest View</option>
                            <option value="user">User View</option>
                            <option value="admin">Admin View</option>
                        </select>

                        <button
                            className="theme-toggle"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            title="Toggle Dark Mode"
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>

                        {(role === 'admin' || role === 'user') && (
                            <>
                                <div className="nav-icon-action relative">
                                    <button
                                        className="icon-btn"
                                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                        title="Notifications"
                                    >
                                        🔔
                                        <span className="notification-badge">3</span>
                                    </button>
                                    {isNotificationsOpen && (
                                        <div className="dropdown-menu notifications-dropdown glass">
                                            <div className="dropdown-header">Notifications</div>
                                            <div className="dropdown-item">New resource uploaded: "Calculus III"</div>
                                            <div className="dropdown-item">User "Sarah M." registered</div>
                                            <div className="dropdown-item">Alert: System maintenance tonight</div>
                                            <div className="dropdown-footer">View All</div>
                                        </div>
                                    )}
                                </div>

                                <div className="nav-icon-action relative">
                                    <button
                                        className="avatar-btn"
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        title="Your Profile"
                                    >
                                        <div className="avatar">A</div>
                                    </button>
                                    {isProfileOpen && (
                                        <div className="dropdown-menu profile-dropdown glass">
                                            <div className="dropdown-header">Account</div>
                                            <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>My Profile</Link>
                                            <div className="dropdown-item">Settings</div>
                                            <div className="divider"></div>
                                            <button className="dropdown-item logout-colored" onClick={handleLogout}>Logout</button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {role === 'guest' && (
                            <>
                                <Link to="/login" className="nav-link login-link">Login</Link>
                                <Link to="/register" className="nav-btn">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="mobile-view">
                    <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-dropdown glass">
                    <nav className="mobile-nav-links">
                        {currentLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mobile-nav-actions">
                        {role === 'guest' && (
                            <>
                                <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                <Link to="/register" className="mobile-nav-btn" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                            </>
                        )}
                        {role === 'user' && (
                            <>
                                <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>👤 Profile</Link>
                                <button className="mobile-logout-btn" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                        {role === 'admin' && (
                            <button className="mobile-logout-btn" onClick={handleLogout}>⎋ Logout</button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
