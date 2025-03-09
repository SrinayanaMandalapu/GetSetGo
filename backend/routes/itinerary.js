const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Itinerary = require("../models/Itinerary");

// Get all itineraries for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user });
    res.json(itineraries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Save an itinerary
router.post("/", auth, async (req, res) => {
  const { title, destinations } = req.body;
  try {
    const itinerary = new Itinerary({ user: req.user, title, destinations });
    await itinerary.save();
    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
