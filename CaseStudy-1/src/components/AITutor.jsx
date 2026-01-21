import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, IconButton, Paper, CircularProgress } from '@mui/material';
import { SmartToy as RobotIcon, Close as CloseIcon, Send as SendIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ollama from 'ollama/browser';
import { useQuiz } from '../context/QuizContext';

const AITutor = () => {
    const { ollamaModel, ollamaStatus } = useQuiz();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Study Tutor. Ask me anything about your quizzes!' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [thinking, setThinking] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, thinking]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);
        setThinking('');

        try {
            const response = await ollama.chat({
                model: ollamaModel,
                messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                stream: true,
            });

            let fullContent = '';
            let fullThinking = '';

            // Add a placeholder assistant message
            setMessages(prev => [...prev, { role: 'assistant', content: '', thinking: '' }]);

            for await (const chunk of response) {
                if (chunk.message.thinking) {
                    fullThinking += chunk.message.thinking;
                    setThinking(fullThinking);
                } else if (chunk.message.content) {
                    fullContent += chunk.message.content;
                    setMessages(prev => {
                        const last = prev[prev.length - 1];
                        const updated = [...prev.slice(0, -1), { ...last, content: fullContent, thinking: fullThinking }];
                        return updated;
                    });
                }
            }
        } catch (error) {
            console.error('Ollama Error:', error);
            setMessages(prev => {
                const last = prev[prev.length - 1];
                const updated = [...prev.slice(0, -1), {
                    role: 'assistant',
                    content: `⚠️ Error: Could not connect to Ollama. 
                    \n\n1. Run: \`$env:OLLAMA_ORIGINS="*"; ollama serve\` (PowerShell)
                    \n2. Make sure you have the model: \`ollama pull deepseek-v3.1:671b-cloud\``
                }];
                return updated;
            });
        } finally {
            setIsTyping(false);
            setThinking('');
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            {!isOpen && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setIsOpen(true)}
                        sx={{ borderRadius: 50, width: 60, height: 60, minWidth: 0, boxShadow: 5 }}
                    >
                        <RobotIcon />
                    </Button>
                </motion.div>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            zIndex: 1001,
                            width: 350,
                            maxWidth: '90vw'
                        }}
                    >
                        <Card elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 500 }}>
                            <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box display="flex" alignItems="center">
                                    <RobotIcon sx={{ mr: 1 }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold" lineHeight={1}>AI Study Tutor</Typography>
                                        {ollamaModel.includes('cloud') && (
                                            <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                Cloud Mode 🌐
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                                <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <CardContent sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#f0f2f5' }}>
                                {messages.map((m, i) => (
                                    <Box key={i} sx={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                                        {m.thinking && (
                                            <Paper variant="outlined" sx={{ p: 1, mb: 1, bgcolor: '#e3f2fd', borderStyle: 'dashed' }}>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                                    Thinking: {m.thinking}
                                                </Typography>
                                            </Paper>
                                        )}
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                p: 1.5,
                                                bgcolor: m.role === 'user' ? 'primary.main' : 'white',
                                                color: m.role === 'user' ? 'white' : 'text.primary',
                                                borderRadius: m.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                            }}
                                        >
                                            <Typography variant="body2">{m.content}</Typography>
                                        </Paper>
                                    </Box>
                                ))}
                                {isTyping && thinking && (
                                    <Paper variant="outlined" sx={{ p: 1, alignSelf: 'flex-start', maxWidth: '85%', bgcolor: '#e3f2fd', borderStyle: 'dashed' }}>
                                        <Typography variant="caption" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                            Thinking: {thinking}...
                                        </Typography>
                                    </Paper>
                                )}
                                <div ref={messagesEndRef} />
                            </CardContent>

                            <Box component="form" onSubmit={handleSend} sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #eee', display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Ask a question..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isTyping}
                                />
                                <IconButton color="primary" type="submit" disabled={isTyping || !input.trim()}>
                                    {isTyping ? <CircularProgress size={24} /> : <SendIcon />}
                                </IconButton>
                            </Box>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AITutor;
