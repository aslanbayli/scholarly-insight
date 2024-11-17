import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

function AboutPage() {
  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '16px',
        marginTop: '16px', // Extra spacing if needed
      }}
    >
      <Toolbar />
      <Typography 
        variant="h4"
        sx={{ color: 'primary.main' }}
        gutterBottom
      >
        About Scholarly Insight
      </Typography>
      <Typography variant="body1">
        Scholarly Insight is a platform that enables users to explore academic papers from the arXiv repository. 
        Our goal is to provide an intuitive and efficient way to search and discover the latest research 
        in various fields, including computer science, mathematics, physics, and more.
      </Typography>
    </Box>
  );
}

export default AboutPage;
