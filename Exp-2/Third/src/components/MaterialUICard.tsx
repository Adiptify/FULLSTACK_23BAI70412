import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingButtonsTransition from './LoadingButtonsTransition';
import ColorButtons from './ColorButtons';

export default function MaterialUICard() {
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [activeVariant, setActiveVariant] = React.useState<'secondary' | 'success' | 'error' | null>(null);
    const [notification, setNotification] = React.useState<{ message: string; severity: 'success' | 'error' | 'info' }>({
        message: '',
        severity: 'success'
    });

    const handleNotify = (message: string, severity: 'success' | 'error' | 'info') => {
        setNotification({ message, severity });
        setOpen(true);
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleAction = (variant: 'secondary' | 'success' | 'error') => {
        setActiveVariant(variant);
    };

    return (
        <Card sx={{ width: '100%', maxWidth: 500, mx: 'auto', boxShadow: 6, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h4" component="div" gutterBottom align="center" fontWeight="bold">
                    Material UI
                </Typography>

                <Box sx={{ my: 3 }}>
                    <TextField
                        fullWidth
                        label="Write something..."
                        variant="outlined"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Type here to interact"
                    />
                </Box>

                <Divider sx={{ my: 3 }}>
                    <Typography variant="caption" color="text.secondary">ACTIONS</Typography>
                </Divider>

                <LoadingButtonsTransition onAction={handleAction} />

                {activeVariant && (
                    <>
                        <Divider sx={{ my: 3 }}>
                            <Typography variant="caption" color="text.secondary">RESULT</Typography>
                        </Divider>
                        <ColorButtons onNotify={handleNotify} activeVariant={activeVariant} />
                    </>
                )}
            </CardContent>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Card>
    );
}
