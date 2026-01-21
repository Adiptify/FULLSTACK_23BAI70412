import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const { login } = useQuiz();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
            navigate('/dashboard');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card elevation={3}>
                        <CardContent className="p-4">
                            <Typography variant="h4" gutterBottom align="center" color="primary">
                                Welcome to QuizPlatform
                            </Typography>
                            <Typography variant="body1" gutterBottom align="center" className="mb-4">
                                Please enter your name to start the examination.
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mb-4"
                                    required
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    Enter
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
