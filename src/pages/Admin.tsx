import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, GraduationCap, Users, Settings } from "lucide-react";
import { SchoolForm } from "@/components/admin/SchoolForm";
import { SchoolList } from "@/components/admin/SchoolList";
import { AdminStats } from "@/components/admin/AdminStats";
import { useToast } from "@/hooks/use-toast";
import { getSchools, getFacilities, getBoards, getSchoolLevels } from "@/lib/supabase-queries";
import type { School, Facility, Board, SchoolLevel } from "@/lib/supabase-queries";

const Admin = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [schoolLevels, setSchoolLevels] = useState<SchoolLevel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [schoolsData, facilitiesData, boardsData, schoolLevelsData] = await Promise.all([
        getSchools(),
        getFacilities(),
        getBoards(),
        getSchoolLevels()
      ]);
      
      setSchools(schoolsData);
      setFacilities(facilitiesData);
      setBoards(boardsData);
      setSchoolLevels(schoolLevelsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolSaved = (school: School) => {
    if (editingSchool) {
      setSchools(schools.map(s => s.id === school.id ? school : s));
      toast({
        title: "Success",
        description: "School updated successfully"
      });
    } else {
      setSchools([...schools, school]);
      toast({
        title: "Success",
        description: "School created successfully"
      });
    }
    setShowForm(false);
    setEditingSchool(null);
  };

  const handleEditSchool = (school: School) => {
    setEditingSchool(school);
    setShowForm(true);
  };

  const handleDeleteSchool = async (schoolId: string) => {
    try {
      setSchools(schools.filter(s => s.id !== schoolId));
      toast({
        title: "Success",
        description: "School deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting school:', error);
      toast({
        title: "Error",
        description: "Failed to delete school",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">School Administration</h1>
          <p className="text-muted-foreground">Manage schools, facilities, and system settings</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add School
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="gap-2">
            <Settings className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="schools" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Schools
          </TabsTrigger>
          <TabsTrigger value="facilities" className="gap-2">
            <Users className="h-4 w-4" />
            Facilities
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AdminStats schools={schools} facilities={facilities} />
        </TabsContent>

        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle>School Management</CardTitle>
              <CardDescription>
                Add, edit, and manage school information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SchoolList
                schools={schools}
                onEdit={handleEditSchool}
                onDelete={handleDeleteSchool}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <Card>
            <CardHeader>
              <CardTitle>Facility Management</CardTitle>
              <CardDescription>
                Manage available school facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facilities.map(facility => (
                  <Card key={facility.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{facility.name}</CardTitle>
                      {facility.description && (
                        <CardDescription className="text-xs">
                          {facility.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Education Boards</CardTitle>
                <CardDescription>
                  Supported education boards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {boards.map(board => (
                    <div key={board.id} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <p className="font-medium">{board.name}</p>
                        <p className="text-sm text-muted-foreground">{board.full_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>School Levels</CardTitle>
                <CardDescription>
                  Supported school level configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {schoolLevels.map(level => (
                    <div key={level.id} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <p className="font-medium">{level.name}</p>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showForm && (
        <SchoolForm
          school={editingSchool}
          facilities={facilities}
          boards={boards}
          schoolLevels={schoolLevels}
          onSave={handleSchoolSaved}
          onCancel={() => {
            setShowForm(false);
            setEditingSchool(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;