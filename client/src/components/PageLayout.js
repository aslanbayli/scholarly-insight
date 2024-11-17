import React from 'react';
import { Box } from '@mui/material';

const PageLayout = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '16px',
      }}
    >
      {children}
    </Box>
  );
};

export default PageLayout;
