"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import {
  PlusCircle,
  Edit,
  Trash2,
  MoreVertical,
  ImagePlus,
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface PosterTemplate {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  category: string;
}

export default function TemplateControlPage() {
  const [templates, setTemplates] = useState<PosterTemplate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<PosterTemplate | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // 🔹 Fetch templates from backend
  const fetchTemplates = async () => {
    try {
      const res = await fetch(
        "https://publicityposterbackend.onrender.com/api/templates"
      );
      const data = await res.json();
      setTemplates(data);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch templates",
      });
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // 🔹 Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Ensure this is a proper base64 image string
        if (!result.startsWith("data:image/")) {
          reject(new Error("File is not an image"));
        } else {
          resolve(result);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // 🔹 File change handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 🔹 Add Template Modal
  const openAddModal = () => {
    setCurrentTemplate(null);
    setTitle("");
    setCategory("");
    setPreviewFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  // 🔹 Edit Template Modal
  const openEditModal = (template: PosterTemplate) => {
    setCurrentTemplate(template);
    setTitle(template.title);
    setCategory(template.category);
    setPreviewUrl(template.imageUrl);
    setPreviewFile(null);
    setIsModalOpen(true);
  };

  // 🔹 Delete Template
  // frontend/pages/templates/page.tsx
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://publicityposterbackend.onrender.com/api/templates/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete template");
      }

      // Update local state
      setTemplates((prev) => prev.filter((t) => t._id !== id));
      toast({ title: "Success", description: "Template deleted" });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Deletion failed",
      });
    }
  };

  // 🔹 Submit handler
  const handleSubmit = async () => {
    if (!title.trim() || !category.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title and category are required.",
      });
      return;
    }

    if (!previewFile && !currentTemplate) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Preview image is required.",
      });
      return;
    }

    setIsLoading(true);

    try {
      let imageBase64 = "";
      if (previewFile) {
        imageBase64 = await fileToBase64(previewFile);
      }

      const url = currentTemplate
        ? `https://publicityposterbackend.onrender.com/api/templates/${currentTemplate._id}`
        : "https://publicityposterbackend.onrender.com/api/templates";

      const method = currentTemplate ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          ...(previewFile && { imageBase64 }),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save template");
      }

      // Update state
      if (currentTemplate) {
        setTemplates(
          templates.map((t) => (t._id === currentTemplate._id ? result : t))
        );
      } else {
        setTemplates([result, ...templates]);
      }

      toast({
        title: "Success",
        description: currentTemplate
          ? "Template updated successfully"
          : "Template created successfully",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save template",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Poster Templates</h2>
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
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template._id}>
                  <TableCell>
                    <Image
                      src={template.imageUrl}
                      alt={template.title}
                      width={100}
                      height={66}
                      className="rounded-md border object-cover"
                    />
                  </TableCell>
                  <TableCell>{template.title}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>
                    {new Date(template.createdAt).toLocaleDateString()}
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
                          onClick={() => openEditModal(template)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(template._id)}
                          className="text-destructive"
                        >
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
            <DialogTitle>
              {currentTemplate ? "Edit" : "Add New"} Template
            </DialogTitle>
            <DialogDescription>
              {currentTemplate
                ? "Update the template details."
                : "Fill the form to create a new poster template."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g. Summer Sale"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="col-span-3"
                placeholder="e.g. Promotional"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preview" className="text-right">
                Preview Image
              </Label>
              <div className="col-span-3">
                <Input
                  id="preview"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={150}
                    height={100}
                    className="rounded-md border object-cover"
                  />
                ) : (
                  <div className="w-[150px] h-[100px] bg-muted rounded-md flex items-center justify-center border">
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
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : currentTemplate
                ? "Save Changes"
                : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
