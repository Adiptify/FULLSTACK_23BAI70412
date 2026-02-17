import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p className="loading-text">Preparing Excellence...</p>
        </div>
    );
};

export default LoadingOverlay;
