import React, { useState } from 'react';
import { Box, Chip, FormControl, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchAndFilter({ onSearch, onCategoryChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const categories = [
    'All Categories', 'Physics', 'Mathematics', 'Quantitative Biology',
    'Computer Science', 'Quantitative Finance', 'Statistics',
    'Electrical Engineering and Systems Science', 'Economics',
  ];

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };
  
  return (
    <Box>
      {/* Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Chip
          key={category}
          label={category}
          onClick={() => handleCategoryClick(category)}
          color={selectedCategory === category ? 'primary' : 'default'}
          />
        ))}
      </Box>

      {/* Search Bar */}
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <OutlinedInput
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for papers..."
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          }
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </FormControl>
    </Box>
  );
}

export default SearchAndFilter;