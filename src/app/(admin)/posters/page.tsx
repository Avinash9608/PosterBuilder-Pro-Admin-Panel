"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

const API_BASE_URL = "https://publicityposterbackend.onrender.com";

interface Poster {
  _id: string;
  businessName: string;
  template: {
    title: string;
  };
  phoneNumber: string;
  logoUrl?: string;
  finalPosterUrl: string;
  createdAt: string;
}

export default function PostersManagementPage() {
  const router = useRouter();
  const [posters, setPosters] = useState<Poster[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch All Posters
  const fetchPosters = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/posters`);

      if (!res.ok) {
        throw new Error("Failed to fetch posters");
      }

      const data = await res.json();
      setPosters(data);
    } catch (err) {
      console.error("Failed to fetch posters", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Poster
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this poster?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/posters/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setPosters((prev) => prev.filter((poster) => poster._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // View Poster Details
  const openViewModal = (poster: Poster) => {
    setSelectedPoster(poster);
    setIsViewModalOpen(true);
  };

  // Edit Poster (Redirect to edit form)
  const handleEdit = (id: string) => {
    router.push(`/posters/edit/${id}`);
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Posters</h2>
        <Button onClick={fetchPosters} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0 overflow-x-auto">
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading posters...
                  </TableCell>
                </TableRow>
              ) : posters.length > 0 ? (
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
                            onClick={() => handleEdit(poster._id)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(poster._id)}
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
                    No posters found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Poster Modal */}
      {selectedPoster && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
            isViewModalOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">
                {selectedPoster.businessName}
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Template:</h4>
                  <p>{selectedPoster.template.title}</p>
                </div>
                <div>
                  <h4 className="font-medium">Phone Number:</h4>
                  <p>{selectedPoster.phoneNumber}</p>
                </div>
                <div>
                  <h4 className="font-medium">Created At:</h4>
                  <p>{format(new Date(selectedPoster.createdAt), "PPP")}</p>
                </div>
                {selectedPoster.logoUrl && (
                  <div>
                    <h4 className="font-medium">Logo:</h4>
                    <Image
                      src={selectedPoster.logoUrl}
                      alt="Business Logo"
                      width={150}
                      height={150}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Final Poster:</h4>
                <div className="border rounded-md p-2">
                  <img
                    src={selectedPoster.finalPosterUrl}
                    alt="Final Poster"
                    className="rounded-md w-full h-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://placehold.co/600x400?text=Poster+Not+Found";
                      target.onerror = null;
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
