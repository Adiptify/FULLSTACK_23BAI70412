import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockQuizzes, mockLeaderboard } from '../data';
import ollama from 'ollama/browser';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [ollamaStatus, setOllamaStatus] = useState('idle'); // idle, connected, error
    const [ollamaModel, setOllamaModel] = useState('deepseek-v3.1:671b-cloud');

    useEffect(() => {
        const discoverModel = async () => {
            try {
                const tags = await ollama.list();
                setOllamaStatus('connected');
                const models = tags.models.map(m => m.name);

                // Priority list of models
                const userChoice = 'deepseek-v3.1:671b-cloud';
                if (models.includes(userChoice)) {
                    setOllamaModel(userChoice);
                } else {
                    // Find any deepseek or generic model if user choice missing
                    const fallback = models.find(m => m.includes('deepseek')) || models[0];
                    if (fallback) setOllamaModel(fallback);
                }
            } catch (e) {
                setOllamaStatus('error');
                console.error("Ollama discovery failed", e);
            }
        };
        discoverModel();
    }, []);
    const [quizzes, setQuizzes] = useState(() => {
        try {
            const savedQuizzes = localStorage.getItem('quiz_data');
            return savedQuizzes ? JSON.parse(savedQuizzes) : mockQuizzes;
        } catch (e) {
            console.error("Failed to parse quizzes from localStorage", e);
            return mockQuizzes;
        }
    });

    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('quiz_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            return null;
        }
    });

    const [leaderboard, setLeaderboard] = useState(() => {
        try {
            const savedLeaderboard = localStorage.getItem('quiz_leaderboard');
            return savedLeaderboard ? JSON.parse(savedLeaderboard) : mockLeaderboard;
        } catch (e) {
            console.error("Failed to parse leaderboard from localStorage", e);
            return mockLeaderboard;
        }
    });

    useEffect(() => {
        localStorage.setItem('quiz_data', JSON.stringify(quizzes));
    }, [quizzes]);

    useEffect(() => {
        localStorage.setItem('quiz_leaderboard', JSON.stringify(leaderboard));
    }, [leaderboard]);

    const addQuiz = (newQuiz) => {
        setQuizzes(prev => [...prev, newQuiz]);
    };

    const login = (username) => {
        const newUser = { name: username, token: 'mock-jwt-token' };
        setUser(newUser);
        localStorage.setItem('quiz_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('quiz_user');
    };

    const addScore = (score) => {
        if (user) {
            const newEntry = { name: user.name, score, date: new Date().toISOString().split('T')[0] };
            setLeaderboard(prev => [...prev, newEntry].sort((a, b) => b.score - a.score));
        }
    };

    return (
        <QuizContext.Provider value={{
            user, login, logout,
            leaderboard, addScore,
            quizzes, addQuiz,
            ollamaStatus, ollamaModel
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);
