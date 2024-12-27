import axios from 'axios';
import * as cheerio from 'cheerio';  // Using named import with *
import pLimit from 'p-limit';


const limit = pLimit(10);  // Controls concurrent requests.


// sample domains
const domains = [
    'https://example1.com',
    'https://example2.com',
    'https://example3.com',
    'https://example4.com',
    'https://example5.com',
]

function isProductUrl(url) {
    const patterns = [/\/product\//, /\/item\//, /\/p\//];
    return patterns.some((pattern) => pattern.test(url));
}

function isInternalUrl(url, domain) {
    return url.startsWith(domain);
}

async function crawlDomain(domain, retries = 3) {
    const visitedUrls = new Set();
    const productUrls = new Set();
    const queue = [domain];

    while (queue.length > 0) {
        const currentUrl = queue.shift();

        if (visitedUrls.has(currentUrl)) continue;
        visitedUrls.add(currentUrl);

        try {
            const response = await axios.get(currentUrl);
            const $ = cheerio.load(response.data);

            $('a').each((_, element) => {
                const href = $(element).attr('href');
                if (!href) return;

                const fullUrl = new URL(href, domain).href;

                if (isProductUrl(fullUrl)) {
                    productUrls.add(fullUrl);
                } else if (isInternalUrl(fullUrl, domain)) {
                    queue.push(fullUrl);
                }
            });

        } catch (err) {
            console.error(`Error crawling ${currentUrl}: ${err.message}`);

            if (retries > 0) {
                console.log(`Retrying ${currentUrl}...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Exponential backoff or constant delay between retries
                await crawlDomain(currentUrl, retries - 1);
            }
        }
    }

    return Array.from(productUrls);
}

async function crawlConcurrent(domains) {
    const results = await Promise.all(domains.map(domain => limit(() => crawlDomain(domain))));
    console.log(`Crawling completed. Results: ${JSON.stringify(results)}`);
}

crawlConcurrent(domains);
