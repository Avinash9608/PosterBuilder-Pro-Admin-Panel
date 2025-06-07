// // "use client"

// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// // import { Users, FileText, Image as ImageIcon, Activity } from "lucide-react"
// // import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
// // import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// // const kycData = [
// //   { status: "Pending", count: 120, fill: "var(--color-pending)" },
// //   { status: "Approved", count: 850, fill: "var(--color-approved)" },
// //   { status: "Rejected", count: 30, fill: "var(--color-rejected)" },
// // ];

// // const chartConfig = {
// //   count: {
// //     label: "Count",
// //   },
// //   pending: {
// //     label: "Pending",
// //     color: "hsl(var(--chart-1))",
// //   },
// //   approved: {
// //     label: "Approved",
// //     color: "hsl(var(--chart-2))",
// //   },
// //   rejected: {
// //     label: "Rejected",
// //     color: "hsl(var(--chart-5))",
// //   },
// // } satisfies import("@/components/ui/chart").ChartConfig;

// // export default function DashboardPage() {
// //   return (
// //     <div className="space-y-6">
// //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
// //         <Card className="shadow-lg">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Posters Created</CardTitle>
// //             <ImageIcon className="h-5 w-5 text-primary" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">10,234</div>
// //             <p className="text-xs text-muted-foreground">+5.2% from last month</p>
// //           </CardContent>
// //         </Card>
// //         <Card className="shadow-lg">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
// //             <Users className="h-5 w-5 text-primary" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">1,502</div>
// //             <p className="text-xs text-muted-foreground">+12.1% from last month</p>
// //           </CardContent>
// //         </Card>
// //         <Card className="shadow-lg">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">KYC Pending</CardTitle>
// //             <FileText className="h-5 w-5 text-yellow-500" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">120</div>
// //             <p className="text-xs text-muted-foreground">Requires attention</p>
// //           </CardContent>
// //         </Card>
// //         <Card className="shadow-lg">
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">System Activity</CardTitle>
// //             <Activity className="h-5 w-5 text-accent" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">High</div>
// //             <p className="text-xs text-muted-foreground">Last 24 hours</p>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       <Card className="shadow-lg">
// //         <CardHeader>
// //           <CardTitle>KYC Status Overview</CardTitle>
// //           <CardDescription>Current distribution of KYC statuses.</CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <ChartContainer config={chartConfig} className="h-[300px] w-full">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={kycData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
// //                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
// //                 <XAxis dataKey="status" tickLine={false} axisLine={false} />
// //                 <YAxis tickLine={false} axisLine={false} />
// //                 <Tooltip
// //                   cursor={{ fill: "hsl(var(--muted))" }}
// //                   content={<ChartTooltipContent />}
// //                 />
// //                 <Bar dataKey="count" radius={[4, 4, 0, 0]} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </ChartContainer>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   )
// // }
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Mail,
//   CheckCircle,
// } from "lucide-react";
// import {
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Pie,
//   PieChart,
//   Cell,
//   LineChart,
//   Line,
// } from "recharts";
// import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";

// const API_BASE_URL = "https://publicityposterbackend.onrender.com";

// // --- Type Definitions ---
// type KycStatus = "pending" | "approved" | "rejected";

// interface User {
//   kycStatus: KycStatus;
//   email?: string;
// }

// interface Poster {
//   createdAt: string;
//   template?: {
//     _id: string;
//   };
// }

// interface Template {
//   _id: string;
//   title: string;
// }

// interface Query {
//   replied: boolean;
// }

// interface KycChartData {
//   status: string;
//   count: number;
//   fill: string;
// }

// interface PosterGrowthData {
//   date: string;
//   posters: number;
// }

// interface TemplateUsageData {
//   name: string;
//   value: number;
// }

// // --- Color Palette ---
// const COLORS = {
//   pending: "#F59E0B",
//   approved: "#10B981",
//   rejected: "#EF4444",
//   primary: "#3B82F6",
//   secondary: "#8B5CF6",
//   accent: "#EC4899",
// };

