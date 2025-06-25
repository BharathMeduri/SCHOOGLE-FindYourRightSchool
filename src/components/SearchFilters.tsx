
import React from 'react';
import { MapPin, GraduationCap, Search, School } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SearchFiltersProps {
  location: string;
  setLocation: (location: string) => void;
  cityTown: string;
  setCityTown: (cityTown: string) => void;
  radius: string;
  setRadius: (radius: string) => void;
  syllabus: string;
  setSyllabus: (syllabus: string) => void;
  schoolLevel: string;
  setSchoolLevel: (schoolLevel: string) => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  location,
  setLocation,
  cityTown,
  setCityTown,
  radius,
  setRadius,
  syllabus,
  setSyllabus,
  schoolLevel,
  setSchoolLevel,
  onSearch,
}) => {
  const radiusOptions = [
    { value: '2', label: 'Within 2 km' },
    { value: '5', label: 'Within 5 km' },
    { value: '7', label: 'Within 7 km' },
    { value: '10', label: 'Within 10 km' },
    { value: '15', label: 'Within 15 km' },
    { value: '20', label: 'Within 20 km' },
  ];

  const syllabusOptions = [
    { value: 'all', label: 'All Syllabus' },
    { value: 'cbse', label: 'CBSE' },
    { value: 'icse', label: 'ICSE' },
    { value: 'state', label: 'State Board' },
    { value: 'ib', label: 'International Baccalaureate (IB)' },
    { value: 'igcse', label: 'IGCSE' },
    { value: 'nios', label: 'NIOS' },
    { value: 'cambridge', label: 'Cambridge' },
    { value: 'montessori', label: 'Montessori' },
  ];

  const schoolLevelOptions = [
    { value: 'all', label: 'All School Levels' },
    { value: 'playschool', label: 'Playschool Only' },
    { value: 'primary', label: 'Primary School' },
    { value: 'high', label: 'High School' },
    { value: 'playgroup-5', label: 'Playgroup to Class 5' },
    { value: 'playgroup-8', label: 'Playgroup to Class 8' },
    { value: 'playgroup-10', label: 'Playgroup to Class 10' },
    { value: 'playgroup-12', label: 'Playgroup to Class 12' },
    { value: '1-10', label: 'Class 1 to 10' },
    { value: '1-12', label: 'Class 1 to 12' },
    { value: '6-12', label: 'Class 6 to 12' },
  ];

  return (
    <Card className="w-full shadow-lg border-0 bg-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Location/Pincode
            </label>
            <Input
              type="text"
              placeholder="Enter area or pincode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              City/Town
            </label>
            <Input
              type="text"
              placeholder="Enter city or town"
              value={cityTown}
              onChange={(e) => setCityTown(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Distance</label>
            <Select value={radius} onValueChange={setRadius}>
              <SelectTrigger>
                <SelectValue placeholder="Select radius" />
              </SelectTrigger>
              <SelectContent>
                {radiusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              Syllabus/Board
            </label>
            <Select value={syllabus} onValueChange={setSyllabus}>
              <SelectTrigger>
                <SelectValue placeholder="Select syllabus" />
              </SelectTrigger>
              <SelectContent>
                {syllabusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <School className="w-4 h-4 mr-2" />
              School Level
            </label>
            <Select value={schoolLevel} onValueChange={setSchoolLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {schoolLevelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-10"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Schools
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
