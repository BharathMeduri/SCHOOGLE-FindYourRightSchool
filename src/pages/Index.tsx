
import React, { useState, useMemo } from 'react';
import { School } from 'lucide-react';
import SearchFilters from '@/components/SearchFilters';
import SchoolCard from '@/components/SchoolCard';
import { mockSchools } from '@/data/mockSchools';
import { useToast } from '@/hooks/use-toast';
import { getCityCoordinates, calculateDistance } from '@/utils/locationUtils';

const Index = () => {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('5');
  const [syllabus, setSyllabus] = useState('all');
  const [isSearched, setIsSearched] = useState(false);
  const { toast } = useToast();

  const filteredSchools = useMemo(() => {
    if (!isSearched || !location.trim()) return [];
    
    const userCoordinates = getCityCoordinates(location);
    if (!userCoordinates) {
      console.log('Location not found:', location);
      return [];
    }

    console.log('User coordinates:', userCoordinates);
    console.log('Radius:', radius);
    
    const schoolsWithDistance = mockSchools.map(school => {
      const distance = calculateDistance(
        userCoordinates.lat,
        userCoordinates.lng,
        school.coordinates.lat,
        school.coordinates.lng
      );
      
      console.log(`Distance to ${school.name}:`, distance, 'km');
      
      return {
        ...school,
        distance: distance
      };
    });
    
    return schoolsWithDistance
      .filter(school => {
        // Filter by distance
        const withinRadius = school.distance <= parseFloat(radius);
        
        // Filter by syllabus
        const matchesSyllabus = syllabus === 'all' || 
          school.board.toLowerCase().includes(syllabus.toLowerCase()) ||
          (syllabus === 'state' && school.board.includes('State'));
        
        console.log(`${school.name}: distance=${school.distance}, withinRadius=${withinRadius}, matchesSyllabus=${matchesSyllabus}`);
        
        return withinRadius && matchesSyllabus;
      })
      .sort((a, b) => a.distance - b.distance); // Sort by distance (nearest first)
  }, [location, radius, syllabus, isSearched]);

  const handleSearch = () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search for schools.",
        variant: "destructive",
      });
      return;
    }

    const userCoordinates = getCityCoordinates(location);
    if (!userCoordinates) {
      toast({
        title: "Location Not Found",
        description: "Please enter a valid city name or pincode (e.g., Bangalore, 560001).",
        variant: "destructive",
      });
      return;
    }

    setIsSearched(true);
    
    // Calculate results for toast message
    const schoolsInRadius = mockSchools.filter(school => {
      const distance = calculateDistance(
        userCoordinates.lat,
        userCoordinates.lng,
        school.coordinates.lat,
        school.coordinates.lng
      );
      return distance <= parseFloat(radius);
    });

    toast({
      title: "Search Complete",
      description: `Found ${schoolsInRadius.length} schools within ${radius}km of ${location}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <School className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">SCHOOGLE</h1>
                <p className="text-sm text-gray-600 font-medium">Google Your Right School</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Find the Perfect School for Your Child
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover quality schools in your area with comprehensive information about facilities, 
              curriculum, and more. Filter by distance and educational board to find the best match.
            </p>
          </div>
          
          <SearchFilters
            location={location}
            setLocation={setLocation}
            radius={radius}
            setRadius={setRadius}
            syllabus={syllabus}
            setSyllabus={setSyllabus}
            onSearch={handleSearch}
          />
        </div>

        {/* Results Section */}
        {isSearched && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Search Results
              </h3>
              <p className="text-gray-600">
                {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found
                {location && ` near ${location}`}
              </p>
            </div>

            {filteredSchools.length > 0 ? (
              <div className="grid gap-6">
                {filteredSchools.map((school) => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <School className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Schools Found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search criteria - increase the distance radius or select a different syllabus option.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Welcome Message for New Users */}
        {!isSearched && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">
              <School className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to SCHOOGLE
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your comprehensive school finder for India. Search for schools by location and 
                educational board, get detailed information about facilities, and make informed 
                decisions about your child's education.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Location-Based Search</h4>
                  <p className="text-blue-600">Find schools within your preferred distance range</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Curriculum Options</h4>
                  <p className="text-green-600">Filter by CBSE, ICSE, State Boards, and more</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Detailed Information</h4>
                  <p className="text-purple-600">Complete facility details and contact information</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
