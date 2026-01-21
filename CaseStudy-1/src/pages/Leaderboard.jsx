import React from 'react';
import { Container } from 'react-bootstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useQuiz } from '../context/QuizContext';

const Leaderboard = () => {
    const { leaderboard, user } = useQuiz();

    return (
        <Container className="mt-4">
            <Typography variant="h4" gutterBottom color="primary">
                Leaderboard
            </Typography>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.map((entry, index) => (
                            <TableRow
                                key={index}
                                hover
                                selected={user && entry.name === user.name}
                                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell sx={{ fontWeight: user && entry.name === user.name ? 'bold' : 'normal' }}>
                                    {entry.name} {user && entry.name === user.name && '(You)'}
                                </TableCell>
                                <TableCell align="right">{entry.score}</TableCell>
                                <TableCell align="right">{entry.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Leaderboard;