// export default function DashboardPage() {
//   const [stats, setStats] = useState({
//     totalPosters: 0,
//     totalUsers: 0,
//     pendingKyc: 0,
//     totalQueries: 0,
//     pendingQueries: 0,
//   });
//   const [kycData, setKycData] = useState<KycChartData[]>([]);
//   const [posterGrowth, setPosterGrowth] = useState<PosterGrowthData[]>([]);
//   const [templateUsage, setTemplateUsage] = useState<TemplateUsageData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Chart config for ChartContainer
//   const chartConfig = {
//     count: {
//       label: "Count",
//     },
//     pending: {
//       label: "Pending",
//       color: COLORS.pending,
//     },
//     approved: {
//       label: "Approved",
//       color: COLORS.approved,
//     },
//     rejected: {
//       label: "Rejected",
//       color: COLORS.rejected,
//     },
//   } as const;

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);

//         // Fetch all data in parallel
//         const [postersRes, usersRes, templatesRes, queriesRes] =
//           await Promise.all([
//             fetch(`${API_BASE_URL}/api/posters`),
//             fetch(`${API_BASE_URL}/api/admin/users`),
//             fetch(`${API_BASE_URL}/api/templates`),
//             fetch(`${API_BASE_URL}/api/contacts`),
//           ]);

//         if (
//           !postersRes.ok ||
//           !usersRes.ok ||
//           !templatesRes.ok ||
//           !queriesRes.ok
//         ) {
//           throw new Error("Failed to fetch dashboard data");
//         }

//         const postersData: Poster[] = await postersRes.json();
//         const usersData: User[] = await usersRes.json();
//         const templatesData: Template[] = await templatesRes.json();
//         const queriesData: { data: Query[] } = await queriesRes.json();

//         // Calculate KYC stats
//         const kycStats = usersData.reduce(
//           (acc: { [key in KycStatus]: number }, user: User) => {
//             acc[user.kycStatus] = (acc[user.kycStatus] || 0) + 1;
//             return acc;
//           },
//           { pending: 0, approved: 0, rejected: 0 }
//         );

//         // Prepare KYC data for chart
//         const formattedKycData: KycChartData[] = [
//           { status: "Pending", count: kycStats.pending, fill: COLORS.pending },
//           {
//             status: "Approved",
//             count: kycStats.approved,
//             fill: COLORS.approved,
//           },
//           {
//             status: "Rejected",
//             count: kycStats.rejected,
//             fill: COLORS.rejected,
//           },
//         ];

//         // Calculate poster growth (last 7 days)
//         const today = new Date();
//         const last7Days = Array.from({ length: 7 }, (_, i) => {
//           const date = new Date(today);
//           date.setDate(date.getDate() - (6 - i));
//           return date.toISOString().split("T")[0];
//         });

//         const postersByDay = postersData.reduce(
//           (acc: Record<string, number>, poster: Poster) => {
//             const date = new Date(poster.createdAt).toISOString().split("T")[0];
//             if (last7Days.includes(date)) {
//               acc[date] = (acc[date] || 0) + 1;
//             }
//             return acc;
//           },
//           {}
//         );

//         const growthData: PosterGrowthData[] = last7Days.map((date) => ({
//           date: new Date(date).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//           }),
//           posters: postersByDay[date] || 0,
//         }));

//         // Calculate template usage
//         const templateUsageCount = postersData.reduce(
//           (acc: Record<string, number>, poster: Poster) => {
//             if (poster.template && poster.template._id) {
//               acc[poster.template._id] = (acc[poster.template._id] || 0) + 1;
//             }
//             return acc;
//           },
//           {}
//         );

//         const topTemplates: TemplateUsageData[] = templatesData
//           .map((template) => ({
//             name: template.title,
//             value: templateUsageCount[template._id] || 0,
//           }))
//           .sort((a, b) => b.value - a.value)
//           .slice(0, 5);

//         // Calculate pending queries
//         const pendingQueries =
//           queriesData.data?.filter((query: Query) => !query.replied)?.length ||
//           0;

//         setStats({
//           totalPosters: postersData.length,
//           totalUsers: usersData.length,
//           pendingKyc: kycStats.pending,
//           totalQueries: queriesData.data?.length || 0,
//           pendingQueries,
//         });

