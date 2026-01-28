import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-page fade-in">
            <header className="profile-hero">
                <div className="container">
                    <h1>Kumar Aditya</h1>
                    <p className="title">Engineering Student – AI & ML</p>
                    <div className="contact-info">
                        <span className="pill">+91-8210979447</span>
                        <span className="pill">kumar.aditya.prof@gmail.com</span>
                    </div>
                    <div className="social-links">
                        <a href="https://github.com/Adiptify" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="https://linkedin.com/in/kumaradityaprof" target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </div>
            </header>

            <section className="profile-section">
                <div className="container">
                    <h2>Summary</h2>
                    <div className="intro-card">
                        <p>
                            AI-focused engineering student with hands-on experience designing Generative AI systems using
                            Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG).
                        </p>
                    </div>
                </div>
            </section>

            <section className="profile-section">
                <div className="container">
                    <h2>Education</h2>
                    <div className="education-list">
                        <div className="edu-item">
                            <h3>B.E. Computer Science (AI & ML)</h3>
                            <span className="date">2023 – 2027</span>
                        </div>
                        <div className="edu-item">
                            <h3>Class XII (CBSE)</h3>
                            <span className="date">2023</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
