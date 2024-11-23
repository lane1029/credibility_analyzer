// Description: This file contains the code for the POST endpoint that scrapes the content of a URL.

// Import the required modules for scraping
import * as cheerio from 'cheerio';
import axios from 'axios';

// function to scrape the content of a URL
export async function scrapeURL(url) {
    try {
        let response;
        // Extract the HTML content of the URL
        try {
            response = await extractHTML(url);
        } catch (error) {
            return "This website requires permissions to access its content. Please paste the text from the website instead of the URL.";
        }
        const html = response.data;
        const $ = cheerio.load(html);

        // Heuristics to find main content
        let textContent = '';

        // Try to find content within the <article> tag or main <div> tag
        const article = $('article');
        const mainDiv = $('main');
        const mainContentDiv = $('main-content');

        // Extract text content from the main content elements
        if (article.length) {
            textContent = await extractText($, article);
        } else if (mainDiv.length) {
            textContent = await extractText($, mainDiv);
        } else if (mainContentDiv.length) {
            textContent = await extractText($, mainContentDiv);
        } else {
            // Fall back to extracting content from body, excluding common non-content selectors
            const body = $('body').clone();
            body.find('header, footer, nav, aside, form, script, style').remove();
            textContent = await extractText($, body);
        }
        // Trim and clean up the text content
        const trimmedText = textContent.trim().replace(/\s+/g, ' ')

        return trimmedText;
    } catch (error) {
        console.error('Error scraping URL:', error);
        throw error;
    }
};

// Function to extract the HTML content of a URL
async function extractHTML(url) {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error('Error extracting HTML:', error);
        throw error;
    }
}


async function extractText($, element) {
    const textElements = [];
    $(element).find('h1, h2, h3, p').each((_, el) => {
        const text = $(el).text().trim();
        if (text) {
            textElements.push(text);
        }
    });
    return textElements.join('\n\n'); // Separate paragraphs with double newlines
}

