import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import SearchAndFilter from '../components/SearchAndFilter';
import PaperList from '../components/PaperList';
import { fetchPapersFromBackend } from '../services/api'; // Fetch papers via backend

function HomePage() {
  // State to store the list of papers
  const [papers, setPapers] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(false);
  // State to track error messages
  const [error, setError] = useState(null);
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State for the selected paper category
  const [category, setCategory] = useState('');

  // Fetch papers from the backend API
  const loadPapers = async () => {
    setLoading(true); // Set loading to true during data fetch
    setError(null); // Reset error state
    try {
      // Fetch papers using the search term and category
      const data = await fetchPapersFromBackend(searchTerm, category, 10);
      setPapers(data); // Update the state with fetched papers
    } catch (err) {
      setError('Failed to load papers. Please try again.'); // Set error message on failure
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Reload papers whenever search term or category changes
  useEffect(() => {
    loadPapers();
  }, [searchTerm, category]);

  // Handle changes in the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchPapersFromBackend(term, category).then((papers) => {
      setPapers(papers);
    });
  };

  // Handle category selection changes
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory);
    fetchPapersFromBackend(searchTerm, newCategory).then((papers) => {
      setPapers(papers);
    });
  };

  return (
    <Box component="main" sx={{ marginTop: '64px', p: 3, width: '100%' }}>
      {/* Page Title */}
      <Typography 
        variant="h4"
        sx={{ color: 'primary.main' }}
        gutterBottom
      >
        Scholarly Insight
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Search and discover academic papers powered by arXiv.
      </Typography>

      {/* Search and Filter Section */}
      <SearchAndFilter
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />

      {/* Display error message */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Display loading spinner */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        // Display list of papers
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {papers.map((paper, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PaperList
                title={paper.title}
                authors={paper.authors}
                summary={paper.summary}
                link={paper.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default HomePage;
