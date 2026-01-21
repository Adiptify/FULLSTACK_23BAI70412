import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { QuizProvider } from './context/QuizContext';
import Navigation from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';

import { motion, AnimatePresence } from 'framer-motion';
import AITutor from './components/AITutor';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuizProvider>
        <Router>
          <Navigation />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
              <Route path="/quiz/:id" element={<ProtectedRoute><PageWrapper><Quiz /></PageWrapper></ProtectedRoute>} />
              <Route path="/result" element={<ProtectedRoute><PageWrapper><Result /></PageWrapper></ProtectedRoute>} />
              <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
          <AITutor />
        </Router>
      </QuizProvider>
    </ThemeProvider>
  );
}

export default App;
