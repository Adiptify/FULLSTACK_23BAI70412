import React from 'react';

const Home = () => {
    return (
        <div className="page-container">
            <div className="glass-card">
                <h1>Modern SPA Architecture</h1>
                <p>
                    Experience the next generation of web performance with our advanced Single Page Application.
                    Built with React 19 and Vite, this section features a state-of-the-art loading system that
                    optimizes user perception and ensures a smooth narrative flow.
                </p>
                <div className="features-inline">
                    <div className="feature-chip">2s Lazy Loading</div>
                    <div className="feature-chip">Glassmorphism UI</div>
                    <div className="feature-chip">React Router 7</div>
                </div>
            </div>

            <section className="info-grid">
                <div className="info-item">
                    <h3>Why Lazy Loading?</h3>
                    <p>
                        By deferring the loading of non-critical components, we minimize the initial bundle size,
                        leading to faster perceived load times and a more responsive interface.
                    </p>
                </div>
                <div className="info-item">
                    <h3>Enhanced UX</h3>
                    <p>
                        Our intentional loading states provide clear feedback to the user, reducing uncertainty
                        and creating a premium, polished feel across the entire application.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
