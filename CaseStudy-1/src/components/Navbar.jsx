import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Avatar, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Quiz as QuizIcon, Leaderboard as TrophyIcon, Logout as LogoutIcon, Dashboard as DashboardIcon } from '@mui/icons-material';

const Navigation = () => {
    const { user, logout } = useQuiz();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" sx={{
            background: '#0C2C55', // Solid Deep Blue from scheme
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            mb: 4
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <QuizIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#629FAD' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 800,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        QUIZ<span style={{ color: '#629FAD' }}>AI</span>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {user && (
                            <>
                                <Button
                                    component={Link}
                                    to="/dashboard"
                                    sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 0.5 }}
                                >
                                    <DashboardIcon fontSize="small" /> Dashboard
                                </Button>
                                <Button
                                    component={Link}
                                    to="/leaderboard"
                                    sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 0.5 }}
                                >
                                    <TrophyIcon fontSize="small" /> Rankings
                                </Button>
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0, ml: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        {user ? (
                            <>
                                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        {user.name}
                                    </Typography>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#296374', fontSize: '1rem' }}>
                                        {user.name[0]}
                                    </Avatar>
                                </Box>
                                <Tooltip title="Logout">
                                    <IconButton onClick={handleLogout} sx={{ color: 'white' }}>
                                        <LogoutIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                variant="outlined"
                                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white' } }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;
