import { Box, Button } from '@mui/material';

const PaginationControls = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      {pages.map(number => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          sx={{ margin: '0 2px' }}
          variant={number === currentPage ? 'contained' : 'outlined'}
        >
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default PaginationControls;