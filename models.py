import requests
import xml.etree.ElementTree as ET

def fetch_arxiv_data(query="cs.AI", max_results=5):
    url = "http://export.arxiv.org/api/query"
    params = {
        'search_query': f'cat:{query}',
        'start': 0,
        'max_results': max_results
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        root = ET.fromstring(response.text)
        articles = []
        for entry in root.findall("{http://www.w3.org/2005/Atom}entry"):
            title = entry.find("{http://www.w3.org/2005/Atom}title").text
            summary = entry.find("{http://www.w3.org/2005/Atom}summary").text
            articles.append({"title": title, "summary": summary})
        return articles
    else:
        print("Error fetching data")
        return []

# Example Usage
if __name__ == "__main__":
    articles = fetch_arxiv_data()
    for article in articles:
        print("Title:", article['title'])
        print("Summary:", article['summary'])
