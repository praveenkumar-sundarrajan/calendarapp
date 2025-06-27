import React from "react";
import dayjs from "dayjs";

export const MiniMonthCalendar = ({ date, onSelect }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = date.year();
  const month = date.month();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="bg-gray-50 rounded-lg p-3 shadow mb-6">
      <div className="flex justify-between items-center mb-2">
        <button
          className="text-gray-500 hover:text-blue-600"
          onClick={() => onSelect(date.subtract(1, "month"))}
        >&lt;</button>
        <span className="font-semibold text-gray-700">{monthNames[month]} {year}</span>
        <button
          className="text-gray-500 hover:text-blue-600"
          onClick={() => onSelect(date.add(1, "month"))}
        >&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-center mb-1">
        {dayNames.map(day => (
          <div key={day} className="font-medium text-gray-500">{day[0]}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <button
            key={i}
            className={`rounded-full w-7 h-7 flex items-center justify-center
              ${d && dayjs([year, month, d]).isSame(dayjs(), "day") ? "bg-blue-600 text-white" : ""}
              ${d && dayjs([year, month, d]).isSame(date, "day") ? "ring-2 ring-blue-400" : ""}
              hover:bg-blue-100 transition`}
            disabled={!d}
            onClick={() => d && onSelect(dayjs([year, month, d]))}
          >
            {d || ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export const YearGrid = ({ currentYear, setCurrentYear }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentYear(currentYear - 1)}
        className="px-2 py-1 border rounded"
      >
        &lt; Prev
      </button>
      <h2 className="text-2xl font-bold">{currentYear}</h2>
      <button
        onClick={() => setCurrentYear(currentYear + 1)}
        className="px-2 py-1 border rounded"
      >
        Next &gt;
      </button>
    </div>
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-bold text-lg">{`Month ${idx + 1}`}</h3>
        </div>
      ))}
    </div>
  </div>
);

export const MonthGrid = ({ year, month }) => {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);
  return (
    <div>
      <h3 className="font-bold">{`Month View for ${month + 1}/${year}`}</h3>
      <p>{`Days in this month: ${daysInMonth}`}</p>
    </div>
  );
};

export const WeekGrid = ({ date }) => (
  <div>
    <h3 className="font-bold">Week View</h3>
    <p>{`Week starting from ${date.startOf("week").format("MMM D, YYYY")}`}</p>
  </div>
);

export const DayGrid = ({ date }) => (
  <div>
    <h3 className="font-bold">Day View</h3>
    <p>{`Details for ${date.format("MMM D, YYYY")}`}</p>
  </div>
);
