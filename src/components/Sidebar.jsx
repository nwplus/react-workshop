import React from "react";
import CharityCard from "./CharityCard.jsx";

function Sidebar({
  charities,
  selectedCharityId,
  onSelectCharity,
  savedIds,
  onToggleSave,
}) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">
        Nearby charities
        <span className="sidebar-count">
          {charities.length} result{charities.length === 1 ? "" : "s"}
        </span>
      </h2>

      <div className="sidebar-list">
        {charities.map((charity) => (
          <CharityCard
            key={charity.id}
            charity={charity}
            isSelected={charity.id === selectedCharityId}
            isSaved={savedIds.includes(charity.id)}
            onClick={() => onSelectCharity(charity.id)}
            onToggleSave={() => onToggleSave(charity.id)}
          />
        ))}

        {charities.length === 0 && (
          <p className="sidebar-empty">
            No charities match your filters. Try broadening your search.
          </p>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
