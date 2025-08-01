import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Users, MapPin, Award } from "lucide-react";
import type { School as SchoolType, Facility } from "@/lib/supabase-queries";

interface AdminStatsProps {
  schools: SchoolType[];
  facilities: Facility[];
}

export const AdminStats = ({ schools, facilities }: AdminStatsProps) => {
  const totalStudents = schools.reduce((sum, school) => sum + school.student_count, 0);
  const activeSchools = schools.filter(school => school.is_active).length;
  const boardCounts = schools.reduce((acc, school) => {
    acc[school.board] = (acc[school.board] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cityCounts = schools.reduce((acc, school) => {
    acc[school.city] = (acc[school.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCities = Object.entries(cityCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schools.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeSchools} active schools
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all schools
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(cityCounts).length}</div>
            <p className="text-xs text-muted-foreground">
              Different cities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facilities</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facilities.length}</div>
            <p className="text-xs text-muted-foreground">
              Available facilities
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schools by Board</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(boardCounts).map(([board, count]) => (
                <div key={board} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{board}</span>
                  <span className="text-sm text-muted-foreground">{count} schools</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Cities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topCities.map(([city, count]) => (
                <div key={city} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{city}</span>
                  <span className="text-sm text-muted-foreground">{count} schools</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};