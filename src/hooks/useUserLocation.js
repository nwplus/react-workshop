import { useEffect, useState } from "react";

function useUserLocation() {
  const [location, setLocation] = useState(null); // { lat, lng }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLoading(false);
      setError("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error", err);
        setError("Could not access your location.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { location, loading, error };
}

export default useUserLocation;
