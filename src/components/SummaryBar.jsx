import React from "react";

function SummaryBar({ charities, points, savedCount }) {
  if (!charities || charities.length === 0) return null;

  const total = charities.length;
  const highUrgency = charities.filter((c) => c.urgency === "High").length;
  const nearby = charities.filter(
    (c) => c.distanceKm != null && c.distanceKm <= 3
  ).length;

  return (
    <div className="summary-bar">
      <span>
        Showing <strong>{total}</strong> charities
        {nearby > 0 && (
          <>
            {" "}
            · <strong>{nearby}</strong> within 3 km
          </>
        )}
        {highUrgency > 0 && (
          <>
            {" "}
            · <strong>{highUrgency}</strong> high urgency
          </>
        )}
      </span>
      <span className="summary-right">
        {savedCount > 0 && (
          <span className="summary-pill">Saved: {savedCount}</span>
        )}
        <span className="summary-pill summary-pill-primary">
          Impact points: {points}
        </span>
      </span>
    </div>
  );
}

export default SummaryBar;
