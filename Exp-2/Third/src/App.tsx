import MaterialUICard from './components/MaterialUICard';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        p: 2
      }}>
        <MaterialUICard />
      </Box>
    </>
  );
}

export default App;
