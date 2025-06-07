// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import {
//   BellRing,
//   ShieldCheck,
//   LayoutTemplate,
//   Image as ImageIcon,
//   Users,
//   Mail,
//   MessageSquare,
//   Settings as SettingsIcon,
// } from "lucide-react";

// export default function SettingsPage() {
//   // KYC Settings
//   const [autoApproveKyc, setAutoApproveKyc] = useState(false);
//   const [kycEmailAlerts, setKycEmailAlerts] = useState(true);

//   // Template Settings
//   const [allowTemplateCreation, setAllowTemplateCreation] = useState(true);
//   const [templateReviewRequired, setTemplateReviewRequired] = useState(false);

//   // Poster Settings
//   const [posterModeration, setPosterModeration] = useState(true);
//   const [posterEmailAlerts, setPosterEmailAlerts] = useState(false);

//   // User Management Settings
//   const [enableUserRegistration, setEnableUserRegistration] = useState(true);
//   const [userEmailVerification, setUserEmailVerification] = useState(true);

//   // Notification Settings
//   const [emailNotifications, setEmailNotifications] = useState(true);
//   const [pushNotifications, setPushNotifications] = useState(false);
//   const [smsNotifications, setSmsNotifications] = useState(false);

//   const { toast } = useToast();

//   const handleSaveChanges = () => {
//     // Here you would typically save these settings to a backend
//     console.log("Settings saved:", {
//       autoApproveKyc,
//       kycEmailAlerts,
//       allowTemplateCreation,
//       templateReviewRequired,
//       posterModeration,
//       posterEmailAlerts,
//       enableUserRegistration,
//       userEmailVerification,
//       emailNotifications,
//       pushNotifications,
//       smsNotifications,
//     });
//     toast({
//       title: "Settings Saved",
//       description: "Your preferences have been updated.",
//     });
//   };

//   return (
//     <div className="space-y-8 max-w-3xl mx-auto">
//       {/* Page Title */}
//       <div className="flex items-center gap-3 mb-2">
//         <SettingsIcon className="h-7 w-7 text-primary" />
//         <h1 className="text-3xl font-bold font-headline">Admin Settings</h1>
//       </div>
//       <p className="text-muted-foreground mb-6">
//         Configure how PosterBuilder Pro works for your team.
//       </p>

