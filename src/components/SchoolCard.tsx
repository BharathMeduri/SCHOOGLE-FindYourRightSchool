
import React from 'react';
import { MapPin, GraduationCap, Users, BookOpen, Trophy, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface School {
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

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  const facilityIcons: { [key: string]: React.ReactNode } = {
    'Library': <BookOpen className="w-4 h-4" />,
    'Computer Lab': <Wifi className="w-4 h-4" />,
    'Sports Complex': <Trophy className="w-4 h-4" />,
    'Science Lab': <GraduationCap className="w-4 h-4" />,
    'Playground': <Users className="w-4 h-4" />,
    'Transport': <MapPin className="w-4 h-4" />,
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
            {school.name}
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
            {school.distance}km away
          </Badge>
        </div>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{school.address}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {school.board}
            </Badge>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span>{school.studentCount} students</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 mr-1" />
              <span>Est. {school.established}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Facilities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {school.facilities.map((facility, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 rounded px-2 py-1">
                  {facilityIcons[facility] || <BookOpen className="w-4 h-4" />}
                  <span className="ml-2">{facility}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500">Contact: {school.contact}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
