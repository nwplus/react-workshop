import React from "react";
import Leaderboard from "./Leaderboard";
import LeaderboardData from "/src/data/leaderboardData.json"

function NeighborGoodLogo() {
  return (
    <span className="logo-wrapper" aria-hidden="true">
      <svg
        className="logo"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" fill="#4F46E5" />
        <path
          d="M7 13l3 3 7-7"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Header({ user, points, theme, onToggleTheme }) {
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);

  return (
    <header className="header">
      <div>
        <h1 className="title">
          <NeighborGoodLogo />
          NeighborGood
        </h1>
        <p className="subtitle">
          Discover nearby charities and high-impact causes across Metro
          Vancouver, based on where you are.
        </p>
      </div>

      <div className="header-right">
        {user && (
          <div className="points-display">
            <span
              className="points-user clickable"
              onClick={() => setShowLeaderboard(true)}
            >
              Hi, {user}
            </span>

            <span className="points-value">{points} impact points</span>
          </div>
        )}

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>

        <div className="header-badge">
          Built for HackCamp 2025 · Best Hack for Social Good
        </div>
      </div>

      {showLeaderboard && (
        <div className="modal-backdrop" onClick={() => setShowLeaderboard(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <Leaderboard data={LeaderboardData}
            onClose={() => setShowLeaderboard(false)}
            currentUser={user}
            currentUserPoints={points} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header