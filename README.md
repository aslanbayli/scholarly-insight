# scholarly-insight

# Features
- Search scholarly articles by keyword, author, and category.
- Fuzzy search using Levenshtein Distance.
- Save favorite articles and set up alerts for new publications.

# Technologies Used
- Django - Web framework for the backend.
- Django REST Framework - To build the API.
- Levenshtein - For fuzzy matching in search functionality.

views.py has Levenshtein-based search functionality
process_and_rank_articles.py is a helper function to parse the response and rank articles based on exact matches and fuzzy matches using Levenshtein distance.
