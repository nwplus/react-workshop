import React, { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MapView from "./components/MapView.jsx";
import Login from "./components/Login.jsx";
import QuickActions from "./components/QuickActions.jsx";
import ImpactSummary from "./components/ImpactSummary.jsx";
import OrgBanner from "./components/OrgBanner.jsx";
import { charities as baseCharities } from "./data/charities.js";
import useUserLocation from "./hooks/useUserLocation.js";
import { addDistanceToCharities } from "./utils/distance.js";

function App() {
  const { location, loading: locationLoading, error: locationError } =
    useUserLocation();

  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [points, setPoints] = useState(0);
  const [savedIds, setSavedIds] = useState([]);
  const [visitedIds, setVisitedIds] = useState([]);

  const [filters, setFilters] = useState({
    cause: "All",
    accepts: "All",
    sortBy: "distance", // "distance" | "urgency"
  });

  const [selectedCharityId, setSelectedCharityId] = useState(null);

  // global helper for impact points (called from CharityCard)
  window.addNeighborGoodPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  // enrich charities with distance from user
  const charitiesWithDistance = useMemo(
    () => addDistanceToCharities(baseCharities, location),
    [location]
  );

  // filters + sorting
  const filteredCharities = useMemo(() => {
    let list = [...charitiesWithDistance];

    if (filters.cause !== "All") {
      list = list.filter((c) => c.cause === filters.cause);
    }

    if (filters.accepts !== "All") {
      list = list.filter((c) => c.accepts.includes(filters.accepts));
    }

    if (filters.sortBy === "distance") {
      list.sort((a, b) => {
        if (a.distanceKm == null) return 1;
        if (b.distanceKm == null) return -1;
        return a.distanceKm - b.distanceKm;
      });
    } else if (filters.sortBy === "urgency") {
      const rank = { High: 0, Medium: 1, Low: 2 };
      list.sort((a, b) => rank[a.urgency] - rank[b.urgency]);
    }

    return list;
  }, [charitiesWithDistance, filters]);

  const selectedCharity =
    filteredCharities.find((c) => c.id === selectedCharityId) ||
    filteredCharities[0] ||
    null;

  const handleToggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // when selecting a charity (from sidebar or map):
  // - mark as selected
  // - record it as visited
  // - scroll its card into view at the top
  const handleSelectCharity = (id) => {
    setSelectedCharityId(id);

    setVisitedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

    const el = document.getElementById(`charity-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // quick "I have..." filters: set donation type + urgency sort
  const handleQuickFilter = (donationType) => {
    setFilters((prev) => ({
      ...prev,
      accepts: donationType,
      sortBy: "urgency",
    }));
  };

  // login/landing gate
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const visitedCount = visitedIds.length;
  const donationClicks = Math.floor(points / 10); // 10 pts per donate click

  return (
    <div className={`app-root ${theme === "dark" ? "theme-dark" : ""}`}>
      <Header
        user={user}
        points={points}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      />

      <div className="app-content">
        {/* 1) "I have..." quick actions */}
        <QuickActions onQuickFilter={handleQuickFilter} />

        {/* 2) Filter + sort bar */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* 3) Impact summary + badges */}
        <ImpactSummary
          visitedCount={visitedCount}
          donationClicks={donationClicks}
          points={points}
        />

        {locationLoading && (
          <div className="location-status">
            <div className="loader"></div>
            <span>
              Detecting your location… you can still browse nearby charities.
            </span>
          </div>
        )}

        {locationError && (
          <div className="location-status error">
            Could not access your location. Showing Vancouver defaults.
          </div>
        )}

        <div className="layout">
          <Sidebar
            charities={filteredCharities}
            selectedCharityId={selectedCharityId}
            onSelectCharity={handleSelectCharity}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />

          <MapView
            charities={filteredCharities}
            userLocation={location}
            selectedCharity={selectedCharity}
            onSelectCharity={handleSelectCharity}
          />
        </div>

        {/* 4) Org signup banner at bottom */}
        <OrgBanner />
      </div>
    </div>
  );
}

export default App;
