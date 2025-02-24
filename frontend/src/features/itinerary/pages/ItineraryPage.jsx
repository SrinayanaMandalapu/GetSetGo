import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ItineraryDay from "../components/ItineraryDay";
import PlaceCard from "../components/PlaceCard";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import {useParams} from "react-router-dom";


export default function ItineraryPage() {
  const {city,days_cnt} = useParams();
  const initialDays = Array.from({ length: Number(days_cnt) }, (_, i) => i + 1);
  const [days, setDays] = useState(initialDays);
  const [selectedCategory, setSelectedCategory] = useState("food");
  
  const [itinerary, setItinerary] = useState({});
  let arr = []
  for(let i = 0; i < days_cnt; i++){
    arr.push(i+1);
  }
  //const [days, setDays] = useState(arr);
  //const {city} = useParams();
  
  const hyd_places = {
    food: [
      { id: "biryani", title: "Paradise Biryani", description: "Famous for Hyderabadi Biryani" },
      { id: "shah-ghouse", title: "Shah Ghouse", description: "Popular for dum biryani" },
    ],
    hotels: [
      { id: "taj", title: "Taj Falaknuma", description: "Luxury heritage hotel" },
      { id: "marriott", title: "Hyderabad Marriott", description: "5-star hotel near Hussain Sagar" },
    ],
    sightseeing: [
      { id: "charminar", title: "Charminar", description: "Iconic monument of Hyderabad" },
      { id: "golconda", title: "Golconda Fort", description: "Historical fort with light show" },
    ],
    activities: [
      { id: "ramoji", title: "Ramoji Film City", description: "World's largest film studio" },
      { id: "tankbund", title: "Tank Bund", description: "Evening walk with lake view" },
    ],
  };

  const banglore_places = {
    food: [
      { id: "vidyarthi", title: "Vidyarthi Bhavan", description: "Famous for crispy Masala Dosa" },
      { id: "ctr", title: "CTR (Sri Sagar)", description: "Known for butter dosa and coffee" },
    ],
    hotels: [
      { id: "leela", title: "The Leela Palace", description: "Luxury 5-star hotel with royal ambiance" },
      { id: "taj-westend", title: "Taj West End", description: "Heritage hotel with lush gardens" },
    ],
    sightseeing: [
      { id: "lalbagh", title: "Lalbagh Botanical Garden", description: "Historical garden with a glass house" },
      { id: "cubbon", title: "Cubbon Park", description: "Green lung of the city with walking trails" },
    ],
    activities: [
      { id: "wonderla", title: "Wonderla", description: "Popular amusement park with thrilling rides" },
      { id: "nandi", title: "Nandi Hills", description: "Scenic sunrise viewpoint near Bangalore" },
    ],
  };
  
  const delhi_places = {
    food: [
      { id: "karims", title: "Karim’s", description: "Iconic Mughlai restaurant near Jama Masjid" },
      { id: "paranthe-wali", title: "Paranthe Wali Gali", description: "Famous for stuffed parathas" },
    ],
    hotels: [
      { id: "imperial", title: "The Imperial", description: "Luxury heritage hotel in Connaught Place" },
      { id: "taj-mahal", title: "Taj Mahal Hotel", description: "5-star hotel with elegant decor" },
    ],
    sightseeing: [
      { id: "india-gate", title: "India Gate", description: "War memorial and popular picnic spot" },
      { id: "red-fort", title: "Red Fort", description: "Historical fort and UNESCO site" },
    ],
    activities: [
      { id: "akshardham", title: "Akshardham Temple", description: "Spiritual complex with beautiful architecture" },
      { id: "chandni-chowk", title: "Chandni Chowk", description: "Bustling market for shopping and street food" },
    ],
  };

  const plans = {"Hyderabad" : hyd_places, "Banglore" : banglore_places, "Delhi" : delhi_places};
  
  const addDay = () => {
    setDays([...days, days[days.length-1] + 1])
  }

  const removeDay = () => {
    if (days.length > 1) {
      setDays(days.slice(0, -1));
    }
  };

  // Function to add a place to a specific day
  const addToDay = (day, place) => {
    setItinerary((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), place], // Append place to selected day
    }));
  };
  

  return (
    <>  
      <DndContext>
        <div className="flex h-screen p-6">
          
          {/* Left Sidebar: Itinerary Days */}
          <div className="w-40 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Plan your Itinerary</h2>

            <div className="flex flex-col border-2 border-gray-400 rounded-md p-4">
              {days.map((day) => (
                <ItineraryDay key={day} id={`day-${day}`} title={`Day ${day}`}>
                  {itinerary[day]?.map((place, index) => (
                    <p key={index} className="text-sm bg-blue-100 p-1 rounded">{place.title}</p>
                  ))}
                </ItineraryDay>
              ))}
            </div>

            <Button className="mt-2" onClick={() => setDays([...days, days.length + 1])}>+</Button>
            <Button className="mt-2" onClick={() => days.length > 1 && setDays(days.slice(0, -1))}>-</Button>
            <Button className="mt-4">Save Itinerary</Button>
          </div>

          {/* Right Section: Place Selection */}
          <div className="w-60 p-6">
            <h1 className="text-2xl font-bold mb-4">City Chosen: {city}</h1>

            <div className="flex space-x-4 border-b-2 pb-2 mb-4">
              {["food", "hotels", "sightseeing", "activities"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-md text-sm font-semibold ${
                    selectedCategory === category ? "bg-gray-200 text-gray-700" : "bg-blue-500 text-white"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {plans[city][selectedCategory].map((place) => (
                <PlaceCard key={place.id} place={place} days={days} addToDay={addToDay} />
              ))}
            </div>
          </div>

        </div>
      </DndContext>
    </>
  );
}
