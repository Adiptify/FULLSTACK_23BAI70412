import React from 'react';
import './Experience.css';

const Experience = () => {
    return (
        <div className="experience-page fade-in">
            <h1>Professional Experience</h1>

            <div className="timeline">
                <div className="timeline-item card-base">
                    <div className="timeline-header">
                        <span className="date-tag">Sep 2025 – Feb 2026</span>
                        <h3>AI Engineer Intern</h3>
                        <p className="company">Mendygo (Remote)</p>
                    </div>
                    <ul className="achievements">
                        <li>Designed and implemented RAG-based AI systems for enterprise document understanding.</li>
                        <li>Selected retrieval-based grounding over fine-tuning to support dynamic data and reduce retraining overhead.</li>
                        <li>Built semantic retrieval pipelines using dense embeddings and FAISS.</li>
                        <li>Integrated local LLM inference via Ollama for low-latency, privacy-preserving deployment.</li>
                        <li>Improved answer relevance through chunking strategy refinement and retrieval-aware prompting.</li>
                    </ul>
                </div>
            </div>

            <section className="certifications">
                <h2>Certifications</h2>
                <div className="cert-card card-base">
                    <h3>NVIDIA Certified Associate: Generative AI (NCA-GENAI)</h3>
                    <p>Recognition of expertise in GenAI principles and implementation.</p>
                </div>
            </section>
        </div>
    );
};

export default Experience;
