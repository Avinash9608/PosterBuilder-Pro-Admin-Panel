"use client";

import React, { useEffect, useState } from "react";
const API_BASE_URL = "https://publicityposterbackend.onrender.com";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import Image from "next/image";

interface Poster {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  template: {
    _id: string;
    title: string;
  };
  businessName: string;
  phoneNumber: string;
  logoUrl?: string;
  finalPosterUrl: string;
  createdAt: string;
}

export default function PostersManagementPage() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    businessName: "",
    phoneNumber: "",
  });
  const { toast } = useToast();

  const fetchPosters = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/posters/my-posters`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        const postersWithFullPaths = data.map((poster: Poster) => ({
          ...poster,
          logoUrl: poster.logoUrl
            ? `${API_BASE_URL}${poster.logoUrl}`
            : undefined,
          finalPosterUrl: `${API_BASE_URL}${poster.finalPosterUrl}`,
        }));
        setPosters(postersWithFullPaths);
      } else {
        throw new Error(data.message || "Failed to fetch posters");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to fetch posters",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  // Open edit modal and set form data
  const openEditModal = (poster: Poster) => {
    setSelectedPoster(poster);
    setEditForm({
      businessName: poster.businessName,
      phoneNumber: poster.phoneNumber,
    });
    setIsEditModalOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async () => {
    if (!selectedPoster) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/api/posters/${selectedPoster._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update poster");
      }

      // Update local state
      setPosters((prev) =>
        prev.map((poster) =>
          poster._id === selectedPoster._id
            ? { ...poster, ...editForm }
            : poster
        )
      );

      toast({
        title: "Success",
        description: "Poster updated successfully",
      });
      setIsEditModalOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to update poster",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle poster deletion
  const handleDeletePoster = async () => {
    if (!selectedPoster) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/api/posters/${selectedPoster._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete poster");
      }

      // Update local state
      setPosters((prev) =>
        prev.filter((poster) => poster._id !== selectedPoster._id)
      );

      toast({
        title: "Success",
        description: "Poster deleted successfully",
      });
      setIsDeleteModalOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to delete poster",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openViewModal = (poster: Poster) => {
    setSelectedPoster(poster);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Posters</h2>
        <Button onClick={fetchPosters} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posters.length > 0 ? (
                posters.map((poster) => (
                  <TableRow key={poster._id}>
                    <TableCell className="font-medium">
                      {poster.businessName}
                    </TableCell>
                    <TableCell>{poster.template.title}</TableCell>
                    <TableCell>{poster.phoneNumber}</TableCell>
                    <TableCell>
                      {format(new Date(poster.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openViewModal(poster)}
                          >
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openEditModal(poster)}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              setSelectedPoster(poster);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {isLoading ? "Loading posters..." : "No posters found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Poster Dialog */}
      {selectedPoster && (
        <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <AlertDialogContent className="sm:max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Poster: {selectedPoster.businessName}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Template:</span>{" "}
                      {selectedPoster.template.title}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedPoster.phoneNumber}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {format(
                        new Date(selectedPoster.createdAt),
                        "MMM dd, yyyy"
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {selectedPoster.logoUrl && (
                      <p>
                        <span className="font-medium">Logo:</span>{" "}
                        <Image
                          src={selectedPoster.logoUrl}
                          alt="Business Logo"
                          width={50}
                          height={50}
                          className="inline-block"
                        />
                      </p>
                    )}
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Final Poster Section */}
            <div className="my-6">
              <h3 className="font-medium mb-4">Final Poster:</h3>
              <div className="border rounded-md p-2">
                <img
                  src={selectedPoster.finalPosterUrl}
                  alt="Final Poster"
                  className="rounded-md max-h-96 w-auto mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://placehold.co/600x400?text=Poster+Not+Found";
                    target.onerror = null;
                  }}
                />
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsViewModalOpen(false)}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Edit Poster Dialog */}
      {selectedPoster && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Poster</DialogTitle>
              <DialogDescription>
                Update the poster details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="businessName" className="text-right">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={editForm.businessName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, businessName: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  value={editForm.phoneNumber}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phoneNumber: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEditSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              poster and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePoster}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