//       {/* KYC Settings */}
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-xl">
//             <ShieldCheck className="h-6 w-6 text-blue-600" />
//             KYC Settings
//           </CardTitle>
//           <CardDescription>
//             Manage KYC verification and notifications.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6 pt-4">
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
//             <div>
//               <Label htmlFor="auto-approve-kyc" className="font-medium">
//                 Auto-approve KYC
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 Automatically approve KYC if all documents are valid.
//               </p>
//             </div>
//             <Switch
//               id="auto-approve-kyc"
//               checked={autoApproveKyc}
//               onCheckedChange={setAutoApproveKyc}
//             />
//           </div>
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
//             <div>
//               <Label htmlFor="kyc-email-alerts" className="font-medium">
//                 Email Alerts for KYC
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 Notify admin by email when a new KYC is submitted.
//               </p>
//             </div>
//             <Switch
//               id="kyc-email-alerts"
//               checked={kycEmailAlerts}
//               onCheckedChange={setKycEmailAlerts}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Template Settings */}
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-xl">
//             <LayoutTemplate className="h-6 w-6 text-purple-600" />
//             Template Settings
//           </CardTitle>
//           <CardDescription>
//             Control template creation and review process.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6 pt-4">
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-purple-50/50 transition-colors">
//             <div>
//               <Label htmlFor="allow-template-creation" className="font-medium">
//                 Allow Template Creation
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 Enable users to create their own templates.
//               </p>
//             </div>
//             <Switch
//               id="allow-template-creation"
//               checked={allowTemplateCreation}
//               onCheckedChange={setAllowTemplateCreation}
//             />
//           </div>
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-purple-50/50 transition-colors">
//             <div>
//               <Label htmlFor="template-review-required" className="font-medium">
//                 Require Admin Review
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 New templates must be approved by an admin before use.
//               </p>
//             </div>
//             <Switch
//               id="template-review-required"
//               checked={templateReviewRequired}
//               onCheckedChange={setTemplateReviewRequired}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Poster Settings */}
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-xl">
//             <ImageIcon className="h-6 w-6 text-pink-600" />
//             Poster Settings
//           </CardTitle>
//           <CardDescription>
//             Manage poster moderation and notifications.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6 pt-4">
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-pink-50/50 transition-colors">
//             <div>
//               <Label htmlFor="poster-moderation" className="font-medium">
//                 Enable Poster Moderation
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 Require admin approval before posters go live.
//               </p>
//             </div>
//             <Switch
//               id="poster-moderation"
//               checked={posterModeration}
//               onCheckedChange={setPosterModeration}
//             />
//           </div>
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-pink-50/50 transition-colors">
//             <div>
//               <Label htmlFor="poster-email-alerts" className="font-medium">
//                 Email Alerts for Posters
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 Notify admin by email when a new poster is created.
//               </p>
//             </div>
//             <Switch
//               id="poster-email-alerts"
//               checked={posterEmailAlerts}
//               onCheckedChange={setPosterEmailAlerts}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* User Management Settings */}
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-xl">
//             <Users className="h-6 w-6 text-green-600" />
//             User Management
//           </CardTitle>
//           <CardDescription>
//             Control user registration and verification.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6 pt-4">
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-green-50/50 transition-colors">
//             <div>
//               <Label htmlFor="enable-user-registration" className="font-medium">
//                 Enable User Registration
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 Allow new users to sign up for PosterBuilder Pro.
//               </p>
//             </div>
//             <Switch
//               id="enable-user-registration"
//               checked={enableUserRegistration}
//               onCheckedChange={setEnableUserRegistration}
//             />
//           </div>
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-green-50/50 transition-colors">
//             <div>
//               <Label htmlFor="user-email-verification" className="font-medium">
//                 Require Email Verification
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 Users must verify their email address to activate their account.
//               </p>
//             </div>
//             <Switch
//               id="user-email-verification"
//               checked={userEmailVerification}
//               onCheckedChange={setUserEmailVerification}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Notification Settings */}
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-xl">
//             <BellRing className="h-6 w-6 text-yellow-500" />
//             Notification Preferences
//           </CardTitle>
//           <CardDescription>
//             Choose how you receive notifications from PosterBuilder Pro.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6 pt-4">
//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-yellow-50/50 transition-colors">
//             <div className="flex items-center">
//               <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
//               <div>
//                 <Label htmlFor="email-notifications" className="font-medium">
//                   Email Notifications
//                 </Label>
//                 <p className="text-sm text-muted-foreground">
//                   Receive important updates and alerts via email.
//                 </p>
//               </div>
//             </div>
//             <Switch
//               id="email-notifications"
//               checked={emailNotifications}
//               onCheckedChange={setEmailNotifications}
//               aria-label="Toggle email notifications"
//             />
//           </div>

//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-yellow-50/50 transition-colors">
//             <div className="flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-3 text-muted-foreground lucide lucide-smartphone-nfc"
//               >
//                 <rect width="10" height="18" x="7" y="3" rx="2" />
//                 <path d="M12 19.5v.01" />
//                 <path d="M4 8c-1.5 2.5-1.5 5.5 0 8" />
//                 <path d="M20 8c1.5 2.5 1.5 5.5 0 8" />
//               </svg>
//               <div>
//                 <Label htmlFor="push-notifications" className="font-medium">
//                   Push Notifications
//                 </Label>
//                 <p className="text-sm text-muted-foreground">
//                   Get real-time alerts directly on your device (coming soon).
//                 </p>
//               </div>
//             </div>
//             <Switch
//               id="push-notifications"
//               checked={pushNotifications}
//               onCheckedChange={setPushNotifications}
//               disabled // Feature coming soon
//               aria-label="Toggle push notifications"
//             />
//           </div>

