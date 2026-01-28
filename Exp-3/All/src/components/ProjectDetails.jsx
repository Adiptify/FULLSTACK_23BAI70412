import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { projectId } = useParams();

    const projectData = {
        adiptify: {
            title: "Adiptify – GenAI Adaptive Learning Platform",
            period: "Feb 2025– Jun 2025",
            points: [
                "Designed an adaptive learning platform using a RAG-based GenAI architecture.",
                "Enabled curriculum-aware tutoring by grounding LLM responses in indexed learning content.",
                "Integrated DeepSeek-R1 model via Ollama for reasoning and explanation tasks.",
                "Implemented semantic search using FAISS and deployed services on Microsoft Azure."
            ],
            tags: ["RAG", "DeepSeek", "Ollama", "Azure", "FAISS"]
        },
        rag: {
            title: "RAG-Based AI Knowledge System (LangChain)",
            period: "Mar 2025– Jun 2025",
            points: [
                "Built a document intelligence system for querying unstructured enterprise data.",
                "Implemented ingestion pipelines for PDF, DOCX, TXT, and Markdown files.",
                "Designed chunking, embedding, indexing, and retrieval pipelines.",
                "Orchestrated retrieval and generation using LangChain and FAISS."
            ],
            tags: ["LangChain", "Python", "FAISS", "Embeddings"]
        }
    };

    const project = projectData[projectId];

    if (!project) {
        return <div className="error-page">Project not found. <Link to="/dashboard">Back to Dashboard</Link></div>;
    }

    return (
        <div className="project-details-page fade-in">
            <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
            <header className="project-header">
                <h1>{project.title}</h1>
                <span className="period">{project.period}</span>
            </header>

            <div className="project-content card-base">
                <h3>Project Scope & Achievement</h3>
                <ul className="project-points">
                    {project.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
                <div className="tag-container">
                    {project.tags.map((t, i) => <span key={i} className="project-tag">{t}</span>)}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
