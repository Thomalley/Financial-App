import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import './Loading.css';

function SplashScreen() {
  return (
    <div className="loading-page">
      <Box display="flex" justifyContent="center" mb={6}>
        <img className="logo" src="/logo_example.png" alt="logo" />
      </Box>
      <CircularProgress style={{ color: 'var(--brand-blue' }} />
    </div>
  );
}

export default SplashScreen;