//           <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-yellow-50/50 transition-colors">
//             <div className="flex items-center">
//               <MessageSquare className="mr-3 h-5 w-5 text-muted-foreground" />
//               <div>
//                 <Label htmlFor="sms-notifications" className="font-medium">
//                   SMS Notifications
//                 </Label>
//                 <p className="text-sm text-muted-foreground">
//                   Receive critical alerts via SMS (coming soon).
//                 </p>
//               </div>
//             </div>
//             <Switch
//               id="sms-notifications"
//               checked={smsNotifications}
//               onCheckedChange={setSmsNotifications}
//               disabled // Feature coming soon
//               aria-label="Toggle SMS notifications"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Save Button */}
//       <div className="pt-4 flex justify-end">
//         <Button size="lg" onClick={handleSaveChanges}>
//           Save All Changes
//         </Button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import {
//   BellRing,
//   Mail,
//   MessageSquare,
//   User,
//   Image,
//   FileText,
//   Shield,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const API_BASE_URL = "https://publicityposterbackend.onrender.com";

// interface Settings {
//   notifications: {
//     email: boolean;
//     push: boolean;
//     sms: boolean;
//   };
//   kyc: {
//     autoApprove: boolean;
//     requiredFields: string[];
//   };
//   templates: {
//     aiGeneration: boolean;
//     maxUploadSizeMB: number;
//   };
//   posters: {
//     approvalRequired: boolean;
//     maxPerUser: number;
//   };
//   users: {
//     signupEnabled: boolean;
//     emailVerificationRequired: boolean;
//   };
// }

// export default function SettingsPage() {
//   const [settings, setSettings] = useState<Settings>({
//     notifications: {
//       email: true,
//       push: false,
//       sms: false,
//     },
//     kyc: {
//       autoApprove: false,
//       requiredFields: ["idProof", "addressProof"],
//     },
//     templates: {
//       aiGeneration: true,
//       maxUploadSizeMB: 5,
//     },
//     posters: {
//       approvalRequired: false,
//       maxPerUser: 10,
//     },
//     users: {
//       signupEnabled: true,
//       emailVerificationRequired: true,
//     },
//   });
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/admin/settings`);
//         if (!res.ok) throw new Error("Failed to fetch settings");
//         const data = await res.json();
//         setSettings(data);
//       } catch (error) {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description:
//             error instanceof Error ? error.message : "Failed to load settings",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const handleSaveChanges = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/api/admin/settings`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(settings),
//       });

//       if (!res.ok) throw new Error("Failed to save settings");

//       toast({
//         title: "Success",
//         description: "Settings have been updated successfully",
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Failed to save settings",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateSetting = (section: keyof Settings, key: string, value: any) => {
//     setSettings((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [key]: value,
//       },
//     }));
//   };

//   const toggleRequiredField = (field: string) => {
//     const newFields = settings.kyc.requiredFields.includes(field)
//       ? settings.kyc.requiredFields.filter((f) => f !== field)
//       : [...settings.kyc.requiredFields, field];

//     updateSetting("kyc", "requiredFields", newFields);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 max-w-4xl mx-auto">
//       <Tabs defaultValue="notifications" className="w-full">
//         <TabsList className="grid w-full grid-cols-5">
//           <TabsTrigger value="notifications">
//             <BellRing className="h-4 w-4 mr-2" /> Notifications
//           </TabsTrigger>
//           <TabsTrigger value="kyc">
//             <FileText className="h-4 w-4 mr-2" /> KYC
//           </TabsTrigger>
//           <TabsTrigger value="templates">
//             <Image className="h-4 w-4 mr-2" /> Templates
//           </TabsTrigger>
//           <TabsTrigger value="posters">
//             <Image className="h-4 w-4 mr-2" /> Posters
//           </TabsTrigger>
//           <TabsTrigger value="users">
//             <User className="h-4 w-4 mr-2" /> Users
//           </TabsTrigger>
//         </TabsList>

