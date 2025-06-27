import React from "react";

const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;

  // Format date and time
  const date = event.startTime && event.startTime.format
    ? event.startTime.format("MMMM D, YYYY")
    : event.date || "";
  const start = event.startTime && event.startTime.format
    ? event.startTime.format("h:mm A")
    : event.startTime || "";
  const end = event.endTime && event.endTime.format
    ? event.endTime.format("h:mm A")
    : event.endTime || "";

  // Calculate duration if possible
  let duration = "";
  if (event.startTime && event.endTime && event.startTime.format && event.endTime.format) {
    const diff = event.endTime.diff(event.startTime, "minute");
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    duration =
      (hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""} ` : "") +
      (minutes > 0 ? `${minutes} min` : "");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 min-w-[320px]">
        <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        <div className="mb-2">
          <span className="font-semibold">Date:</span> {date}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Time:</span> {start} {end && `- ${end}`}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Duration:</span> {duration}
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailModal;