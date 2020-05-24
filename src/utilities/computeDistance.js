export const getDistanceFrom2Locations = (origin, dist) => {
  if (!dist) return undefined;
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(dist.lat - origin.lat); // deg2rad below
  var dLon = deg2rad(dist.lng - origin.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(origin.lat)) *
      Math.cos(deg2rad(dist.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

export const convertMeter = km => {
  return km * 1000;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
