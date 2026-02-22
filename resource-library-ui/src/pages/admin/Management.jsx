import React, { useState } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import RoleBadge from '../../components/RoleBadge';
import { motion, AnimatePresence } from 'framer-motion';
import './Management.css';

export const ManageResources = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Type', accessor: 'type' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Actions', accessor: 'actions' },
    ];

    const data = [
        {
            id: '101', title: 'Calculus Notes', type: 'PDF', status: 'Active',
            actions: (
                <div className="table-actions">
                    <button className="action-icon edit" title="Edit">✏️</button>
                    <button className="action-icon delete" title="Delete">🗑️</button>
                </div>
            )
        },
        {
            id: '102', title: 'React Guide', type: 'Video', status: 'Pending',
            actions: (
                <div className="table-actions">
                    <button className="action-icon approve" title="Approve">✅</button>
                    <button className="action-icon delete" title="Delete">🗑️</button>
                </div>
            )
        },
        {
            id: '103', title: 'Physics Labs', type: 'Document', status: 'Active',
            actions: (
                <div className="table-actions">
                    <button className="action-icon edit" title="Edit">✏️</button>
                    <button className="action-icon delete" title="Delete">🗑️</button>
                </div>
            )
        },
    ];

    return (
        <div className="management-page">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>Manage Resources</motion.h1>

            <div className="management-toolbar">
                <div className="search-box">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search resources by title or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select className="custom-select">
                        <option value="all">All Types</option>
                        <option value="pdf">PDF</option>
                        <option value="video">Video</option>
                    </select>
                    <select className="custom-select">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            <Card className="glass">
                <Table columns={columns} data={data} />
            </Card>
        </div>
    );
};

