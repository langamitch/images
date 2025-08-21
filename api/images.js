import fetch from 'node-fetch';

const ACCESS_KEY = process.env.UNSPLASH_KEY;

export default async function handler(req, res) {
  try {
    const { query = 'technology', count = 12 } = req.query;

    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}&query=${query}`
    );
    const data = await response.json();

    // **CORS header** to allow your frontend to fetch
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
