import React, { useState } from 'react';
import Card from '../../components/Card';
import RoleBadge from '../../components/RoleBadge';
import { motion } from 'framer-motion';
import { getDownloads, getBookmarks, getFeedback } from '../../utils/storage';
import { Link } from 'react-router-dom';
import './Misc.css';

export const Profile = ({ role }) => {
    const [activeTab, setActiveTab] = useState('downloads');

    const userEmail = localStorage.getItem('userEmail') || 'john.doe@email.com';
    const userName = localStorage.getItem('userName') || 'John Doe';
    const getInitials = (name) => {
        const parts = name.split(' ');
        if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.slice(0, 2).toUpperCase();
    };

    const userInfo = {
        name: userName,
        email: userEmail,
        role: role !== 'guest' ? role : 'Student',
        avatar: getInitials(userName),
        department: 'Computer Science' // Default static mock fallback
    };

    const [downloads] = useState(() => getDownloads());
    const [bookmarks] = useState(() => getBookmarks());
    const [feedback] = useState(() => getFeedback());

    if (role === 'guest') {
        return (
            <div className="profile-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Card className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Restricted Access</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You must be logged in to view your profile.</p>
                    <Link to="/login" className="primary-action-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Log In Now</Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="glass profile-header-card">
                    <div className="profile-info-row">
                        <div className="profile-avatar">{userInfo.avatar}</div>
                        <div className="profile-details">
                            <h2>{userInfo.name}</h2>
                            <div className="profile-role" style={{ margin: '0.5rem 0' }}>
                                <RoleBadge role={userInfo.role} />
                                <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)' }}>• {userInfo.department}</span>
                            </div>
                            <p className="profile-email">{userInfo.email}</p>
                        </div>
                    </div>
                </Card>

                <div className="profile-tabs-container glass">
                    <div className="profile-tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'downloads' ? 'active' : ''}`}
                            onClick={() => setActiveTab('downloads')}
                        >
                            ⬇️ Downloaded
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bookmarks')}
                        >
                            🔖 Bookmarked
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
                            onClick={() => setActiveTab('feedback')}
                        >
                            ⭐ Feedback
                        </button>
                    </div>

                    <div className="profile-tab-content">
                        {activeTab === 'downloads' && (
                            <div className="tab-pane">
                                {downloads.length > 0 ? (
                                    <ul className="profile-list">
                                        {downloads.map(d => (
                                            <li key={d.id} className="profile-list-item">
                                                <span className="item-title">{d.title}</span>
                                                <span className="item-meta">Downloaded {d.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="empty-state">No downloaded resources yet.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'bookmarks' && (
                            <div className="tab-pane">
                                {bookmarks.length > 0 ? (
                                    <ul className="profile-list">
                                        {bookmarks.map(b => (
                                            <li key={b.id} className="profile-list-item">
                                                <span className="item-title">{b.title}</span>
                                                <span className="item-meta">Bookmarked {b.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="empty-state">No bookmarked resources yet.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'feedback' && (
                            <div className="tab-pane">
                                {feedback.length > 0 ? (
                                    <ul className="profile-list">
                                        {feedback.map(f => (
                                            <li key={f.id} className="profile-feedback-item">
                                                <div className="fb-header">
                                                    <span className="fb-resource">{f.resource}</span>
                                                    <span className="fb-rating">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>
                                                </div>
                                                <p className="fb-text">"{f.text}"</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="empty-state">You haven't left any feedback yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const FeedbackForm = () => {
    const [rating, setRating] = useState(5);
    return (
        <div className="misc-page auth-page">
            <motion.div className="auth-card-wrapper" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card title="Leave Feedback" className="glass auth-card">
                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Rating (1-5)</label>
                            <input
                                type="number"
                                min="1" max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea
                                rows="4"
                                placeholder="Share your thoughts about this resource..."
                                required
                                className="misc-textarea"
                            ></textarea>
                        </div>
                        <button type="submit" className="auth-submit-btn primary-action-btn">Submit Feedback</button>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};