//         {/* Notifications Tab */}
//         <TabsContent value="notifications">
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl font-headline flex items-center">
//                 <BellRing className="mr-3 h-6 w-6 text-primary" />
//                 Notification Settings
//               </CardTitle>
//               <CardDescription>
//                 Manage how you receive notifications from PosterBuilder Pro.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-8 pt-6">
//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <Label
//                       htmlFor="email-notifications"
//                       className="text-base font-medium"
//                     >
//                       Email Notifications
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Receive important updates and alerts via email.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="email-notifications"
//                   checked={settings.notifications.email}
//                   onCheckedChange={(val) =>
//                     updateSetting("notifications", "email", val)
//                   }
//                   aria-label="Toggle email notifications"
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="mr-3 text-muted-foreground lucide lucide-smartphone-nfc"
//                   >
//                     <rect width="10" height="18" x="7" y="3" rx="2" />
//                     <path d="M12 19.5v.01" />
//                     <path d="M4 8c-1.5 2.5-1.5 5.5 0 8" />
//                     <path d="M20 8c1.5 2.5 1.5 5.5 0 8" />
//                   </svg>
//                   <div>
//                     <Label
//                       htmlFor="push-notifications"
//                       className="text-base font-medium"
//                     >
//                       Push Notifications
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Get real-time alerts directly on your device.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="push-notifications"
//                   checked={settings.notifications.push}
//                   onCheckedChange={(val) =>
//                     updateSetting("notifications", "push", val)
//                   }
//                   aria-label="Toggle push notifications"
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <MessageSquare className="mr-3 h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <Label
//                       htmlFor="sms-notifications"
//                       className="text-base font-medium"
//                     >
//                       SMS Notifications
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Receive critical alerts via SMS.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="sms-notifications"
//                   checked={settings.notifications.sms}
//                   onCheckedChange={(val) =>
//                     updateSetting("notifications", "sms", val)
//                   }
//                   aria-label="Toggle SMS notifications"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* KYC Tab */}
//         <TabsContent value="kyc">
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl font-headline flex items-center">
//                 <FileText className="mr-3 h-6 w-6 text-primary" />
//                 KYC Settings
//               </CardTitle>
//               <CardDescription>
//                 Configure Know Your Customer verification requirements.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-8 pt-6">
//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <Shield className="mr-3 h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <Label
//                       htmlFor="auto-approve"
//                       className="text-base font-medium"
//                     >
//                       Auto-approve KYC
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Automatically approve KYC submissions without manual
//                       review.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="auto-approve"
//                   checked={settings.kyc.autoApprove}
//                   onCheckedChange={(val) =>
//                     updateSetting("kyc", "autoApprove", val)
//                   }
//                   aria-label="Toggle auto-approve KYC"
//                 />
//               </div>

//               <div className="p-4 border rounded-lg shadow-sm bg-background">
//                 <Label className="text-base font-medium">
//                   Required KYC Documents
//                 </Label>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   Select which documents users must submit for KYC verification.
//                 </p>

