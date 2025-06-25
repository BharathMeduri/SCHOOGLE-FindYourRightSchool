// Function to calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Function to get coordinates for common Indian cities/pincodes
export const getCityCoordinates = (location: string): { lat: number; lng: number } | null => {
  const locationMap: { [key: string]: { lat: number; lng: number } } = {
    // Bangalore variations
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'bengaluru': { lat: 12.9716, lng: 77.5946 },
    '560001': { lat: 12.9716, lng: 77.5946 }, // Bangalore GPO
    '560002': { lat: 12.9698, lng: 77.6006 }, // Bangalore Cantonment
    '560003': { lat: 12.9351, lng: 77.6245 }, // Malleshwaram
    '560004': { lat: 12.9896, lng: 77.5550 }, // Rajajinagar
    '560005': { lat: 12.9634, lng: 77.5855 }, // Seshadripuram
    '560006': { lat: 12.9279, lng: 77.6271 }, // Chamrajpet
    '560007': { lat: 13.0067, lng: 77.5663 }, // Sadashivanagar
    '560008': { lat: 12.9539, lng: 77.4905 }, // Yeshwanthpur
    '560009': { lat: 12.9591, lng: 77.5647 }, // Rajajinagar
    '560010': { lat: 12.9716, lng: 77.5946 }, // Central Bangalore
    
    // Delhi variations
    'delhi': { lat: 28.6139, lng: 77.2090 },
    'new delhi': { lat: 28.6139, lng: 77.2090 },
    'gurgaon': { lat: 28.4595, lng: 77.0266 },
    'gurugram': { lat: 28.4595, lng: 77.0266 },
    
    // Other major cities
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'kolkata': { lat: 22.5726, lng: 88.3639 },
    'hyderabad': { lat: 17.3850, lng: 78.4867 },
    'pune': { lat: 18.5204, lng: 73.8567 },
    'lucknow': { lat: 26.8467, lng: 80.9462 },
    'shimla': { lat: 31.1048, lng: 77.1734 },
    'dehradun': { lat: 30.3165, lng: 78.0322 }
  };
  
  const normalizedLocation = location.toLowerCase().trim();
  return locationMap[normalizedLocation] || null;
};
