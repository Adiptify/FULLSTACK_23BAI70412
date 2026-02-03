import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container glass fade-in">
            <div className="profile-header">
                <div className="avatar">KA</div>
                <div className="details">
                    <h1>Kumar Aditya</h1>
                    <p className="uid">UID: 23BAI70412</p>
                    <p className="college">School of Engineering</p>
                </div>
            </div>

            <section className="bio">
                <h2>About Me</h2>
                <p>I am a dedicated student pursuing my studies in Computer Science and Engineering, with a keen interest in the intersection of software development and materials science.</p>
                <p>This application demonstrates my proficiency in React and modern client-side routing using the <code>react-router-dom</code> library.</p>
            </section>

            <div className="academic-grid">
                <div className="stat glass">
                    <h3>Semester</h3>
                    <p>4th</p>
                </div>
                <div className="stat glass">
                    <h3>CGPA</h3>
                    <p>7.9</p>
                </div>
                <div className="stat glass">
                    <h3>Focus</h3>
                    <p>Full Stack</p>
                </div>
            </div>
        </div>
    );
};

export default About;
