import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, MapPin, Phone, Mail } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { School } from "@/lib/supabase-queries";

interface SchoolListProps {
  schools: School[];
  onEdit: (school: School) => void;
  onDelete: (schoolId: string) => void;
}

export const SchoolList = ({ schools, onEdit, onDelete }: SchoolListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.board.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (schools.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No schools found. Add your first school to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search schools by name, city, or board..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Board</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchools.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{school.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Est. {school.established}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {school.city}, {school.state}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{school.board}</Badge>
                </TableCell>
                <TableCell>{school.school_level}</TableCell>
                <TableCell>{school.student_count.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {school.contact && (
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {school.contact}
                      </div>
                    )}
                    {school.email && (
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {school.email}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={school.is_active ? "default" : "secondary"}>
                    {school.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(school)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete School</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{school.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(school.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};