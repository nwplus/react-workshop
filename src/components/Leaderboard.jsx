import React from "react";
import "/src/App.css"

/**
 * Leaderboard props:
 * - data: Array<{name: string, points: number}>
 * - currentUser: string (name of the signed-in user)
 * - currentUserPoints: number (their points; optional if they're already in data)
 */
export default function Leaderboard({ data = [], currentUser, currentUserPoints }) {
  // create a shallow copy so we don't mutate props
  const merged = [...data];

  // try to find user (case-insensitive)
  const userIndex = merged.findIndex(
    (d) => d.name.toLowerCase() === (currentUser || "").toLowerCase()
  );

  if (currentUser) {
    if (userIndex === -1) {
      // if user isn't in the data, add them using provided points or 0
      merged.push({ name: currentUser, points: currentUserPoints ?? 0 });
    } else if (typeof currentUserPoints === "number") {
      // if present and points explicitly provided, update them
      merged[userIndex].points = currentUserPoints;
    }
  }

  // sort descending by points
  merged.sort((a, b) => b.points - a.points);

  // determine the index of the current user after sorting
  const sortedUserIndex = currentUser
    ? merged.findIndex((d) => d.name.toLowerCase() === currentUser.toLowerCase())
    : -1;

  const medalForPosition = (pos) => {
    if (pos === 0) return "🥇";
    if (pos === 1) return "🥈";
    if (pos === 2) return "🥉";
    return null;
  };

  return (
    <div className="leaderboard-container" role="region" aria-label="Leaderboard">
      <h3 className="leaderboard-title">Top Users</h3>
      <ul className="leaderboard-list">
        {merged.map((item, i) => {
          const isCurrent = i === sortedUserIndex;
          const medal = medalForPosition(i);
          return (
            <li
              key={`${item.name}-${item.points}-${i}`}
              className={`leaderboard-item ${isCurrent ? "current-user" : ""}`}
              title={`${item.name}: ${item.points} points`}
            >
              <span className="leaderboard-left">
                {medal && <span className="medal" aria-hidden="true">{medal}</span>}
                <span className="leaderboard-name">{item.name}</span>
              </span>
              <span className="leaderboard-points">{item.points}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}