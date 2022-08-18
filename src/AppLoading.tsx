import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AppLoading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }} height="70vh">
      <CircularProgress sx={{ color: '#00b3a4' }} />
    </Box>
  );
}
