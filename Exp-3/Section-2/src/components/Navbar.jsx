import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">Link Lab</div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/gallery" className="nav-link">Gallery</Link>
                <Link to="/info" className="nav-link">Info</Link>
            </div>
        </nav>
    );
};

export default Navbar;
