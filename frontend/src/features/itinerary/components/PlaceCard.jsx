// import { useDraggable } from "@dnd-kit/core";

// export default function PlaceCard({ id, title, description }) {
//   const { attributes, listeners, setNodeRef } = useDraggable({ id });

//   return (
//     <div ref={setNodeRef} {...listeners} {...attributes} className="p-4 bg-gray-200 mb-4 rounded shadow">
//       <div>
//       <h3 className="font-semibold">{title}</h3>
//       <p className="text-sm">{description}</p>
//       </div>
//       {/* <div>
//         <img src = >{image}</img>
//       </div> */}
//     </div>
//   );
// }


import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

export default function PlaceCard({ place, days, addToDay }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: place.id });
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div 
      ref={setNodeRef} {...listeners} {...attributes} 
      className="p-4 bg-gray-200 mb-4 rounded shadow relative"
      onClick={() => setShowOptions(!showOptions)}
    >
      <h3 className="font-semibold">{place.title}</h3>
      <p className="text-sm">{place.description}</p>

      {/* Dropdown Options */}
      {showOptions && (
        <div className="absolute bg-white border p-2 mt-1 rounded shadow-md">
          <p className="text-sm font-semibold mb-1">Add to:</p>
          {days.map((day) => (
            <button
              key={day}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing the dropdown
                addToDay(day, place);
                setShowOptions(false);
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
