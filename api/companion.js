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
    encouragement: `Give ${studentName} a short encouraging message: ${context}`,
    correction: `Gently help ${studentName} understand: ${context}`,
    celebration: `Celebrate ${studentName}'s success: ${context}`,
    focus: `Help ${studentName} stay focused: ${context}`
  };

  const prompt = prompts[type] || prompts.encouragement;

  try {
    // Call Hugging Face API
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.8
        }
      })
    });

    const result = await response.json();
    
    let message = `You're doing great, ${studentName}!`;
    
    if (Array.isArray(result) && result.length > 0) {
      message = result[0].generated_text || message;
    }

    res.status(200).json({
      message,
      studentName
    });

  } catch (error) {
    // Fallback messages
    const fallbackMessages = {
      encouragement: `You're doing great, ${studentName}! Keep trying!`,
      correction: `That's okay, ${studentName}! Let's try again together.`,
      celebration: `Amazing work, ${studentName}! You did it!`,
      focus: `Let's focus, ${studentName}. You can do this!`
    };

    res.status(200).json({
      message: fallbackMessages[type] || `Keep going, ${studentName}!`,
      error: error.message
    });
  }
}
