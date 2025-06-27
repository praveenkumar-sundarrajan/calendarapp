import React from "react";

const ViewSelector = ({ view, onChange }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={() => onChange("Day")}
        className={`px-4 py-2 border ${
          view === "Day" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        } rounded-l hover:bg-blue-700`}
      >
        Day
      </button>
      <button
        onClick={() => onChange("Week")}
        className={`px-4 py-2 border ${
          view === "Week" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        }`}
      >
        Week
      </button>
      <button
        onClick={() => onChange("Month")}
        className={`px-4 py-2 border ${
          view === "Month" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        }`}
      >
        Month
      </button>
      <button
        onClick={() => onChange("Year")}
        className={`px-4 py-2 border ${
          view === "Year" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        } rounded-r hover:bg-blue-700`}
      >
        Year
      </button>
    </div>
  );
};

export default ViewSelector;