//         setKycData(formattedKycData);
//         setPosterGrowth(growthData);
//         setTemplateUsage(topTemplates);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-red-500">
//           Error loading dashboard data: {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {/* Posters Created Card */}
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Posters Created
//             </CardTitle>
//             <ImageIcon className="h-5 w-5 text-primary" />
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <>
//                 <Skeleton className="h-8 w-24 mb-1" />
//                 <Skeleton className="h-4 w-32" />
//               </>
//             ) : (
//               <>
//                 <div className="text-2xl font-bold">{stats.totalPosters}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {posterGrowth.length > 1
//                     ? `${Math.round(
//                         ((posterGrowth[posterGrowth.length - 1].posters -
//                           posterGrowth[0].posters) /
//                           (posterGrowth[0].posters || 1)) *
//                           100
//                       )}% from last week`
//                     : "Loading trend data..."}
//                 </p>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Total Users Card */}
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-5 w-5 text-primary" />
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <>
//                 <Skeleton className="h-8 w-24 mb-1" />
//                 <Skeleton className="h-4 w-32" />
//               </>
//             ) : (
//               <>
//                 <div className="text-2xl font-bold">{stats.totalUsers}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {kycData.length
//                     ? `${Math.round(
//                         (kycData[1].count / (stats.totalUsers || 1)) * 100
//                       )}% approved`
//                     : "Loading KYC data..."}
//                 </p>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* KYC Pending Card */}
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">KYC Pending</CardTitle>
//             <FileText className="h-5 w-5 text-yellow-500" />
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <>
//                 <Skeleton className="h-8 w-24 mb-1" />
//                 <Skeleton className="h-4 w-32" />
//               </>
//             ) : (
//               <>
//                 <div className="text-2xl font-bold">{stats.pendingKyc}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {stats.pendingKyc > 0 ? "Requires attention" : "All clear!"}
//                 </p>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* User Queries Card */}
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">User Queries</CardTitle>
//             <Mail className="h-5 w-5 text-accent" />
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <>
//                 <Skeleton className="h-8 w-24 mb-1" />
//                 <Skeleton className="h-4 w-32" />
//               </>
//             ) : (
//               <>
//                 <div className="text-2xl font-bold">{stats.totalQueries}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {stats.pendingQueries} pending replies
//                 </p>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* KYC Status & Poster Growth */}
//       <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
//         {/* KYC Status Overview */}
//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>KYC Status Overview</CardTitle>
//             <CardDescription>
//               Current distribution of KYC statuses
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="h-[300px] flex items-center justify-center">
//                 <Skeleton className="h-full w-full" />
//               </div>
//             ) : (
//               <ChartContainer config={chartConfig} className="h-[300px] w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={kycData}
//                     margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="status" tickLine={false} axisLine={false} />
//                     <YAxis tickLine={false} axisLine={false} />
//                     <Tooltip
//                       cursor={{ fill: "hsl(var(--muted))" }}
//                       content={<ChartTooltipContent />}
//                     />
//                     <Bar dataKey="count" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartContainer>
//             )}
//           </CardContent>
//         </Card>

