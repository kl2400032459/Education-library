import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const AuthCard = ({ mode, setMode, role, setRole, setGlobalRole }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        dept: '',
        idNumber: '',
        terms: false,
        remember: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [strength, setStrength] = useState(0);

    const roles = [
        { id: 'student', label: 'Student' },
        { id: 'teacher', label: 'Faculty' },
        { id: 'admin', label: 'Admin' }
    ];

    const calculateStrength = (pwd) => {
        let score = 0;
        if (pwd.length > 6) score += 25;
        if (/[A-Z]/.test(pwd)) score += 25;
        if (/[0-9]/.test(pwd)) score += 25;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
        setStrength(score);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (name === 'password') calculateStrength(value);
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Required';
        if (!formData.password) newErrors.password = 'Required';
        if (mode === 'signup') {
            if (!formData.name) newErrors.name = 'Required';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mismatch';
            if (!formData.terms) newErrors.terms = 'Required';

            if (role === 'student' || role === 'teacher') {
                if (!formData.dept) newErrors.dept = 'Required';
                if (!formData.idNumber) newErrors.idNumber = 'Required';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setGlobalRole(role);
            if (role === 'admin') navigate('/admin/dashboard');
            else navigate('/home');
        }
    };

    return (
        <div className="auth-page-wrapper">
            <motion.div
                className="auth-card-minimal"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="auth-brand">EduLibrary</div>
                <h2 className="auth-title">
                    {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
                </h2>

                <div className="auth-mode-switch">
                    <button
                        className={mode === 'login' ? 'active' : ''}
                        onClick={() => setMode('login')}
                    >
                        Login
                    </button>
                    <button
                        className={mode === 'signup' ? 'active' : ''}
                        onClick={() => setMode('signup')}
                    >
                        Signup
                    </button>
                </div>

                <form className="auth-form-minimal" onSubmit={handleSubmit}>
                    <div className="role-segmented-control">
                        {roles.map(r => (
                            <button
                                key={r.id}
                                className={`role-segment ${role === r.id ? 'active' : ''}`}
                                onClick={() => setRole(r.id)}
                                type="button"
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'login' ? (
                            <motion.div
                                key="login"
                                className="auth-fields-container"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                <div className="input-field">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>

                                <div className="input-field">
                                    <div className="label-row">
                                        <label>Password</label>
                                        <button type="button" className="text-toggle" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
                                    {errors.password && <span className="field-error">{errors.password}</span>}
                                </div>

                                <div className="form-options">
                                    <label className="check-label">
                                        <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} />
                                        <span>Keep me signed in</span>
                                    </label>
                                    <Link to="/forgot" className="auth-link">Forgot password?</Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                className="auth-fields-container"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                <div className="input-field">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                                    {errors.name && <span className="field-error">{errors.name}</span>}
                                </div>

                                <div className="input-field">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@university.edu" />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>

                                {(role === 'student' || role === 'teacher') && (
                                    <div className="input-field">
                                        <label>Department</label>
                                        <input type="text" name="dept" value={formData.dept} onChange={handleChange} />
                                        {errors.dept && <span className="field-error">{errors.dept}</span>}
                                    </div>
                                )}

                                {role === 'student' && (
                                    <div className="input-field">
                                        <label>University ID / Roll No.</label>
                                        <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />
                                        {errors.idNumber && <span className="field-error">{errors.idNumber}</span>}
                                    </div>
                                )}

                                {role === 'teacher' && (
                                    <div className="input-field">
                                        <label>Faculty ID</label>
                                        <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />
                                        {errors.idNumber && <span className="field-error">{errors.idNumber}</span>}
                                    </div>
                                )}


                                <div className="input-field">
                                    <label>Create Password</label>
                                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
                                    <div className="pwd-strength">
                                        <div className="pwd-progress" style={{ width: `${strength}%`, backgroundColor: strength < 50 ? '#ef4444' : strength < 75 ? '#f59e0b' : '#6366f1' }}></div>
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>Confirm Password</label>
                                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                                </div>

                                <label className="check-label-full">
                                    <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
                                    <span>I agree to the <Link to="/terms" className="auth-link">Terms of Service</Link></span>
                                </label>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button type="submit" className="primary-action-btn">
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    {mode === 'login' ? (
                        <p>No account? <button onClick={() => setMode('signup')} className="text-link">Register now</button></p>
                    ) : (
                        <p>Already a member? <button onClick={() => setMode('login')} className="text-link">Sign in</button></p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

// Specialized wrappers for routing
export const Login = ({ setRole }) => {
    const [mode, setMode] = useState('login');
    const [localRole, setLocalRole] = useState('student');
    return <AuthCard mode={mode} setMode={setMode} role={localRole} setRole={setLocalRole} setGlobalRole={setRole} />;
};

export const Register = ({ setRole }) => {
    const [mode, setMode] = useState('signup');
    const [localRole, setLocalRole] = useState('student');
    return <AuthCard mode={mode} setMode={setMode} role={localRole} setRole={setLocalRole} setGlobalRole={setRole} />;
};

