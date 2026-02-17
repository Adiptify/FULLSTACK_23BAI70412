import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay';

const lazyWithDelay = (importFunc, delay = 2000) => {
  return lazy(() => {
    return Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports);
  });
};

const Home = lazyWithDelay(() => import('./pages/Home'));
const About = lazyWithDelay(() => import('./pages/About'));
const Contact = lazyWithDelay(() => import('./pages/Contact'));
const Dashboard = lazyWithDelay(() => import('./pages/Dashboard'));
const Experience = lazyWithDelay(() => import('./pages/Experience'));
const Skills = lazyWithDelay(() => import('./pages/Skills'));

function AppContent() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      {isNavigating && <LoadingOverlay />}
      <Suspense fallback={<LoadingOverlay />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
