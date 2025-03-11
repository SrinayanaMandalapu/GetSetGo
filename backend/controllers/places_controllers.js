// const express=require('express');
// const axios=require('axios');

// const fetchNearbyPlaces = async (latitude, longitude, radius, keyword) => {
//   const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
//   const places = [];
//   let nextPageToken = null;

//   try {
//     do {
//       const response = await axios.get(url, {
//         params: {
//           location: `${latitude},${longitude}`,
//           radius: radius,
//           keyword: keyword, // Filter for tourist places
//           key: process.env.GOOGLE_MAPS_API_KEY,
//           pagetoken: nextPageToken, // Use the nextPageToken for pagination
//         },
//       });

//       // Add places from the current response
//       places.push(...response.data.results);

//       // Check if there's a next page
//       nextPageToken = response.data.next_page_token;
//     } while (nextPageToken); // Continue fetching if there are more pages

//     return places;
//   } catch (error) {
//     console.error("Error fetching places:", error);
//     throw error;
//   }
// };

// const getPlaces=async (req, res) => {
//     const { latitude, longitude } = req.query;
  
//     if (!latitude || !longitude) {
//       return res.status(400).send({ error: 'Latitude and Longitude are required' });
//     }
  
//     try {
//       // Fetch places within a 100 km radius (split into two 50 km queries)
//       const places1 = await fetchNearbyPlaces(latitude, longitude, 100000, ); // 50 km radius
//       const places2 = await fetchNearbyPlaces(latitude, longitude, 100000); // 100 km radius
  
//       // Combine both place lists and send the response
//       const allPlaces = [...places1, ...places2];
//       res.json({ places: allPlaces });
//     } catch (error) {
//       res.status(500).send({ error: 'Something went wrong while fetching places' });
//     }
//   };



// module.exports=getPlaces;


const axios = require("axios");


const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
//const GOOGLE_MAPS_API_KEY = "AIzaSyA97VWBcfuqAwCuEYCqfMHbja42_Ak2PfQ";


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
          keyword: keyword,
          key: process.env.GOOGLE_MAPS_API_KEY,
          pagetoken: nextPageToken,
        },
      });
      console.log("fetch response : " ,response.data);

      places.push(...response.data.results);
      nextPageToken = response.data.next_page_token;

      // Wait for nextPageToken to be available before making another request
      if (nextPageToken) await new Promise(resolve => setTimeout(resolve, 2000));
      
    } while (nextPageToken);

    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};


// const getCoordinates = async (city) => {
//   const url = "https://maps.googleapis.com/maps/api/geocode/json";

//   try {
//     const response = await axios.get(url, {
//       params: {
//         address: city,
//         key: GOOGLE_MAPS_API_KEY,
//       },
//     });

//     if (response.data.results.length > 0) {
//       const { lat, lng } = response.data.results[0].geometry.location;
//       return { latitude: lat, longitude: lng };
//     } else {
//       throw new Error("Location not found");
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error);
//     throw error;
//   }
// };

const getCoordinates = async (city) => {
  try {
      console.log(`Fetching coordinates for city: ${city}`);

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
              address: city,
              key: process.env.GOOGLE_MAPS_API_KEY, // Ensure this is set in .env
          },
      });

      console.log("Google API Response:", response.data);

      if (!response.data.results.length) {
          console.log(`No location found for ${city}`);
          return null;
      }

      const { lat, lng } = response.data.results[0].geometry.location;
      console.log(`Coordinates for ${city}: lat=${lat}, lng=${lng}`);
      return { lat, lng };

  } catch (error) {
      console.error("Error fetching coordinates:", error.message);
      return null;
  }
};


const getPlaces = async (req, res) => {
  const { city, category } = req.query;

  if (!city || !category) {
    return res.status(400).send({ error: "City and Category are required" });
  }

  try {
    // Get latitude and longitude dynamically
    const { latitude, longitude } = await getCoordinates(city);

    // Fetch places using the obtained coordinates
    const places = await fetchNearbyPlaces(latitude, longitude, 50000, category);
    
    res.json({ places });
  } catch (error) {
    res.status(500).send({ error: "Error fetching places" });
  }
};

module.exports = getPlaces;
