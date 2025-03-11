import React, { useState } from 'react';
import { translateText } from '../utils/translate';

const LanguageTranslator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('es'); // Default: Spanish

  const handleTranslate = async () => {
    if (!text.trim()) {
      setTranslatedText('Please enter text to translate.');
      return;
    }
    const result = await translateText(text, language);
    setTranslatedText(result || 'Translation failed.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Language Translator</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
        rows="4"
        cols="50"
      />
      <div>
        <label>Select Language:</label>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
        </select>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      <h3>Translated Text:</h3>
      <p>{translatedText}</p>
    </div>
  );
};

export default LanguageTranslator;
