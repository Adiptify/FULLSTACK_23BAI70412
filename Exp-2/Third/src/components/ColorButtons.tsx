import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface ColorButtonsProps {
    onNotify: (message: string, severity: 'success' | 'error' | 'info') => void;
    activeVariant: 'secondary' | 'success' | 'error' | null;
}

export default function ColorButtons({ onNotify, activeVariant }: ColorButtonsProps) {
    if (!activeVariant) return null;

    return (
        <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            {activeVariant === 'secondary' && (
                <Button
                    color="secondary"
                    onClick={() => onNotify('Secondary action performed', 'info')}
                >
                    Secondary
                </Button>
            )}
            {activeVariant === 'success' && (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => onNotify('Operation successful!', 'success')}
                >
                    Success
                </Button>
            )}
            {activeVariant === 'error' && (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onNotify('An error occurred!', 'error')}
                >
                    Error
                </Button>
            )}
        </Stack>
    );
}
