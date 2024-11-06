// api/proxy.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Decode and validate the URL (preventing issues with unsafe URLs)
    const decodedUrl = decodeURIComponent(url);

    // Fetch the content from the provided URL
    const response = await fetch(decodedUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch the website' });
    }

    // Get the content of the fetched URL
    const content = await response.text();

    // Set the correct content-type (you can adjust this based on the type of response)
    res.setHeader('Content-Type', 'text/html');
    
    // Return the fetched content
    res.status(200).send(content);
  } catch (error) {
    // If an error occurs, return a 500 error with the message
    res.status(500).json({ error: 'Error fetching the website' });
  }
}

