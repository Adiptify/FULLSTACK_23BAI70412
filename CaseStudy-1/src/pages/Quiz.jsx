import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Button, Typography, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, Box, LinearProgress, Paper } from '@mui/material';
import { mockQuizzes } from '../data';
import { useQuiz } from '../context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addScore, quizzes } = useQuiz();

    // Find quiz by matching either numeric or string ID
    const quiz = quizzes.find(q => String(q.id) === String(id));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const timerRef = useRef(null);

    // Reset state when ID changes or quiz is found
    useEffect(() => {
        if (quiz) {
            setCurrentQuestionIndex(0);
            setAnswers({});
            setTimeLeft(quiz.duration * 60);
            setIsFinished(false);

            // Start timer
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        handleFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [id, quiz]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    if (!quiz) return (
        <Container className="mt-5 text-center">
            <Alert variant="danger">Quiz session not found or expired!</Alert>
            <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
                Return to Dashboard
            </Button>
        </Container>
    );

    const handleFinish = () => {
        clearInterval(timerRef.current);
        let score = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                score += (100 / quiz.questions.length);
            }
        });
        const finalScore = Math.round(score);
        addScore(finalScore);
        setIsFinished(true);
        navigate('/result', { state: { score: finalScore, quizId: quiz.id, answers } });
    };

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    return (
        <Container className="mt-4 mb-5">
            <Row className="mb-4 align-items-center">
                <Col>
                    <Typography variant="h5" color="primary">{quiz.title}</Typography>
                </Col>
                <Col xs="auto">
                    <Paper elevation={2} sx={{ p: 1, backgroundColor: timeLeft < 60 ? '#ffebee' : '#e0f2f1' }}>
                        <Typography variant="h6" color={timeLeft < 60 ? 'error' : 'secondary'}>
                            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                        </Typography>
                    </Paper>
                </Col>
            </Row>

            <Box sx={{ width: '100%', mb: 3 }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </Typography>
            </Box>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card elevation={3} className="mb-4" sx={{ borderRadius: 3 }}>
                        <CardContent className="p-4">
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {currentQuestion.question}
                            </Typography>
                            <FormControl component="fieldset" className="mt-3">
                                <RadioGroup
                                    value={answers[currentQuestionIndex] ?? ""}
                                    onChange={(e) => setAnswers({ ...answers, [currentQuestionIndex]: parseInt(e.target.value) })}
                                >
                                    {currentQuestion.options.map((option, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={idx}
                                            control={<Radio />}
                                            label={option}
                                            sx={{
                                                mb: 1,
                                                p: 1,
                                                borderRadius: 2,
                                                '&:hover': { bgcolor: '#f5f5f5' },
                                                transition: 'background-color 0.2s'
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            <Row>
                <Col>
                    <Button
                        variant="outlined"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    >
                        Previous
                    </Button>
                </Col>
                <Col className="text-end">
                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                        <Button variant="contained" color="success" onClick={handleFinish}>
                            Finish Quiz
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Quiz;
