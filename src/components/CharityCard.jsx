import React from "react";

function UrgencyTag({ level }) {
  const className = `urgency-tag urgency-${level.toLowerCase()}`;
  return <span className={className}>{level} need</span>;
}

function getCauseIcon(cause) {
  switch (cause) {
    case "Food Security":
      return "🍎";
    case "Housing":
      return "🏠";
    case "Health":
      return "❤️";
    case "Indigenous Support":
      return "🪶";
    case "Settlement":
      return "🧭";
    case "Youth":
      return "🎒";
    case "LGBTQ2S+":
      return "🌈";
    case "Seniors":
      return "👵";
    case "Environment":
      return "🌿";
    case "Animals":
      return "🐾";
    default:
      return "🤝";
  }
}

function CharityCard({ charity, isSelected, isSaved, onClick, onToggleSave }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${charity.latitude},${charity.longitude}`
  )}`;

  return (
    <div
      id={`charity-${charity.id}`}
      className={`charity-card ${isSelected ? "charity-card-selected" : ""}`}
      onClick={onClick}
    >
      <div className="charity-header">
        <h3 className="charity-name">
          <span className="charity-icon">{getCauseIcon(charity.cause)}</span>
          {charity.name}
        </h3>
        <div className="charity-header-right">
          <UrgencyTag level={charity.urgency} />
          <button
            className={`save-button ${isSaved ? "save-button-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            aria-label={isSaved ? "Unsave charity" : "Save charity"}
          >
            {isSaved ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>

      <p className="charity-cause">{charity.cause}</p>
      <p className="charity-description">{charity.description}</p>

      <div className="charity-meta">
        <span className="charity-location">{charity.location}</span>
        {charity.distanceKm != null && (
          <span className="charity-distance">
            {charity.distanceKm} km away
          </span>
        )}
      </div>

      <div className="charity-footer">
        <div className="charity-accepts">
          {charity.accepts.map((type) => (
            <span key={type} className="pill">
              {type}
            </span>
          ))}
        </div>
        <div className="charity-footer-actions">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="button button-small button-ghost"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Open in Maps
          </a>
          <a
            href={charity.website}
            target="_blank"
            rel="noreferrer"
            className="button button-small"
            onClick={(e) => {
              e.stopPropagation();
              if (typeof window.addNeighborGoodPoints === "function") {
                window.addNeighborGoodPoints(10); // 10 points per click
              }
            }}
          >
            Donate or learn more
          </a>
        </div>
      </div>

      {charity.impact && (
        <p className="charity-impact">{charity.impact}</p>
      )}
    </div>
  );
}

export default CharityCard;
