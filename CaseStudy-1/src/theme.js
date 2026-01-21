import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0C2C55',
        },
        secondary: {
            main: '#296374',
        },
        info: {
            main: '#629FAD',
        },
        warning: {
            main: '#6594B1',
        },
        background: {
            default: '#ffffff', // Restored to white
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
    },
});

export default theme;
