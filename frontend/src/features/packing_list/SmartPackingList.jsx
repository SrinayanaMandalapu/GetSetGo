import React, { useState } from "react";

// Destination-based packing items
const packingSuggestions = {
  "Pithoragarh": ["Jacket", "Woolen Socks", "Gloves", "Thermal Wear"],
  "Coorg": ["Raincoat", "Umbrella", "Hiking Shoes", "Bug Spray"],
  "Goa": ["Sunscreen", "Swimsuit", "Flip-Flops", "Sunglasses"],
  "Rajasthan": ["Cotton Clothes", "Hat", "Sunscreen", "Water Bottle"],
};

const SmartPackingList = () => {
  const [destination, setDestination] = useState("");
  const [packingList, setPackingList] = useState([]);

  // Handle destination change
  const handleDestinationChange = (event) => {
    const selectedDestination = event.target.value;
    setDestination(selectedDestination);
    setPackingList(packingSuggestions[selectedDestination] || []);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">Smart Packing List</h2>

      {/* Destination Selection Dropdown */}
      <select
        className="border p-2 w-full mb-3 rounded"
        value={destination}
        onChange={handleDestinationChange}
      >
        <option value="">Select Destination</option>
        {Object.keys(packingSuggestions).map((place) => (
          <option key={place} value={place}>
            {place}
          </option>
        ))}
      </select>

      {/* Packing List */}
      {destination && (
        <div>
          <h3 className="text-md font-semibold">Packing List for {destination}:</h3>
          <ul className="list-disc ml-5 mt-2">
            {packingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmartPackingList;
