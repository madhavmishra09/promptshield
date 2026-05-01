const express = require('express');
const router = express.Router();

const { detectPromptInjection, sanitizeInput } = require('../middleware/security');

// ✅ Official OpenAI SDK
const OpenAI = require('openai');
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  let { message } = req.body;

  let score = detectPromptInjection(message);

  if (score > 3) {
    message = sanitizeInput(message);
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a safe and helpful assistant." },
        { role: "user", content: message }
      ],
    });

    let output = response.choices[0].message.content;

    // Output filter
    if (output.toLowerCase().includes("system prompt")) {
      output = "⚠️ Response blocked for security reasons.";
    }

    res.json({ reply: output });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API Error" });
  }
});

module.exports = router;