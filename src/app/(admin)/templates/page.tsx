// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   PlusCircle,
//   Edit,
//   Trash2,
//   MoreVertical,
//   ImagePlus,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent } from "@/components/ui/card";

// interface PosterTemplate {
//   _id: string;
//   title: string;
//   imageUrl: string;
//   createdAt: string;
//   category: string;
// }

// export default function TemplateControlPage() {
//   const [templates, setTemplates] = useState<PosterTemplate[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTemplate, setCurrentTemplate] = useState<PosterTemplate | null>(
//     null
//   );
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [previewFile, setPreviewFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   // 🔹 Fetch templates from backend
//   const fetchTemplates = async () => {
//     try {
//       const res = await fetch(
//         "https://publicityposterbackend.onrender.com/api/templates"
//       );
//       const data = await res.json();
//       setTemplates(data);
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch templates",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   // 🔹 Convert file to base64
//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const result = reader.result as string;
//         // Ensure this is a proper base64 image string
//         if (!result.startsWith("data:image/")) {
//           reject(new Error("File is not an image"));
//         } else {
//           resolve(result);
//         }
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // 🔹 File change handler
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       setPreviewFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   // 🔹 Add Template Modal
//   const openAddModal = () => {
//     setCurrentTemplate(null);
//     setTitle("");
//     setCategory("");
//     setPreviewFile(null);
//     setPreviewUrl(null);
//     setIsModalOpen(true);
//   };

//   // 🔹 Edit Template Modal
//   const openEditModal = (template: PosterTemplate) => {
//     setCurrentTemplate(template);
//     setTitle(template.title);
//     setCategory(template.category);
//     setPreviewUrl(template.imageUrl);
//     setPreviewFile(null);
//     setIsModalOpen(true);
//   };

//   // 🔹 Delete Template
//   // frontend/pages/templates/page.tsx
//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(
//         `https://publicityposterbackend.onrender.com/api/templates/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to delete template");
//       }

//       // Update local state
//       setTemplates((prev) => prev.filter((t) => t._id !== id));
//       toast({ title: "Success", description: "Template deleted" });
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error instanceof Error ? error.message : "Deletion failed",
//       });
//     }
//   };

//   // 🔹 Submit handler
//   const handleSubmit = async () => {
//     if (!title.trim() || !category.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Title and category are required.",
//       });
//       return;
//     }

//     if (!previewFile && !currentTemplate) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Preview image is required.",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       let imageBase64 = "";
//       if (previewFile) {
//         imageBase64 = await fileToBase64(previewFile);
//       }

//       const url = currentTemplate
//         ? `https://publicityposterbackend.onrender.com/api/templates/${currentTemplate._id}`
//         : "https://publicityposterbackend.onrender.com/api/templates";

//       const method = currentTemplate ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           category,
//           ...(previewFile && { imageBase64 }),
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to save template");
//       }

//       // Update state
//       if (currentTemplate) {
//         setTemplates(
//           templates.map((t) => (t._id === currentTemplate._id ? result : t))
//         );
//       } else {
//         setTemplates([result, ...templates]);
//       }

//       toast({
//         title: "Success",
//         description: currentTemplate
//           ? "Template updated successfully"
//           : "Template created successfully",
//       });

//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to save template",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">Poster Templates</h2>
//         <Button onClick={openAddModal}>
//           <PlusCircle className="mr-2 h-4 w-4" /> Add New Template
//         </Button>
//       </div>

//       <Card className="shadow-sm">
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Preview</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Date Created</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {templates.map((template) => (
//                 <TableRow key={template._id}>
//                   <TableCell>
//                     <Image
//                       src={template.imageUrl}
//                       alt={template.title}
//                       width={100}
//                       height={66}
//                       className="rounded-md border object-cover"
//                     />
//                   </TableCell>
//                   <TableCell>{template.title}</TableCell>
//                   <TableCell>{template.category}</TableCell>
//                   <TableCell>
//                     {new Date(template.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreVertical className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem
//                           onClick={() => openEditModal(template)}
//                         >
//                           <Edit className="mr-2 h-4 w-4" /> Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => handleDelete(template._id)}
//                           className="text-destructive"
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" /> Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>
//               {currentTemplate ? "Edit" : "Add New"} Template
//             </DialogTitle>
//             <DialogDescription>
//               {currentTemplate
//                 ? "Update the template details."
//                 : "Fill the form to create a new poster template."}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="title" className="text-right">
//                 Title
//               </Label>
//               <Input
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="col-span-3"
//                 placeholder="e.g. Summer Sale"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="category" className="text-right">
//                 Category
//               </Label>
//               <Input
//                 id="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="col-span-3"
//                 placeholder="e.g. Promotional"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="preview" className="text-right">
//                 Preview Image
//               </Label>
//               <div className="col-span-3">
//                 <Input
//                   id="preview"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="mb-2"
//                 />
//                 {previewUrl ? (
//                   <Image
//                     src={previewUrl}
//                     alt="Preview"
//                     width={150}
//                     height={100}
//                     className="rounded-md border object-cover"
//                   />
//                 ) : (
//                   <div className="w-[150px] h-[100px] bg-muted rounded-md flex items-center justify-center border">
//                     <ImagePlus size={32} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button onClick={handleSubmit} disabled={isLoading}>
//               {isLoading
//                 ? "Processing..."
//                 : currentTemplate
//                 ? "Save Changes"
//                 : "Create Template"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

//Ai generated
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

// import Image from "next/image";
// import { Trash2, Edit, Plus } from "lucide-react";

// interface PosterTemplate {
//   _id: string;
//   title: string;
//   category: string;
//   imageUrl: string;
//   createdAt: string;
// }

// export default function TemplateControlPage() {
//   const API_BASE_URL = "https://publicityposterbackend.onrender.com";
//   const { toast } = useToast();
//   const [templates, setTemplates] = useState<PosterTemplate[]>([]);
//   const [currentTemplate, setCurrentTemplate] = useState<PosterTemplate | null>(
//     null
//   );
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [previewFile, setPreviewFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGeneratingAI, setIsGeneratingAI] = useState(false);
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/templates`);
//       const data = await res.json();
//       setTemplates(data);
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch templates",
//       });
//     }
//   };

//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setPreviewFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setCategory("");
//     setPreviewFile(null);
//     setPreviewUrl(null);
//     setCurrentTemplate(null);
//     setDescription("");
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   const isImagePresent = previewUrl?.trim() || previewFile;
//   //   // Validate all fields
//   //   if (!title.trim() || !category.trim() || !isImagePresent) {
//   //     toast({
//   //       variant: "destructive",
//   //       title: "Missing Fields",
//   //       description: "Please fill all fields and add an image",
//   //     });
//   //     return;
//   //   }

//   //   setIsLoading(true);
//   //   try {
//   //     let imageUrl = previewUrl;

//   //     // If new file uploaded (not AI generated)
//   //     if (previewFile) {
//   //       const base64Image = await fileToBase64(previewFile);
//   //       imageUrl = base64Image;
//   //     }

//   //     const url = currentTemplate
//   //       ? `${API_BASE_URL}/api/templates/${currentTemplate._id}`
//   //       : `${API_BASE_URL}/api/templates`;

//   //     const method = currentTemplate ? "PUT" : "POST";

//   //     const res = await fetch(url, {
//   //       method,
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         title,
//   //         category,
//   //         imageUrl,
//   //       }),
//   //     });

//   //     if (!res.ok) {
//   //       const errorData = await res.json();
//   //       throw new Error(errorData.error || "Failed to save template");
//   //     }

//   //     const data = await res.json();
//   //     toast({
//   //       title: "Success",
//   //       description: currentTemplate
//   //         ? "Template updated successfully"
//   //         : "Template created successfully",
//   //     });

//   //     if (currentTemplate) {
//   //       setTemplates(templates.map((t) => (t._id === data._id ? data : t)));
//   //     } else {
//   //       setTemplates([...templates, data]);
//   //     }

//   //     setIsModalOpen(false);
//   //     resetForm();
//   //   } catch (err) {
//   //     toast({
//   //       variant: "destructive",
//   //       title: "Error",
//   //       description:
//   //         err instanceof Error ? err.message : "Failed to save template",
//   //     });
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate all fields
//     if (!title || !category || (!previewUrl && !previewFile)) {
//       toast({
//         variant: "destructive",
//         title: "Missing Fields",
//         description: "Please fill all fields and add an image",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       let imagePayload: string;

//       // If new file uploaded (manual upload)
//       if (previewFile) {
//         imagePayload = await fileToBase64(previewFile);
//       }
//       // If AI-generated image URL
//       else if (previewUrl) {
//         imagePayload = previewUrl;
//       } else {
//         throw new Error("No image provided");
//       }

//       const url = currentTemplate
//         ? `${API_BASE_URL}/api/templates/${currentTemplate._id}`
//         : `${API_BASE_URL}/api/templates`;

//       const method = currentTemplate ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           category,
//           ...(imagePayload.startsWith("data:")
//             ? { imageBase64: imagePayload }
//             : { imageUrl: imagePayload }),
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to save template");
//       }

//       const data = await res.json();
//       toast({
//         title: "Success",
//         description: currentTemplate
//           ? "Template updated successfully"
//           : "Template created successfully",
//       });

//       if (currentTemplate) {
//         setTemplates(templates.map((t) => (t._id === data._id ? data : t)));
//       } else {
//         setTemplates([...templates, data]);
//       }

//       setIsModalOpen(false);
//       resetForm();
//     } catch (err) {
//       console.error("Save error:", err);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           err instanceof Error ? err.message : "Failed to save template",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleEdit = (template: PosterTemplate) => {
//     setCurrentTemplate(template);
//     setTitle(template.title);
//     setCategory(template.category);
//     setPreviewUrl(template.imageUrl);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this template?")) return;

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/templates/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to delete template");
//       }

//       setTemplates(templates.filter((t) => t._id !== id));
//       toast({
//         title: "Success",
//         description: "Template deleted successfully",
//       });
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to delete template",
//       });
//     }
//   };

//   const handleGenerateWithAI = async () => {
//     if (!description.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Description required",
//         description: "Please enter a description to generate with AI",
//       });
//       return;
//     }

//     setIsGeneratingAI(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/ai/generate-template`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ description }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to generate with AI");
//       }
//       console.log("Validation Check:", {
//         title,
//         category,
//         previewUrl,
//         previewFile,
//       });

//       setTitle(data.title);
//       setCategory(data.category);
//       setPreviewUrl(data.imageUrl);
//       setPreviewFile(null);

//       toast({
//         title: "AI Generation Successful",
//         description: "Fields have been auto-filled with AI-generated content",
//       });
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "AI Generation Failed",
//         description:
//           err instanceof Error ? err.message : "Failed to generate with AI",
//       });
//     } finally {
//       setIsGeneratingAI(false);
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Poster Templates</h1>
//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <DialogTrigger asChild>
//             <Button
//               onClick={() => {
//                 resetForm();
//                 setIsModalOpen(true);
//               }}
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Add New Template
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>
//                 {currentTemplate ? "Edit Template" : "Add New Template"}
//               </DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid ">
//                 <div className="space-y-2">
//                   <Label htmlFor="description">AI Description</Label>
//                   <Input
//                     id="description"
//                     placeholder="Describe the template you want AI to create..."
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={handleGenerateWithAI}
//                     disabled={isGeneratingAI}
//                     className="mt-2"
//                   >
//                     {isGeneratingAI ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Generating...
//                       </>
//                     ) : (
//                       "✨ Generate with AI"
//                     )}
//                   </Button>
//                 </div>

//                 <div className="border-t pt-4 space-y-2">
//                   <Label htmlFor="title">Title</Label>
//                   <Input
//                     id="title"
//                     placeholder="Template title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="category">Category</Label>
//                   <Input
//                     id="category"
//                     placeholder="Template category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="image">Image</Label>
//                   <Input
//                     id="image"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     disabled={!!previewUrl && !previewFile}
//                   />
//                 </div>

//                 {previewUrl && (
//                   <div className="mt-4">
//                     <Label>Preview</Label>
//                     <div className="mt-2 border rounded-md p-2">
//                       <Image
//                         src={previewUrl}
//                         alt="Preview"
//                         width={200}
//                         height={300}
//                         className="object-contain mx-auto"
//                         unoptimized={
//                           previewUrl.includes("cloudinary.com") ? false : true
//                         }
//                       />
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="mt-2 w-full"
//                         onClick={() => {
//                           setPreviewUrl(null);
//                           setPreviewFile(null);
//                         }}
//                       >
//                         <Trash2 className="h-4 w-4 mr-2" />
//                         Remove Image
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     resetForm();
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={
//                     isLoading ||
//                     !title ||
//                     !category ||
//                     (!previewUrl && !previewFile)
//                   }
//                 >
//                   {isLoading
//                     ? "Saving..."
//                     : currentTemplate
//                     ? "Update Template"
//                     : "Create Template"}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {templates.map((template) => (
//           <div
//             key={template._id}
//             className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="relative aspect-[4/5]">
//               <Image
//                 src={template.imageUrl}
//                 alt={template.title}
//                 fill
//                 className="object-cover"
//                 unoptimized={
//                   template.imageUrl.includes("cloudinary.com") ? false : true
//                 }
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">{template.title}</h3>
//               <p className="text-sm text-gray-600">{template.category}</p>
//               <div className="flex justify-end gap-2 mt-4">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleEdit(template)}
//                 >
//                   <Edit className="h-4 w-4 mr-2" />
//                   Edit
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => handleDelete(template._id)}
//                 >
//                   <Trash2 className="h-4 w-4 mr-2" />
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//mix version
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Trash2, Edit, Plus, Wand2, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PosterTemplate {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export default function TemplateControlPage() {
  const API_BASE_URL = "https://publicityposterbackend.onrender.com";
  const { toast } = useToast();
  const [templates, setTemplates] = useState<PosterTemplate[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<PosterTemplate | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("manual");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/templates`);
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setPreviewFile(null);
    setPreviewUrl(null);
    setCurrentTemplate(null);
    setDescription("");
    setActiveTab("manual");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!title || !category || (!previewUrl && !previewFile)) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill all fields and add an image",
      });
      return;
    }

    setIsLoading(true);
    try {
      let imagePayload: string;
      let isBase64 = false;

      // Handle manual upload
      if (previewFile) {
        imagePayload = await fileToBase64(previewFile);
        isBase64 = true;
      }
      // Handle AI-generated URL
      else if (previewUrl) {
        imagePayload = previewUrl;
      } else {
        throw new Error("No image provided");
      }

      const url = currentTemplate
        ? `${API_BASE_URL}/api/templates/${currentTemplate._id}`
        : `${API_BASE_URL}/api/templates`;

      const method = currentTemplate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          ...(isBase64
            ? { imageBase64: imagePayload }
            : { imageUrl: imagePayload }),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save template");
      }

      const data = await res.json();
      toast({
        title: "Success",
        description: currentTemplate
          ? "Template updated successfully"
          : "Template created successfully",
      });

      if (currentTemplate) {
        setTemplates(templates.map((t) => (t._id === data._id ? data : t)));
      } else {
        setTemplates([...templates, data]);
      }

      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Save error:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to save template",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (template: PosterTemplate) => {
    setCurrentTemplate(template);
    setTitle(template.title);
    setCategory(template.category);
    setPreviewUrl(template.imageUrl);
    setIsModalOpen(true);
    setActiveTab("manual");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/templates/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete template");
      }

      setTemplates(templates.filter((t) => t._id !== id));
      toast({
        title: "Success",
        description: "Template deleted successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete template",
      });
    }
  };

  const handleGenerateWithAI = async () => {
    if (!description.trim()) {
      toast({
        variant: "destructive",
        title: "Description required",
        description: "Please enter a description to generate with AI",
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/generate-template`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate with AI");
      }

      setTitle(data.title);
      setCategory(data.category);
      setPreviewUrl(data.imageUrl);
      setPreviewFile(null);

      toast({
        title: "AI Generation Successful",
        description: "Fields have been auto-filled with AI-generated content",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description:
          err instanceof Error ? err.message : "Failed to generate with AI",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Poster Templates</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentTemplate ? "Edit Template" : "Add New Template"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">
                    <Upload className="mr-2 h-4 w-4" /> Manual
                  </TabsTrigger>
                  <TabsTrigger value="ai">
                    <Wand2 className="mr-2 h-4 w-4" /> AI Generator
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Template title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="Template category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={!!previewUrl && !previewFile}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Describe the poster you want to create..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGenerateWithAI}
                        disabled={isGeneratingAI}
                        className="w-full mt-2"
                      >
                        {isGeneratingAI ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Generating...
                          </>
                        ) : (
                          "✨ Generate Template"
                        )}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ai-title">Title</Label>
                      <Input
                        id="ai-title"
                        placeholder="Will be generated by AI"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ai-category">Category</Label>
                      <Input
                        id="ai-category"
                        placeholder="Will be generated by AI"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        disabled
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {previewUrl && (
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div className="mt-2 border rounded-md p-2">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={200}
                      height={300}
                      className="object-contain mx-auto"
                      unoptimized={
                        previewUrl.includes("cloudinary.com") ? false : true
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => {
                        setPreviewUrl(null);
                        setPreviewFile(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Image
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !title ||
                    !category ||
                    (!previewUrl && !previewFile)
                  }
                >
                  {isLoading
                    ? "Saving..."
                    : currentTemplate
                    ? "Update Template"
                    : "Create Template"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template._id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={template.imageUrl}
                alt={template.title}
                fill
                className="object-cover"
                unoptimized={
                  template.imageUrl.includes("cloudinary.com") ? false : true
                }
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{template.title}</h3>
              <p className="text-sm text-gray-600">{template.category}</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(template)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(template._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
