import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
// import "./index.css";
import eventsData from "./events.json";
import CalendarHeader from "./CalendarHeader";
import DayCell from "./DayCell";
import EventDetailModal from "./EventDetailModal";
import GoogleCalendarClone from "./GoogleCalendarClone";

import { Settings, HelpCircle, Calendar as CalendarIcon } from "lucide-react";

// Replace your SettingsPage in App.js with this:
const SettingsPage = () => {
  // You can use useState to manage form values if you want them to be editable
  return (
    <div className="flex bg-white rounded shadow p-6 min-h-[500px]">
      {/* Sidebar */}
      <aside className="w-64 border-r pr-6">
        <h2 className="text-lg font-bold mb-6">General</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="font-semibold text-blue-600">Language and region</li>
          <li>Time zone</li>
          <li>World clock</li>
          <li>Event settings</li>
          <li>Notification settings</li>
          <li>View options</li>
          <li>Google Workspace smart features</li>
          <li>Working hours & location</li>
          <li>Keyboard shortcuts</li>
          <li>Offline</li>
          <li className="mt-6 font-semibold">Add calendar</li>
          <li>Import & export</li>
        </ul>
      </aside>
      {/* Main Content */}
      <section className="flex-1 pl-10">
        <h2 className="text-xl font-bold mb-6">Language and region</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select className="w-full border rounded px-3 py-2">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Hindi</option>
                <option>Tamil</option>
                {/* Add more as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select className="w-full border rounded px-3 py-2">
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
                {/* Add more as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date format</label>
              <select className="w-full border rounded px-3 py-2">
                <option>12/31/2025</option>
                <option>31/12/2025</option>
                <option>2025-12-31</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time format</label>
              <select className="w-full border rounded px-3 py-2">
                <option>1:00pm</option>
                <option>13:00</option>
              </select>
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Time zone</label>
              <select className="w-full border rounded px-3 py-2 mb-2">
                <option>(GMT+05:30) India Standard Time - Kolkata</option>
                <option>(GMT+00:00) Greenwich Mean Time</option>
                <option>(GMT-08:00) Pacific Time - Los Angeles</option>
                {/* Add more as needed */}
              </select>
              <div className="flex items-center mt-2">
                <input type="checkbox" id="secondary-tz" className="mr-2" />
                <label htmlFor="secondary-tz" className="text-sm">Display secondary time zone</label>
              </div>
              <select className="w-full border rounded px-3 py-2 mt-2" disabled>
                <option>Not selected</option>
              </select>
              <button className="mt-2 px-4 py-1 border rounded text-gray-600 bg-gray-100" disabled>Label</button>
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="ask-update-tz" className="mr-2" defaultChecked />
              <label htmlFor="ask-update-tz" className="text-sm">
                Ask to update my primary time zone to current location
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const HelpPage = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Help</h2>
    <p className="text-gray-700">
      Need help? Check out the user manual or contact support for assistance.
    </p>
  </div>
);

const Calendar = ({ events, onDateClick, selectedDate, view }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [modalEvent, setModalEvent] = useState(null);

  const daysInGrid = useMemo(() => {
    let start, end;

    switch (view) {
      case "Week":
        start = currentDate.startOf("week");
        end = currentDate.endOf("week");
        break;
      case "Month":
        start = currentDate.startOf("month").startOf("week");
        end = currentDate.endOf("month").endOf("week");
        break;
      case "Year":
        start = currentDate.startOf("year");
        end = currentDate.endOf("year");
        break;
      default:
        start = currentDate.startOf("day");
        end = currentDate.endOf("day");
        break;
    }

    const days = [];
    let day = start;

    while (day.isBefore(end) || day.isSame(end)) {
      days.push(day);
      day = day.add(1, "day");
    }

    return days;
  }, [currentDate, view]);

  const handleEventClick = (event) => setModalEvent(event);

  return (
    <div className="w-full h-full p-4 bg-blue-50 rounded-lg shadow-md">
      <CalendarHeader
        currentDate={currentDate}
        onPrevious={() =>
          setCurrentDate(currentDate.subtract(1, view === "Year" ? "year" : "month"))
        }
        onNext={() =>
          setCurrentDate(currentDate.add(1, view === "Year" ? "year" : "month"))
        }
        view={view}
      />

    <div className="grid grid-cols-7 grid-rows-6 gap-2 h-[600px]">
  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) =>
    view === "Year" ? null : (
      <div key={day} className="text-center font-semibold">
        {day}
      </div>
    )
  )}

  {daysInGrid.map((day) => {
    const eventsForDay = events.filter((event) =>
      day.isSame(event.startTime, "day")
    );
    const isSelected = selectedDate && day.isSame(selectedDate, "day");
    const hasConflict =
      eventsForDay.length > 1 &&
      eventsForDay.some(
        (e, i) =>
          eventsForDay.findIndex(
            (ev) =>
              ev.startTime.isSame(e.startTime) && ev.endTime.isSame(e.endTime)
          ) !== i
      );
    return (
      <DayCell
        key={day.format("DD-MM-YYYY")}
        day={day}
        events={eventsForDay}
        isToday={day.isSame(dayjs(), "day")}
        isSelected={isSelected}
        onClick={() => onDateClick(day)}
        onEventClick={handleEventClick}
        hasConflict={hasConflict}
      />
    );
  })}
</div>

      {modalEvent && <EventDetailModal event={modalEvent} onClose={() => setModalEvent(null)} />}
    </div>
  );
};

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState("MyCalendar");
  const [selectedDate, setSelectedDate] = useState(null);

  // Example events state (move your useMemo/eventsData to useState if not already)
  const [events, setEvents] = useState(
    eventsData.map((event) => ({
      ...event,
      startTime: dayjs(event.startTime),
      endTime: dayjs(event.endTime),
    }))
  );

  // Render the correct page based on selectedMenu
  const renderContent = () => {
    switch (selectedMenu) {
      case "Settings":
        return <SettingsPage />;
      case "Help":
        return <HelpPage />;
      case "GoogleCalendarClone":
        return (
          <GoogleCalendarClone
            events={events}
            setEvents={setEvents}
          />
        );
      default:
        return (
          <Calendar
            events={events}
            onDateClick={setSelectedDate}
            selectedDate={selectedDate}
            view={"Month"}
          />
        );
    }
  };
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r">
        <div className="flex items-center space-x-3 mb-6">
          <CalendarIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">My Calendar</h2>
        </div>
        <ul className="space-y-3">
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              selectedMenu === "MyCalendar" ? "text-blue-600" : "text-gray-700"
            }`}
            onClick={() => setSelectedMenu("MyCalendar")}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>My Calendar</span>
          </li>
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              selectedMenu === "GoogleCalendarClone" ? "text-blue-600" : "text-gray-700"
            }`}
            onClick={() => setSelectedMenu("GoogleCalendarClone")}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Google Calendar Clone</span>
          </li>
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              selectedMenu === "Settings" ? "text-blue-600" : "text-gray-700"
            }`}
            onClick={() => setSelectedMenu("Settings")}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </li>
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              selectedMenu === "Help" ? "text-blue-600" : "text-gray-700"
            }`}
            onClick={() => setSelectedMenu("Help")}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default App;
