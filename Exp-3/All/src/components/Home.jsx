import React from 'react';
import Profile from './Profile';
import Experience from './Experience';
import Skills from './Skills';
import Contact from './Contact';
import Dashboard from './Dashboard';
import './Home.css';

const Home = () => {
    return (
        <div className="home-landing">
            <section id="profile" className="section">
                <Profile />
            </section>

            <section id="dashboard" className="section fade-in">
                <Dashboard />
            </section>

            <section id="experience" className="section fade-in">
                <Experience />
            </section>

            <section id="skills" className="section fade-in">
                <Skills />
            </section>

            <section id="contact" className="section fade-in">
                <Contact />
            </section>
        </div>
    );
};

export default Home;
