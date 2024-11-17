import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

function PaperList() {
  const [papers, setPapers] = useState([]);

  const fetchPapers = async (searchTerm, category) => {
    const response = await fetch(
      `http://export.arxiv.org/api/query?search_query=all:${searchTerm}+AND+cat:${category}&start=0&max_results=10`
    );
    const data = await response.json();
    setPapers(data.entries);
  };

  return (
    <Grid container spacing={2}>
      {papers.map((paper) => (
        <Grid item xs={12} sm={6} md={4} key={paper.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{paper.title}</Typography>
              <Typography variant="body2">{paper.summary}</Typography>
              <Typography variant="caption">{paper.author}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PaperList;
