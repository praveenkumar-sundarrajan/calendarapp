import React from "react";

const ViewSelector = ({ view, onChange }) => {
  const views = ["Day", "Week", "Month", "Year"];

  return (
    <div className="flex justify-center mb-4">
      <select
        value={view}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded shadow"
      >
        {views.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ViewSelector;
