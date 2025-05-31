"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, MoreVertical, ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';


interface PosterTemplate {
  id: string;
  name: string;
  previewUrl: string;
  dateCreated: string;
  description: string;
}

const mockTemplates: PosterTemplate[] = [
  { id: "tpl001", name: "Summer Sale Fiesta", previewUrl: "https://placehold.co/150x100.png?a=1", dateCreated: "2024-07-01", description: "A vibrant template for summer promotions." },
  { id: "tpl002", name: "Tech Expo 2024", previewUrl: "https://placehold.co/150x100.png?a=2", dateCreated: "2024-06-15", description: "Modern design for technology events." },
  { id: "tpl003", name: "Grand Opening", previewUrl: "https://placehold.co/150x100.png?a=3", dateCreated: "2024-05-20", description: "Elegant template for new business openings." },
];

export default function TemplateControlPage() {
  const [templates, setTemplates] = useState<PosterTemplate[]>(mockTemplates);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<PosterTemplate | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setCurrentTemplate(null);
    setTemplateName("");
    setTemplateDescription("");
    setPreviewFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (template: PosterTemplate) => {
    setCurrentTemplate(template);
    setTemplateName(template.name);
    setTemplateDescription(template.description);
    setPreviewUrl(template.previewUrl); 
    setPreviewFile(null); 
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast({ title: "Template Deleted", description: `Template ${id} has been removed.` });
  };

  const handleSubmit = () => {
    if (!templateName.trim() || !templateDescription.trim()) {
      toast({ variant: "destructive", title: "Validation Error", description: "Name and description are required." });
      return;
    }
    if (!currentTemplate && !previewFile) {
       toast({ variant: "destructive", title: "Validation Error", description: "Preview image is required for new templates." });
      return;
    }

    const finalPreviewUrl = previewFile ? URL.createObjectURL(previewFile) : currentTemplate?.previewUrl || "https://placehold.co/150x100.png";

    if (currentTemplate) {
      // Edit mode
      setTemplates(prev =>
        prev.map(t =>
          t.id === currentTemplate.id ? { ...t, name: templateName, description: templateDescription, previewUrl: finalPreviewUrl } : t
        )
      );
      toast({ title: "Template Updated", description: `Template ${currentTemplate.name} updated.` });
    } else {
      // Add mode
      const newTemplate: PosterTemplate = {
        id: `tpl${Date.now()}`,
        name: templateName,
        description: templateDescription,
        previewUrl: finalPreviewUrl,
        dateCreated: new Date().toISOString().split('T')[0],
      };
      setTemplates(prev => [newTemplate, ...prev]);
      toast({ title: "Template Added", description: `Template ${newTemplate.name} created.` });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold font-headline">Poster Templates</h2>
        <Button onClick={openAddModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Template
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <Image src={template.previewUrl} alt={template.name} width={100} height={66} className="rounded-md border object-cover" data-ai-hint="poster template" />
                  </TableCell>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.dateCreated}</TableCell>
                  <TableCell className="max-w-xs truncate">{template.description}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditModal(template)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(template.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentTemplate ? "Edit" : "Add New"} Template</DialogTitle>
            <DialogDescription>
              {currentTemplate ? "Update the details of the poster template." : "Fill in the details to create a new poster template."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="col-span-3" placeholder="e.g. Summer Sale" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" value={templateDescription} onChange={(e) => setTemplateDescription(e.target.value)} className="col-span-3" placeholder="A brief description of the template." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preview" className="text-right">Preview</Label>
              <div className="col-span-3">
                <Input id="preview" type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
                {previewUrl && <Image src={previewUrl} alt="Preview" width={150} height={100} className="rounded-md border object-cover" data-ai-hint="template preview" />}
                {!previewUrl && (
                  <div className="w-[150px] h-[100px] bg-muted rounded-md flex items-center justify-center text-muted-foreground border">
                    <ImagePlus size={32} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>{currentTemplate ? "Save Changes" : "Create Template"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
