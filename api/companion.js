export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { studentName = 'Student', context = '', type = 'encouragement' } = req.body;

  // Create prompts
  const prompts = {
    encouragement: `Give ${studentName} a short, warm encouraging message about: ${context}. Keep it under 20 words.`,
    correction: `Gently help ${studentName} learn from this: ${context}. Keep it kind and under 20 words.`,
    celebration: `Celebrate ${studentName}'s success: ${context}. Be enthusiastic but keep it under 20 words.`,
    focus: `Help ${studentName} stay focused: ${context}. Be supportive, keep it under 20 words.`
  };

  const prompt = prompts[type] || prompts.encouragement;

  try {
    // Try Hugging Face first
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 50,
          temperature: 0.7,
          top_p: 0.9
        }
      })
    });

    const result = await response.json();
    
    // Check if we got a valid response
    if (result && result.length > 0 && result[0].generated_text) {
      const generatedText = result[0].generated_text;
      
      res.status(200).json({
        message: generatedText,
        studentName
      });
      return;
    }

    // If API didn't work, use smart fallbacks
    throw new Error('No valid response from API');

  } catch (error) {
    // Smart fallback messages based on type and context
    const fallbackMessages = {
      encouragement: [
        `Great effort, ${studentName}! Keep trying!`,
        `You're learning so well, ${studentName}!`,
        `Nice work, ${studentName}! You're getting better!`
      ],
      correction: [
        `That's okay, ${studentName}. Let's look more carefully at the colors and shapes.`,
        `Not quite, ${studentName}. Take your time and compare them again!`,
        `Good try, ${studentName}! Let's see what's different about them.`
      ],
      celebration: [
        `Amazing, ${studentName}! You found the match! 🎉`,
        `Perfect match, ${studentName}! You're doing great!`,
        `Wonderful job, ${studentName}! That was exactly right!`
      ],
      focus: [
        `Let's focus, ${studentName}. You can do this!`,
        `Take a deep breath, ${studentName}. Ready to try again?`,
        `Stay focused, ${studentName}. Look carefully!`
      ]
    };

    // Pick a random message from the appropriate type
    const messages = fallbackMessages[type] || fallbackMessages.encouragement;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    res.status(200).json({
      message: randomMessage,
      studentName,
      usingFallback: true
    });
  }
}
