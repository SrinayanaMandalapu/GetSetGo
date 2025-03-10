const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/generate-packing-list", async (req, res) => {
  try {
    const { location, weather } = req.body;

    // Call the Python ML API
    const response = await axios.post("http://127.0.0.1:5000/generate", {
      location,
      weather
    });

    res.json(response.data); // Send ML API response to frontend
  } catch (error) {
    console.error("Error fetching packing list:", error);
    res.status(500).json({ error: "Failed to fetch packing list" });
  }
});

module.exports = router;
