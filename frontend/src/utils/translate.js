export async function translateText(text, targetLanguage) {
  try {
    const response = await fetch('http://localhost:5000/api/translation/translate', { // Adjust if using a different port
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, targetLanguage }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to translate');
    }

    return data.translation; // Ensure this matches backend response format
  } catch (error) {
    console.error('Translation error:', error.message);
    return null;
  }
}