export const ManageUsers = () => {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { Header: 'User ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Actions', accessor: 'actions' },
    ];

    const data = [
        {
            id: 'U001', name: 'Alice Smith', email: 'alice@student.edu', role: <RoleBadge role="Student" />, status: 'Active',
            actions: (
                <div className="table-actions">
                    <button className="action-icon edit" title="Edit User">✏️</button>
                    <button className="action-icon lock" title="Suspend User">🔒</button>
                </div>
            )
        },
        {
            id: 'U002', name: 'Dr. Bob Jones', email: 'bjones@faculty.edu', role: <RoleBadge role="Faculty" />, status: 'Active',
            actions: (
                <div className="table-actions">
                    <button className="action-icon edit" title="Edit User">✏️</button>
                    <button className="action-icon lock" title="Suspend User">🔒</button>
                </div>
            )
        },
        {
            id: 'U003', name: 'Charlie Brown', email: 'charlie@student.edu', role: <RoleBadge role="Admin" />, status: 'Suspended',
            actions: (
                <div className="table-actions">
                    <button className="action-icon edit" title="Edit User">✏️</button>
                    <button className="action-icon approve" title="Restore User">✅</button>
                </div>
            )
        },
    ];

    return (
        <div className="management-page relative-container">
            <div className="management-header-row">
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>Manage Users</motion.h1>
                <button
                    className="submit-action-btn sm-auto"
                    onClick={() => setIsAddUserOpen(true)}
                    style={{ marginTop: 0 }}
                >
                    ➕ Add New User
                </button>
            </div>

            <div className="management-toolbar">
                <div className="search-box">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search users by name, email or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select className="custom-select">
                        <option value="all">All Roles</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
                    <select className="custom-select">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>
            </div>

            <Card className="glass">
                <Table columns={columns} data={data} />
            </Card>

            {/* Add User Modal Overlay */}
            {isAddUserOpen && (
                <div className="modal-overlay">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="modal-content glass"
                    >
                        <div className="modal-header">
                            <h2>Add New User</h2>
                            <button className="modal-close-btn" onClick={() => setIsAddUserOpen(false)}>✕</button>
                        </div>
                        <form className="admin-form" onSubmit={(e) => { e.preventDefault(); setIsAddUserOpen(false); }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@email.com" required />
                            </div>
                            <div className="form-group">
                                <label>Temporary Password</label>
                                <input type="password" placeholder="••••••••" required />
                            </div>
                            <div className="form-group">
                                <label>System Role</label>
                                <select className="custom-select" required>
                                    <option>Student</option>
                                    <option>Faculty</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="action-btn secondary" onClick={() => setIsAddUserOpen(false)}>Cancel</button>
                                <button type="submit" className="action-btn primary">Create User</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export const ViewFeedback = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyText, setReplyText] = useState('');

    const feedbackData = [
        { id: 'FB001', user: 'Alice Smith', role: 'Student', rating: 5, status: 'New', date: '2026-02-22', message: 'Excellent breakdown of React Hooks. Helped me immensely in my final project!' },
        { id: 'FB002', user: 'Dr. John Doe', role: 'Faculty', rating: 4, status: 'Reviewed', date: '2026-02-21', message: 'Solid notes on Calculus, but could use a few more examples for integration by parts.' },
        { id: 'FB003', user: 'Sarah Miller', role: 'Student', rating: 2, status: 'New', date: '2026-02-20', message: 'The Physics Lab PDF has some formatting issues on mobile devices.' },
        { id: 'FB004', user: 'Mike Ross', role: 'Admin', rating: 5, status: 'Resolved', date: '2026-02-19', message: 'The new resource upload limit is working perfectly.' },
        { id: 'FB005', user: 'Emily White', role: 'Student', rating: 1, status: 'New', date: '2026-02-18', message: 'I cannot find the semester code filters anymore. Help!' },
    ];

    const generateStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
        ));
    };

    const stats = {
        total: feedbackData.length,
        positive: feedbackData.filter(f => f.rating >= 4).length,
        negative: feedbackData.filter(f => f.rating <= 2).length,
        pending: feedbackData.filter(f => f.status === 'New').length
    };

    const filteredFeedback = feedbackData.filter(fb => {
        const matchesSearch = fb.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fb.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || fb.role === roleFilter;
        const matchesRating = ratingFilter === 'all' || fb.rating === parseInt(ratingFilter);
        const matchesStatus = statusFilter === 'all' || fb.status === statusFilter;
        return matchesSearch && matchesRole && matchesRating && matchesStatus;
    });

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'User', accessor: 'user' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Rating', accessor: 'rating' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Date', accessor: 'date' },
        { Header: 'Actions', accessor: 'actions' },
    ];

    const tableData = filteredFeedback.map(fb => ({
        ...fb,
        role: <RoleBadge role={fb.role} />,
        rating: <div className="f-rating-sm">{generateStars(fb.rating)}</div>,
        status: <span className={`status-pill ${fb.status.toLowerCase()}`}>{fb.status}</span>,
        actions: (
            <div className="table-actions">
                <button className="action-icon view" title="View Details" onClick={() => setSelectedFeedback(fb)}>👁️</button>
                <button className="action-icon delete" title="Delete Feedback">🗑️</button>
            </div>
        )
    }));

    return (
        <div className="management-page">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>Feedback Overview</motion.h1>

            <div className="stats-grid">
                <Card className="glass stat-card">
                    <div className="stat-icon blue">💬</div>
                    <div className="stat-info">
                        <h3>{stats.total}</h3>
                        <p>Total Feedback</p>
                        <span className="trend-up">+12% this week</span>
                    </div>
                </Card>
                <Card className="glass stat-card">
                    <div className="stat-icon green">⭐</div>
                    <div className="stat-info">
                        <h3>{stats.positive}</h3>
                        <p>Positive</p>
                        <span className="trend-up">+5% this week</span>
                    </div>
                </Card>
                <Card className="glass stat-card">
                    <div className="stat-icon red">⚠️</div>
                    <div className="stat-info">
                        <h3>{stats.negative}</h3>
                        <p>Negative</p>
                        <span className="trend-down">-2% this week</span>
                    </div>
                </Card>
                <Card className="glass stat-card">
                    <div className="stat-icon yellow">⏳</div>
                    <div className="stat-info">
                        <h3>{stats.pending}</h3>
                        <p>Pending Review</p>
                        <span className="trend-neutral">Stable</span>
                    </div>
                </Card>
            </div>

            <div className="management-toolbar">
                <div className="search-box">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search feedback or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select className="custom-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="all">All Roles</option>
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <select className="custom-select" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                        <option value="all">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <select className="custom-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="New">New</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>

            <Card className="glass">
                <Table columns={columns} data={tableData} />
            </Card>

            <AnimatePresence>
                {selectedFeedback && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="modal-content glass"
                        >
                            <div className="modal-header">
                                <h2>Feedback Details</h2>
                                <button className="modal-close-btn" onClick={() => setSelectedFeedback(null)}>✕</button>
                            </div>
                            <div className="feedback-detail-body">
                                <div className="f-meta">
                                    <div className="f-user-badge">
                                        <div className="avatar">{selectedFeedback.user.charAt(0)}</div>
                                        <div>
                                            <h4>{selectedFeedback.user}</h4>
                                            <p>{selectedFeedback.role} • {selectedFeedback.date}</p>
                                        </div>
                                    </div>
                                    <div className="f-rating-large">
                                        {generateStars(selectedFeedback.rating)}
                                    </div>
                                </div>
                                <div className="f-message-box">
                                    <p>"{selectedFeedback.message}"</p>
                                </div>
                                <div className="f-reply-section">
                                    <label>Write a Reply</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Type your response to the user..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="action-btn secondary" onClick={() => setSelectedFeedback(null)}>Close</button>
                                <button className="action-btn primary" onClick={() => {
                                    alert('Reply sent!');
                                    setSelectedFeedback(null);
                                    setReplyText('');
                                }}>Send Reply</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const UploadResource = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleUpload = (e) => {
        e.preventDefault();
        setIsUploading(true);
        // Simulate progress
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsUploading(false);
                    setIsSuccess(true);
                }, 500);
            }
        }, 300);
    };

    if (isSuccess) {
        return (
            <div className="management-page">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="success-overlay-card">
                    <Card className="glass text-center p-4">
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                        <h2>Upload Successful!</h2>
                        <p>Your resource has been added to the library.</p>
                        <button className="submit-action-btn mt-3" onClick={() => { setIsSuccess(false); setProgress(0); }}>
                            Upload Another
                        </button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="management-page">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>Upload Resource</motion.h1>

            <Card title="Add New Material" className="glass upload-card">
                <form className="admin-form" onSubmit={handleUpload}>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Resource Title</label>
                            <input type="text" placeholder="e.g. Advanced AI Notes" required />
                        </div>

                        <div className="form-group grid-item">
                            <label>Subject</label>
                            <select className="custom-select" required>
                                <option value="">Select Subject</option>
                                <option>Computer Science</option>
                                <option>Mathematics</option>
                                <option>Physics</option>
                                <option>History</option>
                                <option>Web Dev</option>
                            </select>
                        </div>

                        <div className="form-group grid-item">
                            <label>Department</label>
                            <select className="custom-select" required>
                                <option value="">Select Department</option>
                                <option>Engineering</option>
                                <option>Science</option>
                                <option>Arts</option>
                            </select>
                        </div>

                        <div className="form-group grid-item">
                            <label>Resource Type</label>
                            <select className="custom-select" required>
                                <option value="">Select Type</option>
                                <option>Textbook</option>
                                <option>Notes</option>
                                <option>Video</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea rows="3" placeholder="Brief description of the material..." required></textarea>
                    </div>

                    <div className="form-group full-width file-upload-group">
                        <label>File Upload</label>
                        <div className="file-drop-zone">
                            <span className="drop-icon">📁</span>
                            <p>Drag & drop file here or click to browse</p>
                            <span className="file-limits">SVG, PNG, JPG, PDF or ZIP (max. 50MB)</span>
                            <input type="file" required />
                        </div>
                    </div>

                    {isUploading ? (
                        <div className="upload-progress-container">
                            <div className="progress-bar-bg">
                                <motion.div
                                    className="progress-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                ></motion.div>
                            </div>
                            <span className="progress-text">Uploading... {progress}%</span>
                        </div>
                    ) : (
                        <button type="submit" className="submit-action-btn mt-3">Upload to Repository</button>
                    )}
                </form>
            </Card>
        </div>
    );
};
