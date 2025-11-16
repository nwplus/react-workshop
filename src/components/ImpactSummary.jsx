import React from "react";

function ImpactSummary({ visitedCount, donationClicks, points }) {
  const badges = [];

  if (visitedCount >= 3) {
    badges.push({ icon: "🧭", label: "Neighbourhood Explorer" });
  }
  if (donationClicks >= 2) {
    badges.push({ icon: "🍞", label: "Food Hero" });
  }
  if (points >= 50) {
    badges.push({ icon: "🏙", label: "Community Builder" });
  }

  return (
    <div className="impact-summary">
      <div className="impact-main">
        <span className="impact-main-title">Your impact this session</span>
        <span className="impact-main-stats">
          Visited <strong>{visitedCount}</strong> charities ·
          Clicked through to <strong>{donationClicks}</strong> donation pages ·
          <strong> {points}</strong> impact points
        </span>
      </div>
      {badges.length > 0 && (
        <div className="impact-badges">
          {badges.map((badge) => (
            <span key={badge.label} className="impact-badge">
              <span className="impact-badge-icon">{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImpactSummary;
