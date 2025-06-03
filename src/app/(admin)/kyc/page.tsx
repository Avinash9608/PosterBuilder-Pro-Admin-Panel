// "use client";

// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, XCircle, Eye, MoreVertical } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";

// type KycStatus = "Pending" | "Approved" | "Rejected";

// interface KycSubmission {
//   id: string;
//   userName: string;
//   userId: string;
//   submissionDate: string;
//   status: KycStatus;
//   documentUrl?: string;
// }

// const mockKycSubmissions: KycSubmission[] = [
//   {
//     id: "kyc001",
//     userName: "Alice Wonderland",
//     userId: "user001",
//     submissionDate: "2024-07-15",
//     status: "Pending",
//     documentUrl: "https://placehold.co/600x400.png",
//   },
//   {
//     id: "kyc002",
//     userName: "Bob The Builder",
//     userId: "user002",
//     submissionDate: "2024-07-14",
//     status: "Approved",
//     documentUrl: "https://placehold.co/600x400.png",
//   },
//   {
//     id: "kyc003",
//     userName: "Charlie Chaplin",
//     userId: "user003",
//     submissionDate: "2024-07-13",
//     status: "Rejected",
//     documentUrl: "https://placehold.co/600x400.png",
//   },
//   {
//     id: "kyc004",
//     userName: "Diana Prince",
//     userId: "user004",
//     submissionDate: "2024-07-12",
//     status: "Pending",
//     documentUrl: "https://placehold.co/600x400.png",
//   },
//   {
//     id: "kyc005",
//     userName: "Edward Elric",
//     userId: "user005",
//     submissionDate: "2024-07-11",
//     status: "Approved",
//     documentUrl: "https://placehold.co/600x400.png",
//   },
// ];

// export default function KycManagementPage() {
//   const [submissions, setSubmissions] =
//     useState<KycSubmission[]>(mockKycSubmissions);
//   const [selectedSubmission, setSelectedSubmission] =
//     useState<KycSubmission | null>(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const { toast } = useToast();

//   const handleStatusChange = (id: string, newStatus: KycStatus) => {
//     setSubmissions((prev) =>
//       prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
//     );
//     toast({
//       title: `KYC ${newStatus}`,
//       description: `Submission ${id} has been ${newStatus.toLowerCase()}.`,
//     });
//   };

//   const openViewModal = (submission: KycSubmission) => {
//     setSelectedSubmission(submission);
//     setIsViewModalOpen(true);
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold font-headline">KYC Submissions</h2>
//       <div className="rounded-lg border shadow-sm bg-card">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>User Name</TableHead>
//               <TableHead>User ID</TableHead>
//               <TableHead>Submission Date</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {submissions.map((submission) => (
//               <TableRow key={submission.id}>
//                 <TableCell className="font-medium">
//                   {submission.userName}
//                 </TableCell>
//                 <TableCell>{submission.userId}</TableCell>
//                 <TableCell>{submission.submissionDate}</TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={
//                       submission.status === "Approved"
//                         ? "default"
//                         : submission.status === "Rejected"
//                         ? "destructive"
//                         : "secondary"
//                     }
//                     className={
//                       submission.status === "Approved"
//                         ? "bg-green-500 hover:bg-green-600 text-white"
//                         : ""
//                     }
//                   >
//                     {submission.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem
//                         onClick={() => openViewModal(submission)}
//                       >
//                         <Eye className="mr-2 h-4 w-4" /> View Details
//                       </DropdownMenuItem>
//                       {submission.status === "Pending" && (
//                         <>
//                           <AlertDialogTrigger asChild>
//                             <DropdownMenuItem
//                               onSelect={(e) => e.preventDefault()}
//                             >
//                               <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
//                               Approve
//                             </DropdownMenuItem>
//                           </AlertDialogTrigger>
//                           <AlertDialogTrigger asChild>
//                             <DropdownMenuItem
//                               onSelect={(e) => e.preventDefault()}
//                             >
//                               <XCircle className="mr-2 h-4 w-4 text-red-500" />{" "}
//                               Reject
//                             </DropdownMenuItem>
//                           </AlertDialogTrigger>
//                         </>
//                       )}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                   {/* Separate AlertDialogs for Approve/Reject to pass submission id correctly */}
//                   <AlertDialog>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>
//                           Approve KYC Submission?
//                         </AlertDialogTitle>
//                         <AlertDialogDescription>
//                           Are you sure you want to approve the KYC for{" "}
//                           {submission.userName}? This action cannot be undone.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction
//                           onClick={() =>
//                             handleStatusChange(submission.id, "Approved")
//                           }
//                           className="bg-green-500 hover:bg-green-600"
//                         >
//                           Approve
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                   <AlertDialog>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>
//                           Reject KYC Submission?
//                         </AlertDialogTitle>
//                         <AlertDialogDescription>
//                           Are you sure you want to reject the KYC for{" "}
//                           {submission.userName}? This action cannot be undone.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction
//                           onClick={() =>
//                             handleStatusChange(submission.id, "Rejected")
//                           }
//                           className="bg-red-500 hover:bg-red-600"
//                         >
//                           Reject
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {selectedSubmission && (
//         <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//           <AlertDialogContent className="sm:max-w-lg">
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 KYC Details: {selectedSubmission.userName}
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 User ID: {selectedSubmission.userId} <br />
//                 Submission Date: {selectedSubmission.submissionDate} <br />
//                 Status: {selectedSubmission.status}
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             {selectedSubmission.documentUrl && (
//               <div className="my-4">
//                 <p className="font-medium mb-2">Submitted Document:</p>
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={selectedSubmission.documentUrl}
//                   alt="KYC Document"
//                   className="rounded-md border max-h-80 w-auto"
//                   data-ai-hint="document identity"
//                 />
//               </div>
//             )}
//             <AlertDialogFooter>
//               <AlertDialogCancel onClick={() => setIsViewModalOpen(false)}>
//                 Close
//               </AlertDialogCancel>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       )}
//     </div>
//   );
// }
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

  // Update KYC status
  // const updateKycStatus = async (userId: string, status: KycStatus) => {
  //   try {
  //     setIsLoading(true);
  //     const userToUpdate = users.find((user) => user._id === userId);
  //     const res = await fetch(
  //       `http://localhost:5000/api/admin/users/${userId}/kyc`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           status,
  //           mobileNumber: userToUpdate?.mobileNumber,
  //         }),
  //       }
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message || "Failed to update status");
  //     }

  //     // Update local state
  //     setUsers((prev) =>
  //       prev.map((user) =>
  //         user._id === userId ? { ...user, kycStatus: status } : user
  //       )
  //     );

  //     toast({
  //       title: "Success",
  //       description: `KYC status updated to ${status}`,
  //     });
  //   } catch (err) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description:
  //         err instanceof Error ? err.message : "Failed to update status",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
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
