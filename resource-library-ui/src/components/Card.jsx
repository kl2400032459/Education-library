import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ title, children, className = '' }) => (
    <motion.div
        className={`card ${className}`}
        whileHover={{ scale: 1.01, translateY: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
        {title && <h3 className="card-title">{title}</h3>}
        <div className="card-content">{children}</div>
    </motion.div>
);

export default Card;
