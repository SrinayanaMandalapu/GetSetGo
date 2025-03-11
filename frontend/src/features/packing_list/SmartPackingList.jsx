import { useState } from "react";

const SmartPackingList = () => {
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState("");
  const [activities, setActivities] = useState("");
  const [packingList, setPackingList] = useState([]);

  const fetchPackingList = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_packing_list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, duration, activities }),
    });
  
    const data = await response.json();
    
    if (data.packing_list && typeof data.packing_list === "object") {
      // Ensure it's an object and convert it to an array
      const formattedList = Object.entries(data.packing_list).flatMap(([category, items]) =>
        items.map((item) => `${category}: ${item}`)
      );
      setPackingList(formattedList);
    } else {
      setPackingList(["Invalid response from server"]);
    }
  };
  
  return (
    <div className="p-4 border rounded-md shadow-md bg-white w-96">
      <h2 className="text-lg font-semibold">Smart Packing List</h2>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-2 border rounded-md mt-2"
      />

      <input
        type="number"
        placeholder="Trip Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-2 border rounded-md mt-2"
      />

      <input
        type="text"
        placeholder="Activities (e.g., Hiking, Sightseeing)"
        value={activities}
        onChange={(e) => setActivities(e.target.value)}
        className="w-full p-2 border rounded-md mt-2"
      />

      <button
        onClick={fetchPackingList}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3"
      >
        Generate Packing List
      </button>

      {packingList.length > 0 && (
        <ul className="mt-4">
          {packingList.length > 0 && (
  <ul className="mt-4">
    {packingList.map((item, index) => (
      <li key={index} className="text-gray-700 text-sm">✅ {item}</li>
    ))}
  </ul>
)}
        </ul>
      )}
    </div>
  );
};

export default SmartPackingList;
