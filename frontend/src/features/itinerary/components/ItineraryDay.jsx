import React from "react";

const ItineraryDay = ({ id, title, children }) => {
  return (
    <div id={id} className="p-2 mb-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default ItineraryDay;