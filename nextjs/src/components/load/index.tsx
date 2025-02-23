// FullScreenLoader.tsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255)', // Optional: semi-transparent background
        zIndex: 9999, // Ensures the loader is on top of other content
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullScreenLoader;
