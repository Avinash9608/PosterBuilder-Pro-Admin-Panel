"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { AdminSidebarNav } from "@/components/admin-sidebar-nav";
import { AdminTopBar } from "@/components/admin-top-bar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/kyc": "KYC Management",
  "/templates": "Template Control",
  "/posters": "Posters Management",
  "/users": "User Management",
  "/settings": "Settings",
  "/UserQuery": "UserQuery",
  "/posterpro": "Poster Pro",
  "/googleAnalytics:": "Google Analytics",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  const title = pageTitles[pathname] || "Admin Panel";

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AdminSidebarNav />
        <SidebarInset className="flex flex-col flex-1">
          <AdminTopBar title={title} />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
