import React from 'react';

const Projects = () => {
    const projects = [
        { name: "Agentic Framework", tech: "Python, FastAPI" },
        { name: "Material Lab Tracker", tech: "React, Node.js" },
        { name: "LLM Orchestrator", tech: "LangChain, VectorDB" }
    ];

    return (
        <div className="fade-in" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Research Projects</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {projects.map((p, i) => (
                    <div key={i} className="card-base" style={{ padding: '2rem' }}>
                        <h3 style={{ color: 'var(--primary)' }}>{p.name}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>Technologies: {p.tech}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
