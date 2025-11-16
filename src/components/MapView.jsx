import React, { useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const defaultCenter = {
  lat: 49.2665,
  lng: -123.2499, // UBC-ish fallback
};

// Normal Leaflet icon for the user location
const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function getCauseEmoji(cause) {
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

// Big logo-style map marker
function createMarkerIcon(cause, isSelected) {
  const emoji = getCauseEmoji(cause);
  const extra = isSelected ? " marker-inner-selected" : "";

  return L.divIcon({
    html: `<div class="marker-inner${extra}">${emoji}</div>`,
    className: "charity-marker",
    iconSize: [60, 70], // outer clickable area
    iconAnchor: [30, 70], // center bottom
    popupAnchor: [0, -60], // popup above the marker
  });
}

function MapAutoFit({ charities, userLocation }) {
  const map = useMap();

  const bounds = useMemo(() => {
    const points = [];

    if (userLocation) {
      points.push([userLocation.lat, userLocation.lng]);
    }

    charities.forEach((c) => {
      points.push([c.latitude, c.longitude]);
    });

    if (points.length === 0) return null;

    return L.latLngBounds(points);
  }, [charities, userLocation]);

  useEffect(() => {
    if (!bounds) return;

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [bounds, map]);

  return null;
}

function MapView({ charities, userLocation, selectedCharity, onSelectCharity }) {
  const center = userLocation || defaultCenter;

  return (
    <div className="map-container">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAutoFit charities={charities} userLocation={userLocation} />

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>You are here.</Popup>
          </Marker>
        )}

        {charities.map((charity) => {
          const isSelected =
            selectedCharity && selectedCharity.id === charity.id;

          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${charity.latitude},${charity.longitude}`
          )}`;

          return (
            <Marker
              key={charity.id}
              position={[charity.latitude, charity.longitude]}
              icon={createMarkerIcon(charity.cause, isSelected)}
              eventHandlers={{
                click: () => onSelectCharity(charity.id),
              }}
            >
              <Popup>
                <strong>{charity.name}</strong>
                <br />
                {charity.cause}
                <br />
                {charity.location}
                {charity.distanceKm != null && (
                  <>
                    <br />
                    {charity.distanceKm} km away
                  </>
                )}
                <br />
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;
