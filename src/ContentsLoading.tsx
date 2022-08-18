import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import { isMobile } from 'react-device-detect';

interface IProps {
  complete: boolean
}

export default function ContentsLoading(props: IProps) {
  return (
    <Box sx={{
      display: props.complete ? 'flex' : 'none',
      justifyContent: 'center',
      textAlign: 'center', alignItems: 'center',
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      position: 'fixed',
      // top: isMobile ? '64.031px' : '68.5px',
      top: 0,
      height: '100%',
      width: '100%'
    }}>
      <CircularProgress sx={{ color: '#00b3a4' }} />
    </Box>
  );
}
