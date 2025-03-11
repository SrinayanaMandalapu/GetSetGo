import React from "react";

const ItineraryDay = ({ id, title, children }) => {
  return (
    <div id={id} className="p-3 mb-2 bg-white rounded shadow-md">
      <h3 className="p-3 text-lg font-semibold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default ItineraryDay;