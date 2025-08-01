import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createSchool, updateSchool } from "@/lib/supabase-queries";
import type { School, Facility, Board, SchoolLevel } from "@/lib/supabase-queries";

interface SchoolFormProps {
  school?: School | null;
  facilities: Facility[];
  boards: Board[];
  schoolLevels: SchoolLevel[];
  onSave: (school: School) => void;
  onCancel: () => void;
}

export const SchoolForm = ({ school, facilities, boards, schoolLevels, onSave, onCancel }: SchoolFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    board: "",
    school_level: "",
    student_count: 0,
    established: new Date().getFullYear(),
    contact: "",
    email: "",
    website: "",
    latitude: 0,
    longitude: 0,
    is_active: true
  });
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name,
        address: school.address,
        city: school.city,
        state: school.state,
        pincode: school.pincode || "",
        board: school.board,
        school_level: school.school_level,
        student_count: school.student_count,
        established: school.established || new Date().getFullYear(),
        contact: school.contact || "",
        email: school.email || "",
        website: school.website || "",
        latitude: school.latitude,
        longitude: school.longitude,
        is_active: school.is_active
      });
      setSelectedFacilities(school.facilities.map(f => f.id));
    }
  }, [school]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const schoolData = {
        ...formData,
        facility_ids: selectedFacilities
      };

      let result;
      if (school) {
        result = await updateSchool(school.id, schoolData);
      } else {
        result = await createSchool(schoolData);
      }

      // Transform result to match School interface
      const savedSchool: School = {
        ...result,
        facilities: facilities.filter(f => selectedFacilities.includes(f.id))
      };

      onSave(savedSchool);
    } catch (error) {
      console.error('Error saving school:', error);
      toast({
        title: "Error",
        description: "Failed to save school",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFacilityToggle = (facilityId: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facilityId)
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    );
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {school ? "Edit School" : "Add New School"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">School Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="board">Board *</Label>
              <Select
                value={formData.board}
                onValueChange={(value) => setFormData({ ...formData, board: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map(board => (
                    <SelectItem key={board.id} value={board.name}>
                      {board.name} - {board.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school_level">School Level *</Label>
              <Select
                value={formData.school_level}
                onValueChange={(value) => setFormData({ ...formData, school_level: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select school level" />
                </SelectTrigger>
                <SelectContent>
                  {schoolLevels.map(level => (
                    <SelectItem key={level.id} value={level.name}>
                      {level.name} - {level.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="student_count">Student Count</Label>
              <Input
                id="student_count"
                type="number"
                value={formData.student_count}
                onChange={(e) => setFormData({ ...formData, student_count: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="established">Established Year</Label>
              <Input
                id="established"
                type="number"
                value={formData.established}
                onChange={(e) => setFormData({ ...formData, established: parseInt(e.target.value) || new Date().getFullYear() })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude *</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude *</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {facilities.map(facility => (
                  <div key={facility.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={facility.id}
                      checked={selectedFacilities.includes(facility.id)}
                      onCheckedChange={() => handleFacilityToggle(facility.id)}
                    />
                    <Label htmlFor={facility.id} className="text-sm">
                      {facility.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
            />
            <Label htmlFor="is_active">Active School</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : school ? "Update School" : "Create School"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};