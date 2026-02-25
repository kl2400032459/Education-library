import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

// Simple toast system – expects an array of messages passed via props or context.
const Toast = ({ messages = [], onDismiss }) => (
    <div className="toast-container">
        <AnimatePresence>
            {messages.map((msg) => (
                <motion.div
                    key={msg.id}
                    className="toast"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onAnimationComplete={() => {
                        // Auto dismiss after 3 seconds
                        setTimeout(() => onDismiss && onDismiss(msg.id), 3000);
                    }}
                >
                    {msg.text}
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
);

export default Toast;
