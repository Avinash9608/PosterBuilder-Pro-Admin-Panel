// "use client";

// import React, { useEffect, useState } from "react";
// const API_BASE_URL = "https://publicityposterbackend.onrender.com";
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
// import {
//   CheckCircle,
//   XCircle,
//   Eye,
//   MoreVertical,
//   Pencil,
//   Trash2,
// } from "lucide-react";
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
// } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { format } from "date-fns";

// type KycStatus = "approved" | "pending" | "rejected" | "not_submitted";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   role: string;
//   kycStatus: KycStatus;
//   aadhaarNumber?: string;
//   dateOfBirth?: Date | string;
//   gender?: string;
//   mobileNumber?: string;
//   documentType?: string;
//   documentFront?: string;
//   documentBack?: string;
//   selfie?: string;
//   createdAt: string;
//   updatedAt?: string;
// }

// export default function KycManagementPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editForm, setEditForm] = useState({
//     username: "",
//     email: "",
//     mobileNumber: "",
//     aadhaarNumber: "",
//     dateOfBirth: "",
//     gender: "",
//     documentType: "",
//   });
//   const { toast } = useToast();

//   // Fetch users with KYC data

//   const fetchUsers = async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${API_BASE_URL}/api/admin/users`);
//       const data = await res.json();
//       if (res.ok) {
//         const usersWithFullPaths = data.map((user: User) => ({
//           ...user,
//           documentFront: user.documentFront
//             ? `${API_BASE_URL}${user.documentFront}`
//             : undefined,
//           documentBack: user.documentBack
//             ? `${API_BASE_URL}${user.documentBack}`
//             : undefined,
//           selfie: user.selfie ? `${API_BASE_URL}${user.selfie}` : undefined,
//         }));
//         setUsers(usersWithFullPaths);
//       } else {
//         throw new Error(data.message || "Failed to fetch users");
//       }
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           err instanceof Error ? err.message : "Failed to fetch users",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Update KYC status
//   const updateKycStatus = async (userId: string, status: KycStatus) => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/kyc`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to update status");
//       }

//       // Update local state
//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === userId ? { ...user, kycStatus: status } : user
//         )
//       );

//       toast({
//         title: "Success",
//         description: `KYC status updated to ${status}`,
//       });
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           err instanceof Error ? err.message : "Failed to update status",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Open edit modal and set form data
//   const openEditModal = (user: User) => {
//     setSelectedUser(user);
//     setEditForm({
//       username: user.username,
//       email: user.email,
//       mobileNumber: user.mobileNumber || "",
//       aadhaarNumber: user.aadhaarNumber || "",
//       dateOfBirth: user.dateOfBirth
//         ? format(new Date(user.dateOfBirth), "yyyy-MM-dd")
//         : "",
//       gender: user.gender || "",
//       documentType: user.documentType || "",
//     });
//     setIsEditModalOpen(true);
//   };

//   // Handle edit form submission
//   const handleEditSubmit = async () => {
//     if (!selectedUser) return;

//     try {
//       setIsLoading(true);
//       const res = await fetch(
//         `${API_BASE_URL}/api/admin/users/${selectedUser._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(editForm),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to update user");
//       }

//       // Update local state
//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === selectedUser._id ? { ...user, ...editForm } : user
//         )
//       );

//       toast({
//         title: "Success",
//         description: "User updated successfully",
//       });
//       setIsEditModalOpen(false);
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           err instanceof Error ? err.message : "Failed to update user",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle user deletion
//   const handleDeleteUser = async () => {
//     if (!selectedUser) return;

//     try {
//       setIsLoading(true);
//       const res = await fetch(
//         `${API_BASE_URL}/api/admin/users/${selectedUser._id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to delete user");
//       }

//       // Update local state
//       setUsers((prev) => prev.filter((user) => user._id !== selectedUser._id));

