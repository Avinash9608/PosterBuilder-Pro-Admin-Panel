"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  Globe,
} from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const timeRanges = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "Last 90 days", value: "90days" },
];

const sessionsData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const pageViewsData = [
  { name: "Home", value: 400 },
  { name: "Products", value: 300 },
  { name: "Blog", value: 200 },
  { name: "About", value: 278 },
  { name: "Contact", value: 189 },
];

const trafficSources = [
  { name: "Direct", value: 35 },
  { name: "Organic Search", value: 40 },
  { name: "Social", value: 15 },
  { name: "Email", value: 10 },
];

const userDemographics = [
  { name: "18-24", value: 20 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 5 },
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState(timeRanges[1]);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track and analyze your website performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {timeRange.label}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {timeRanges.map((range) => (
                <DropdownMenuItem
                  key={range.value}
                  onClick={() => setTimeRange(range)}
                >
                  {range.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-1">
        <Button
          variant={activeTab === "overview" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "audience" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("audience")}
        >
          Audience
        </Button>
        <Button
          variant={activeTab === "acquisition" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("acquisition")}
        >
          Acquisition
        </Button>
        <Button
          variant={activeTab === "behavior" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("behavior")}
        >
          Behavior
        </Button>
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">
                +12.1% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,678</div>
              <p className="text-xs text-muted-foreground">
                +8.6% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56,789</div>
              <p className="text-xs text-muted-foreground">
                +5.2% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Session
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m 45s</div>
              <p className="text-xs text-muted-foreground">
                +10.3% from last week
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sessions Over Time</CardTitle>
            <CardDescription>
              Number of sessions in the last 7 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sessionsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most viewed pages on your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pageViewsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>Age distribution of your visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDemographics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {userDemographics.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {activeTab === "audience" && (
        <Card>
          <CardHeader>
            <CardTitle>Audience Overview</CardTitle>
            <CardDescription>
              Detailed information about your visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">New vs Returning Visitors</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "New Visitors", value: 65 },
                          { name: "Returning Visitors", value: 35 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#0088FE" />
                        <Cell fill="#00C49F" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Device Categories</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Desktop", value: 45 },
                          { name: "Mobile", value: 50 },
                          { name: "Tablet", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#0088FE" />
                        <Cell fill="#00C49F" />
                        <Cell fill="#FFBB28" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "acquisition" && (
        <Card>
          <CardHeader>
            <CardTitle>Acquisition Channels</CardTitle>
            <CardDescription>
              How users are finding your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Organic Search", value: 4000 },
                    { name: "Direct", value: 3000 },
                    { name: "Social", value: 2000 },
                    { name: "Email", value: 2780 },
                    { name: "Referral", value: 1890 },
                  ]}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "behavior" && (
        <Card>
          <CardHeader>
            <CardTitle>User Behavior</CardTitle>
            <CardDescription>
              How users interact with your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">Bounce Rate</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: "Jan", value: 45 },
                        { name: "Feb", value: 42 },
                        { name: "Mar", value: 40 },
                        { name: "Apr", value: 38 },
                        { name: "May", value: 35 },
                        { name: "Jun", value: 32 },
                        { name: "Jul", value: 30 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Pages per Session</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: "Jan", value: 2.1 },
                        { name: "Feb", value: 2.3 },
                        { name: "Mar", value: 2.5 },
                        { name: "Apr", value: 2.7 },
                        { name: "May", value: 2.8 },
                        { name: "Jun", value: 3.0 },
                        { name: "Jul", value: 3.2 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// It work when we deploy on live real server
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import {
//   ChevronDown,
//   Users,
//   Eye,
//   MousePointer,
//   Clock,
//   Globe,
//   Smartphone,
//   Tablet,
// } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// // Types for our analytics data
// interface AnalyticsData {
//   overview: {
//     totalUsers: number;
//     newUsers: number;
//     sessions: number;
//     pageViews: number;
//     avgSessionDuration: number;
//     bounceRate: number;
//   };
//   audience: {
//     demographics: {
//       ageGroups: { name: string; value: number }[];
//       genders: { name: string; value: number }[];
//     };
//     devices: { name: string; value: number }[];
//     newVsReturning: { name: string; value: number }[];
//   };
//   acquisition: {
//     channels: { name: string; value: number }[];
//     sources: { name: string; value: number }[];
//     medium: { name: string; value: number }[];
//   };
//   behavior: {
//     topPages: { name: string; value: number }[];
//     pagePaths: { name: string; value: number }[];
//     events: { name: string; value: number }[];
//   };
//   timeline: {
//     sessions: { date: string; value: number }[];
//     users: { date: string; value: number }[];
//     pageViews: { date: string; value: number }[];
//   };
// }

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// const timeRanges = [
//   { label: "Today", value: "today", days: 1 },
//   { label: "Last 7 days", value: "7days", days: 7 },
//   { label: "Last 30 days", value: "30days", days: 30 },
//   { label: "Last 90 days", value: "90days", days: 90 },
// ];

// export default function AnalyticsDashboard() {
//   const [timeRange, setTimeRange] = useState(timeRanges[1]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [data, setData] = useState<AnalyticsData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch(`/api/analytics?range=${timeRange.value}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         if (!result.data) {
//           throw new Error("Invalid data format from server");
//         }

//         setData(result.data);
//       } catch (err) {
//         // Proper error typing
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalyticsData();
//   }, [timeRange.value]);

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-red-500">Error: {error}</div>
//       </div>
//     );
//   }

//   if (loading || !data) {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <Skeleton className="h-8 w-48" />
//           <Skeleton className="h-10 w-32" />
//         </div>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {[...Array(4)].map((_, i) => (
//             <Card key={i}>
//               <CardHeader>
//                 <Skeleton className="h-6 w-24" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-8 w-full mt-2" />
//                 <Skeleton className="h-4 w-full mt-2" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <div className="grid gap-6 md:grid-cols-2">
//           {[...Array(2)].map((_, i) => (
//             <Card key={i}>
//               <CardHeader>
//                 <Skeleton className="h-6 w-32" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-64 w-full" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">
//             Analytics Dashboard
//           </h1>
//           <p className="text-muted-foreground">
//             Real-time website performance metrics
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 {timeRange.label}
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               {timeRanges.map((range) => (
//                 <DropdownMenuItem
//                   key={range.value}
//                   onClick={() => setTimeRange(range)}
//                 >
//                   {range.label}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <div className="flex overflow-x-auto pb-2 gap-1">
//         <Button
//           variant={activeTab === "overview" ? "secondary" : "ghost"}
//           onClick={() => setActiveTab("overview")}
//         >
//           Overview
//         </Button>
//         <Button
//           variant={activeTab === "audience" ? "secondary" : "ghost"}
//           onClick={() => setActiveTab("audience")}
//         >
//           Audience
//         </Button>
//         <Button
//           variant={activeTab === "acquisition" ? "secondary" : "ghost"}
//           onClick={() => setActiveTab("acquisition")}
//         >
//           Acquisition
//         </Button>
//         <Button
//           variant={activeTab === "behavior" ? "secondary" : "ghost"}
//           onClick={() => setActiveTab("behavior")}
//         >
//           Behavior
//         </Button>
//       </div>

//       {activeTab === "overview" && (
//         <>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Total Users
//                 </CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">
//                   {data.overview.totalUsers.toLocaleString()}
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   {data.overview.newUsers.toLocaleString()} new users
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Sessions</CardTitle>
//                 <Eye className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">
//                   {data.overview.sessions.toLocaleString()}
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   {Math.round(data.overview.sessions / timeRange.days)} per day
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Page Views
//                 </CardTitle>
//                 <MousePointer className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">
//                   {data.overview.pageViews.toLocaleString()}
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   {Math.round(data.overview.pageViews / data.overview.sessions)}{" "}
//                   per session
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Avg. Session
//                 </CardTitle>
//                 <Clock className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">
//                   {Math.floor(data.overview.avgSessionDuration / 60)}m{" "}
//                   {Math.floor(data.overview.avgSessionDuration % 60)}s
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Bounce rate: {data.overview.bounceRate}%
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Sessions Over Time</CardTitle>
//                 <CardDescription>
//                   Number of sessions in the selected period
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={data.timeline.sessions}
//                       margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                       }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="date" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke="#8884d8"
//                         activeDot={{ r: 8 }}
//                         name="Sessions"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>User Activity</CardTitle>
//                 <CardDescription>Users vs Page Views timeline</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={data.timeline.users.map((user, i) => ({
//                         date: user.date,
//                         users: user.value,
//                         pageViews: data.timeline.pageViews[i]?.value || 0,
//                       }))}
//                       margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                       }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="date" />
//                       <YAxis yAxisId="left" />
//                       <YAxis yAxisId="right" orientation="right" />
//                       <Tooltip />
//                       <Legend />
//                       <Line
//                         yAxisId="left"
//                         type="monotone"
//                         dataKey="users"
//                         stroke="#8884d8"
//                         activeDot={{ r: 8 }}
//                         name="Users"
//                       />
//                       <Line
//                         yAxisId="right"
//                         type="monotone"
//                         dataKey="pageViews"
//                         stroke="#82ca9d"
//                         name="Page Views"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </>
//       )}

//       {activeTab === "audience" && (
//         <div className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>User Demographics</CardTitle>
//                 <CardDescription>
//                   Age distribution of your visitors
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={data.audience.demographics.ageGroups}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                       >
//                         {data.audience.demographics.ageGroups.map(
//                           (entry, index) => (
//                             <Cell
//                               key={`cell-${index}`}
//                               fill={COLORS[index % COLORS.length]}
//                             />
//                           )
//                         )}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Gender Distribution</CardTitle>
//                 <CardDescription>
//                   Gender breakdown of your audience
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={data.audience.demographics.genders}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                       >
//                         {data.audience.demographics.genders.map(
//                           (entry, index) => (
//                             <Cell
//                               key={`cell-${index}`}
//                               fill={["#0088FE", "#FF69B4"][index % 2]}
//                             />
//                           )
//                         )}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Device Usage</CardTitle>
//                 <CardDescription>
//                   Devices used to access your site
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                       data={data.audience.devices}
//                       margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                       }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>New vs Returning Visitors</CardTitle>
//                 <CardDescription>Visitor engagement over time</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={data.audience.newVsReturning}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                       >
//                         {data.audience.newVsReturning.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={["#0088FE", "#00C49F"][index % 2]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       )}

//       {activeTab === "acquisition" && (
//         <div className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Traffic Channels</CardTitle>
//                 <CardDescription>Where your visitors come from</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={data.acquisition.channels}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                       >
//                         {data.acquisition.channels.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Top Sources</CardTitle>
//                 <CardDescription>Leading traffic sources</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                       data={data.acquisition.sources.slice(0, 5)}
//                       layout="vertical"
//                       margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                       }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis type="number" />
//                       <YAxis dataKey="name" type="category" width={80} />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Medium Breakdown</CardTitle>
//               <CardDescription>Traffic by medium type</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[400px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={data.acquisition.medium}
//                     margin={{
//                       top: 5,
//                       right: 30,
//                       left: 20,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {activeTab === "behavior" && (
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Top Pages</CardTitle>
//               <CardDescription>Most visited pages on your site</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[400px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={data.behavior.topPages.slice(0, 10)}
//                     layout="vertical"
//                     margin={{
//                       top: 5,
//                       right: 30,
//                       left: 20,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis type="number" />
//                     <YAxis dataKey="name" type="category" width={150} />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Page Paths</CardTitle>
//                 <CardDescription>Common navigation paths</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                       data={data.behavior.pagePaths.slice(0, 5)}
//                       margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                       }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Top Events</CardTitle>
//                 <CardDescription>Most triggered events</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={data.behavior.events.slice(0, 5)}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                       >
//                         {data.behavior.events
//                           .slice(0, 5)
//                           .map((entry, index) => (
//                             <Cell
//                               key={`cell-${index}`}
//                               fill={COLORS[index % COLORS.length]}
//                             />
//                           ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
