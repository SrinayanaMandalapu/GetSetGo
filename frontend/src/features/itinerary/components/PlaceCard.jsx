import { useState } from "react";

export default function PlaceCard({ place, days, addToDay }) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    console.log("Options toggled:", !showOptions); // Debugging statement
  };

  return (
    <div 
      className="place-card"
      onClick={toggleOptions}
    >
      {/* Left Section - Place Details */}
      <div className="text-container">
        <h3 className="font-semibold">{place.title}</h3>
        <p className="text-sm">{place.description}</p>
      </div>

      {/* Right Section - Image */}
      <div className="image-container">
        <img 
          src={`/bglr.jpg`} 
          alt={place.title} 
          
        />
      </div>

      {/* Dropdown Options */}
      {showOptions && (
        <div className="dropdown-menu">
          <p className="text-sm font-semibold mb-1">Add to:</p>
          {days.map((day) => (
            <button
              key={day}
              
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing the dropdown immediately
                addToDay(day, place);
                setShowOptions(false); // Hide options after selection
                console.log(`Added to Day ${day}`); // Debugging statement
              }}
            >
              Day {day}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}