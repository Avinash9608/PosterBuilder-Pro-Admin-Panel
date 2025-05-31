"use client"

import React, { useState } from 'react';
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
import { Eye, UserX, MoreVertical, UserCircle2 } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from '@/components/ui/card';

type UserStatus = "Active" | "Disabled";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  joinDate: string;
  avatarUrl?: string;
}

const mockUsers: UserAccount[] = [
  { id: "user001", name: "Alice Wonderland", email: "alice@example.com", status: "Active", joinDate: "2023-01-15", avatarUrl: "https://placehold.co/40x40.png?text=AW" },
  { id: "user002", name: "Bob The Builder", email: "bob@example.com", status: "Active", joinDate: "2023-02-20", avatarUrl: "https://placehold.co/40x40.png?text=BB" },
  { id: "user003", name: "Charlie Chaplin", email: "charlie@example.com", status: "Disabled", joinDate: "2023-03-10", avatarUrl: "https://placehold.co/40x40.png?text=CC" },
  { id: "user004", name: "Diana Prince", email: "diana@example.com", status: "Active", joinDate: "2023-04-05" },
  { id: "user005", name: "Edward Elric", email: "edward@example.com", status: "Active", joinDate: "2023-05-01", avatarUrl: "https://placehold.co/40x40.png?text=EE" },
];


export default function UserManagementPage() {
  const [users, setUsers] = useState<UserAccount[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { toast } = useToast();

  const toggleUserStatus = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Disabled" : "Active" }
          : user
      )
    );
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "User Status Updated",
        description: `${user.name}'s account is now ${user.status === "Active" ? "Disabled" : "Active"}.`,
      });
    }
  };

  const openViewModal = (user: UserAccount) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">User Accounts</h2>
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-8 w-8">
                        {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" /> : null}
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase() || <UserCircle2 size={16} />}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"} className={user.status === "Active" ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"}>
                      {user.status}
                    </Badge>
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
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem 
                            onSelect={(e) => e.preventDefault()} 
                            className={user.status === 'Active' ? 'text-destructive focus:text-destructive focus:bg-destructive/10' : 'text-green-600 focus:text-green-600 focus:bg-green-500/10'}
                          >
                            <UserX className="mr-2 h-4 w-4" /> {user.status === "Active" ? "Disable" : "Enable"} Account
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                     <AlertDialog>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{user.status === "Active" ? "Disable" : "Enable"} User Account?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to {user.status === "Active" ? "disable" : "enable"} the account for {user.name}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => toggleUserStatus(user.id)}
                              className={user.status === 'Active' ? 'bg-destructive hover:bg-destructive/90' : 'bg-green-500 hover:bg-green-600'}
                            >
                              {user.status === "Active" ? "Disable" : "Enable"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
               <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-16 w-16">
                    {selectedUser.avatarUrl ? <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} data-ai-hint="user avatar large" /> : null}
                    <AvatarFallback className="text-2xl">
                        {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase() || <UserCircle2 size={32} />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <AlertDialogTitle className="text-xl">{selectedUser.name}</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">{selectedUser.email}</AlertDialogDescription>
                  </div>
                </div>
            </AlertDialogHeader>
            <div className="space-y-2 text-sm">
              <p><strong>User ID:</strong> {selectedUser.id}</p>
              <p><strong>Join Date:</strong> {selectedUser.joinDate}</p>
              <p><strong>Status:</strong> <Badge variant={selectedUser.status === "Active" ? "default" : "secondary"}  className={selectedUser.status === "Active" ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"}>{selectedUser.status}</Badge></p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsViewModalOpen(false)}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
