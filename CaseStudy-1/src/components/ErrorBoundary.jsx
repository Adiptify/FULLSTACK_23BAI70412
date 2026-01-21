import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("System Crash Caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3} bgcolor="#f5f5f5">
                    <Paper elevation={4} sx={{ p: 4, maxWidth: 600, textAlign: 'center', borderRadius: 4 }}>
                        <WarningIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            System Encountered an Issue
                        </Typography>
                        <Typography variant="body1" color="textSecondary" mb={3}>
                            A critical runtime error occurred. This is often due to missing dependencies or corrupted local storage.
                        </Typography>
                        <Box textAlign="left" bgcolor="#fee" p={2} borderRadius={2} mb={3}>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'error.dark' }}>
                                {this.state.error?.toString()}
                            </Typography>
                        </Box>
                        <Button variant="contained" color="primary" onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}>
                            Clear Cache & Restart
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
