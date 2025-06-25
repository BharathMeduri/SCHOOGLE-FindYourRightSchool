
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
    contact: '+91-124-4560000'
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
    contact: '+91-11-26890000'
  },
  {
    id: '3',
    name: 'La Martiniere Girls School',
    address: 'Lucknow, Uttar Pradesh',
    board: 'ICSE',
    distance: 3.5,
    facilities: ['Library', 'Science Lab', 'Music Room', 'Sports Complex', 'Playground'],
    studentCount: 1200,
    established: 1869,
    contact: '+91-522-2615000'
  },
  {
    id: '4',
    name: 'The Shri Ram School',
    address: 'Moulsari Avenue, DLF Phase III, Gurgaon',
    board: 'CBSE',
    distance: 4.2,
    facilities: ['Library', 'Computer Lab', 'Theatre', 'Science Lab', 'Transport', 'Cafeteria'],
    studentCount: 2200,
    established: 1988,
    contact: '+91-124-4295000'
  },
  {
    id: '5',
    name: 'Bishop Cotton School',
    address: 'Shimla, Himachal Pradesh',
    board: 'ICSE',
    distance: 5.1,
    facilities: ['Library', 'Sports Complex', 'Chapel', 'Dormitory', 'Playground'],
    studentCount: 800,
    established: 1859,
    contact: '+91-177-2658000'
  },
  {
    id: '6',
    name: 'Kendriya Vidyalaya',
    address: 'Andrews Ganj, New Delhi',
    board: 'CBSE',
    distance: 6.3,
    facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Ground', 'Canteen'],
    studentCount: 1500,
    established: 1965,
    contact: '+91-11-24699000'
  },
  {
    id: '7',
    name: 'The Doon School',
    address: 'Dehradun, Uttarakhand',
    board: 'ICSE',
    distance: 7.8,
    facilities: ['Library', 'Observatory', 'Golf Course', 'Swimming Pool', 'Dormitory', 'Chapel'],
    studentCount: 500,
    established: 1935,
    contact: '+91-135-2526000'
  },
  {
    id: '8',
    name: 'Modern School',
    address: 'Barakhamba Road, New Delhi',
    board: 'CBSE',
    distance: 8.4,
    facilities: ['Library', 'Computer Lab', 'Auditorium', 'Science Lab', 'Sports Complex'],
    studentCount: 3000,
    established: 1920,
    contact: '+91-11-23318000'
  }
];
