import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const highlights = [
        {
            title: "Work Experience",
            description: "AI Engineer Intern at Mendygo. Specialized in RAG and semantic retrieval.",
            icon: "💼",
            onClick: () => navigate('/experience')
        },
        {
            title: "Technical Skills",
            description: "Python, GenAI, LangChain, Ollama, Azure, and modern Web Dev.",
            icon: "🛠️",
            onClick: () => navigate('/skills')
        },
        {
            title: "Top Project",
            description: "Adiptify: Adaptive Learning Platform powered by DeepSeek and RAG.",
            icon: "🚀",
            onClick: () => navigate('/projects/adiptify')
        }
    ];

    return (
        <div className="dashboard-page fade-in">
            <div className="container">
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Key professional milestones.</p>
                </header>

                <div className="dashboard-grid">
                    {highlights.map((item, index) => (
                        <Card
                            key={index}
                            {...item}
                            link={true}
                        />
                    ))}
                </div>

                <section className="dashboard-cta">
                    <h3>Collaboration</h3>
                    <p>Get in touch for potential roles.</p>
                    <div className="cta-btns">
                        <button className="btn-primary" onClick={() => navigate('/contact')}>Contact</button>
                        <button className="btn-secondary" onClick={() => navigate('/experience')}>Experience</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
