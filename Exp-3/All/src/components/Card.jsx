import React from 'react';
import './Card.css';

const Card = ({ title, description, icon, link, onClick }) => {
    return (
        <div className="card glass fade-in" onClick={onClick}>
            <div className="card-icon">{icon}</div>
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            {link && <button className="card-btn">Learn More</button>}
        </div>
    );
};

export default Card;
