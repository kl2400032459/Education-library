import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import RoleBadge from '../../components/RoleBadge';
import { motion, AnimatePresence } from 'framer-motion';
import './Management.css';

export const ManageResources = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [resources, setResources] = useState([]);

    useEffect(() => {
        // Load resources from local storage once on mount
        const loadDocs = async () => {
            const { getStoredResources } = await import('../../data/mockData');
            setResources(getStoredResources());
        };
        loadDocs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this resource?")) return;

        const { getStoredResources, setStoredResources } = await import('../../data/mockData');
        const currentRes = getStoredResources();
        const updatedRes = currentRes.filter(r => r.id !== id);
        setStoredResources(updatedRes);
        setResources(updatedRes);
    };

    const handleToggleStatus = async (id) => {
        const { getStoredResources, setStoredResources } = await import('../../data/mockData');
        const currentRes = getStoredResources();
        const updatedRes = currentRes.map(r => {
            if (r.id === id) {
                return { ...r, status: r.status === 'Active' ? 'Pending' : 'Active' };
            }
            return r;
        });
        setStoredResources(updatedRes);
        setResources(updatedRes);
    }

    const handleEdit = async (id, currentTitle) => {
        const newTitle = window.prompt("Enter new title for this resource:", currentTitle);
        if (!newTitle || newTitle.trim() === "") return;

        const { getStoredResources, setStoredResources } = await import('../../data/mockData');
        const currentRes = getStoredResources();
        const updatedRes = currentRes.map(r => {
            if (r.id === id) {
                return { ...r, title: newTitle.trim() };
            }
            return r;
        });
        setStoredResources(updatedRes);
        setResources(updatedRes);
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Type', accessor: 'type' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Actions', accessor: 'actions' },
    ];

    const filteredData = resources.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.id.toString().includes(searchTerm);
        const matchesType = typeFilter === 'all' || res.type.toLowerCase() === typeFilter.toLowerCase();

        // Mock data didn't originally strictly enforce status uniformly, so we handle undefined defensively
        const resStatus = res.status || 'Active';
        const matchesStatus = statusFilter === 'all' || resStatus.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesType && matchesStatus;
    });

    const data = filteredData.map(res => ({
        id: res.id,
        title: res.title,
        type: res.type,
        status: <span className={`status-pill ${(res.status || 'Active').toLowerCase()}`}>{res.status || 'Active'}</span>,
        actions: (
            <div className="table-actions">
                <button className="action-icon edit" title="Edit" onClick={() => handleEdit(res.id, res.title)}>✏️</button>
                <button
                    className={`action-icon ${res.status === 'Active' ? 'lock' : 'approve'}`}
                    title={res.status === 'Active' ? 'Suspend' : 'Approve'}
                    onClick={() => handleToggleStatus(res.id)}
                >
                    {res.status === 'Active' ? '⏸️' : '✅'}
                </button>
                <button className="action-icon delete" title="Delete" onClick={() => handleDelete(res.id)}>🗑️</button>
            </div>
        )
    }));


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
                    <select className="custom-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="all">All Types</option>
                        <option value="textbook">Textbook</option>
                        <option value="notes">Notes</option>
                        <option value="video">Video</option>
                    </select>
                    <select className="custom-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [users, setUsers] = useState([]);

    // New user form state
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student' });

    useEffect(() => {
        const loadDocs = async () => {
            const { getStoredUsers } = await import('../../data/mockData');
            setUsers(getStoredUsers());
        };
        loadDocs();
    }, []);

    const handleToggleStatus = async (id) => {
        const { getStoredUsers, setStoredUsers } = await import('../../data/mockData');
        const currentUsers = getStoredUsers();
        const updatedUsers = currentUsers.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
            }
            return u;
        });
        setStoredUsers(updatedUsers);
        setUsers(updatedUsers);
    };

    const handleEditUser = async (id, currentName) => {
        const newName = window.prompt("Enter new name for this user:", currentName);
        if (!newName || newName.trim() === "") return;

        const { getStoredUsers, setStoredUsers } = await import('../../data/mockData');
        const currentUsers = getStoredUsers();
        const updatedUsers = currentUsers.map(u => {
            if (u.id === id) {
                return { ...u, name: newName.trim() };
            }
            return u;
        });
        setStoredUsers(updatedUsers);
        setUsers(updatedUsers);
    };

    const columns = [
        { Header: 'User ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Actions', accessor: 'actions' },
    ];

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || u.role.toLowerCase() === roleFilter.toLowerCase();
        const matchesStatus = statusFilter === 'all' || u.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesRole && matchesStatus;
    });

    const data = filteredUsers.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: <RoleBadge role={u.role} />,
        status: <span className={`status-pill ${u.status.toLowerCase()}`}>{u.status}</span>,
        actions: (
            <div className="table-actions">
                <button className="action-icon edit" title="Edit User" onClick={() => handleEditUser(u.id, u.name)}>✏️</button>
                <button
                    className={`action-icon ${u.status === 'Active' ? 'lock' : 'approve'}`}
                    title={u.status === 'Active' ? 'Suspend User' : 'Restore User'}
                    onClick={() => handleToggleStatus(u.id)}
                >
                    {u.status === 'Active' ? '🔒' : '✅'}
                </button>
            </div>
        )
    }));

    const handleAddUserSubmit = async (e) => {
        e.preventDefault();
        const { getStoredUsers, setStoredUsers } = await import('../../data/mockData');
        const currentUsers = getStoredUsers();
        const newId = `U00${currentUsers.length + 1}`;

        const addedUser = {
            ...newUser,
            id: newId,
            status: 'Active',
            joined: new Date().toISOString().split('T')[0]
        };

        const updated = [...currentUsers, addedUser];
        setStoredUsers(updated);
        setUsers(updated);

        setIsAddUserOpen(false);
        setNewUser({ name: '', email: '', role: 'Student' });
    };

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
                    <select className="custom-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="all">All Roles</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select className="custom-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
                        <form className="admin-form" onSubmit={handleAddUserSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="Nikhil Reddy" required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="nikhil@email.com" required value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Temporary Password</label>
                                <input type="password" placeholder="••••••••" required />
                            </div>
                            <div className="form-group">
                                <label>System Role</label>
                                <select className="custom-select" required value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Admin">Admin</option>
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
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const loadDocs = async () => {
            const { getStoredFeedback } = await import('../../data/mockData');
            setFeedbackData(getStoredFeedback());
        };
        loadDocs();
    }, []);

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

    const handleDeleteFeedback = async (id) => {
        if (!window.confirm("Delete this feedback?")) return;
        const { getStoredFeedback, setStoredFeedback } = await import('../../data/mockData');
        const currentFb = getStoredFeedback();
        const updatedFb = currentFb.filter(f => f.id !== id);
        setStoredFeedback(updatedFb);
        setFeedbackData(updatedFb);
    };

    const tableData = filteredFeedback.map(fb => ({
        ...fb,
        role: <RoleBadge role={fb.role} />,
        rating: <div className="f-rating-sm">{generateStars(fb.rating)}</div>,
        status: <span className={`status-pill ${fb.status.toLowerCase()}`}>{fb.status}</span>,
        actions: (
            <div className="table-actions">
                <button className="action-icon view" title="View Details" onClick={() => setSelectedFeedback(fb)}>👁️</button>
                <button className="action-icon delete" title="Delete Feedback" onClick={() => handleDeleteFeedback(fb.id)}>🗑️</button>
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
                                <button className="action-btn primary" onClick={async () => {
                                    if (replyText.trim() === '') return alert("Please enter a reply.");
                                    const { getStoredFeedback, setStoredFeedback } = await import('../../data/mockData');
                                    const currentFb = getStoredFeedback();
                                    const updatedFb = currentFb.map(f => {
                                        if (f.id === selectedFeedback.id) {
                                            return { ...f, status: 'Resolved' };
                                        }
                                        return f;
                                    });
                                    setStoredFeedback(updatedFb);
                                    setFeedbackData(updatedFb);

                                    alert('Reply sent successfully! Feedback marked as Resolved.');
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

    const [formData, setFormData] = useState({
        title: '', subject: '', department: '', type: '', description: ''
    });

    const handleUpload = (e) => {
        e.preventDefault();
        setIsUploading(true);
        // Simulate progress
        let p = 0;
        const interval = setInterval(async () => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);

                // Add to local storage
                const { getStoredResources, setStoredResources } = await import('../../data/mockData');
                const currentRes = getStoredResources();
                const newId = currentRes.length > 0 ? Math.max(...currentRes.map(r => r.id)) + 1 : 1;

                const newResource = {
                    id: newId,
                    ...formData,
                    rating: 5.0, // Default rating for new upload
                    thumb: formData.type === 'Video' ? '🎬' : '📄', // Simple thumb logic
                    tags: ['New', formData.subject],
                    uploader: 'Admin', // Static for now until auth is fully dynamic
                    uploadDate: new Date().toISOString().split('T')[0],
                    downloads: 0,
                    size: '2 MB',
                    pages: formData.type === 'Video' ? 0 : 10,
                    status: 'Active'
                };

                setStoredResources([newResource, ...currentRes]);

                setTimeout(() => {
                    setIsUploading(false);
                    setIsSuccess(true);
                    setFormData({ title: '', subject: '', department: '', type: '', description: '' });
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
                            <input type="text" placeholder="e.g. Advanced AI Notes" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>

                        <div className="form-group grid-item">
                            <label>Subject</label>
                            <select className="custom-select" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                                <option value="">Select Subject</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="History">History</option>
                                <option value="Web Dev">Web Dev</option>
                            </select>
                        </div>

                        <div className="form-group grid-item">
                            <label>Department</label>
                            <select className="custom-select" required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })}>
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Science">Science</option>
                                <option value="Arts">Arts</option>
                            </select>
                        </div>

                        <div className="form-group grid-item">
                            <label>Resource Type</label>
                            <select className="custom-select" required value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option value="">Select Type</option>
                                <option value="Textbook">Textbook</option>
                                <option value="Notes">Notes</option>
                                <option value="Video">Video</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea rows="3" placeholder="Brief description of the material..." required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
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
