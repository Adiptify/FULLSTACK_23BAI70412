import React from 'react';

const About = () => {
    return (
        <div className="page-container">
            <div className="glass-card">
                <h1>About the Experiment</h1>
                <p>
                    The aim of this experiment is to implement basic client-side routing.
                    Client-side routing allows applications to update the URL and the view without
                    making a request to the server for a new document.
                </p>
                <p>
                    Key components used: <code>BrowserRouter</code>, <code>Routes</code>, <code>Route</code>, and <code>NavLink</code>.
                </p>
            </div>
        </div>
    );
};

export default About;
