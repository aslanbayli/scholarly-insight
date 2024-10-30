import requests
import Levenshtein
import xmltodict
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def search_articles(request):
    query = request.GET.get('query', '')
    author = request.GET.get('author', '')
    category = request.GET.get('category', '')

    # Build arXiv API URL with search parameters
    api_url = 'http://export.arxiv.org/api/query?search_query='
    if query:
        api_url += f"all:{query}"
    if author:
        api_url += f"+AND+au:{author}"
    if category:
        api_url += f"+AND+cat:{category}"
    api_url += "&start=0&max_results=10"  # Optional pagination limit

    # Fetch data from arXiv API
    response = requests.get(api_url)
    data = xmltodict.parse(response.content)

    # Rank and filter articles based on query
    articles = process_and_rank_articles(data, query)
    return Response(articles)
