import React from "react";

const DayCell = ({
  day,
  events,
  isToday,
  isSelected,
  onClick,
  onEventClick,
}) => {
  // Find conflicts: events with the same start time
  const timeCount = {};
  events.forEach(ev => {
    const key = ev.startTime.format ? ev.startTime.format("HH:mm") : ev.startTime;
    timeCount[key] = (timeCount[key] || 0) + 1;
  });

  // Find the highest number of events at the same time
  const maxConflict = Math.max(0, ...Object.values(timeCount));

  // Set background color based on conflict level
  let conflictBg = "";
  if (maxConflict === 2) conflictBg = "bg-orange-200";
  else if (maxConflict >= 3) conflictBg = "bg-yellow-200";

  return (
    <div
      className={`border rounded cursor-pointer relative flex flex-col h-full
        ${isToday ? "bg-blue-100 border-blue-400" : ""}
        ${isSelected ? "ring-2 ring-blue-500" : ""}
        ${conflictBg}
      `}
      onClick={onClick}
    >
      <div className="font-semibold text-sm mb-1 mt-2 ml-2">{day.format("D")}</div>
      {/* Show event as a pill/badge with left border */}
      <div className="flex flex-col gap-1 flex-1 px-2 pb-2">
        {events.map((event) => {
          const key = event.startTime.format ? event.startTime.format("HH:mm") : event.startTime;
          const isConflict = timeCount[key] > 1;
          return (
            <div
              key={event.id}
              className={`
                w-full flex items-center px-2 py-1 rounded bg-green-50 border-l-4
                ${isConflict ? "border-red-400" : "border-green-400"}
                text-[12px] font-medium truncate cursor-pointer
                hover:bg-green-100 transition
              `}
              title={
                isConflict
                  ? `Conflict: ${event.title} (${key})`
                  : `${event.title} (${key})`
              }
              onClick={e => {
                e.stopPropagation();
                onEventClick(event);
              }}
            >
              <span className="truncate">{event.title}</span>
              <span className="ml-1 text-gray-500">{key}</span>
              {isConflict && (
                <span className="ml-1 text-red-500" title="Conflict">&#9888;</span>
              )}
            </div>
          );
        })}
      </div>
      {/* Optional: show a red dot if any conflict exists */}
      {Object.values(timeCount).some(count => count > 1) && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" title="Conflict"></div>
      )}
    </div>
  );
};

export default DayCell;