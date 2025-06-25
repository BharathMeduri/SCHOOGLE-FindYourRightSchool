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
    
    // Comprehensive Bangalore Pincodes (560001-560099 series)
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
    '560011': { lat: 12.9279, lng: 77.6271 }, // Shivajinagar
    '560012': { lat: 12.9351, lng: 77.6245 }, // Malleshwaram
    '560013': { lat: 13.0067, lng: 77.5663 }, // Sadashivanagar
    '560014': { lat: 12.9539, lng: 77.4905 }, // Dayanandanagar
    '560015': { lat: 12.9279, lng: 77.6271 }, // Chickpet
    '560016': { lat: 12.9591, lng: 77.5647 }, // Sanjaynagar
    '560017': { lat: 12.9716, lng: 77.5946 }, // Jayanagar
    '560018': { lat: 12.9351, lng: 77.6245 }, // Basavanagudi
    '560019': { lat: 12.9279, lng: 77.6271 }, // Hanumanthnagar
    '560020': { lat: 13.0067, lng: 77.5663 }, // Nagarbhavi
    '560021': { lat: 12.9539, lng: 77.4905 }, // Kengeri
    '560022': { lat: 12.9591, lng: 77.5647 }, // Vijayanagar
    '560023': { lat: 12.9716, lng: 77.5946 }, // Chandra Layout
    '560024': { lat: 12.9351, lng: 77.6245 }, // Rajarajeshwari Nagar
    '560025': { lat: 12.9279, lng: 77.6271 }, // Kanakapura Road
    '560026': { lat: 13.0067, lng: 77.5663 }, // Banashankari
    '560027': { lat: 12.9539, lng: 77.4905 }, // Banashankari 2nd Stage
    '560028': { lat: 12.9591, lng: 77.5647 }, // Banashankari 3rd Stage
    '560029': { lat: 12.9716, lng: 77.5946 }, // JP Nagar
    '560030': { lat: 12.9351, lng: 77.6245 }, // JP Nagar 2nd Phase
    '560031': { lat: 12.9279, lng: 77.6271 }, // JP Nagar 3rd Phase
    '560032': { lat: 13.0067, lng: 77.5663 }, // JP Nagar 4th Phase
    '560033': { lat: 12.9539, lng: 77.4905 }, // JP Nagar 5th Phase
    '560034': { lat: 12.9591, lng: 77.5647 }, // JP Nagar 6th Phase
    '560035': { lat: 12.9716, lng: 77.5946 }, // JP Nagar 7th Phase
    '560036': { lat: 12.9351, lng: 77.6245 }, // Jayanagar 4th Block
    '560037': { lat: 12.9279, lng: 77.6271 }, // Jayanagar 8th Block
    '560038': { lat: 13.0067, lng: 77.5663 }, // Jayanagar 9th Block
    '560039': { lat: 12.9539, lng: 77.4905 }, // BTM Layout
    '560040': { lat: 12.9591, lng: 77.5647 }, // BTM Layout 2nd Stage
    '560041': { lat: 12.9716, lng: 77.5946 }, // Jayanagar
    '560042': { lat: 12.9351, lng: 77.6245 }, // Jayanagar East
    '560043': { lat: 12.9279, lng: 77.6271 }, // Kumaraswamy Layout
    '560044': { lat: 13.0067, lng: 77.5663 }, // Uttarahalli
    '560045': { lat: 12.9539, lng: 77.4905 }, // Konanakunte
    '560046': { lat: 12.9591, lng: 77.5647 }, // Hulimavu
    '560047': { lat: 12.9716, lng: 77.5946 }, // Hongasandra
    '560048': { lat: 12.9351, lng: 77.6245 }, // Nyapasandra
    '560049': { lat: 12.9279, lng: 77.6271 }, // Anjanapura
    '560050': { lat: 13.0067, lng: 77.5663 }, // Rajajinagar
    '560051': { lat: 12.9539, lng: 77.4905 }, // Yeshwanthpur Industrial Suburb
    '560052': { lat: 12.9591, lng: 77.5647 }, // Mathikere
    '560053': { lat: 12.9716, lng: 77.5946 }, // Malleswaram
    '560054': { lat: 12.9351, lng: 77.6245 }, // Sanjaynagar
    '560055': { lat: 12.9279, lng: 77.6271 }, // Kammanahalli
    '560056': { lat: 13.0067, lng: 77.5663 }, // Frazer Town
    '560057': { lat: 12.9539, lng: 77.4905 }, // Richards Town
    '560058': { lat: 12.9591, lng: 77.5647 }, // Palace Guttahalli
    '560059': { lat: 12.9716, lng: 77.5946 }, // RT Nagar
    '560060': { lat: 12.9351, lng: 77.6245 }, // Vyalikaval
    '560061': { lat: 12.9279, lng: 77.6271 }, // Rajmahal Vilas
    '560062': { lat: 13.0067, lng: 77.5663 }, // Aramane Nagara
    '560063': { lat: 12.9539, lng: 77.4905 }, // Vidhana Soudha
    '560064': { lat: 12.9591, lng: 77.5647 }, // Gandhinagar
    '560065': { lat: 12.9716, lng: 77.5946 }, // Raj Bhavan
    '560066': { lat: 12.9851, lng: 77.7279 }, // ITPL / Marathahalli
    '560067': { lat: 12.8449, lng: 77.6690 }, // Electronic City Phase 1
    '560068': { lat: 12.8352, lng: 77.6645 }, // Electronic City Phase 2
    '560069': { lat: 12.9539, lng: 77.4905 }, // Peenya
    '560070': { lat: 12.9591, lng: 77.5647 }, // Benson Town
    '560071': { lat: 12.9716, lng: 77.5946 }, // Pulakeshi Nagar
    '560072': { lat: 12.9351, lng: 77.6245 }, // HAL
    '560073': { lat: 12.9279, lng: 77.6271 }, // HAL 3rd Stage
    '560074': { lat: 13.0067, lng: 77.5663 }, // Domlur
    '560075': { lat: 12.9539, lng: 77.4905 }, // Indira Nagar
    '560076': { lat: 12.9591, lng: 77.5647 }, // Halasuru
    '560077': { lat: 12.9716, lng: 77.5946 }, // Shanti Nagar
    '560078': { lat: 12.9351, lng: 77.6245 }, // Infantry Road
    '560079': { lat: 12.9279, lng: 77.6271 }, // Richmond Town
    '560080': { lat: 13.0067, lng: 77.5663 }, // Indiranagar 2nd Stage
    '560081': { lat: 12.9539, lng: 77.4905 }, // HAL 2nd Stage
    '560082': { lat: 12.9591, lng: 77.5647 }, // CV Raman Nagar
    '560083': { lat: 12.9716, lng: 77.5946 }, // New Thippasandra
    '560084': { lat: 12.9351, lng: 77.6245 }, // Bangalore East
    '560085': { lat: 12.9279, lng: 77.6271 }, // Bangalore South East
    '560086': { lat: 13.0067, lng: 77.5663 }, // Koramangala
    '560087': { lat: 12.9539, lng: 77.4905 }, // Koramangala 8th Block
    '560088': { lat: 12.9591, lng: 77.5647 }, // Koramangala 4th Block
    '560089': { lat: 12.9716, lng: 77.5946 }, // Koramangala 6th Block
    '560090': { lat: 12.9351, lng: 77.6245 }, // Koramangala 1st Block
    '560091': { lat: 12.9279, lng: 77.6271 }, // Koramangala 2nd Block
    '560092': { lat: 13.0067, lng: 77.5663 }, // Begur
    '560093': { lat: 12.9539, lng: 77.4905 }, // Koramangala 5th Block
    '560094': { lat: 12.9591, lng: 77.5647 }, // HAL Airport
    '560095': { lat: 12.9716, lng: 77.5946 }, // Koramangala 7th Block
    '560096': { lat: 12.9351, lng: 77.6245 }, // Koramangala 3rd Block
    '560097': { lat: 12.9279, lng: 77.6271 }, // HSR Layout
    '560098': { lat: 13.0067, lng: 77.5663 }, // HSR Layout Sector 1
    '560099': { lat: 12.9539, lng: 77.4905 }, // HSR Layout Sector 2
    '560100': { lat: 12.9010, lng: 77.6370 }, // Sarjapur Road / HSR Layout Sector 3
    '560103': { lat: 12.9698, lng: 77.7500 }, // Whitefield
    
    // Additional Bangalore areas (561xxx series)
    '561201': { lat: 13.1986, lng: 77.7066 }, // Chikkaballapur
    '561203': { lat: 13.0358, lng: 77.5970 }, // Yelahanka
    '561204': { lat: 13.0674, lng: 77.5764 }, // Thanisandra
    '561229': { lat: 13.1478, lng: 77.5721 }, // Doddaballapur
    
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
