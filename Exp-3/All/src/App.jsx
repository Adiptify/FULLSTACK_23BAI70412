import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ProjectDetails from './components/ProjectDetails';
import Contact from './components/Contact';
import './App.css';

import PageTransition from './components/PageTransition';

import Home from './components/Home';

function App() {
  return (
    <div className="app-main">
      <Navbar />
      <main className="content">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </main>
      <footer className="footer">
        <div className="container">
          <p>2026 Kumar Aditya | UID: 23BAI70412 | AI Engineering Student</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
