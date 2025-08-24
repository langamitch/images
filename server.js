import dotenv from 'dotenv';
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

dotenv.config({ path: './key.env' });

const app = express();
const PORT = 5500;
const ACCESS_KEY = process.env.UNSPLASH_KEY;

app.use(cors());

app.get('/api/images', async (req, res) => {
  try {
    const query = req.query.query || 'technology';
    const count = req.query.count || 12;

    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}&query=${query}`);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
