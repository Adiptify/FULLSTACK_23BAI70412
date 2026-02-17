import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

const lazyWithDelay = (importFunc, delay = 1500) => {
  return lazy(() => {
    return Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports);
  });
};

const Home = lazyWithDelay(() => import('./components/Home'));
const Hdashboard = lazyWithDelay(() => import('./components/hdashboard'));
const Experience = lazyWithDelay(() => import('./components/Experience'));
const Skills = lazyWithDelay(() => import('./components/Skills'));
const ProjectDetails = lazyWithDelay(() => import('./components/ProjectDetails'));
const Contact = lazyWithDelay(() => import('./components/Contact'));
const PageTransition = lazyWithDelay(() => import('./components/PageTransition'));

const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-text">Preparing Excellence...</div>
  </div>
);

function AppContent() {
  const location = useLocation();

  return (
    <div className="app-main">
      <ScrollToTop />
      <Navbar />
      <main className="content">
        <Suspense fallback={<LoadingFallback />}>
          <PageTransition>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Hdashboard />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects/:projectId" element={<ProjectDetails />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>
      <footer className="footer">
        <div className="container">
          <p>2026 Kumar Aditya | UID: 23BAI70412 | AI Engineering Student</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
