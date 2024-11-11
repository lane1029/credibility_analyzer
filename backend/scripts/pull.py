import re
from datetime import datetime

import os # Used to interact with the file system
import sys # Used to access system-specific parameters and functions
from bs4 import BeautifulSoup # Used to parse HTML content
import urllib.request # Used to fetch URLs
from config import get_config # Used to get the configuration
import json # Used to work with JSON data
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

config = get_config()

client = MongoClient(config.MONGO_URI, server_api=ServerApi('1'))

def fetch_html(url):
    """
    Fetches the HTML content from a URL
    Args:
        url (str): The URL to fetch the HTML content from
    Returns:
        str: The HTML content of the URL
    """
    try:
        # Fetch the HTML content from the URL and decode the response as text
        request = urllib.request.Request(
            url, 
            headers=config.HEADERS
        )
        # Check if the page exists
        code = urllib.request.urlopen(request).getcode()
        
        response = urllib.request.urlopen(request).read()
        data = response.decode('utf-8')
        return code, data
    # return an error if the URL is invalid or the page is not found
    except Exception as e:
        sys.stderr.write(f"Error fetching HTML content: {e}")
        return None

def fetch_all_article_links(main_url):
    """
    Fetches all subpages of a website
    Args:
        main_url (str): The main URL of the website
    Returns:
        list: A list of links to the subpages
    """
    # Intialize variables
    current_page = 1
    extracted_links = []

    # Loop through all subpages
    while True:
        # Build the URL for the current page
        page_suffix = f"/?page={current_page}"
        page_url = main_url + page_suffix

        code, response = fetch_html(page_url)

        if code != 200:
            break # Break the loop if the page is not found

        # Parse the HTML content
        soup = BeautifulSoup(response, 'html.parser')
    
        # Find the section containing the articles
        articles_div = soup.find_all('div', class_='jss38')

        # Get all the subsections with articles
        articles = []
        for div in articles_div:
            articles.extend(div.find_all('a'))

        # Break the loop if no articles are found
        if not articles:
            break
    
        # Extract the links to the articles
        for article in articles:
            link = article['href']
            extracted_links.append(link)

        current_page += 1  # Move to the next page
    return extracted_links

def parse_article(article_html):
    """
    Parses the HTML content of an article
    Args:
        article_html (str): The HTML content of the article
    Returns:
        soup (BeautifulSoup): The parsed HTML content of the article
    """
    # Parse the HTML content
    soup = BeautifulSoup(article_html, 'html.parser')

    return soup

def extract_article_publication_date(article_soup):
    """
    Extracts the publication date of an article
    Args:
        article_soup (BeautifulSoup): The parsed HTML content of the article
    Returns:
        published_date: The publication date of the article
        published_day: The day of the month the article was published
        published_month: The month the article was published
        published_year: The year the article was published
    """
    # Get all section tags and find the one with 'banner' in the class
    sections = article_soup.find_all('section')
    for section in sections:
        if 'banner' in section.get('class', []):
            # Find a date within the text
            date_pattern = r'\b(?:\d{1,2}[-/th|st|nd|rd\s]*)?(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[-/,.\s]*\d{1,2}[-/,.\s]*\d{2,4}\b'
            date_match = re.search(date_pattern, section.get_text())
            if date_match:
                date_str = date_match.group()# List of date formats to try
                date_formats = [
                    '%d %B %Y',
                    '%B %d, %Y',
                    '%d %b %Y',
                    '%b %d, %Y',
                    '%Y-%m-%d', 
                    '%B %Y' 
                ]
                
                # Attempt to parse the date string using the defined formats
                parsed_date = None
                for fmt in date_formats:
                    try:
                        parsed_date = datetime.strptime(date_str.strip(), fmt)
                        break  # Exit loop on successful parsing
                    except ValueError:
                        continue  # Try the next format
                
                # Store the result, if parsing was successful
                if parsed_date:
                    published_date = parsed_date.isoformat()
                    published_day = parsed_date.day
                    published_month = parsed_date.month
                    published_year = parsed_date.year
                else:
                    published_date = date_str
                    published_day = None
                    published_month = None
                    published_year = None
    return published_date, published_day, published_month, published_year


def extract_article_content(article_soup):
    """
    Extracts the content of an article
    Args:
        article_soup (BeautifulSoup): The parsed HTML content of the article
    Returns:
        text_content: The text content of the article
    """
    # Get the text content from the article
    paragraphs = article_soup.find_all('div', class_='rich-text')
    text_content = " ".join([p.get_text() for p in paragraphs])
    text_content = " ".join(text_content.split()) # Remove extra whitespaces and newlines
    text_content = text_content.replace("”", '"').replace("“", '"') # Replace special characters
    return text_content

def get_article_collection(collection_name, db):
    # Check if a specific collection exists in the database
    if collection_name in db.list_collection_names():
        collection = db[collection_name]
    else:
        collection = db[collection_name]
        collection.create_index("article_id", unique=True)

    return collection

