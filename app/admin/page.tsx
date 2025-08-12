"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { useAppStore } from "@/store/app-store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLenisSmooth } from "@/hooks/use-lenis"
import { motion } from "framer-motion"
import { Shield } from 'lucide-react'
import { jakarta } from "@/lib/fonts"

function AdminContent() {
  useLenisSmooth(true)
  const { state } = useAppStore()

  return (
    <div className={`${jakarta.className} relative bg-gradient-to-b from-amber-50 via-fuchsia-50 to-emerald-50`}>
      <div className="px-6 md:px-8 py-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <p className="text-gray-600">Track user login/logout and deposit/withdraw flows.</p>
        <Separator className="my-6" />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="rounded-2xl bg-white ring-1 ring-emerald-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.audit.length > 0 ? (
                  state.audit
                    .slice()
                    .reverse()
                    .map((e) => (
                      <TableRow key={e.id}>
                        <TableCell className="text-gray-700">{new Date(e.timestamp).toLocaleString()}</TableCell>
                        <TableCell className="text-gray-700">{e.userEmail ?? "N/A"}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              e.type === "login"
                                ? "border-emerald-300 text-emerald-700"
                                : e.type === "logout"
                                ? "border-amber-300 text-amber-700"
                                : e.type === "deposit"
                                ? "border-emerald-300 text-emerald-700"
                                : "border-fuchsia-300 text-fuchsia-700"
                            }
                          >
                            {e.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-gray-800">
                          {e.amount != null ? `$${e.amount.toFixed(2)}` : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-gray-600">
                      No events yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <DashboardShell>
      <AdminContent />
    </DashboardShell>
  )
}
