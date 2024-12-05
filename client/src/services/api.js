export const fetchPapersFromBackend = async (searchTerm = '', category = '', maxResults = 10) => {
    try {
        if (searchTerm === '') searchTerm = 'all the';
      const response = await fetch(
        // `/api/papers?search_term=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}&max_results=${maxResults}`
        `http://localhost:8000/arxiv/search?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}&maxResults=${maxResults}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch papers: ${response.statusText}`);
      }
      console.log('raw response: ', response);
      const data = await response.json();
      console.log('json parsed response: ', data);
      return data;
    } catch (error) {
      console.error('Error fetching papers:', error.message);
      return [];
    }
};

export const fetchPaperById = async (id) => {
    try {
      const response = await fetch(`/api/paper/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch paper details.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching paper by ID:', error.message);
      throw error;
    }
  };

