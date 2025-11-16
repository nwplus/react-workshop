import React from "react";
import { causes, donationTypes } from "../data/charities.js";

function FilterBar({ filters, setFilters }) {
  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="cause-select">Cause</label>
        <select
          id="cause-select"
          value={filters.cause}
          onChange={handleChange("cause")}
        >
          {causes.map((cause) => (
            <option key={cause} value={cause}>
              {cause}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="accepts-select">Donation type</label>
        <select
          id="accepts-select"
          value={filters.accepts}
          onChange={handleChange("accepts")}
        >
          {donationTypes.map((type) => (
            <option key={type} value={type}>
              {type === "All" ? "All types" : type}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Sort by</label>
        <select
          id="sort-select"
          value={filters.sortBy}
          onChange={handleChange("sortBy")}
        >
          <option value="distance">Closest</option>
          <option value="urgency">Urgency</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
