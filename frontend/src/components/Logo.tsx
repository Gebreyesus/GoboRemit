import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ size = 48 }: { size?: number }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
    <img src="/goboremit-logo.png" alt="GoboRemit Logo" style={{ height: size, width: 'auto' }} />
  </Box>
);

export default Logo;
