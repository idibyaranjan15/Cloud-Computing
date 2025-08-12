"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/store/app-store"
import { Mountain, LogIn, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const store = useAppStore()
  const state = store.state
  const logout = () => {
    store.logout()
    router.push("/")
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/60 border-b border-emerald-100">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Mountain className="h-5 w-5 text-emerald-600" />
          <span className="font-semibold text-gray-900">CloudHash</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors hover:text-emerald-700",
                pathname === l.href ? "text-emerald-700 font-medium" : "text-gray-700",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {state?.session ? (
            <Button variant="outline" className="border-amber-300 text-amber-700 bg-transparent" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="bg-gradient-to-r from-emerald-500 to-fuchsia-600 text-white">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
