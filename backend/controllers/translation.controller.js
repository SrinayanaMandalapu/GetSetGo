const axios = require('axios');
require('dotenv').config();

console.log('Loaded API Key:', process.env.TRANSLATE_API_KEY);

const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Text and target language are required'
      });
    }

    const apiKey = process.env.TRANSLATE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'API key is missing or not loaded'
      });
    }

    const url = `https://translation.googleapis.com/language/translate/v2`;

    const response = await axios.post(
      url,
      new URLSearchParams({
        q: text,
        target: targetLanguage,
        key: apiKey
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const translation = response.data?.data?.translations?.[0]?.translatedText;

    if (!translation) {
      throw new Error('No translation received from API');
    }

    return res.status(200).json({
      success: true,
      translation,
      originalText: text,
      targetLanguage
    });

  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Error during translation',
      error: error.response?.data?.error?.message || error.message || 'Unknown error'
    });
  }
};

module.exports = {
  translateText
};
