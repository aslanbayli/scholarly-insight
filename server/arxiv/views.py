from django.shortcuts import render

import requests
import Levenshtein
import xmltodict
from rest_framework.response import Response
from rest_framework.decorators import api_view


def process_and_rank_articles(data, search_query):
    if 'entry' not in data['feed']:
        return []

    keywords = search_query.lower().split() if search_query else []
    ranked_articles = []

    for entry in data['feed']['entry']:
        score = 0
        title = entry.get('title', '').lower()
        summary = entry.get('summary', '').lower()
        authors = [author['name'].lower() for author in entry.get('author', []) if isinstance(author, dict)]
            

        # Exact and fuzzy match in title
        for keyword in keywords:
            title_words = title.split()
            for word in title_words:
                if keyword == word:
                    score += 5  # Exact match bonus
                elif Levenshtein.distance(keyword, word) < 3:
                    score += 5 - Levenshtein.distance(keyword, word)  # Fuzzy match score

        # Exact and fuzzy match in summary
        for keyword in keywords:
            summary_words = summary.split()
            for word in summary_words:
                if keyword == word:
                    score += 3
                elif Levenshtein.distance(keyword, word) < 3:
                    score += 3 - Levenshtein.distance(keyword, word)

        # Exact and fuzzy match in author names
        for keyword in keywords:
            for name in authors:
                if keyword in name:
                    score += 2
                elif Levenshtein.distance(keyword, name) < 3:
                    score += 2 - Levenshtein.distance(keyword, name)

        ranked_articles.append({
            'title': entry['title'],
            'author': [author['name'] for author in entry.get('author', []) if isinstance(author, dict)],
            'summary': entry['summary'],
            'link': entry['id'],
            'score': score
        })

    # Sort articles by score in descending order for relevance
    ranked_articles.sort(key=lambda x: x['score'], reverse=True)
    return ranked_articles


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
