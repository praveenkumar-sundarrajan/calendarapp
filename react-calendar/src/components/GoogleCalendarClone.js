import React, { useState } from "react";
import {
  Calendar,
  Search,
  Settings,
  HelpCircle,
  Plus,
} from "lucide-react";
import dayjs from "dayjs";

const GoogleCalendarClone = () => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [view, setView] = useState("Year");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: dayjs().format("YYYY-MM-DD"),
    startTime: "18:00",
    endTime: "19:00",
    description: "",
    location: "",
    guests: "",
  });
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper functions for grids
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

 
  const MonthGrid = ({ year, month }) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setSelectedDate(selectedDate.subtract(1, "month"))}>&lt;</button>
          <h2 className="text-lg font-bold">{monthNames[month]} {year}</h2>
          <button onClick={() => setSelectedDate(selectedDate.add(1, "month"))}>&gt;</button>
        </div>

        <div className="grid grid-cols-7 gap-px mb-1">
          {dayNames.map(day => (
            <div key={day} className="text-[10px] text-center font-medium">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.8">
          {days.map((d, i) => (
            <div
              key={i}
      className={`
        h-10 border rounded-lg p-2 align-top relative bg-white transition
        ${d && dayjs([year, month, d]).isSame(dayjs(), "day") ? "border-blue-500 shadow-lg" : ""}
        ${d && dayjs([year, month, d]).isSame(selectedDate, "day") ? "ring-2 ring-blue-400" : ""}
        hover:bg-blue-50
      `}
    >
      {d && (
        <>
          <div className="text-xs font-bold text-gray-700">{d}</div>
          {events
            .filter(ev => dayjs(ev.date).isSame(dayjs([year, month, d]), "day"))
            .map(ev => (
              <div
                key={ev.id}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded px-2 py-1 text-xs mt-1 truncate shadow"
              >
                {ev.title} <span className="font-gray">{ev.startTime}</span>
              </div>
            ))}
        </>
      )}
    </div>
  ))}
</div>

      </div>
    );
  };

  // --- Week Grid ---
  const WeekGrid = ({ date }) => {
    const startOfWeek = date.startOf("week");
    const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setSelectedDate(selectedDate.subtract(1, "week"))}>&lt;</button>
          <h2 className="text-lg font-bold">
            Week of {startOfWeek.format("MMM D, YYYY")}
          </h2>
          <button onClick={() => setSelectedDate(selectedDate.add(1, "week"))}>&gt;</button>
        </div>
        <div className="grid grid-cols-8">
          <div></div>
          {days.map(day => (
            <div key={day.format()} className="text-xs text-center font-medium">
              {day.format("ddd D")}
            </div>
          ))}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className="text-xs text-right pr-1 border-t h-8">{hour}:00</div>
              {days.map(day => (
                <div key={day.format() + hour} className="border-t h-8 relative">
                  {events
                    .filter(ev =>
                      dayjs(ev.date).isSame(day, "day") &&
                      parseInt(ev.startTime.split(":")[0], 10) === hour
                    )
                    .map(ev => (
                      <div
                        key={ev.id}
                        className="absolute left-0 right-0 bg-blue-500 text-white text-xs rounded px-1"
                        style={{ top: 0, height: "100%" }}
                      >
                        {ev.title} {ev.startTime}
                      </div>
                    ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  const DayGrid = ({ date }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setSelectedDate(selectedDate.subtract(1, "day"))}>&lt;</button>
          <h2 className="text-lg font-bold">{date.format("dddd, MMMM D, YYYY")}</h2>
          <button onClick={() => setSelectedDate(selectedDate.add(1, "day"))}>&gt;</button>
        </div>
        <div className="grid grid-cols-3">
          <div className="text-xs font-medium">Time</div>
          <div className="text-xs font-medium">Events</div>
          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className="text-xs text-right pr-1 border-t h-8">{hour}:00</div>
              <div className="border-t h-8 relative">
                {events
                  .filter(ev =>
                    dayjs(ev.date).isSame(date, "day") &&
                    parseInt(ev.startTime.split(":")[0], 10) === hour
                  )
                  .map(ev => (
                    <div
                      key={ev.id}
                      className="absolute left-0 right-0 bg-blue-500 text-white text-xs rounded px-1"
                      style={{ top: 0, height: "100%" }}
                    >
                      {ev.title} {ev.startTime}
                    </div>
                  ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // --- Year Grid ---
  const YearGrid = () => (
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
        {monthNames.map((_, idx) => (
          <MonthGrid key={idx} year={currentYear} month={idx} />
        ))}
      </div>
    </div>
  );

  // Mini Month Calendar for Sidebar
  const MiniMonthCalendar = ({ date, onSelect }) => {
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
                ${d && dayjs([year, month, d]).isSame(selectedDate, "day") ? "ring-2 ring-blue-400" : ""}
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

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-semibold text-gray-800 tracking-tight">Google Calendar Clone</span>
        </div>
        <button
          onClick={() => setSelectedDate(dayjs())}
          className="px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-blue-50 transition font-medium"
        >
          Today
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-blue-100 rounded-lg transition">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-blue-100 rounded-lg transition">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-blue-100 rounded-lg transition">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <select
            value={view}
            onChange={e => setView(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-200"
          >
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Week">Week</option>
            <option value="Day">Day</option>
          </select>
        </div>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 p-6 border-r bg-gray min-h-screen shadow-sm">
          <button
            className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 shadow transition mb-8 font-semibold"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Create</span>
          </button>
          <MiniMonthCalendar date={selectedDate} onSelect={setSelectedDate} />
          {/* ...you can add more sidebar content here... */}
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="bg-blue rounded-xl shadow-lg p-6">
            {view === "Year" && <YearGrid />}
            {view === "Month" && (
              <MonthGrid year={selectedDate.year()} month={selectedDate.month()} />
            )}
            {view === "Week" && <WeekGrid date={selectedDate} />}
            {view === "Day" && <DayGrid date={selectedDate} />}
          </div>
        </main>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative border">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl"
              onClick={() => setShowCreateModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Add Event</h2>
            <div className="space-y-4">
              <input
                className="w-full border rounded-lg px-4 py-3 mb-1 focus:ring-2 focus:ring-blue-200"
                placeholder="Event title"
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                autoFocus
              />
              <input
                type="date"
                className="w-full border rounded-lg px-4 py-3"
                value={newEvent.date}
                onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <div className="flex gap-3">
                <input
                  type="time"
                  className="w-full border rounded-lg px-4 py-3"
                  value={newEvent.startTime}
                  onChange={e => setNewEvent({ ...newEvent, startTime: e.target.value })}
                />
                <input
                  type="time"
                  className="w-full border rounded-lg px-4 py-3"
                  value={newEvent.endTime}
                  onChange={e => setNewEvent({ ...newEvent, endTime: e.target.value })}
                />
              </div>
              <textarea
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Description"
                value={newEvent.description}
                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                rows={2}
              />
            </div>
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow float-right mt-6 font-semibold transition"
              onClick={() => {
                setEvents([
                  ...events,
                  { ...newEvent, id: Date.now() }
                ]);
                setShowCreateModal(false);
                setNewEvent({
                  title: "",
                  date: dayjs().format("YYYY-MM-DD"),
                  startTime: "18:00",
                  endTime: "19:00",
                  description: "",
                  location: "",
                  guests: "",
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarClone;