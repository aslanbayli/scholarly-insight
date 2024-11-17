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

# UI
![8e35e4b354d340c4fa4b6897747e42c](https://github.com/user-attachments/assets/34559091-e15d-422b-a9c2-be03650c5a19)

