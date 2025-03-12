const express = require('express');
const router = express.Router();
const getPlaces = require('../controllers/places_controllers.js');

router.get('/', getPlaces); // Ensure this is correctly set up
router.get("/getPlaces", async (req, res) => {
    try {
      const { city, category } = req.query; // ✅ Read from query parameters
  
      if (!city || !category) {
        return res.status(400).json({ error: "Missing city or category in query parameters" });
      }
  
      const coordinates = await getCoordinates(city); // Convert city to lat/lng
      if (!coordinates) {
        return res.status(400).json({ error: "Invalid city name" });
      }
  
      const { lat, lng } = coordinates;
      console.log(`📍 Fetching places for ${city} (${lat}, ${lng}), category: ${category}`);
  
      const places = await callSearchText(lat, lng, category); // Call function
  
      res.json({ places });
    } catch (error) {
      console.error("❌ Server error fetching places:", error.message);
      res.status(500).json({ error: "Failed to fetch places" });
    }
  });
  
  

module.exports = router;
