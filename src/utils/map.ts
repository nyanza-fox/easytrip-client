const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;
const toDegrees = (radians: number): number => (radians * 180) / Math.PI;
const calculateMidpointLat = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  // Convert latitude and longitude from degrees to radians
  const radLat1 = toRadians(lat1);
  const radLon1 = toRadians(lon1);
  const radLat2 = toRadians(lat2);
  const radLon2 = toRadians(lon2);

  // Compute Bx and By
  const Bx = Math.cos(radLat2) * Math.cos(radLon2 - radLon1);
  const By = Math.cos(radLat2) * Math.sin(radLon2 - radLon1);

  // Compute midpoint latitude and longitude in radians
  const midLat = Math.atan2(
    Math.sin(radLat1) + Math.sin(radLat2),
    Math.sqrt((Math.cos(radLat1) + Bx) * (Math.cos(radLat1) + Bx) + By * By)
  );
  const midLon = radLon1 + Math.atan2(By, Math.cos(radLat1) + Bx);

  // Convert midpoint latitude and longitude back to degrees
  return toDegrees(midLat);
};

const calculateMidpointLong = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  // Convert latitude and longitude from degrees to radians
  const radLat1 = toRadians(lat1);
  const radLon1 = toRadians(lon1);
  const radLat2 = toRadians(lat2);
  const radLon2 = toRadians(lon2);

  // Compute Bx and By
  const Bx = Math.cos(radLat2) * Math.cos(radLon2 - radLon1);
  const By = Math.cos(radLat2) * Math.sin(radLon2 - radLon1);

  // Compute midpoint latitude and longitude in radians
  const midLat = Math.atan2(
    Math.sin(radLat1) + Math.sin(radLat2),
    Math.sqrt((Math.cos(radLat1) + Bx) * (Math.cos(radLat1) + Bx) + By * By)
  );
  const midLon = radLon1 + Math.atan2(By, Math.cos(radLat1) + Bx);

  // Convert midpoint latitude and longitude back to degrees
  return toDegrees(midLon);
};

export { calculateMidpointLat, calculateMidpointLong };
