import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

interface LoadingButtonsTransitionProps {
    onAction: (variant: 'secondary' | 'success' | 'error') => void;
}

export default function LoadingButtonsTransition({ onAction }: LoadingButtonsTransitionProps) {
    const [loading, setLoading] = React.useState(false);

    const handleAction = (variant: 'secondary' | 'success' | 'error') => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onAction(variant);
        }, 1000);
    };

    return (
        <Box>
            <FormControlLabel
                sx={{ display: 'block', mb: 2 }}
                control={
                    <Switch
                        checked={loading}
                        onChange={() => setLoading(!loading)}
                        name="loading"
                        color="primary"
                    />
                }
                label="Simulate Loading"
            />
            <Box sx={{ '& > button': { m: 1 }, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button
                    size="medium"
                    onClick={() => handleAction('secondary')}
                    loading={loading}
                    variant="outlined"
                >
                    Fetch Data
                </Button>
                <Button
                    size="medium"
                    onClick={() => handleAction('success')}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    Send
                </Button>
                <Button
                    size="medium"
                    color="secondary"
                    onClick={() => handleAction('error')}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
}
