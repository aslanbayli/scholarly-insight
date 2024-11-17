import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

function ContactPage() {
  const nameStyle = { color: 'black' };
  const emailStyle = { color: '#1976d2', textDecoration: 'none' };

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '16px',
        marginTop: '16px', // Extra spacing if needed
      }}
    >
      <Toolbar /> {/* Adds spacing equal to Navbar height */}
      <Typography 
        variant="h4"
        sx={{ color: 'primary.main' }}
        gutterBottom
      >
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: 1.5 }}
      >
      <span style={nameStyle}>Ali Aslanbayli:</span>{' '}
      <a href="mailto:aa12947@nyu.edu" style={emailStyle}>aa12947@nyu.edu</a><br />
      
      <span style={nameStyle}>Asrita Bobba:</span>{' '}
      <a href="mailto:ab12660@nyu.edu" style={emailStyle}>ab12660@nyu.edu</a><br />
      
      <span style={nameStyle}>Asmita Sonavane:</span>{' '}
      <a href="mailto:as20428@nyu.edu" style={emailStyle}>as20428@nyu.edu</a><br />
      
      <span style={nameStyle}>Bhavya Sanjana R N V:</span>{' '}
      <a href="mailto:br2423@nyu.edu" style={emailStyle}>br2423@nyu.edu</a><br />
      
      <span style={nameStyle}>Sichao Wang:</span>{' '}
      <a href="mailto:sw6287@nyu.edu" style={emailStyle}>sw6287@nyu.edu</a>
      </Typography>
    </Box>
  );
}

export default ContactPage;
