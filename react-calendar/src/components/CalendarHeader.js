import React from "react";

const CalendarHeader = ({ currentDate, onPrevious, onNext, view }) => {
  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
      <button
        onClick={onPrevious}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        ← Previous
      </button>
      <h2 className="text-2xl font-bold text-gray-800">
        {currentDate.format("MMMM YYYY")}
      </h2>
      <button
        onClick={onNext}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Next →
      </button>
    </div>
  );
};

export default CalendarHeader;
