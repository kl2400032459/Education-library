import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import './ResourceDetails.css';

const MOCK_RESOURCE = {
    id: 1,
    title: 'Introduction to Algorithms',
    subject: 'Computer Science',
    department: 'Engineering',
    type: 'Textbook',
    rating: 4.8,
    description: 'A comprehensive guide to fundamental algorithms and data structures. Includes examples in Python and Java. Covered topics: Sorting, Searching, Graphs, Dynamic Programming.',
    tags: ['Algorithms', 'CS', 'Data Structures', 'Python'],
    thumb: '📘',
    uploader: 'Dr. John Smith',
    uploadDate: '2023-08-15',
    downloads: 1245,
    size: '15 MB',
    pages: 420
};

const MOCK_COMMENTS = [
    { id: 101, user: 'Alice Chen', rating: 5, date: '2 days ago', text: 'This book saved my life for the midterms. Highly recommended!' },
    { id: 102, user: 'Bob Builder', rating: 4, date: '1 week ago', text: 'Great resource, but some of the graph examples are a bit hard to follow without prior knowledge.' }
];

const ResourceDetails = () => {
    const { id } = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [ratingInput, setRatingInput] = useState(0);
    const [commentInput, setCommentInput] = useState('');

    return (
        <div className="resource-details-page">
            <header className="details-header mb-4">
                <Link to="/browse" className="back-link">← Back to Browse</Link>
            </header>

            <div className="details-layout">
                {/* Left Column: Preview */}
                <div className="details-preview-col">
                    <Card className="preview-container glass">
                        <div className="preview-toolbar">
                            <span>{MOCK_RESOURCE.title}.pdf</span>
                            <div className="toolbar-actions">
                                <span>-</span>
                                <span>100%</span>
                                <span>+</span>
                            </div>
                        </div>
                        <div className="preview-content">
                            <div className="mock-pdf-page">
                                <span className="preview-icon">{MOCK_RESOURCE.thumb}</span>
                                <h2>{MOCK_RESOURCE.title}</h2>
                                <p>Chapter 1: Getting Started</p>
                            </div>
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
                                    <span className="res-type-badge">{MOCK_RESOURCE.type}</span>
                                    <h1>{MOCK_RESOURCE.title}</h1>
                                </div>
                                <button
                                    className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                >
                                    {isBookmarked ? '🔖' : '📑'}
                                </button>
                            </div>

                            <div className="author-row">
                                <div className="author-avatar">👨‍🏫</div>
                                <div className="author-details">
                                    <span className="uploaded-by">Uploaded by {MOCK_RESOURCE.uploader}</span>
                                    <span className="upload-date">on {MOCK_RESOURCE.uploadDate}</span>
                                </div>
                            </div>

                            <div className="stats-row">
                                <div className="stat-pill">⭐ {MOCK_RESOURCE.rating} / 5.0</div>
                                <div className="stat-pill">⬇️ {MOCK_RESOURCE.downloads} Downloads</div>
                                <div className="stat-pill">📄 {MOCK_RESOURCE.pages} Pages</div>
                                <div className="stat-pill">💾 {MOCK_RESOURCE.size}</div>
                            </div>

                            <div className="desc-section">
                                <h3>Description</h3>
                                <p>{MOCK_RESOURCE.description}</p>
                            </div>

                            <div className="meta-section">
                                <div className="meta-item"><strong>Subject:</strong> {MOCK_RESOURCE.subject}</div>
                                <div className="meta-item"><strong>Department:</strong> {MOCK_RESOURCE.department}</div>
                            </div>

                            <div className="tags-row">
                                {MOCK_RESOURCE.tags.map(t => <span key={t} className="tag">#{t}</span>)}
                            </div>

                            <motion.button
                                className="download-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                ⬇ Download Resource
                            </motion.button>
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
                            <button className="submit-review-btn">Post Review</button>
                        </div>

                        <div className="comments-list">
                            {MOCK_COMMENTS.map(c => (
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
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetails;
