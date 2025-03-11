// routes/translation.routes.js
const express = require('express');
const router = express.Router();
const { translateText } = require('../controllers/translation.controller');

// POST route to translate text
router.post('/translate', translateText);

module.exports = router;  // Make sure you're exporting the router