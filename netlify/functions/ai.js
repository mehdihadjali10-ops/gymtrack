exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const GEMINI_KEY = 'AIzaSyBwVdZ_oVPOxSRII3DuSgUL24Hn14jHXmI';
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_KEY;

  try {
    const payload = JSON.parse(event.body);
    const { contents } = payload;

    const geminiBody = {
      contents: contents,
      generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
    };

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });

    const text = await response.text();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