//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="id-proof">Government ID Proof</Label>
//                     <Switch
//                       id="id-proof"
//                       checked={settings.kyc.requiredFields.includes("idProof")}
//                       onCheckedChange={() => toggleRequiredField("idProof")}
//                     />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="address-proof">Address Proof</Label>
//                     <Switch
//                       id="address-proof"
//                       checked={settings.kyc.requiredFields.includes(
//                         "addressProof"
//                       )}
//                       onCheckedChange={() =>
//                         toggleRequiredField("addressProof")
//                       }
//                     />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="selfie">Selfie with ID</Label>
//                     <Switch
//                       id="selfie"
//                       checked={settings.kyc.requiredFields.includes("selfie")}
//                       onCheckedChange={() => toggleRequiredField("selfie")}
//                     />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="business-proof">
//                       Business Proof (for companies)
//                     </Label>
//                     <Switch
//                       id="business-proof"
//                       checked={settings.kyc.requiredFields.includes(
//                         "businessProof"
//                       )}
//                       onCheckedChange={() =>
//                         toggleRequiredField("businessProof")
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Templates Tab */}
//         <TabsContent value="templates">
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl font-headline flex items-center">
//                 <Image className="mr-3 h-6 w-6 text-primary" />
//                 Template Settings
//               </CardTitle>
//               <CardDescription>
//                 Configure template creation and management options.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-8 pt-6">
//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="mr-3 text-muted-foreground lucide lucide-sparkles"
//                   >
//                     <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
//                     <path d="M5 3v4" />
//                     <path d="M19 17v4" />
//                     <path d="M3 5h4" />
//                     <path d="M17 19h4" />
//                   </svg>
//                   <div>
//                     <Label
//                       htmlFor="ai-generation"
//                       className="text-base font-medium"
//                     >
//                       Enable AI Template Generation
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Allow users to generate templates using AI.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="ai-generation"
//                   checked={settings.templates.aiGeneration}
//                   onCheckedChange={(val) =>
//                     updateSetting("templates", "aiGeneration", val)
//                   }
//                   aria-label="Toggle AI template generation"
//                 />
//               </div>

//               <div className="p-4 border rounded-lg shadow-sm bg-background">
//                 <Label
//                   htmlFor="max-upload-size"
//                   className="text-base font-medium block mb-2"
//                 >
//                   Maximum Template Upload Size
//                 </Label>
//                 <div className="flex items-center gap-4">
//                   <Input
//                     id="max-upload-size"
//                     type="number"
//                     value={settings.templates.maxUploadSizeMB}
//                     onChange={(e) =>
//                       updateSetting(
//                         "templates",
//                         "maxUploadSizeMB",
//                         parseInt(e.target.value) || 1
//                       )
//                     }
//                     min="1"
//                     max="20"
//                     className="w-24"
//                   />
//                   <span className="text-sm text-muted-foreground">MB</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Larger files may affect system performance. Recommended: 5MB
//                   or less.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Posters Tab */}
//         <TabsContent value="posters">
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl font-headline flex items-center">
//                 <Image className="mr-3 h-6 w-6 text-primary" />
//                 Poster Settings
//               </CardTitle>
//               <CardDescription>
//                 Configure poster creation and publishing rules.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-8 pt-6">
//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <Shield className="mr-3 h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <Label
//                       htmlFor="approval-required"
//                       className="text-base font-medium"
//                     >
//                       Require Admin Approval
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Posters must be approved by an admin before publishing.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="approval-required"
//                   checked={settings.posters.approvalRequired}
//                   onCheckedChange={(val) =>
//                     updateSetting("posters", "approvalRequired", val)
//                   }
//                   aria-label="Toggle poster approval requirement"
//                 />
//               </div>

