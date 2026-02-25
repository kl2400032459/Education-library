import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Message sent successfully! We will get back to you soon.');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <div className="page-wrapper" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ background: 'var(--glass-bg)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}
            >
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)', textAlign: 'center' }}>Contact Us</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>Have questions? We'd love to hear from you.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div>
                        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Get in Touch</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}><strong>Email:</strong> mpravaliswaraj@gmail.com</p>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}><strong>Phone:</strong> 9182920647</p>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}><strong>Address:</strong> kl university</p>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Office Hours</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monday - Friday</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>9:00 AM - 6:00 PM EST</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>Your Name</label>
                            <input required type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--surface)', color: 'var(--text-main)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>Email Address</label>
                            <input required type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--surface)', color: 'var(--text-main)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>Message</label>
                            <textarea required rows="4" placeholder="How can we help?" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--surface)', color: 'var(--text-main)', resize: 'vertical' }}></textarea>
                        </div>
                        <button type="submit" style={{ padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
                            Send Message
                        </button>
                        {status && <p style={{ color: '#10b981', fontSize: '0.9rem', textAlign: 'center', marginTop: '0.5rem' }}>{status}</p>}
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUs;
