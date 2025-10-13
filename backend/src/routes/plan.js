const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const OpenAI = require('openai');

// ✅ Ensure fetch works even on older Node versions
if (typeof fetch === 'undefined') {
  global.fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
}

router.post('/', auth, async (req, res) => {
  try {
    const { goal } = req.body;
    if (!goal) return res.status(400).json({ message: 'Goal is required' });

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OPENAI_API_KEY not configured in backend/.env' });
    }

    // ✅ Create OpenAI client (new API format)
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are an expert project manager. Break down the following goal into a concise, actionable plan.
Each task must include: title, description, due_in_days (estimate) keeping deadline in mind , and depends_on (if any).
Respond ONLY in strict JSON with keys:
{
  "tasks": [
    { "title": "", "description": "", "due_in_days": <number>, "depends_on": [] }
  ],
  "suggestions": "..."
}
Goal: "${goal}"
`;

    // ✅ Call OpenAI model
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.3,
    });

    const text =
      completion.choices?.[0]?.message?.content ||
      completion.choices?.[0]?.message ||
      completion.choices?.[0]?.text ||
      '';

    // ✅ Extract JSON safely
    let parsed = null;
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        parsed = JSON.parse(text.slice(firstBrace, lastBrace + 1));
      } catch (e) {
        console.warn('JSON parse failed, returning raw text.');
      }
    }

    if (parsed) {
      return res.json(parsed);
    } else {
      return res.json({
        raw: text,
        suggestions: 'Model did not return valid JSON. Please check output manually.',
      });
    }
  } catch (err) {
    console.error('❌ OpenAI error:', err);
    res.status(500).json({ message: 'OpenAI error', error: err.message });
  }
});

module.exports = router;
