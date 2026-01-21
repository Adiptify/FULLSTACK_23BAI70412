import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardContent, Typography, Button, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useQuiz } from '../context/QuizContext';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quizzes } = useQuiz();
    const { score, quizId, answers } = location.state || { score: 0, quizId: null, answers: {} };

    const quiz = quizzes.find(q => String(q.id) === String(quizId));

    if (!quizId || !quiz) {
        return (
            <Container className="mt-5 text-center">
                <Typography variant="h5">No session data found.</Typography>
                <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5">
            <Typography variant="h4" gutterBottom color="primary" align="center">
                Quiz Results
            </Typography>

            <Row className="justify-content-center mb-4">
                <Col md={6}>
                    <Card elevation={4} sx={{ backgroundColor: score >= 50 ? '#e8f5e9' : '#ffebee', textAlign: 'center', p: 3 }}>
                        <Typography variant="h2" color={score >= 50 ? 'success.main' : 'error.main'} gutterBottom>
                            {score}%
                        </Typography>
                        <Typography variant="h6">
                            {score >= 50 ? 'Great job! You passed.' : 'Keep practicing, you can do better!'}
                        </Typography>
                    </Card>
                </Col>
            </Row>

            <Typography variant="h5" gutterBottom color="secondary" className="mt-4">
                Review Answers
            </Typography>

            <Card elevation={2}>
                <List>
                    {quiz.questions.map((q, idx) => {
                        const isCorrect = answers[idx] === q.correctAnswer;
                        return (
                            <React.Fragment key={q.id}>
                                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {idx + 1}. {q.question}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        px: 1,
                                                        borderRadius: 1,
                                                        backgroundColor: isCorrect ? '#c8e6c9' : '#ffcdd2',
                                                        color: isCorrect ? '#2e7d32' : '#c62828'
                                                    }}
                                                >
                                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box sx={{ mt: 1 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Your Answer: {q.options[answers[idx]] || 'None'}
                                                </Typography>
                                                {!isCorrect && (
                                                    <Typography variant="body2" color="success.main" sx={{ mt: 0.5 }}>
                                                        Correct Answer: {q.options[q.correctAnswer]}
                                                    </Typography>
                                                )}
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {idx < quiz.questions.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        );
                    })}
                </List>
            </Card>

            <Box textAlign="center" sx={{ mt: 5 }}>
                <Button variant="contained" size="large" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
                <Button variant="outlined" size="large" sx={{ ml: 2 }} component={Link} to="/leaderboard">
                    View Leaderboard
                </Button>
            </Box>
        </Container>
    );
};

export default Result;
