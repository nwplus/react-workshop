import React from "react";

function QuickActions({ onQuickFilter }) {
  return (
    <div className="quick-actions">
      <span className="quick-actions-label">I have…</span>
      <div className="quick-actions-buttons">
        <button
          type="button"
          className="quick-action-pill"
          onClick={() => onQuickFilter("Food")}
        >
          <span className="quick-action-emoji">🍎</span>
          <span className="quick-action-text">Food to donate</span>
        </button>
        <button
          type="button"
          className="quick-action-pill"
          onClick={() => onQuickFilter("Clothing")}
        >
          <span className="quick-action-emoji">👕</span>
          <span className="quick-action-text">Clothes or blankets</span>
        </button>
        <button
          type="button"
          className="quick-action-pill"
          onClick={() => onQuickFilter("Time")}
        >
          <span className="quick-action-emoji">⏱</span>
          <span className="quick-action-text">A bit of time</span>
        </button>
        <button
          type="button"
          className="quick-action-pill"
          onClick={() => onQuickFilter("Money")}
        >
          <span className="quick-action-emoji">💳</span>
          <span className="quick-action-text">I can give money</span>
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
