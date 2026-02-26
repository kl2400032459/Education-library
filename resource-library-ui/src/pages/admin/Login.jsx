import React from 'react';
import Card from '../../components/Card';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import '../user/Auth.css';

const AdminLogin = ({ setRole }) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app we'd validate credentials here
        if (setRole) setRole('Admin');
        navigate('/admin/dashboard');
    };

    return (
        <div className="auth-page-wrapper">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="auth-card-minimal"
            >
                <div className="auth-brand">EduLibrary Admin</div>
                <h2 className="auth-title">Admin Secure Login</h2>

                <form className="auth-form-minimal" onSubmit={handleLogin}>
                    <div className="auth-fields-container">
                        <div className="input-field">
                            <label>Admin ID or Email</label>
                            <input type="text" placeholder="admin@domain.com" required />
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" required />
                        </div>
                    </div>
                    <button type="submit" className="primary-action-btn" style={{ marginTop: '1.5rem' }}>Login to Dashboard</button>
                    <div className="auth-footer" style={{ marginTop: '1.5rem' }}>
                        <Link to="/login" className="auth-link">← Back to User Login</Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
