
export interface School {
  id: string;
  name: string;
  address: string;
  board: string;
  distance: number;
  facilities: string[];
  studentCount: number;
  established: number;
  contact: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const mockSchools: School[] = [
  {
    id: '1',
    name: 'Delhi Public School',
    address: 'Sector 45, Gurgaon, Haryana',
    board: 'CBSE',
    distance: 1.2,
    facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Science Lab', 'Transport', 'Playground'],
    studentCount: 2500,
    established: 1985,
    contact: '+91-124-4560000',
    coordinates: { lat: 28.4089, lng: 77.0478 } // Gurgaon
  },
  {
    id: '2',
    name: 'Ryan International School',
    address: 'Vasant Kunj, New Delhi',
    board: 'CBSE',
    distance: 2.8,
    facilities: ['Library', 'Computer Lab', 'Swimming Pool', 'Art Room', 'Transport'],
    studentCount: 1800,
    established: 1990,
    contact: '+91-11-26890000',
    coordinates: { lat: 28.5200, lng: 77.1600 } // New Delhi
  },
  {
    id: '3',
    name: 'Bishop Cotton Girls School',
    address: 'Richmond Road, Bangalore, Karnataka',
    board: 'ICSE',
    distance: 3.5,
    facilities: ['Library', 'Science Lab', 'Music Room', 'Sports Complex', 'Playground'],
    studentCount: 1200,
    established: 1865,
    contact: '+91-80-22212775',
    coordinates: { lat: 12.9716, lng: 77.5946 } // Bangalore
  },
  {
    id: '4',
    name: 'National Public School',
    address: 'Rajajinagar, Bangalore, Karnataka',
    board: 'CBSE',
    distance: 4.2,
    facilities: ['Library', 'Computer Lab', 'Theatre', 'Science Lab', 'Transport', 'Cafeteria'],
    studentCount: 2200,
    established: 1988,
    contact: '+91-80-23344444',
    coordinates: { lat: 12.9896, lng: 77.5550 } // Bangalore
  },
  {
    id: '5',
    name: 'Kendriya Vidyalaya Hebbal',
    address: 'Hebbal, Bangalore, Karnataka',
    board: 'CBSE',
    distance: 5.1,
    facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Ground', 'Canteen'],
    studentCount: 800,
    established: 1965,
    contact: '+91-80-23412345',
    coordinates: { lat: 13.0358, lng: 77.5970 } // Bangalore
  },
  {
    id: '6',
    name: 'Greenwood High International School',
    address: 'Sarjapur Road, Bangalore, Karnataka',
    board: 'ICSE',
    distance: 6.3,
    facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Ground', 'Swimming Pool'],
    studentCount: 1500,
    established: 2005,
    contact: '+91-80-28440000',
    coordinates: { lat: 12.9010, lng: 77.6370 } // Bangalore
  },
  {
    id: '7',
    name: 'Indus International School',
    address: 'Billapura Cross, Sarjapur Road, Bangalore, Karnataka',
    board: 'IB',
    distance: 7.8,
    facilities: ['Library', 'Observatory', 'Swimming Pool', 'Sports Complex', 'Theatre'],
    studentCount: 500,
    established: 2009,
    contact: '+91-80-28520000',
    coordinates: { lat: 12.8546, lng: 77.6211 } // Bangalore
  },
  {
    id: '8',
    name: 'St. Joseph's Boys High School',
    address: 'Museum Road, Bangalore, Karnataka',
    board: 'ICSE',
    distance: 8.4,
    facilities: ['Library', 'Computer Lab', 'Auditorium', 'Science Lab', 'Sports Complex'],
    studentCount: 3000,
    established: 1858,
    contact: '+91-80-22867142',
    coordinates: { lat: 12.9698, lng: 77.6006 } // Bangalore
  }
];
