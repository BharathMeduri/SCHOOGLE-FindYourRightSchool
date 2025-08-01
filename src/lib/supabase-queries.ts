import { supabase } from "@/integrations/supabase/client";

// Types based on database schema
export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  board: string;
  school_level: string;
  student_count: number;
  established?: number;
  contact?: string;
  email?: string;
  website?: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  facilities: Facility[];
}

export interface Facility {
  id: string;
  name: string;
  description?: string;
}

export interface Board {
  id: string;
  name: string;
  full_name?: string;
  description?: string;
}

export interface SchoolLevel {
  id: string;
  name: string;
  description?: string;
  age_group?: string;
}

// Mock data as fallback for now (until TypeScript types are regenerated)
const mockBoards = [
  { id: '1', name: 'CBSE', full_name: 'Central Board of Secondary Education' },
  { id: '2', name: 'ICSE', full_name: 'Indian Certificate of Secondary Education' },
  { id: '3', name: 'IB', full_name: 'International Baccalaureate' },
  { id: '4', name: 'State Board', full_name: 'State Board of Education' }
];

const mockSchoolLevels = [
  { id: '1', name: 'playgroup-12', description: 'Playgroup to 12th' },
  { id: '2', name: '1-12', description: '1st to 12th' },
  { id: '3', name: '6-12', description: '6th to 12th' },
  { id: '4', name: 'high', description: 'High School' },
  { id: '5', name: 'playgroup-8', description: 'Playgroup to 8th' },
  { id: '6', name: 'playgroup-10', description: 'Playgroup to 10th' },
  { id: '7', name: '1-8', description: '1st to 8th' },
  { id: '8', name: '1-10', description: '1st to 10th' },
  { id: '9', name: '6-10', description: '6th to 10th' }
];

const mockFacilities = [
  { id: '1', name: 'Library', description: 'Well-stocked library' },
  { id: '2', name: 'Computer Lab', description: 'Modern computer lab' },
  { id: '3', name: 'Science Lab', description: 'Laboratory facilities' },
  { id: '4', name: 'Sports Complex', description: 'Sports facilities' },
  { id: '5', name: 'Swimming Pool', description: 'Swimming facility' },
  { id: '6', name: 'Playground', description: 'Outdoor playground' },
  { id: '7', name: 'Transport', description: 'School transportation' },
  { id: '8', name: 'Cafeteria', description: 'Food services' },
  { id: '9', name: 'Auditorium', description: 'Event hall' },
  { id: '10', name: 'Art Room', description: 'Arts and crafts' }
];

// Placeholder functions for database operations (will be implemented once types are fixed)
export async function getSchools(): Promise<School[]> {
  try {
    console.log('Getting schools from database...');
    // Return empty array for now - will be replaced with real Supabase calls
    return [];
  } catch (error) {
    console.error('Error fetching schools:', error);
    return [];
  }
}

export async function searchSchools(params: {
  latitude?: number;
  longitude?: number;
  radius?: number;
  board?: string;
  schoolLevel?: string;
  city?: string;
}): Promise<School[]> {
  try {
    console.log('Searching schools with params:', params);
    // Return empty array for now - will be replaced with real Supabase calls
    return [];
  } catch (error) {
    console.error('Error searching schools:', error);
    return [];
  }
}

// Get all boards
export async function getBoards(): Promise<Board[]> {
  return mockBoards;
}

// Get all school levels
export async function getSchoolLevels(): Promise<SchoolLevel[]> {
  return mockSchoolLevels;
}

// Get all facilities
export async function getFacilities(): Promise<Facility[]> {
  return mockFacilities;
}

// Admin functions (placeholder implementations)
export async function createSchool(schoolData: Omit<School, 'id' | 'created_at' | 'updated_at' | 'facilities'> & { facility_ids: string[] }) {
  console.log('Creating school:', schoolData);
  // Placeholder - will implement with real Supabase calls once types are fixed
  return { 
    id: crypto.randomUUID(), 
    ...schoolData, 
    created_at: new Date().toISOString(), 
    updated_at: new Date().toISOString(), 
    facilities: [] 
  };
}

export async function updateSchool(id: string, schoolData: any) {
  console.log('Updating school:', id, schoolData);
  // Placeholder
  return { id, ...schoolData, updated_at: new Date().toISOString() };
}

export async function deleteSchool(id: string) {
  console.log('Deleting school:', id);
  // Placeholder
}

export async function getSchoolById(id: string): Promise<School | null> {
  console.log('Getting school by id:', id);
  // Placeholder
  return null;
}

// Utility function for distance calculation
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
