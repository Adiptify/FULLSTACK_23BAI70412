import React from 'react';

const Info = () => {
    return (
        <div className="page-container">
            <div className="glass-card">
                <h1>Information</h1>
                <p>
                    Experiment-2 focuses on the <code>Link</code> component. Unlike standard <code>{"<a>"}</code> tags,
                    the <code>Link</code> component prevents a full page reload, enabling a true SPA experience.
                </p>
                <div style={{ textAlign: 'left', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                    <p>• Faster navigation</p>
                    <p>• Preserved state</p>
                    <p>• Smooth transitions</p>
                </div>
            </div>
        </div>
    );
};

export default Info;
