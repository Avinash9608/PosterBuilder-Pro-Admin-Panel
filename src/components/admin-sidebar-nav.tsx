"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  PanelLeft,
  FileCheck,
  LayoutTemplateIcon,
  Building,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kyc", label: "KYC Management", icon: FileCheck },
  { href: "/templates", label: "Template Control", icon: LayoutTemplateIcon },
  { href: "/users", label: "User Management", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AdminSidebarNav() {
  const pathname = usePathname()
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="h-16 flex items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Button variant="ghost" className={cn("h-10 w-10 p-0 text-primary", open ? "block" : "hidden group-data-[collapsible=icon]:block")}>
             <Building size={28} />
          </Button>
          <h1 className={cn("text-xl font-semibold font-headline text-primary", open ? "block" : "hidden")}>PosterBuilder</h1>
        </Link>
        <div className={cn(open ? "block" : "hidden group-data-[collapsible=icon]:hidden")}>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, className: "bg-card text-card-foreground border shadow-sm"}}
                  asChild
                >
                  <a className="flex items-center">
                    <item.icon className={cn("mr-2 h-5 w-5", 
                      (pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))) ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                    )} />
                    <span className={cn(open ? "block" : "hidden")}>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter className={cn(open ? "p-4" : "p-2 group-data-[collapsible=icon]:p-2")}>
        {/* Footer content if needed, like app version */}
      </SidebarFooter>
    </Sidebar>
  )
}
