// server.js
import * as cheerio from 'cheerio';

// POST endpoint for scraping the URL content
export async function scrapeURL(url) {

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract main content - customize as needed
        const textContent = $('body').text();
        const trimmedText = textContent.trim().replace(/\s+/g, ' ')

        return trimmedText;
    } catch (error) {
        console.error('Error scraping URL:', error);
        throw error;
    }
};
