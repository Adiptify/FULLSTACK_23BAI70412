import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { Avatar, Grid, Chip } from '@mui/material';
import AIQuizGenerator from '../components/AIQuizGenerator';

const subjectColors = ['#FA8112', '#84934A', '#FA5C5C', '#94A378', '#FFA240', '#9E2A3A', '#5A7ACD'];

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, leaderboard, quizzes } = useQuiz();

    const userStats = leaderboard.filter(entry => entry.name === user.name);
    const bestScore = userStats.length > 0 ? Math.max(...userStats.map(s => s.score)) : 0;
    const attempts = userStats.length;

    return (
        <Container className="mt-4 pb-5">
            {/* User Stats Section */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-5"
            >
                <Card sx={{
                    background: 'linear-gradient(135deg, #0C2C55 10%, #213C51 100%)',
                    color: 'white',
                    borderRadius: 4
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" gap={3}>
                            <Avatar sx={{ width: 80, height: 80, bgcolor: 'secondary.main', fontSize: '2rem' }}>
                                {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="h4">Hello, {user.name}!</Typography>
                                <Typography variant="body1" sx={{ opacity: 0.8 }}>Ready to sharpen your skills today?</Typography>
                                <Box display="flex" gap={2} mt={2}>
                                    <Chip label={`Best Score: ${bestScore}%`} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} variant="outlined" />
                                    <Chip label={`Attempts: ${attempts}`} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} variant="outlined" />
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>

            <AIQuizGenerator />

            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                Recommended Quizzes
            </Typography>

            <Grid container spacing={3} className="mt-2">
                {quizzes.map((quiz, index) => (
                    <Grid item xs={12} md={6} lg={4} key={quiz.id}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <Card elevation={4} sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 4,
                                overflow: 'hidden',
                                transition: 'box-shadow 0.3s',
                                '&:hover': { boxShadow: 10 }
                            }}>
                                <Box sx={{ height: 140, bgcolor: subjectColors[index % subjectColors.length], position: 'relative' }}>
                                    <Typography variant="h3" sx={{ position: 'absolute', bottom: 10, right: 10, opacity: 0.1 }}>
                                        {index + 1}
                                    </Typography>
                                </Box>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        {quiz.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" className="mb-3">
                                        {quiz.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Chip size="small" label={`${quiz.duration} mins`} variant="outlined" color="secondary" />
                                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                            {quiz.questions.length} Questions
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Box sx={{ p: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ borderRadius: 2, py: 1 }}
                                        onClick={() => navigate(`/quiz/${quiz.id}`)}
                                    >
                                        Start Examination
                                    </Button>
                                </Box>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
