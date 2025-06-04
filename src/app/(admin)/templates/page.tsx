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

// "use client";

// import React, { useEffect, useState } from "react";
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
//   Sparkles,
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
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface PosterTemplate {
//   _id: string;
//   title: string;
//   imageUrl: string;
//   createdAt: string;
//   category: string;
// }

// interface AIGenerationResult {
//   imageUrl: string;
//   title: string;
//   category: string;
//   description: string;
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
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiPrompt, setAiPrompt] = useState("");
//   const [aiResult, setAiResult] = useState<AIGenerationResult | null>(null);
//   const [activeTab, setActiveTab] = useState("manual");
//   const { toast } = useToast();

//   // Fetch templates from backend
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

//   // Upload image to Cloudinary
//   const uploadToCloudinary = async (file: File | Blob): Promise<string> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append(
//       "upload_preset",
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
//     );

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env
//           .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
//         { method: "POST", body: formData }
//       );
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error?.message || "Upload failed");
//       return data.secure_url;
//     } catch (error) {
//       console.error("Cloudinary upload error:", error);
//       throw error;
//     }
//   };

//   // File change handler
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       setPreviewFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   // Add Template Modal
//   const openAddModal = () => {
//     setCurrentTemplate(null);
//     setTitle("");
//     setCategory("");
//     setPreviewFile(null);
//     setPreviewUrl(null);
//     setAiResult(null);
//     setAiPrompt("");
//     setIsModalOpen(true);
//     setActiveTab("manual");
//   };

//   // Edit Template Modal
//   const openEditModal = (template: PosterTemplate) => {
//     setCurrentTemplate(template);
//     setTitle(template.title);
//     setCategory(template.category);
//     setPreviewUrl(template.imageUrl);
//     setPreviewFile(null);
//     setAiResult(null);
//     setActiveTab("manual");
//     setIsModalOpen(true);
//   };

//   // Delete Template
//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(`/api/templates/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to delete template");
//       }

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

//   // Generate template with AI
//   const generateWithAI = async () => {
//     if (!aiPrompt.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Please describe what you want to generate",
//       });
//       return;
//     }

//     setAiLoading(true);
//     try {
//       // Generate placeholder image (replace with actual AI service)
//       const prompt = encodeURIComponent(aiPrompt);
//       const response = await fetch(
//         `https://source.unsplash.com/random/800x600/?${prompt}`
//       );
//       const blob = await response.blob();

//       // Upload to Cloudinary
//       const cloudinaryUrl = await uploadToCloudinary(blob);

//       // Set results
//       const aiResponse = {
//         imageUrl: cloudinaryUrl,
//         title: `AI Generated: ${aiPrompt.split(" ").slice(0, 3).join(" ")}`,
//         category: aiPrompt.split(" ").slice(0, 1)[0] || "General",
//         description: `Generated from: "${aiPrompt}"`,
//       };

//       setAiResult(aiResponse);
//       setTitle(aiResponse.title);
//       setCategory(aiResponse.category);
//       setPreviewUrl(aiResponse.imageUrl);

//       toast({
//         title: "Success",
//         description: "AI template generated and uploaded",
//       });
//     } catch (error) {
//       console.error("AI Generation error:", error);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to generate template",
//       });
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   // Submit handler
//   const handleSubmit = async () => {
//     if (!title.trim() || !category.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Title and category are required",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       let imageUrl = previewUrl;

//       // Upload new images
//       if (previewFile) {
//         imageUrl = await uploadToCloudinary(previewFile);
//       }

//       // Save to database
//       const url = currentTemplate
//         ? `/api/templates/${currentTemplate._id}`
//         : "/api/templates";

//       const method = currentTemplate ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title,
//           category,
//           imageUrl,
//         }),
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.error || "Save failed");

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
//         description: `Template ${currentTemplate ? "updated" : "created"}`,
//       });
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Operation failed",
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
//                     <div className="relative w-24 h-16">
//                       {template.imageUrl ? (
//                         <img
//                           src={template.imageUrl}
//                           alt={template.title}
//                           className="rounded-md border object-cover w-full h-full"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-muted rounded-md flex items-center justify-center border">
//                           <ImagePlus size={24} />
//                         </div>
//                       )}
//                     </div>
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
//         <DialogContent className="sm:max-w-[625px]">
//           <DialogHeader>
//             <DialogTitle>
//               {currentTemplate ? "Edit" : "Add New"} Template
//             </DialogTitle>
//             <DialogDescription>
//               {currentTemplate
//                 ? "Update the template details."
//                 : "Create a new poster template manually or with AI assistance."}
//             </DialogDescription>
//           </DialogHeader>

//           <Tabs
//             value={activeTab}
//             onValueChange={setActiveTab}
//             className="w-full"
//           >
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="manual">Manual Creation</TabsTrigger>
//               <TabsTrigger value="ai">AI Generation</TabsTrigger>
//             </TabsList>

//             <TabsContent value="manual">
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="title" className="text-right">
//                     Title
//                   </Label>
//                   <Input
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="col-span-3"
//                     placeholder="e.g. Summer Sale"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="category" className="text-right">
//                     Category
//                   </Label>
//                   <Input
//                     id="category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="col-span-3"
//                     placeholder="e.g. Promotional"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="preview" className="text-right">
//                     Preview Image
//                   </Label>
//                   <div className="col-span-3">
//                     <Input
//                       id="preview"
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       className="mb-2"
//                     />
//                     {previewUrl ? (
//                       <div className="relative w-48 h-32">
//                         <img
//                           src={previewUrl}
//                           alt="Preview"
//                           className="rounded-md border object-cover w-full h-full"
//                         />
//                       </div>
//                     ) : (
//                       <div className="w-48 h-32 bg-muted rounded-md flex items-center justify-center border">
//                         <ImagePlus size={32} />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="ai">
//               <div className="grid gap-4 py-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="ai-prompt">Describe your template</Label>
//                   <Textarea
//                     id="ai-prompt"
//                     value={aiPrompt}
//                     onChange={(e) => setAiPrompt(e.target.value)}
//                     placeholder="e.g. A modern poster for a tech conference with futuristic elements"
//                     rows={3}
//                   />
//                   <p className="text-sm text-muted-foreground">
//                     Be as descriptive as possible for better results
//                   </p>
//                 </div>

//                 <Button
//                   onClick={generateWithAI}
//                   disabled={aiLoading}
//                   className="w-full"
//                 >
//                   <Sparkles className="mr-2 h-4 w-4" />
//                   {aiLoading ? "Generating..." : "Generate with AI"}
//                 </Button>

//                 {aiResult && (
//                   <div className="space-y-4 mt-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label className="text-right">Title</Label>
//                       <Input
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label className="text-right">Category</Label>
//                       <Input
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label className="text-right">Preview</Label>
//                       <div className="col-span-3">
//                         {previewUrl ? (
//                           <div className="relative w-full h-48">
//                             <img
//                               src={previewUrl}
//                               alt="AI Generated Preview"
//                               className="rounded-md border object-cover w-full h-full"
//                             />
//                           </div>
//                         ) : (
//                           <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center border">
//                             <ImagePlus size={32} />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     {aiResult.description && (
//                       <div className="text-sm text-muted-foreground p-2 bg-muted rounded">
//                         <p>{aiResult.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>

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
