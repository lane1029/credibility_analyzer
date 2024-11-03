import re
from datetime import datetime

import os # Used to interact with the file system
import sys # Used to access system-specific parameters and functions
from bs4 import BeautifulSoup # Used to parse HTML content
import urllib.request # Used to fetch URLs
from config import get_config # Used to get the configuration
import json # Used to work with JSON data

config = get_config()

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
        response = urllib.request.urlopen(request).read()
        data = response.decode('utf-8')
        return data
    # return an error if the URL is invalid or the page is not found
    except Exception as e:
        sys.stderr.write(f"Error fetching HTML content: {e}")
        return None
    

def fetch_all_subpages(main_url, output_dir):
    """
    Fetches the HTML content of the main page and all subpages
    Args:
        main_url (str): The main URL of the website
        output_dir (str): The directory to save the HTML content
    Returns:
        bool: True if successful, False otherwise
    """
    # Get the HTML for the main page

    current_page = 1

    extracted_data = []
    while True:
        page_suffix = f"/?page={current_page}"
        # Build the URL for the current page
        page_url = main_url + page_suffix

        request = urllib.request.Request(
            page_url, 
            headers=config.HEADERS
        )
        code = urllib.request.urlopen(request).getcode()

        if code != 200:
            break # Break the loop if the page is not found

        response = urllib.request.urlopen(request).read()

        soup = BeautifulSoup(response.decode('utf-8'), 'html.parser')
    
        # Find the section containing articles (adjust the selector as needed)
        # articles = soup.find_all('a')  # or another relevant tag
        articles_div = soup.find_all('div', class_='jss38')
        articles = []
        for div in articles_div:
            articles.extend(div.find_all('a'))

        if not articles:
            break # Break the loop if no articles are found
        # List to store the extracted data
        

        for article in articles:
            link = article['href']
            print(link)
            extracted_data.append(link)

        current_page += 1  # Move to the next page

    if 'articles' in main_url:
        base_url = main_url.split('articles')[0]

    content_type = main_url.split('/')[-1]
    for link in extracted_data:
        article_url = base_url + link
        article_html = fetch_html(article_url)
        content={}
        if article_html:
            content['content_type'] = content_type
            content['date_retrieved'] = datetime.now().isoformat()
            content['url'] = article_url
            content['source'] = base_url
            content['article_id'] = link.split('/')[-2]  # Extract a unique identifier for the article
            # Parse the HTML content to extract text
            soup = BeautifulSoup(article_html, 'html.parser')

            # Get the text content from the article
            paragraphs = soup.find_all('div', class_='rich-text')
            text_content = " ".join([p.get_text() for p in paragraphs])
            text_content = " ".join(text_content.split()) # Remove extra whitespaces and newlines
            content['text'] = text_content

            # Get all section tags and find the one with 'banner' in the class
            sections = soup.find_all('section')
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
                            '%Y-%m-%d',  # Add more formats as needed
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
                            content['published_date'] = parsed_date.isoformat()
                            content['published_day'] = parsed_date.day
                            content['published_month'] = parsed_date.month
                            content['published_year'] = parsed_date.year
                        else:
                            content['published_date'] = date_str # Store the raw date string as a fallback
                            content['published_day'] = None
                            content['published_month'] = None
                            content['published_year'] = None

            # Save the text content to a file
            output_file_path = os.path.join(output_dir, f"{content['article_id']}.json")
            with open(output_file_path, 'w', encoding='utf-8') as f:
                json.dump(content, f, ensure_ascii=False, indent=4)

    return True


if __name__ == "__main__":
    # Define variables
    url = config.MAIN_URL
    output_folder = config.OUTPUT_DIR

    # Create the output folder if it does not exist
    os.makedirs(output_folder, exist_ok=True)

    # Fetch the HTML content of the main page and all subpages
    html_content = fetch_all_subpages(url, output_folder)
    # if html_content:
    #     sys.stdout.write("Successfully fetched HTML content.")
    # else:
    #     sys.stdout.write("Failed to fetch HTML content.")
        