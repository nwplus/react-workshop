const R = 6371; // Earth radius in km

function toRad(value) {
  return (value * Math.PI) / 180;
}

export function distanceInKmBetweenCoords(lat1, lon1, lat2, lon2) {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function addDistanceToCharities(charities, userLocation) {
  if (!userLocation) {
    return charities.map((c) => ({ ...c, distanceKm: null }));
  }

  const { lat, lng } = userLocation;

  return charities.map((c) => {
    const distanceKm = distanceInKmBetweenCoords(
      lat,
      lng,
      c.latitude,
      c.longitude
    );
    return {
      ...c,
      distanceKm: Math.round(distanceKm * 10) / 10,
    };
  });
}
