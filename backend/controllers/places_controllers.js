
const axios = require("axios");
require("dotenv").config(); // ✅ Ensure .env is loaded
console.log("Loaded API Key:", process.env.GOOGLE_MAPS_API_KEY ? "✅ Present" : "❌ Missing");

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!GOOGLE_MAPS_API_KEY) {
  console.error("❌ GOOGLE_MAPS_API_KEY is missing!");
}


const fetchNearbyPlaces = async (lat, lng, category) => {
  
  
  try {
    const url = `https://places.googleapis.com/v1/places:searchText?key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const requestBody = {
      textQuery: `${category} in ${lat},${lng}`,  // ✅ Use a proper text query
      includedTypes: `${category}`, // ✅ Adjust based on category
      maxResultCount: 10
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location"
    };

    const response = await axios.post(url, requestBody, { headers });

    console.log("✅ Places API Response:", response.data);
    return response.data.places || []; // Ensure a valid response
  } catch (error) {
    console.error("❌ Error fetching places:", error.response?.data || error.message);
    throw new Error("Failed to fetch places");
  }
};

// Imports the Places library
// Imports the Places library
const {PlacesClient} = require('@googlemaps/places').v1;

// Instantiates a client
const placesClient = new PlacesClient();

async function callSearchText(lat, lng, category) {
  // Construct request
  const request = {
    textQuery : `${category} in ${lat},${lng}`,
  };

  // Run request
  const response = await placesClient.searchText(request, {
    otherArgs: {
      headers: {
        'X-Goog-FieldMask': 'places.displayName',
      },
    },
  });
  let places = [];
  for (let i = 0; i <= 10 ; i++){
    places.push(response[0].places[i].displayName.text);
  }
  return places;
  
}


const getCoordinates = async (city) => {
  try {
    console.log(`🔍 Fetching coordinates for city: ${city}`);

    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: { address: city, key: process.env.GOOGLE_MAPS_API_KEY },
    });

    console.log("🛠 Google API Response:", response.data);

    if (!response.data.results.length) {
      console.log(`❌ No location found for: ${city}`);
      return null;
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    console.log(`✅ Coordinates: lat=${lat}, lng=${lng}`);
    return { latitude: lat, longitude: lng };

  } catch (error) {
    console.error("❌ Error fetching coordinates:", error.message);
    return null;
  }
};


// ✅ Get places API route
const getPlaces = async (req, res) => {
  console.log("got request");
  const { city, category } = req.query;

  if (!city || !category) {
    return res.status(400).json({ error: "City and Category are required" });
  }

  try {
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude } = coordinates;
    const places = await callSearchText(latitude, longitude, category);

    res.json({ places });
    console.log(places);
    // console.log(res);
  } catch (error) {
    console.error("❌ Server error fetching places:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = getPlaces;

