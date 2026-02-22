import React from 'react';
import Card from '../../components/Card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../user/Auth.css';

const AdminLogin = () => {
    return (
        <div className="auth-page admin-login-page">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="auth-card-wrapper"
            >
                <Card title="Admin Secure Login" className="glass auth-card">
                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Admin ID or Email</label>
                            <input type="text" placeholder="admin@domain.com" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" required />
                        </div>
                        <button type="button" className="auth-submit-btn">Login to Dashboard</button>
                    </form>
                    <div className="auth-footer">
                        <Link to="/login">← Back to User Login</Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
