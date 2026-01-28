import React from 'react';

const Services = () => {
    const services = [
        { title: "AI Integration", desc: "Implementing LLMs into existing workflows." },
        { title: "RAG Systems", desc: "Building knowledge-based retriever systems." },
        { title: "Model Fine-tuning", desc: "Optimizing models for specific domains." }
    ];

    return (
        <div className="fade-in" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Our AI Services</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {services.map((s, i) => (
                    <div key={i} className="card-base" style={{ padding: '2rem' }}>
                        <h3>{s.title}</h3>
                        <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
