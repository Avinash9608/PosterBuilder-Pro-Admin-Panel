// "use client";

// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreVertical, Mail, Trash2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import "./UserQuery.css";
// interface Contact {
//   _id: string;
//   name: string;
//   phone: string;
//   email: string;
//   subject: string;
//   message: string;
//   createdAt: string;
// }

// export default function UserQueryPage() {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [replyDialogOpen, setReplyDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [replyMessage, setReplyMessage] = useState("");
//   const { toast } = useToast();

//   const API_BASE_URL =
//     "https://publicityposterbackend.onrender.com/api/contacts";

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const res = await fetch(API_BASE_URL);
//       const data = await res.json();
//       if (data.success) {
//         setContacts(data.data);
//       } else {
//         throw new Error(data.error || "Failed to fetch contacts");
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Failed to fetch contacts",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedContact) return;

//     try {
//       const res = await fetch(`${API_BASE_URL}/${selectedContact._id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to delete contact");
//       }

//       setContacts(
//         contacts.filter((contact) => contact._id !== selectedContact._id)
//       );
//       toast({
//         title: "Success",
//         description: "Contact deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Failed to delete contact",
//       });
//     } finally {
//       setDeleteDialogOpen(false);
//       setSelectedContact(null);
//     }
//   };

//   const handleSendReply = async () => {
//     if (!selectedContact || !replyMessage) return;

//     try {
//       const res = await fetch(`${API_BASE_URL}/${selectedContact._id}/reply`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ replyMessage }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to send reply");
//       }

//       toast({
//         title: "Success",
//         description: "Reply sent successfully",
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Failed to send reply",
//       });
//     } finally {
//       setReplyDialogOpen(false);
//       setSelectedContact(null);
//       setReplyMessage("");
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">User Queries</h1>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg border shadow-sm">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Subject</TableHead>
//                 <TableHead>Message</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {contacts.map((contact) => (
//                 <TableRow key={contact._id}>
//                   <TableCell className="font-medium">{contact.name}</TableCell>
//                   <TableCell>{contact.email}</TableCell>
//                   <TableCell>{contact.phone || "-"}</TableCell>
//                   <TableCell>{contact.subject || "-"}</TableCell>
//                   <TableCell className="max-w-xs truncate">
//                     {contact.message}
//                   </TableCell>
//                   <TableCell>{formatDate(contact.createdAt)}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreVertical className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setSelectedContact(contact);
//                             setReplyDialogOpen(true);
//                           }}
//                         >
//                           <Mail className="mr-2 h-4 w-4" />
//                           Reply
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setSelectedContact(contact);
//                             setDeleteDialogOpen(true);
//                           }}
//                           className="text-red-600"
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}

//       {/* Reply Dialog */}
//       <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
//         <DialogContent className="sm:max-w-[600px]">
//           <DialogHeader>
//             <DialogTitle>Reply to {selectedContact?.name}</DialogTitle>
//             <DialogDescription>
//               Your reply will be sent to: {selectedContact?.email}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="subject">Subject</Label>
//               <Input
//                 id="subject"
//                 defaultValue={`Re: ${
//                   selectedContact?.subject || "Your Inquiry"
//                 }`}
//                 readOnly
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="message">Your Reply</Label>
//               <Textarea
//                 id="message"
//                 rows={8}
//                 value={replyMessage}
//                 onChange={(e) => setReplyMessage(e.target.value)}
//                 placeholder="Type your reply here..."
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleSendReply}>Send Reply</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Delete Contact</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this contact? This action cannot
//               be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Mail, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function UserQueryPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const { toast } = useToast();

  const API_BASE_URL =
    "https://publicityposterbackend.onrender.com/api/contacts";

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch contacts");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to fetch contacts",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedContact) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${selectedContact._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete contact");
      }

      setContacts(
        contacts.filter((contact) => contact._id !== selectedContact._id)
      );
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete contact",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedContact(null);
    }
  };

  const handleSendReply = async () => {
    if (!selectedContact || !replyMessage) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${selectedContact._id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replyMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send reply");
      }

      toast({
        title: "Success",
        description: "Reply sent successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to send reply",
      });
    } finally {
      setReplyDialogOpen(false);
      setSelectedContact(null);
      setReplyMessage("");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User Queries</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone || "-"}</TableCell>
                  <TableCell>
                    {contact.subject || (
                      <span className="text-gray-400">No subject</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(contact.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedContact(contact);
                            setViewDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedContact(contact);
                            setReplyDialogOpen(true);
                          }}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedContact(contact);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Message Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message from {selectedContact?.name}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{selectedContact?.email}</Badge>
                {selectedContact?.phone && (
                  <Badge variant="outline">{selectedContact.phone}</Badge>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <div className="p-3 bg-gray-50 rounded-md">
                {selectedContact?.subject || "No subject"}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Message</Label>
              <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap min-h-[200px]">
                {selectedContact?.message}
              </div>
            </div>
            <Separator />
            <div className="text-sm text-gray-500">
              Received:{" "}
              {selectedContact && formatDate(selectedContact.createdAt)}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reply to {selectedContact?.name}</DialogTitle>
            <DialogDescription>
              Your reply will be sent to: {selectedContact?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                defaultValue={`Re: ${
                  selectedContact?.subject || "Your Inquiry"
                }`}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Your Reply</Label>
              <Textarea
                id="message"
                rows={8}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