//         {/* Poster Growth */}
//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>Poster Creation Trend</CardTitle>
//             <CardDescription>
//               Posters created in the last 7 days
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="h-[300px] flex items-center justify-center">
//                 <Skeleton className="h-full w-full" />
//               </div>
//             ) : (
//               <div className="h-[300px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={posterGrowth}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" tickLine={false} axisLine={false} />
//                     <YAxis tickLine={false} axisLine={false} />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="posters"
//                       stroke={COLORS.primary}
//                       strokeWidth={2}
//                       dot={{ r: 4 }}
//                       activeDot={{ r: 6 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Template Usage & Recent Activity */}
//       <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
//         {/* Template Usage */}
//         <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50">
//           <CardHeader className="pb-0">
//             <CardTitle className="flex items-center gap-2 text-lg font-bold text-blue-700">
//               <ImageIcon className="h-6 w-6 text-blue-500" />
//               Top Templates
//             </CardTitle>
//             <CardDescription className="text-blue-400">
//               Most used poster templates this week
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="h-[300px] flex items-center justify-center">
//                 <Skeleton className="h-full w-full rounded-xl" />
//               </div>
//             ) : (
//               <div className="h-[300px] flex flex-col lg:flex-row items-center gap-6">
//                 <div className="flex-1">
//                   <ResponsiveContainer width="100%" height={220}>
//                     <PieChart>
//                       <Pie
//                         data={templateUsage}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) =>
//                           `${name} ${(percent * 100).toFixed(0)}%`
//                         }
//                       >
//                         {templateUsage.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={
//                               [
//                                 COLORS.primary,
//                                 COLORS.secondary,
//                                 COLORS.accent,
//                                 COLORS.pending,
//                                 COLORS.approved,
//                               ][index % 5]
//                             }
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="flex-1">
//                   <ul className="space-y-3">
//                     {templateUsage.map((item, idx) => (
//                       <li
//                         key={item.name}
//                         className="flex items-center gap-3 bg-white/60 rounded-lg px-3 py-2 shadow hover:shadow-lg transition"
//                       >
//                         <span
//                           className="inline-block w-3 h-3 rounded-full"
//                           style={{
//                             backgroundColor: [
//                               COLORS.primary,
//                               COLORS.secondary,
//                               COLORS.accent,
//                               COLORS.pending,
//                               COLORS.approved,
//                             ][idx % 5],
//                           }}
//                         />
//                         <span className="font-medium text-gray-700">
//                           {item.name}
//                         </span>
//                         <span className="ml-auto font-semibold text-blue-600">
//                           {item.value}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Recent Activity */}
//         <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50 to-blue-100">
//           <CardHeader className="pb-0">
//             <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-700">
//               <Users className="h-6 w-6 text-blue-400" />
//               Recent Activity
//             </CardTitle>
//             <CardDescription className="text-slate-400">
//               Latest system events and actions
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="space-y-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Skeleton key={i} className="h-12 w-full rounded-xl" />
//                 ))}
//               </div>
//             ) : (
//               <ul className="space-y-4">
//                 <li className="flex items-center gap-4 p-4 rounded-xl bg-white/80 shadow hover:bg-blue-50 transition group">
//                   <span className="p-2 rounded-full bg-green-100 group-hover:scale-110 transition">
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   </span>
//                   <div>
//                     <p className="font-semibold text-green-700">KYC Approved</p>
//                     <p className="text-xs text-gray-500">
//                       User johndoe@example.com was approved
//                     </p>
//                   </div>
//                   <span className="ml-auto text-xs text-gray-400">2h ago</span>
//                 </li>
//                 <li className="flex items-center gap-4 p-4 rounded-xl bg-white/80 shadow hover:bg-blue-50 transition group">
//                   <span className="p-2 rounded-full bg-blue-100 group-hover:scale-110 transition">
//                     <ImageIcon className="h-5 w-5 text-blue-500" />
//                   </span>
//                   <div>
//                     <p className="font-semibold text-blue-700">New Poster</p>
//                     <p className="text-xs text-gray-500">
//                       "Summer Sale" poster created
//                     </p>
//                   </div>
//                   <span className="ml-auto text-xs text-gray-400">4h ago</span>
//                 </li>
//                 {/* Add more activity items as needed */}
//               </ul>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  Image as ImageIcon,
  Mail,
  CheckCircle,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const API_BASE_URL = "https://publicityposterbackend.onrender.com";

// --- Type Definitions ---
type KycStatus = "pending" | "approved" | "rejected";

interface User {
  kycStatus: KycStatus;
  email?: string;
}

interface Poster {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  design: {
    titleStyle: {
      color: string;
      fontFamily: string;
    };
    background: {
      color: string;
    };
  };
  template: {
    _id: string;
  };
}

interface Template {
  _id: string;
  title: string;
}

interface Query {
  replied: boolean;
  _id: string;
  email: string;
  message: string;
  createdAt: string;
}

interface KycChartData {
  status: string;
  count: number;
  fill: string;
}

