import React from 'react';

const Gallery = () => {
    return (
        <div className="page-container">
            <div className="glass-card">
                <h1>Monochrome Gallery</h1>
                <p>
                    This page represents a gallery view. In a full application, this would contain
                    a collection of images or projects styled in harmony with the B&W theme.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
