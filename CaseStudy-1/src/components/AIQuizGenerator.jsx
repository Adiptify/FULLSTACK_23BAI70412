import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, CircularProgress, Alert, Chip } from '@mui/material';
import { AutoAwesome as MagicIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ollama from 'ollama/browser';
import { useQuiz } from '../context/QuizContext';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Define the Schema for Structured Output
const QuizSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
    questions: z.array(z.object({
        question: z.string(),
        options: z.array(z.string()).length(4),
        correctAnswer: z.number().min(0).max(3)
    })).length(3)
});

const AIQuizGenerator = () => {
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);
    const { addQuiz, ollamaStatus, ollamaModel } = useQuiz();

    const generateQuiz = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        setError(null);

        const isCloudModel = ollamaModel.toLowerCase().includes('cloud');

        try {
            let fullContent = '';

            // Using streaming for better feedback and to prevent timeouts on slow cloud connections
            const response = await ollama.chat({
                model: ollamaModel,
                messages: [{
                    role: 'user',
                    content: `Generate a 3-question quiz about "${topic}". 
                    Return EXACTLY this JSON structure:
                    {
                      "title": "String",
                      "description": "String",
                      "duration": Number,
                      "questions": [
                        {
                          "question": "String",
                          "options": ["Op1", "Op2", "Op3", "Op4"],
                          "correctAnswer": Number(0-3)
                        }
                      ]
                    }
                    Respond ONLY with valid JSON.`
                }],
                stream: true
            });

            for await (const chunk of response) {
                fullContent += chunk.message.content;
            }

            // Enhanced cleaning for high-latency cloud models
            const cleanContent = fullContent.replace(/```json|```/g, '').replace(/^[^{]*/, '').replace(/[^}]*$/, '').trim();
            const rawData = JSON.parse(cleanContent);
            const quizData = QuizSchema.parse(rawData);

            const newQuiz = {
                ...quizData,
                id: Date.now(),
            };

            addQuiz(newQuiz);
            setTopic('');

        } catch (err) {
            console.error("AI Generation Error Details:", err);
            setError(`Generation failed. ${isCloudModel ? 'Cloud models' : 'Ollama'} might be experiencing high latency. Try a simpler topic or check your internet.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const isCloudModel = ollamaModel.toLowerCase().includes('cloud');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4"
        >
            <Card elevation={4} sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(98, 0, 234, 0.2)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: ollamaStatus === 'connected' ? 'success.main' : (ollamaStatus === 'error' ? 'error.main' : 'warning.main') }} />
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <MagicIcon color="primary" />
                            <Typography variant="h6" fontWeight="bold">AI Quiz Generator</Typography>
                        </Box>
                        {ollamaStatus === 'connected' ? (
                            <Chip size="small" label={`Ollama: ${ollamaModel}`} color="success" variant="outlined" />
                        ) : (
                            <Chip size="small" label="Ollama: Disconnected" color="error" variant="outlined" />
                        )}
                    </Box>

                    {ollamaStatus === 'error' && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="bold">Ollama not detected!</Typography>
                            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                                1. In Terminal/PowerShell run: <strong>$env:OLLAMA_ORIGINS="*"; ollama serve</strong>
                                <br />
                                2. In another Terminal run: <strong>ollama pull {ollamaModel}</strong>
                            </Typography>
                        </Alert>
                    )}

                    {isCloudModel && ollamaStatus === 'connected' && (
                        <Alert severity="info" sx={{ mb: 2, '& .MuiAlert-message': { width: '100%' } }}>
                            <Typography variant="caption" fontWeight="bold" display="block">Cloud Model Active 🌐</Typography>
                            <Typography variant="caption">
                                Generating via cloud can take 30-60 seconds. Please wait after clicking.
                            </Typography>
                        </Alert>
                    )}

                    <Typography variant="body2" color="textSecondary" mb={2}>
                        Enter a topic to generate a perfectly structured examination using <strong>{ollamaModel}</strong>.
                    </Typography>
                    <Box display="flex" gap={1}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="e.g. History of Rome, Modern Art, Python Basics..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={isGenerating}
                        />
                        <Button
                            variant="contained"
                            onClick={generateQuiz}
                            disabled={isGenerating || !topic.trim()}
                            sx={{ minWidth: 120, borderRadius: 2 }}
                        >
                            {isGenerating ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
                        </Button>
                    </Box>
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AIQuizGenerator;
