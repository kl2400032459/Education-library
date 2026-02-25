import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Toast from '../../components/Toast';
import { isBookmarked as checkBookmarked, addBookmark, removeBookmark, addDownload, addFeedback } from '../../utils/storage';
import { getResourceById, getCommentsForResource } from '../../data/mockData';
import './ResourceDetails.css';

const ResourceDetails = ({ role }) => {
    const { id: _id } = useParams();
    const resource = getResourceById(_id);
    const comments = getCommentsForResource(_id);

    const [isBookmarked, setIsBookmarked] = useState(() => resource ? checkBookmarked(resource.id) : false);
    const [ratingInput, setRatingInput] = useState(0);
    const [commentInput, setCommentInput] = useState('');
    const [toasts, setToasts] = useState([]);

    if (!resource) {
        return (
            <div className="resource-details-page" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <h2>Resource Not Found</h2>
                <Link to="/browse" className="cta-btn primary" style={{ marginTop: '1rem' }}>Back to Browse</Link>
            </div>
        );
    }

    const showToast = (text) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, text }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleBookmarkToggle = () => {
        if (isBookmarked) {
            removeBookmark(resource.id);
            showToast('Removed from bookmarks');
        } else {
            addBookmark(resource);
            showToast('Added to bookmarks');
        }
        setIsBookmarked(!isBookmarked);
    };

    const handleDownload = () => {
        addDownload(resource);
        showToast('Download started! Added to your profile.');
    };

    const handleReviewSubmit = () => {
        if (!commentInput.trim() || ratingInput === 0) {
            showToast('Please provide a rating and a comment.');
            return;
        }

        const newFeedback = {
            id: Date.now(),
            resourceId: resource.id,
            resource: resource.title,
            rating: ratingInput,
            text: commentInput,
            date: new Date().toLocaleDateString()
        };

        addFeedback(newFeedback);
        showToast('Feedback submitted successfully!');
        setCommentInput('');
        setRatingInput(0);
    };

    return (
        <div className="resource-details-page">
            <Toast messages={toasts} onDismiss={removeToast} />
            <header className="details-header mb-4">
                <Link to="/browse" className="back-link">← Back to Browse</Link>
            </header>

            <div className="details-layout">
                {/* Left Column: Preview */}
                <div className="details-preview-col">
                    <Card className="preview-container glass">
                        <div className="preview-toolbar">
                            <span>{resource.title}{resource.type === 'Video' ? '.mp4' : '.pdf'}</span>
                            {resource.type !== 'Video' && (
                                <div className="toolbar-actions">
                                    <span>-</span>
                                    <span>100%</span>
                                    <span>+</span>
                                </div>
                            )}
                        </div>
                        <div className="preview-content">
                            {resource.type === 'Video' ? (
                                <div className="mock-video-player">
                                    <div className="player-top-bar">{resource.title}</div>
                                    <div className="player-center-play">▶️</div>
                                    <div className="player-controls">
                                        <div className="pc-left">
                                            <span className="pc-btn">⏸</span>
                                            <span className="pc-btn">🔇</span>
                                            <span className="pc-time">01:24 / 45:00</span>
                                        </div>
                                        <div className="pc-progress">
                                            <div className="pc-progress-fill"></div>
                                        </div>
                                        <div className="pc-right">
                                            <span className="pc-btn">⛶</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mock-pdf-page">
                                    <span className="preview-icon">{resource.thumb}</span>
                                    <h2>{resource.title}</h2>
                                    <p style={{ marginTop: '2rem', textAlign: 'left', lineHeight: '1.8' }}>{resource.contentPreview}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Information & Actions */}
                <div className="details-info-col">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="info-card-wrapper"
                    >
                        <Card className="glass info-card">
                            <div className="info-header">
                                <div className="title-section">
                                    <span className="res-type-badge">{resource.type}</span>
                                    <h1>{resource.title}</h1>
                                </div>
                                <button
                                    className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                                    onClick={handleBookmarkToggle}
                                    title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                >
                                    {isBookmarked ? '🔖' : '📑'}
                                </button>
                            </div>

                            <div className="author-row">
                                <div className="author-avatar">{resource.uploader.charAt(0)}</div>
                                <div className="author-details">
                                    <span className="uploaded-by">Uploaded by {resource.uploader}</span>
                                    <span className="upload-date">on {resource.uploadDate}</span>
                                </div>
                            </div>

                            <div className="stats-row">
                                <div className="stat-pill">⭐ {resource.rating} / 5.0</div>
                                <div className="stat-pill">⬇️ {resource.downloads} Downloads</div>
                                {resource.type !== 'Video' && <div className="stat-pill">📄 {resource.pages} Pages</div>}
                                <div className="stat-pill">💾 {resource.size}</div>
                            </div>

                            <div className="desc-section">
                                <h3>Description</h3>
                                <p>{resource.description}</p>
                            </div>

                            <div className="meta-section">
                                <div className="meta-item"><strong>Subject:</strong> {resource.subject}</div>
                                <div className="meta-item"><strong>Department:</strong> {resource.department}</div>
                            </div>

                            <div className="tags-row">
                                {resource.tags.map(t => <span key={t} className="tag">#{t}</span>)}
                            </div>

                            {role === 'guest' ? (
                                <div className="auth-restriction-box">
                                    <p>Please <Link to="/login" className="auth-link">Log In</Link> to download this resource.</p>
                                </div>
                            ) : (
                                <motion.button
                                    className="download-btn primary-action-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDownload}
                                >
                                    ⬇ Download Resource
                                </motion.button>
                            )}
                        </Card>
                    </motion.div>

                    {/* Feedback Section */}
                    <Card className="glass feedback-card">
                        <h3>Community Feedback</h3>

                        <div className="write-review">
                            <h4>Leave a Review</h4>
                            <div className="star-rating-input">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        className={`star ${star <= ratingInput ? 'active' : ''}`}
                                        onClick={() => setRatingInput(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <textarea
                                placeholder="What did you think of this resource?"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                            ></textarea>
                            {role === 'guest' ? (
                                <div className="auth-restriction-box mt-3">
                                    <p>Only logged in members can leave reviews. <Link to="/login" className="auth-link">Log In</Link></p>
                                </div>
                            ) : (
                                <button className="submit-review-btn primary-action-btn" onClick={handleReviewSubmit}>Post Review</button>
                            )}
                        </div>

                        <div className="comments-list">
                            {comments.length > 0 ? comments.map(c => (
                                <div key={c.id} className="comment-item">
                                    <div className="comment-header">
                                        <div className="comment-user">
                                            <div className="user-avatar">{c.user.charAt(0)}</div>
                                            <span className="user-name">{c.user}</span>
                                        </div>
                                        <div className="comment-meta">
                                            <span className="comment-stars">{'★'.repeat(c.rating)}{'☆'.repeat(5 - c.rating)}</span>
                                            <span className="comment-date">{c.date}</span>
                                        </div>
                                    </div>
                                    <p className="comment-text">{c.text}</p>
                                </div>
                            )) : (
                                <p style={{ color: 'var(--text-muted)' }}>No feedback left for this resource yet. Be the first!</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetails;