interface PosterGrowthData {
  date: string;
  posters: number;
}

interface TemplateUsageData {
  name: string;
  value: number;
}

// --- Color Palette ---
const COLORS = {
  pending: "#F59E0B",
  approved: "#10B981",
  rejected: "#EF4444",
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  accent: "#EC4899",
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPosters: 0,
    totalUsers: 0,
    pendingKyc: 0,
    totalQueries: 0,
    pendingQueries: 0,
  });
  const [kycData, setKycData] = useState<KycChartData[]>([]);
  const [posterGrowth, setPosterGrowth] = useState<PosterGrowthData[]>([]);
  const [templateUsage, setTemplateUsage] = useState<TemplateUsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingPoster, setViewingPoster] = useState<Poster | null>(null);
  const [queries, setQueries] = useState<Query[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Chart config for ChartContainer
  const chartConfig = {
    count: {
      label: "Count",
    },
    pending: {
      label: "Pending",
      color: COLORS.pending,
    },
    approved: {
      label: "Approved",
      color: COLORS.approved,
    },
    rejected: {
      label: "Rejected",
      color: COLORS.rejected,
    },
  } as const;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [postersRes, usersRes, templatesRes, queriesRes, posterProRes] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/posters`),
            fetch(`${API_BASE_URL}/api/admin/users`),
            fetch(`${API_BASE_URL}/api/templates`),
            fetch(`${API_BASE_URL}/api/contacts`),
            fetch(`${API_BASE_URL}/api/posterpro/admin`),
          ]);

        if (
          !postersRes.ok ||
          !usersRes.ok ||
          !templatesRes.ok ||
          !queriesRes.ok ||
          !posterProRes.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }

        const postersData: Poster[] = await postersRes.json();
        const usersData: User[] = await usersRes.json();
        const templatesData: Template[] = await templatesRes.json();
        const queriesData: { data: Query[] } = await queriesRes.json();
        const posterProData: { posters: Poster[] } = await posterProRes.json();

        // Calculate KYC stats
        const kycStats = usersData.reduce(
          (acc: { [key in KycStatus]: number }, user: User) => {
            acc[user.kycStatus] = (acc[user.kycStatus] || 0) + 1;
            return acc;
          },
          { pending: 0, approved: 0, rejected: 0 }
        );

        // Prepare KYC data for chart
        const formattedKycData: KycChartData[] = [
          { status: "Pending", count: kycStats.pending, fill: COLORS.pending },
          {
            status: "Approved",
            count: kycStats.approved,
            fill: COLORS.approved,
          },
          {
            status: "Rejected",
            count: kycStats.rejected,
            fill: COLORS.rejected,
          },
        ];

        // Calculate poster growth (last 7 days)
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - (6 - i));
          return date.toISOString().split("T")[0];
        });

        const postersByDay = postersData.reduce(
          (acc: Record<string, number>, poster: Poster) => {
            const date = new Date(poster.createdAt).toISOString().split("T")[0];
            if (last7Days.includes(date)) {
              acc[date] = (acc[date] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        const growthData: PosterGrowthData[] = last7Days.map((date) => ({
          date: new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          posters: postersByDay[date] || 0,
        }));

        // Calculate template usage
        const templateUsageCount = postersData.reduce(
          (acc: Record<string, number>, poster: Poster) => {
            if (poster.template && poster.template._id) {
              acc[poster.template._id] = (acc[poster.template._id] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        const topTemplates: TemplateUsageData[] = templatesData
          .map((template) => ({
            name: template.title,
            value: templateUsageCount[template._id] || 0,
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        // Calculate pending queries
        const pendingQueries =
          queriesData.data?.filter((query: Query) => !query.replied)?.length ||
          0;

        setStats({
          totalPosters: postersData.length + posterProData.posters.length,
          totalUsers: usersData.length,
          pendingKyc: kycStats.pending,
          totalQueries: queriesData.data?.length || 0,
          pendingQueries,
        });

        setKycData(formattedKycData);
        setPosterGrowth(growthData);
        setTemplateUsage(topTemplates);
        setPosters(posterProData.posters);
        setQueries(queriesData.data || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDeletePoster = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await fetch(`${API_BASE_URL}/api/posterpro/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete poster");
      }

      setPosters(posters.filter((poster) => poster._id !== id));
      setStats((prev) => ({
        ...prev,
        totalPosters: prev.totalPosters - 1,
      }));
      toast.success("Poster deleted successfully");
    } catch (error) {
      toast.error("Failed to delete poster");
    } finally {
      setDeletingId(null);
    }
  };

  const handleMarkAsReplied = async (queryId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contacts/${queryId}/reply`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark as replied");
      }

      setQueries(
        queries.map((query) =>
          query._id === queryId ? { ...query, replied: true } : query
        )
      );
      setStats((prev) => ({
        ...prev,
        pendingQueries: prev.pendingQueries - 1,
      }));
      toast.success("Query marked as replied");
    } catch (error) {
      toast.error("Failed to update query status");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">
          Error loading dashboard data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "dashboard"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "posters"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("posters")}
        >
          Poster Pro Gallery
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "queries"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("queries")}
        >
          User Queries
        </button>
      </div>

      {activeTab === "dashboard" && (
        <>
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Posters Created Card */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Posters Created
                </CardTitle>
                <ImageIcon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats.totalPosters}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {posterGrowth.length > 1
                        ? `${Math.round(
                            ((posterGrowth[posterGrowth.length - 1].posters -
                              posterGrowth[0].posters) /
                              (posterGrowth[0].posters || 1)) *
                              100
                          )}% from last week`
                        : "Loading trend data..."}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Total Users Card */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      {kycData.length
                        ? `${Math.round(
                            (kycData[1].count / (stats.totalUsers || 1)) * 100
                          )}% approved`
                        : "Loading KYC data..."}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* KYC Pending Card */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  KYC Pending
                </CardTitle>
                <FileText className="h-5 w-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.pendingKyc}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.pendingKyc > 0
                        ? "Requires attention"
                        : "All clear!"}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* User Queries Card */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  User Queries
                </CardTitle>
                <Mail className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats.totalQueries}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats.pendingQueries} pending replies
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* KYC Status & Poster Growth */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {/* KYC Status Overview */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>KYC Status Overview</CardTitle>
                <CardDescription>
                  Current distribution of KYC statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={kycData}
                        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="status"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip
                          cursor={{ fill: "hsl(var(--muted))" }}
                          content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>

            {/* Poster Growth */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Poster Creation Trend</CardTitle>
                <CardDescription>
                  Posters created in the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={posterGrowth}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="posters"
                          stroke={COLORS.primary}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Template Usage & Recent Activity */}
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {/* Template Usage */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-blue-700">
                  <ImageIcon className="h-6 w-6 text-blue-500" />
                  Top Templates
                </CardTitle>
                <CardDescription className="text-blue-400">
                  Most used poster templates this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Skeleton className="h-full w-full rounded-xl" />
                  </div>
                ) : (
                  <div className="h-[300px] flex flex-col lg:flex-row items-center gap-6">
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie
                            data={templateUsage}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {templateUsage.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  [
                                    COLORS.primary,
                                    COLORS.secondary,
                                    COLORS.accent,
                                    COLORS.pending,
                                    COLORS.approved,
                                  ][index % 5]
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-3">
                        {templateUsage.map((item, idx) => (
                          <li
                            key={item.name}
                            className="flex items-center gap-3 bg-white/60 rounded-lg px-3 py-2 shadow hover:shadow-lg transition"
                          >
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: [
                                  COLORS.primary,
                                  COLORS.secondary,
                                  COLORS.accent,
                                  COLORS.pending,
                                  COLORS.approved,
                                ][idx % 5],
                              }}
                            />
                            <span className="font-medium text-gray-700">
                              {item.name}
                            </span>
                            <span className="ml-auto font-semibold text-blue-600">
                              {item.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50 to-blue-100">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-700">
                  <Users className="h-6 w-6 text-blue-400" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Latest system events and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {posters.slice(0, 3).map((poster) => (
                      <li
                        key={poster._id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/80 shadow hover:bg-blue-50 transition group"
                      >
                        <span className="p-2 rounded-full bg-blue-100 group-hover:scale-110 transition">
                          <ImageIcon className="h-5 w-5 text-blue-500" />
                        </span>
                        <div>
                          <p className="font-semibold text-blue-700">
                            New Poster
                          </p>
                          <p className="text-xs text-gray-500">
                            "{poster.title}" created
                          </p>
                        </div>
                        <span className="ml-auto text-xs text-gray-400">
                          {format(new Date(poster.createdAt), "MMM d, h:mm a")}
                        </span>
                      </li>
                    ))}
                    {queries.slice(0, 2).map((query) => (
                      <li
                        key={query._id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/80 shadow hover:bg-blue-50 transition group"
                      >
                        <span className="p-2 rounded-full bg-purple-100 group-hover:scale-110 transition">
                          <Mail className="h-5 w-5 text-purple-500" />
                        </span>
                        <div>
                          <p className="font-semibold text-purple-700">
                            New Query
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {query.message}
                          </p>
                        </div>
                        <span className="ml-auto text-xs text-gray-400">
                          {format(new Date(query.createdAt), "MMM d, h:mm a")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === "posters" && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Poster Pro Gallery</CardTitle>
                <CardDescription>
                  Manage all posters created with Poster Pro
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            ) : posters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <ImageIcon className="h-12 w-12 text-gray-400" />
                <p className="text-gray-500">No posters available</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Poster
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posters.map((poster) => (
                  <div
                    key={poster._id}
                    className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative group">
                      <img
                        src={poster.imageUrl}
                        alt={poster.title}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => setViewingPoster(poster)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 hover:bg-black/70"
                          onClick={() => setViewingPoster(poster)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 truncate">
                            {poster.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {poster.description || "No description"}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => handleDeletePoster(poster._id)}
                          disabled={deletingId === poster._id}
                        >
                          {deletingId === poster._id ? (
                            <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              backgroundColor: poster.design.background.color,
                            }}
                          >
                            BG
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              color: poster.design.titleStyle.color,
                              fontFamily: poster.design.titleStyle.fontFamily,
                            }}
                          >
                            Text
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400">
                          {format(new Date(poster.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "queries" && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>User Queries</CardTitle>
            <CardDescription>
              {stats.pendingQueries} pending replies out of {stats.totalQueries}{" "}
              total queries
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            ) : queries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Mail className="h-12 w-12 text-gray-400" />
                <p className="text-gray-500">No queries available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {queries.map((query) => (
                  <div
                    key={query._id}
                    className={`p-4 rounded-lg border ${
                      query.replied
                        ? "bg-gray-50"
                        : "bg-white border-primary/30"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">
                          {query.email}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {query.message}
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                          {format(
                            new Date(query.createdAt),
                            "MMM d, yyyy 'at' h:mm a"
                          )}
                        </div>
                      </div>
                      {!query.replied && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsReplied(query._id)}
                        >
                          Mark as Replied
                        </Button>
                      )}
                    </div>
                    {query.replied && (
                      <div className="mt-2 text-xs text-green-600 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Replied
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Image Viewer Modal */}
      {viewingPoster && (
        <Dialog
          open={!!viewingPoster}
          onOpenChange={(open) => !open && setViewingPoster(null)}
        >
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <div className="relative">
              <img
                src={viewingPoster.imageUrl}
                alt={viewingPoster.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/90 hover:bg-white"
                  onClick={() => setViewingPoster(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{viewingPoster.title}</h3>
              {viewingPoster.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {viewingPoster.description}
                </p>
              )}
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {format(
                    new Date(viewingPoster.createdAt),
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </div>
                <div className="flex items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-1"
                    style={{
                      backgroundColor: viewingPoster.design.background.color,
                    }}
                  />
                  <span>Background</span>
                </div>
                <div className="flex items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-1"
                    style={{
                      backgroundColor: viewingPoster.design.titleStyle.color,
                    }}
                  />
                  <span>Text Color</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
