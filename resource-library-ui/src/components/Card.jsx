import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ title, children, className = '' }) => (
    <motion.div
        className={`card ${className}`}
        whileHover={{ scale: 1.03, boxShadow: '0px 8px 20px rgba(0,0,0,0.12)' }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        {title && <h3 className="card-title">{title}</h3>}
        <div className="card-content">{children}</div>
    </motion.div>
);

export default Card;
