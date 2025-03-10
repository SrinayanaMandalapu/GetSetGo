const express=require('express');
const axios=require('axios');

const fetchNearbyPlaces = async (latitude, longitude, radius, keyword) => {
  const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const places = [];
  let nextPageToken = null;

  try {
    do {
      const response = await axios.get(url, {
        params: {
          location: `${latitude},${longitude}`,
          radius: radius,
          keyword: keyword, // Filter for tourist places
          key: process.env.GOOGLE_MAPS_API_KEY,
          pagetoken: nextPageToken, // Use the nextPageToken for pagination
        },
      });

      // Add places from the current response
      places.push(...response.data.results);

      // Check if there's a next page
      nextPageToken = response.data.next_page_token;
    } while (nextPageToken); // Continue fetching if there are more pages

    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

const getPlaces=async (req, res) => {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).send({ error: 'Latitude and Longitude are required' });
    }
  
    try {
      // Fetch places within a 100 km radius (split into two 50 km queries)
      const places1 = await fetchNearbyPlaces(latitude, longitude, 100000, ); // 50 km radius
      const places2 = await fetchNearbyPlaces(latitude, longitude, 100000); // 100 km radius
  
      // Combine both place lists and send the response
      const allPlaces = [...places1, ...places2];
      res.json({ places: allPlaces });
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong while fetching places' });
    }
  };



module.exports=getPlaces;


