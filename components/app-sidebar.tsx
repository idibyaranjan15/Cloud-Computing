"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart3, Wallet, Shield, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const items = [
  { title: "Home", href: "/", icon: Home },
  { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { title: "Wallet", href: "/dashboard#wallet", icon: Wallet },
  { title: "Admin", href: "/admin", icon: Shield },
  { title: "Settings", href: "#", icon: Settings },
]

export default function AppSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}

/**
 * Sidebar composition and usage follow the shadcn/ui Sidebar patterns:
 * - SidebarProvider controls state, Sidebar renders a collapsible navigation, SidebarInset wraps main content.
 * - The "inset" variant allows main content to be inset with rounded corners and shadow, and "icon" collapse shrinks to icons.
 * See the official docs for details and props. [^1]
 */
