"use client"

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Eye, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

type KycStatus = "Pending" | "Approved" | "Rejected";

interface KycSubmission {
  id: string;
  userName: string;
  userId: string;
  submissionDate: string;
  status: KycStatus;
  documentUrl?: string; 
}

const mockKycSubmissions: KycSubmission[] = [
  { id: "kyc001", userName: "Alice Wonderland", userId: "user001", submissionDate: "2024-07-15", status: "Pending", documentUrl: "https://placehold.co/600x400.png" },
  { id: "kyc002", userName: "Bob The Builder", userId: "user002", submissionDate: "2024-07-14", status: "Approved", documentUrl: "https://placehold.co/600x400.png" },
  { id: "kyc003", userName: "Charlie Chaplin", userId: "user003", submissionDate: "2024-07-13", status: "Rejected", documentUrl: "https://placehold.co/600x400.png" },
  { id: "kyc004", userName: "Diana Prince", userId: "user004", submissionDate: "2024-07-12", status: "Pending", documentUrl: "https://placehold.co/600x400.png" },
  { id: "kyc005", userName: "Edward Elric", userId: "user005", submissionDate: "2024-07-11", status: "Approved", documentUrl: "https://placehold.co/600x400.png" },
];


export default function KycManagementPage() {
  const [submissions, setSubmissions] = useState<KycSubmission[]>(mockKycSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<KycSubmission | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: KycStatus) => {
    setSubmissions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
    toast({
      title: `KYC ${newStatus}`,
      description: `Submission ${id} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const openViewModal = (submission: KycSubmission) => {
    setSelectedSubmission(submission);
    setIsViewModalOpen(true);
  };
  

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">KYC Submissions</h2>
      <div className="rounded-lg border shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.userName}</TableCell>
                <TableCell>{submission.userId}</TableCell>
                <TableCell>{submission.submissionDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      submission.status === "Approved" ? "default" :
                      submission.status === "Rejected" ? "destructive" : "secondary"
                    }
                    className={submission.status === "Approved" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                  >
                    {submission.status}
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
                      <DropdownMenuItem onClick={() => openViewModal(submission)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      {submission.status === "Pending" && (
                        <>
                           <AlertDialogTrigger asChild>
                             <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                               <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Approve
                             </DropdownMenuItem>
                           </AlertDialogTrigger>
                           <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <XCircle className="mr-2 h-4 w-4 text-red-500" /> Reject
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Separate AlertDialogs for Approve/Reject to pass submission id correctly */}
                   <AlertDialog>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve KYC Submission?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to approve the KYC for {submission.userName}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleStatusChange(submission.id, "Approved")} className="bg-green-500 hover:bg-green-600">Approve</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject KYC Submission?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to reject the KYC for {submission.userName}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleStatusChange(submission.id, "Rejected")} className="bg-red-500 hover:bg-red-600">Reject</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                   </AlertDialog>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedSubmission && (
         <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <AlertDialogContent className="sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>KYC Details: {selectedSubmission.userName}</AlertDialogTitle>
              <AlertDialogDescription>
                User ID: {selectedSubmission.userId} <br />
                Submission Date: {selectedSubmission.submissionDate} <br />
                Status: {selectedSubmission.status}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {selectedSubmission.documentUrl && (
              <div className="my-4">
                <p className="font-medium mb-2">Submitted Document:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedSubmission.documentUrl} alt="KYC Document" className="rounded-md border max-h-80 w-auto" data-ai-hint="document identity" />
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsViewModalOpen(false)}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
