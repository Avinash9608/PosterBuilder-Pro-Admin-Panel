"use client";

import React, { useEffect, useState } from "react";
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
import { CheckCircle, XCircle, Eye, MoreVertical } from "lucide-react";
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

type KycStatus = "pending" | "approved" | "rejected" | "not_submitted";

interface User {
  _id: string;
  username: string;
  email: string;
  mobileNumber?: string;
  kycStatus: KycStatus;
  kycDocs: string[];
  createdAt: string;
}

export default function KycManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch users with KYC data
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://publicityposterbackend.onrender.com/api/admin/users"
      );
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to fetch users",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 
  // Update the updateKycStatus function to ensure mobileNumber is included
  const updateKycStatus = async (userId: string, status: KycStatus) => {
    try {
      setIsLoading(true);
      const userToUpdate = users.find((user) => user._id === userId);

      const res = await fetch(
        `https://publicityposterbackend.onrender.com/api/admin/users/${userId}/kyc`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            mobileNumber: userToUpdate?.mobileNumber,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, kycStatus: status } : user
        )
      );

      toast({
        title: "Success",
        description: `KYC status updated to ${status}`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to update status",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const openViewModal = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const getStatusBadge = (status: KycStatus) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Not Submitted</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">KYC Management</h2>
        <Button onClick={fetchUsers} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Registered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.kycStatus)}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openViewModal(user)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        {user.kycStatus === "pending" && (
                          <>
                            <DropdownMenuItem
                              onSelect={() =>
                                updateKycStatus(user._id, "approved")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() =>
                                updateKycStatus(user._id, "rejected")
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4 text-red-500" />{" "}
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <AlertDialogContent className="sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>
                KYC Details: {selectedUser.username}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-2">
                  <p>Email: {selectedUser.email}</p>
                  <p>Status: {selectedUser.kycStatus}</p>
                  <p>
                    Registered:{" "}
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            {selectedUser.kycDocs && selectedUser.kycDocs.length > 0 && (
              <div className="my-4">
                <p className="font-medium mb-2">Submitted Documents:</p>
                <div className="grid grid-cols-1 gap-4">
                  {selectedUser.kycDocs.map((doc, index) => (
                    <div key={index} className="border rounded-md p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={doc}
                        alt={`KYC Document ${index + 1}`}
                        className="rounded-md max-h-80 w-auto mx-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsViewModalOpen(false)}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
