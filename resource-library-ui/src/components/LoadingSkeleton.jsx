import React from 'react';
import './LoadingSkeleton.css';

// Simple skeleton placeholder – use as <LoadingSkeleton height="200px" />
const LoadingSkeleton = ({ width = '100%', height = '1rem', style = {} }) => (
    <div
        className="loading-skeleton"
        style={{ width, height, ...style }}
    />
);

export default LoadingSkeleton;
