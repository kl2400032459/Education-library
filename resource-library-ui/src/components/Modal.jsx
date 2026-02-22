import React from 'react';
import { motion } from 'framer-motion';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => (
    <>{isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
            <motion.div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {children}
                <button className="modal-close" onClick={onClose}>✕</button>
            </motion.div>
        </div>
    )}</>
);

export default Modal;
