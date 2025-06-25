
import React from 'react';
import { MapPin, GraduationCap, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SearchFiltersProps {
  location: string;
  setLocation: (location: string) => void;
  radius: string;
  setRadius: (radius: string) => void;
  syllabus: string;
  setSyllabus: (syllabus: string) => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  location,
  setLocation,
  radius,
  setRadius,
  syllabus,
  setSyllabus,
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

  return (
    <Card className="w-full shadow-lg border-0 bg-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <Input
              type="text"
              placeholder="Enter city, area, or pincode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
