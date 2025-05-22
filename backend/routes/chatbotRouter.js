import express from 'express';
import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/ask', async (req, res) => {
  const { prompt } = req.body;

  const apiKey = process.env.API_KEY;
  try {
    const response = await axios.post(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ answer: aiReply });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Gemini API' });
  }
});

export default router;