//               <div className="p-4 border rounded-lg shadow-sm bg-background">
//                 <Label
//                   htmlFor="max-posters"
//                   className="text-base font-medium block mb-2"
//                 >
//                   Maximum Posters Per User
//                 </Label>
//                 <Select
//                   value={settings.posters.maxPerUser.toString()}
//                   onValueChange={(val) =>
//                     updateSetting("posters", "maxPerUser", parseInt(val))
//                   }
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select limit" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="5">5 posters</SelectItem>
//                     <SelectItem value="10">10 posters</SelectItem>
//                     <SelectItem value="20">20 posters</SelectItem>
//                     <SelectItem value="50">50 posters</SelectItem>
//                     <SelectItem value="100">100 posters</SelectItem>
//                     <SelectItem value="0">Unlimited</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Set the maximum number of posters each user can create.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Users Tab */}
//         <TabsContent value="users">
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl font-headline flex items-center">
//                 <User className="mr-3 h-6 w-6 text-primary" />
//                 User Management Settings
//               </CardTitle>
//               <CardDescription>
//                 Configure user registration and authentication options.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-8 pt-6">
//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <User className="mr-3 h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <Label
//                       htmlFor="signup-enabled"
//                       className="text-base font-medium"
//                     >
//                       Enable User Signup
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Allow new users to register accounts.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="signup-enabled"
//                   checked={settings.users.signupEnabled}
//                   onCheckedChange={(val) =>
//                     updateSetting("users", "signupEnabled", val)
//                   }
//                   aria-label="Toggle user signup"
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center">
//                   <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <Label
//                       htmlFor="email-verification"
//                       className="text-base font-medium"
//                     >
//                       Require Email Verification
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       Users must verify their email address before accessing the
//                       platform.
//                     </p>
//                   </div>
//                 </div>
//                 <Switch
//                   id="email-verification"
//                   checked={settings.users.emailVerificationRequired}
//                   onCheckedChange={(val) =>
//                     updateSetting("users", "emailVerificationRequired", val)
//                   }
//                   aria-label="Toggle email verification requirement"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <div className="flex justify-end">
//         <Button onClick={handleSaveChanges} disabled={loading}>
//           {loading ? "Saving..." : "Save All Settings"}
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  BellRing,
  ShieldCheck,
  LayoutTemplate,
  Image as ImageIcon,
  Users,
  Mail,
  MessageSquare,
  Settings as SettingsIcon,
  FileText,
  Shield,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE_URL = "https://publicityposterbackend.onrender.com";

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    kycEmailAlerts: boolean;
    posterEmailAlerts: boolean;
  };
  kyc: {
    autoApprove: boolean;
    requiredFields: string[];
  };
  templates: {
    aiGeneration: boolean;
    maxUploadSizeMB: number;
    allowCreation: boolean;
    reviewRequired: boolean;
  };
  posters: {
    approvalRequired: boolean;
    maxPerUser: number;
    moderation: boolean;
  };
  users: {
    signupEnabled: boolean;
    emailVerificationRequired: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: false,
      sms: false,
      kycEmailAlerts: true,
      posterEmailAlerts: false,
    },
    kyc: {
      autoApprove: false,
      requiredFields: ["idProof", "addressProof"],
    },
    templates: {
      aiGeneration: true,
      maxUploadSizeMB: 5,
      allowCreation: true,
      reviewRequired: false,
    },
    posters: {
      approvalRequired: false,
      maxPerUser: 10,
      moderation: true,
    },
    users: {
      signupEnabled: true,
      emailVerificationRequired: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/admin/settings`);
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to load settings",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      toast({
        title: "Success",
        description: "Settings have been updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save settings",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (section: keyof Settings, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const toggleRequiredField = (field: string) => {
    const newFields = settings.kyc.requiredFields.includes(field)
      ? settings.kyc.requiredFields.filter((f) => f !== field)
      : [...settings.kyc.requiredFields, field];

    updateSetting("kyc", "requiredFields", newFields);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Admin Settings</h1>
      </div>
      <p className="text-muted-foreground">
        Configure how PosterBuilder Pro works for your team.
      </p>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">
            <BellRing className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="kyc">
            <ShieldCheck className="h-4 w-4 mr-2" /> KYC
          </TabsTrigger>
          <TabsTrigger value="templates">
            <LayoutTemplate className="h-4 w-4 mr-2" /> Templates
          </TabsTrigger>
          <TabsTrigger value="posters">
            <ImageIcon className="h-4 w-4 mr-2" /> Posters
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" /> Users
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BellRing className="h-6 w-6 text-primary" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage how you receive notifications from PosterBuilder Pro.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label
                      htmlFor="email-notifications"
                      className="font-medium"
                    >
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates and alerts via email.
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(val) =>
                    updateSetting("notifications", "email", val)
                  }
                  aria-label="Toggle email notifications"
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 text-muted-foreground lucide lucide-smartphone-nfc"
                  >
                    <rect width="10" height="18" x="7" y="3" rx="2" />
                    <path d="M12 19.5v.01" />
                    <path d="M4 8c-1.5 2.5-1.5 5.5 0 8" />
                    <path d="M20 8c1.5 2.5 1.5 5.5 0 8" />
                  </svg>
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get real-time alerts directly on your device.
                    </p>
                  </div>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(val) =>
                    updateSetting("notifications", "push", val)
                  }
                  aria-label="Toggle push notifications"
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="sms-notifications" className="font-medium">
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via SMS.
                    </p>
                  </div>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onCheckedChange={(val) =>
                    updateSetting("notifications", "sms", val)
                  }
                  aria-label="Toggle SMS notifications"
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
                <div className="flex items-center">
                  <ShieldCheck className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="kyc-email-alerts" className="font-medium">
                      KYC Email Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Notify admin by email when a new KYC is submitted.
                    </p>
                  </div>
                </div>
                <Switch
                  id="kyc-email-alerts"
                  checked={settings.notifications.kycEmailAlerts}
                  onCheckedChange={(val) =>
                    updateSetting("notifications", "kycEmailAlerts", val)
                  }
                  aria-label="Toggle KYC email alerts"
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
                <div className="flex items-center">
                  <ImageIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label
                      htmlFor="poster-email-alerts"
                      className="font-medium"
                    >
                      Poster Email Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Notify admin by email when a new poster is created.
                    </p>
                  </div>
                </div>
                <Switch
                  id="poster-email-alerts"
                  checked={settings.notifications.posterEmailAlerts}
                  onCheckedChange={(val) =>
                    updateSetting("notifications", "posterEmailAlerts", val)
                  }
                  aria-label="Toggle poster email alerts"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Tab */}
        <TabsContent value="kyc">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-6 w-6 text-primary" />
                KYC Settings
              </CardTitle>
              <CardDescription>
                Manage KYC verification and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-blue-50/50 transition-colors">
                <div>
                  <Label htmlFor="auto-approve-kyc" className="font-medium">
                    Auto-approve KYC
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve KYC if all documents are valid.
                  </p>
                </div>
                <Switch
                  id="auto-approve-kyc"
                  checked={settings.kyc.autoApprove}
                  onCheckedChange={(val) =>
                    updateSetting("kyc", "autoApprove", val)
                  }
                />
              </div>

              <div className="p-3 border rounded-lg bg-background">
                <Label className="font-medium">Required KYC Documents</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select which documents users must submit for KYC verification.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="id-proof">Government ID Proof</Label>
                    <Switch
                      id="id-proof"
                      checked={settings.kyc.requiredFields.includes("idProof")}
                      onCheckedChange={() => toggleRequiredField("idProof")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="address-proof">Address Proof</Label>
                    <Switch
                      id="address-proof"
                      checked={settings.kyc.requiredFields.includes(
                        "addressProof"
                      )}
                      onCheckedChange={() =>
                        toggleRequiredField("addressProof")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="selfie">Selfie with ID</Label>
                    <Switch
                      id="selfie"
                      checked={settings.kyc.requiredFields.includes("selfie")}
                      onCheckedChange={() => toggleRequiredField("selfie")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="business-proof">
                      Business Proof (for companies)
                    </Label>
                    <Switch
                      id="business-proof"
                      checked={settings.kyc.requiredFields.includes(
                        "businessProof"
                      )}
                      onCheckedChange={() =>
                        toggleRequiredField("businessProof")
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <LayoutTemplate className="h-6 w-6 text-primary" />
                Template Settings
              </CardTitle>
              <CardDescription>
                Control template creation and review process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-purple-50/50 transition-colors">
                <div>
                  <Label
                    htmlFor="allow-template-creation"
                    className="font-medium"
                  >
                    Allow Template Creation
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable users to create their own templates.
                  </p>
                </div>
                <Switch
                  id="allow-template-creation"
                  checked={settings.templates.allowCreation}
                  onCheckedChange={(val) =>
                    updateSetting("templates", "allowCreation", val)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-purple-50/50 transition-colors">
                <div>
                  <Label
                    htmlFor="template-review-required"
                    className="font-medium"
                  >
                    Require Admin Review
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    New templates must be approved by an admin before use.
                  </p>
                </div>
                <Switch
                  id="template-review-required"
                  checked={settings.templates.reviewRequired}
                  onCheckedChange={(val) =>
                    updateSetting("templates", "reviewRequired", val)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-purple-50/50 transition-colors">
                <div>
                  <Label htmlFor="ai-generation" className="font-medium">
                    Enable AI Template Generation
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to generate templates using AI.
                  </p>
                </div>
                <Switch
                  id="ai-generation"
                  checked={settings.templates.aiGeneration}
                  onCheckedChange={(val) =>
                    updateSetting("templates", "aiGeneration", val)
                  }
                />
              </div>

              <div className="p-3 border rounded-lg bg-background">
                <Label
                  htmlFor="max-upload-size"
                  className="font-medium block mb-2"
                >
                  Maximum Template Upload Size
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="max-upload-size"
                    type="number"
                    value={settings.templates.maxUploadSizeMB}
                    onChange={(e) =>
                      updateSetting(
                        "templates",
                        "maxUploadSizeMB",
                        parseInt(e.target.value) || 1
                      )
                    }
                    min="1"
                    max="20"
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">MB</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Larger files may affect system performance. Recommended: 5MB
                  or less.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Posters Tab */}
        <TabsContent value="posters">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ImageIcon className="h-6 w-6 text-primary" />
                Poster Settings
              </CardTitle>
              <CardDescription>
                Manage poster moderation and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-pink-50/50 transition-colors">
                <div>
                  <Label htmlFor="poster-moderation" className="font-medium">
                    Enable Poster Moderation
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Require admin approval before posters go live.
                  </p>
                </div>
                <Switch
                  id="poster-moderation"
                  checked={settings.posters.moderation}
                  onCheckedChange={(val) =>
                    updateSetting("posters", "moderation", val)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-pink-50/50 transition-colors">
                <div>
                  <Label htmlFor="approval-required" className="font-medium">
                    Require Admin Approval
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Posters must be approved by an admin before publishing.
                  </p>
                </div>
                <Switch
                  id="approval-required"
                  checked={settings.posters.approvalRequired}
                  onCheckedChange={(val) =>
                    updateSetting("posters", "approvalRequired", val)
                  }
                />
              </div>

              <div className="p-3 border rounded-lg bg-background">
                <Label htmlFor="max-posters" className="font-medium block mb-2">
                  Maximum Posters Per User
                </Label>
                <Select
                  value={settings.posters.maxPerUser.toString()}
                  onValueChange={(val) =>
                    updateSetting("posters", "maxPerUser", parseInt(val))
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 posters</SelectItem>
                    <SelectItem value="10">10 posters</SelectItem>
                    <SelectItem value="20">20 posters</SelectItem>
                    <SelectItem value="50">50 posters</SelectItem>
                    <SelectItem value="100">100 posters</SelectItem>
                    <SelectItem value="0">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Set the maximum number of posters each user can create.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-6 w-6 text-primary" />
                User Management
              </CardTitle>
              <CardDescription>
                Control user registration and verification.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-green-50/50 transition-colors">
                <div>
                  <Label
                    htmlFor="enable-user-registration"
                    className="font-medium"
                  >
                    Enable User Registration
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to sign up for PosterBuilder Pro.
                  </p>
                </div>
                <Switch
                  id="enable-user-registration"
                  checked={settings.users.signupEnabled}
                  onCheckedChange={(val) =>
                    updateSetting("users", "signupEnabled", val)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-green-50/50 transition-colors">
                <div>
                  <Label
                    htmlFor="user-email-verification"
                    className="font-medium"
                  >
                    Require Email Verification
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Users must verify their email address to activate their
                    account.
                  </p>
                </div>
                <Switch
                  id="user-email-verification"
                  checked={settings.users.emailVerificationRequired}
                  onCheckedChange={(val) =>
                    updateSetting("users", "emailVerificationRequired", val)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="pt-4 flex justify-end">
        <Button size="lg" onClick={handleSaveChanges} disabled={loading}>
          {loading ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}
