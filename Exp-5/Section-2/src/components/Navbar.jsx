import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">SPA Lab</div>
            <div className="nav-links">
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Home
                </NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Dashboard
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    About
                </NavLink>
                <NavLink to="/skills" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Skills
                </NavLink>
                <NavLink to="/experience" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Exp
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Contact
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