def check_existing_articles(db, main_url):
    """
    Checks for existing articles in the database
    Args:
        db (MongoClient): The MongoDB client
        main_url (str): The main URL of the website
    Returns:
        existing_article_dict: A dictionary of existing articles in the database
        common_titles: A list of titles that are already in the database
        new_titles: A list of titles that are not in the database
    """    
    existing_db_articles = db.articles.find({}, {"article_id": 1, "published_date": 1}).sort("published_date", -1)
    existing_article_dict = {article["article_id"]: article["published_date"] for article in existing_db_articles}

    # Get the HTML for the main page
    extracted_links = fetch_all_article_links(main_url)
    # Remove 'articles/' prefix from each link if it exists
    extracted_titles = [link.replace('/articles/', '', 1) if link.startswith('/articles/') else link for link in extracted_links]
    extracted_titles = [link.replace('/', '', 1) for link in extracted_titles]

    # Get all the titles that appear in extracted_titles and as a key in existing_article_dict
    common_titles = [title for title in extracted_titles if title in existing_article_dict]

    # Get all the titles that are not in common_titles
    new_titles = [title for title in extracted_titles if title not in common_titles]
    return existing_article_dict, common_titles, new_titles

def updated_articles(collection, common_titles, existing_article_dict, base_url):
    """
    Updates the articles that are already in the database
    Args:
        collection (Collection): The MongoDB collection
        common_titles (list): A list of titles that are already in the database 
        existing_article_dict (dict): A dictionary of existing articles in the database
        base_url (str): The base URL of the website
    """
    updated_article_count = 0
    updated_articles = []
    for title in common_titles:
        db_publish_date = existing_article_dict[title]
        article_url = base_url + title
        code, article_html = fetch_html(article_url)
        # Parse the HTML content to extract text
        soup = parse_article(article_html)

        # Extract the publication date of the article
        publication_info = extract_article_publication_date(soup)
        if publication_info[0] > db_publish_date:
            updated_article_count += 1
            updated_articles.append(title)
            content = {}
            content['date_retrieved'] = datetime.now().isoformat()
            content['published_date'] = publication_info[0]
            content['published_day'] = publication_info[1]
            content['published_month'] = publication_info[2]
            content['published_year'] = publication_info[3]

            text_content = extract_article_content(soup)
            content['text_content'] = text_content

            # Step 2: Define the filter to locate the document you want to update
            filter_query = {"article_id": title}  # Replace with your actual filter criteria

            # Step 3: Define the update you want to apply
            update_data = {"$set": content}  # Example update data

            # Step 4: Perform the update
            result = collection.update_one(filter_query, update_data)

            # Check if the update was successful
            if result.matched_count > 0:
                print("Document updated successfully.")
            else:
                print("No matching document found.")
    return updated_articles, updated_article_count

def add_articles(collection, new_titles, base_url, content_type):
    """
    Adds new articles to the database
    Args:
        collection (Collection): The MongoDB collection
        new_titles (list): A list of titles that are not in the database
        base_url (str): The base URL of the website
        content_type (str): The type of content
    """
    for link in new_titles:
        article_url = base_url + link
        code, article_html = fetch_html(article_url)
        content={}
        if article_html:
            content['content_type'] = content_type
            content['date_retrieved'] = datetime.now().isoformat()
            content['url'] = article_url
            content['source'] = base_url
            content['article_id'] = link
            # Parse the HTML content to extract text
            soup =parse_article(article_html)

            # Extract the publication date of the article
            publication_info = extract_article_publication_date(soup)
            content['published_date'] = publication_info[0]
            content['published_day'] = publication_info[1]
            content['published_month'] = publication_info[2]
            content['published_year'] = publication_info[3]

            # Extract the text content of the article
            text_content = extract_article_content(soup)
            content['text_content'] = text_content

            collection.insert_one(content)
    return len(new_titles)

def fetch_and_update_data(main_url):
    """
    Fetches the HTML content of the main page and all subpages
    Args:
        main_url (str): The main URL of the website
        output_dir (str): The directory to save the HTML content
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        db = client[config.DB_NAME]
        collection = get_article_collection(config.ARTICLE_COLLECTION_NAME, db)
        existing_article_dict, common_titles, new_titles = check_existing_articles(db, main_url)

        if 'articles' in main_url:
            base_url = main_url.split('articles')[0]
            base_url = base_url + 'articles/'

        # Update the articles that are already in the database if they have new data
        updated_titles, num_updated = updated_articles(collection, common_titles, existing_article_dict, base_url)
        
        # Add the new articles to the database
        content_type = main_url.split('/')[-1]
        num_added = add_articles(collection, new_titles, base_url, content_type)

        return True, updated_titles, num_updated, new_titles, num_added
    except Exception as e:
        sys.stderr.write(f"Error fetching and updating data: {e}")
        return False, [], 0, [], 0

def get_metadata_collection(collection_name, db):
    # Check if a specific collection exists in the database
    if collection_name in db.list_collection_names():
        collection = db[collection_name]
    else:
        collection = db[collection_name]

    return collection

def update_metadata(fetch_successful, updated_titles, num_updated, new_titles, num_added):
    db = client[config.DB_NAME]
    metadata_collection = get_metadata_collection(config.METADATA_COLLECTION_NAME, db)

    metadata = {
        "fetch_successful": fetch_successful,
        "updated_titles": updated_titles,
        "count_updated_titles": num_updated,
        "new_titles": new_titles,
        "count_new_titles": num_added,
        "last_scrape_date": datetime.now().isoformat()
    }
    metadata_collection.insert_one(metadata)
    

if __name__ == "__main__":
    # Define variables
    url = config.MAIN_URL
    output_folder = config.OUTPUT_DIR

    # Create the output folder if it does not exist
    os.makedirs(output_folder, exist_ok=True)

    # Fetch the HTML content of the main page and all subpages
    fetch_successful, updated_titles, num_updated, new_titles, num_added = fetch_and_update_data(url)
    update_metadata(fetch_successful, updated_titles, num_updated, new_titles, num_added)
        