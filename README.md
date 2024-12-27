# Web Crawler Project

## Table of Contents

1. Overview
2. Features
3. Installation
4. Usage
5. Error Handling
6. Limitations

## Overview

This project is a web crawler designed to explore and extract product URLs from various e-commerce websites. It supports handling websites with infinite scrolling and dynamically loaded content.

## Features

- URL Discovery: Crawl and discover product pages using different URL patterns (/product/, /item/, /p/).
- Scalability: Handles large websites with deep hierarchies and a large number of products efficiently.
- Performance: Executes in parallel or asynchronously to minimize runtime, especially for large sites.
- Robustness: Handles edge cases like infinite scrolling and dynamically loaded content.

## Installation

1. Create a clone using provided 
``` 
git clone https://github.com/your-username/web-crawler.git 
```
2. Navigate to the project directory: ```cd web-crawler```
3. Install dependencies: ```npm install```

## Usage

- To start crawling, run ```npm start```

## Error Handling

- The crawler includes retries and backoff mechanisms to handle temporary errors such as rate limiting (429) or blocked access (403).

## Limitations

- Handling rate limits and blocked URLs may vary depending on the website.
- Infinite scrolling and dynamically loaded content require proper selectors and handling logic specific to the target website.