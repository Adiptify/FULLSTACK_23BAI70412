import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-links">
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Profile
                    </NavLink>
                    <a href="/#dashboard" className="nav-link">Dashboard</a>
                    <a href="/#experience" className="nav-link">Experience</a>
                    <a href="/#skills" className="nav-link">Skills</a>
                    <a href="/#contact" className="nav-link">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