//       toast({
//         title: "Success",
//         description: "User deleted successfully",
//       });
//       setIsDeleteModalOpen(false);
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           err instanceof Error ? err.message : "Failed to delete user",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const openViewModal = (user: User) => {
//     setSelectedUser(user);
//     setIsViewModalOpen(true);
//   };

//   const getStatusBadge = (status: KycStatus) => {
//     switch (status) {
//       case "approved":
//         return (
//           <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
//             Approved
//           </Badge>
//         );
//       case "pending":
//         return (
//           <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
//             Pending
//           </Badge>
//         );
//       case "rejected":
//         return <Badge variant="destructive">Rejected</Badge>;
//       default:
//         return <Badge variant="outline">Not Submitted</Badge>;
//     }
//   };

//   const getRoleBadge = (role: string) => {
//     switch (role) {
//       case "admin":
//         return <Badge variant="default">Admin</Badge>;
//       case "user":
//         return <Badge variant="secondary">User</Badge>;
//       default:
//         return <Badge variant="outline">{role}</Badge>;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">KYC Management</h2>
//         <Button onClick={fetchUsers} disabled={isLoading}>
//           {isLoading ? "Refreshing..." : "Refresh"}
//         </Button>
//       </div>

//       <Card className="shadow-sm">
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Username</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>KYC Status</TableHead>
//                 <TableHead>Join Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users.length > 0 ? (
//                 users.map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell className="font-medium">
//                       {user.username}
//                     </TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{getStatusBadge(user.kycStatus)}</TableCell>
//                     <TableCell>
//                       {format(new Date(user.createdAt), "MMM dd, yyyy")}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => openViewModal(user)}>
//                             <Eye className="mr-2 h-4 w-4" /> View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => openEditModal(user)}>
//                             <Pencil className="mr-2 h-4 w-4" /> Edit
//                           </DropdownMenuItem>
//                           {user.kycStatus === "pending" && (
//                             <>
//                               <DropdownMenuItem
//                                 onSelect={() =>
//                                   updateKycStatus(user._id, "approved")
//                                 }
//                               >
//                                 <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
//                                 Approve
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onSelect={() =>
//                                   updateKycStatus(user._id, "rejected")
//                                 }
//                               >
//                                 <XCircle className="mr-2 h-4 w-4 text-red-500" />{" "}
//                                 Reject
//                               </DropdownMenuItem>
//                             </>
//                           )}
//                           <DropdownMenuItem
//                             onSelect={() => {
//                               setSelectedUser(user);
//                               setIsDeleteModalOpen(true);
//                             }}
//                             className="text-destructive focus:text-destructive focus:bg-destructive/10"
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" /> Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-center py-8">
//                     {isLoading ? "Loading users..." : "No users found"}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* View User Dialog */}
//       {selectedUser && (
//         <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//           <AlertDialogContent className="sm:max-w-2xl">
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 User Details: {selectedUser.username}
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div className="space-y-2">
//                     <p>
//                       <span className="font-medium">Email:</span>{" "}
//                       {selectedUser.email}
//                     </p>
//                     <p>
//                       <span className="font-medium">Role:</span>{" "}
//                       {getRoleBadge(selectedUser.role)}
//                     </p>
//                     <p>
//                       <span className="font-medium">KYC Status:</span>{" "}
//                       {getStatusBadge(selectedUser.kycStatus)}
//                     </p>
//                     <p>
//                       <span className="font-medium">Mobile:</span>{" "}
//                       {selectedUser.mobileNumber || "N/A"}
//                     </p>
//                   </div>
//                   <div className="space-y-2">
//                     <p>
//                       <span className="font-medium">Aadhaar:</span>{" "}
//                       {selectedUser.aadhaarNumber || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Date of Birth:</span>{" "}
//                       {selectedUser.dateOfBirth
//                         ? format(
//                             new Date(selectedUser.dateOfBirth),
//                             "MMM dd, yyyy"
//                           )
//                         : "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Gender:</span>{" "}
//                       {selectedUser.gender || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Document Type:</span>{" "}
//                       {selectedUser.documentType || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </AlertDialogDescription>
//             </AlertDialogHeader>

//             {/* KYC Documents Section */}
//             <div className="my-6">
//               <h3 className="font-medium mb-4">KYC Documents:</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {selectedUser.documentFront && (
//                   <div className="border rounded-md p-2">
//                     <p className="text-sm font-medium mb-2">Document Front</p>
//                     <img
//                       src={selectedUser.documentFront}
//                       alt="Document Front"
//                       className="rounded-md max-h-60 w-auto mx-auto"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src =
//                           "https://placehold.co/600x400?text=Document+Not+Found";
//                         target.onerror = null;
//                       }}
//                     />
//                   </div>
//                 )}
//                 {selectedUser.documentBack && (
//                   <div className="border rounded-md p-2">
//                     <p className="text-sm font-medium mb-2">Document Back</p>
//                     <img
//                       src={selectedUser.documentBack}
//                       alt="Document Back"
//                       className="rounded-md max-h-60 w-auto mx-auto"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src =
//                           "https://placehold.co/600x400?text=Document+Not+Found";
//                         target.onerror = null;
//                       }}
//                     />
//                   </div>
//                 )}
//                 {/* {selectedUser.selfie && (
//                   <div className="border rounded-md p-2">
//                     <p className="text-sm font-medium mb-2">Selfie</p>
//                     <img
//                       src={selectedUser.selfie}
//                       alt="Selfie"
//                       className="rounded-md max-h-60 w-auto mx-auto"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src =
//                           "https://placehold.co/600x400?text=Selfie+Not+Found";
//                         target.onerror = null;
//                       }}
//                     />
//                   </div>
//                 )} */}
//                 {selectedUser.selfie && (
//                   <div className="border rounded-md p-2">
//                     <p className="text-sm font-medium mb-2">Selfie</p>
//                     <img
//                       src={selectedUser.selfie}
//                       alt="Selfie"
//                       className="rounded-md max-h-60 w-auto mx-auto"
//                       onError={(e) => {
//                         console.error(
//                           "Failed to load selfie image:",
//                           selectedUser.selfie
//                         );
//                         const target = e.target as HTMLImageElement;
//                         target.src =
//                           "https://placehold.co/600x400?text=Selfie+Not+Found";
//                         target.onerror = null;
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <AlertDialogFooter>
//               <AlertDialogCancel onClick={() => setIsViewModalOpen(false)}>
//                 Close
//               </AlertDialogCancel>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       )}

//       {/* Edit User Dialog */}
//       {selectedUser && (
//         <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>Edit User</DialogTitle>
//               <DialogDescription>
//                 Update the user details below. Click save when you're done.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="username" className="text-right">
//                   Username
//                 </Label>
//                 <Input
//                   id="username"
//                   value={editForm.username}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, username: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={editForm.email}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, email: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="mobileNumber" className="text-right">
//                   Mobile
//                 </Label>
//                 <Input
//                   id="mobileNumber"
//                   value={editForm.mobileNumber}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, mobileNumber: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="aadhaarNumber" className="text-right">
//                   Aadhaar
//                 </Label>
//                 <Input
//                   id="aadhaarNumber"
//                   value={editForm.aadhaarNumber}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, aadhaarNumber: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="dateOfBirth" className="text-right">
//                   Date of Birth
//                 </Label>
//                 <Input
//                   id="dateOfBirth"
//                   type="date"
//                   value={editForm.dateOfBirth}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, dateOfBirth: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="gender" className="text-right">
//                   Gender
//                 </Label>
//                 <Input
//                   id="gender"
//                   value={editForm.gender}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, gender: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="documentType" className="text-right">
//                   Document Type
//                 </Label>
//                 <Input
//                   id="documentType"
//                   value={editForm.documentType}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, documentType: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button onClick={handleEditSubmit} disabled={isLoading}>
//                 {isLoading ? "Saving..." : "Save changes"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the
//               user account and all associated data.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteUser}
//               className="bg-destructive hover:bg-destructive/90"
//               disabled={isLoading}
//             >
//               {isLoading ? "Deleting..." : "Delete"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }

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
import {
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
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

type KycStatus = "approved" | "pending" | "rejected" | "not_submitted";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  kycStatus: KycStatus;
  aadhaarNumber?: string;
  dateOfBirth?: Date | string;
  gender?: string;
  mobileNumber?: string;
  documentType?: string;
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
  createdAt: string;
  updatedAt?: string;
}

export default function KycManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    gender: "",
    documentType: "",
  });
  const { toast } = useToast();

  // Fetch users with KYC data

  // const fetchUsers = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
  //       credentials: "include", // Include credentials for cookies
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       const usersWithFullPaths = data.map((user: User) => ({
  //         ...user,
  //         documentFront: user.documentFront
  //           ? `${API_BASE_URL}${user.documentFront.startsWith("/") ? "" : "/"}${
  //               user.documentFront
  //             }`
  //           : undefined,
  //         documentBack: user.documentBack
  //           ? `${API_BASE_URL}${user.documentBack.startsWith("/") ? "" : "/"}${
  //               user.documentBack
  //             }`
  //           : undefined,
  //         selfie: user.selfie
  //           ? `${API_BASE_URL}${user.selfie.startsWith("/") ? "" : "/"}${
  //               user.selfie
  //             }`
  //           : undefined,
  //       }));
  //       setUsers(usersWithFullPaths);
  //     } else {
  //       throw new Error(data.message || "Failed to fetch users");
  //     }
  //   } catch (err) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description:
  //         err instanceof Error ? err.message : "Failed to fetch users",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        const usersWithFullPaths = data.map((user: User) => ({
          ...user,
          documentFront: user.documentFront || undefined,
          documentBack: user.documentBack || undefined,
          selfie: user.selfie || undefined,
        }));
        setUsers(usersWithFullPaths);
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
  const updateKycStatus = async (userId: string, status: KycStatus) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/kyc`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      // Update local state
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

  // Open edit modal and set form data
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber || "",
      aadhaarNumber: user.aadhaarNumber || "",
      dateOfBirth: user.dateOfBirth
        ? format(new Date(user.dateOfBirth), "yyyy-MM-dd")
        : "",
      gender: user.gender || "",
      documentType: user.documentType || "",
    });
    setIsEditModalOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async () => {
    if (!selectedUser) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/api/admin/users/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      // Update local state
      setUsers((prev) =>
        prev.map((user) =>
          user._id === selectedUser._id ? { ...user, ...editForm } : user
        )
      );

      toast({
        title: "Success",
        description: "User updated successfully",
      });
      setIsEditModalOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to update user",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/api/admin/users/${selectedUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      // Update local state
      setUsers((prev) => prev.filter((user) => user._id !== selectedUser._id));

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      setIsDeleteModalOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to delete user",
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
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
            Pending
          </Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Submitted</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="default">Admin</Badge>;
      case "user":
        return <Badge variant="secondary">User</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
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
                <TableHead>KYC Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getStatusBadge(user.kycStatus)}</TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), "MMM dd, yyyy")}
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
                          <DropdownMenuItem onClick={() => openEditModal(user)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
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
                          <DropdownMenuItem
                            onSelect={() => {
                              setSelectedUser(user);
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
                    {isLoading ? "Loading users..." : "No users found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      {selectedUser && (
        <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <AlertDialogContent className="sm:max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                User Details: {selectedUser.username}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedUser.email}
                    </p>
                    <p>
                      <span className="font-medium">Role:</span>{" "}
                      {getRoleBadge(selectedUser.role)}
                    </p>
                    <p>
                      <span className="font-medium">KYC Status:</span>{" "}
                      {getStatusBadge(selectedUser.kycStatus)}
                    </p>
                    <p>
                      <span className="font-medium">Mobile:</span>{" "}
                      {selectedUser.mobileNumber || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Aadhaar:</span>{" "}
                      {selectedUser.aadhaarNumber || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {selectedUser.dateOfBirth
                        ? format(
                            new Date(selectedUser.dateOfBirth),
                            "MMM dd, yyyy"
                          )
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Gender:</span>{" "}
                      {selectedUser.gender || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Document Type:</span>{" "}
                      {selectedUser.documentType || "N/A"}
                    </p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* KYC Documents Section */}
            {/* KYC Documents Section */}
            <div className="my-6">
              <h3 className="font-medium mb-4">KYC Documents:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedUser.documentFront && (
                  <div className="border rounded-md p-2">
                    <p className="text-sm font-medium mb-2">Document Front</p>
                    <div className="flex justify-center">
                      <img
                        src={selectedUser.documentFront}
                        alt="Document Front"
                        className="rounded-md max-h-60 w-auto"
                        onError={(e) => {
                          console.error(
                            "Failed to load document front:",
                            selectedUser.documentFront
                          );
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/600x400?text=Document+Not+Found";
                          target.onerror = null;
                        }}
                      />
                    </div>
                  </div>
                )}
                {selectedUser.documentBack && (
                  <div className="border rounded-md p-2">
                    <p className="text-sm font-medium mb-2">Document Back</p>
                    <div className="flex justify-center">
                      <img
                        src={selectedUser.documentBack}
                        alt="Document Back"
                        className="rounded-md max-h-60 w-auto"
                        onError={(e) => {
                          console.error(
                            "Failed to load document back:",
                            selectedUser.documentBack
                          );
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/600x400?text=Document+Not+Found";
                          target.onerror = null;
                        }}
                      />
                    </div>
                  </div>
                )}
                {selectedUser.selfie && (
                  <div className="border rounded-md p-2">
                    <p className="text-sm font-medium mb-2">Selfie</p>
                    <div className="flex justify-center">
                      <img
                        src={selectedUser.selfie}
                        alt="Selfie"
                        className="rounded-md max-h-60 w-auto"
                        onError={(e) => {
                          console.error(
                            "Failed to load selfie:",
                            selectedUser.selfie
                          );
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/600x400?text=Selfie+Not+Found";
                          target.onerror = null;
                        }}
                      />
                    </div>
                  </div>
                )}
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

      {/* Edit User Dialog */}
      {selectedUser && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update the user details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mobileNumber" className="text-right">
                  Mobile
                </Label>
                <Input
                  id="mobileNumber"
                  value={editForm.mobileNumber}
                  onChange={(e) =>
                    setEditForm({ ...editForm, mobileNumber: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="aadhaarNumber" className="text-right">
                  Aadhaar
                </Label>
                <Input
                  id="aadhaarNumber"
                  value={editForm.aadhaarNumber}
                  onChange={(e) =>
                    setEditForm({ ...editForm, aadhaarNumber: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateOfBirth" className="text-right">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={editForm.dateOfBirth}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dateOfBirth: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Input
                  id="gender"
                  value={editForm.gender}
                  onChange={(e) =>
                    setEditForm({ ...editForm, gender: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="documentType" className="text-right">
                  Document Type
                </Label>
                <Input
                  id="documentType"
                  value={editForm.documentType}
                  onChange={(e) =>
                    setEditForm({ ...editForm, documentType: e.target.value })
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
              user account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
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
