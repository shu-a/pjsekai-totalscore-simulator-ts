import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import { isMobile } from 'react-device-detect';

export default function AppLoading() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center', alignItems: 'center',
      zIndex: 9999,
      position: 'fixed',
      // backgroundColor: 'rgba(0, 0, 0, 0.05)',
      // top: isMobile ? '64.031px' : '68.5px',
      top: 0,
      // height: isMobile ? 'calc(100% - 128.062px)' : 'calc(100% - 137px)',
      height: '100%',
      width: '100%'
    }}>
      <CircularProgress sx={{ color: '#00b3a4' }} />
    </Box>
  );
}
