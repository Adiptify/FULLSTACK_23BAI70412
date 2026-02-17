import React from 'react';
import './Skills.css';

const Skills = () => {
    const skillGroups = [
        {
            category: "Programming Languages",
            items: ["Python", "SQL", "JavaScript"]
        },
        {
            category: "AI / Machine Learning",
            items: ["Machine Learning", "NLP", "Large Language Models (LLMs)", "Transformers"]
        },
        {
            category: "GenAI & Retrieval",
            items: ["Retrieval-Augmented Generation (RAG)", "Embeddings", "Semantic Search", "FAISS"]
        },
        {
            category: "LLM Tools",
            items: ["LangChain", "Ollama"]
        },
        {
            category: "Web Development",
            items: ["JavaScript", "React (Moderate)"]
        },
        {
            category: "Cloud & APIs",
            items: ["Microsoft Azure", "RESTful APIs"]
        }
    ];

    return (
        <div className="skills-page fade-in">
            <h1>Technical Skills</h1>
            <div className="skills-grid">
                {skillGroups.map((group, i) => (
                    <div key={i} className="skill-group card-base">
                        <h3>{group.category}</h3>
                        <div className="skill-tags">
                            {group.items.map((skill, j) => (
                                <span key={j} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
