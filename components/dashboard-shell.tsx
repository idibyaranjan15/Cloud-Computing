"use client"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { cn } from "@/lib/utils"
import { jakarta } from "@/lib/fonts"
import { AppStoreProvider } from "@/store/app-store"

export function DashboardShell({ children }: { children?: React.ReactNode }) {
  return (
    <AppStoreProvider>
      <div className={cn(jakarta.className, "min-h-dvh flex flex-col")}>
        <Navbar />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-transparent">
            <div className="sticky top-[56px] z-30 flex items-center gap-2 border-b border-emerald-100 bg-white/70 backdrop-blur px-4 py-2">
              <SidebarTrigger />
              <span className="text-sm text-gray-600">Quick nav</span>
            </div>
            {children}
            <Footer />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AppStoreProvider>
  )
}

/**
 * We wrap dashboard/admin pages with SidebarProvider, AppSidebar, and SidebarInset
 * as recommended, enabling collapsible navigation with icon mode and inset layout. [^1]
 */
