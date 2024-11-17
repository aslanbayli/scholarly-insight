import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, Link, Divider } from '@mui/material';
import { fetchPaperById } from '../services/api'; // Encapsulated API call logic
import { format } from 'date-fns';

function PaperDetail() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid paper ID.');
      setLoading(false);
      return;
    }

    const loadPaper = async () => {
      setLoading(true);
      try {
        const data = await fetchPaperById(id);
        setPaper(data);
      } catch (err) {
        setError('Failed to load paper details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPaper();
  }, [id]);

  if (loading || error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          padding: 4,
        }}
      >
        {loading ? <CircularProgress /> : <Typography color="error">{error}</Typography>}
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {paper.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Authors: {paper.authors?.join(', ') || 'N/A'}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Published: {paper.published ? format(new Date(paper.published), 'PPP') : 'N/A'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" gutterBottom>
          {paper.summary}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Categories: {paper.categories?.join(', ') || 'N/A'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link
            href={paper.link}
            target="_blank"
            rel="noopener"
            underline="hover"
            aria-label={`View the paper titled ${paper.title} on arXiv`}
          >
            View on arXiv
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default PaperDetail;
