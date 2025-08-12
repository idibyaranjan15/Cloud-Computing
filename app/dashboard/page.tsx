"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import MiningStats from "@/components/mining-stats"
import SummaryCards from "@/components/summary-cards"
import DepositDialog from "@/components/deposit-dialog"
import WithdrawDialog from "@/components/withdraw-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Wallet, Download, Upload } from 'lucide-react'
import { useAppStore } from "@/store/app-store"
import { motion } from "framer-motion"
import { useLenisSmooth } from "@/hooks/use-lenis"
import { jakarta } from "@/lib/fonts"

function DashboardContent() {
  useLenisSmooth(true)
  const { state } = useAppStore()

  return (
    <div className={`${jakarta.className} relative bg-gradient-to-b from-emerald-50 via-fuchsia-50 to-amber-50`}>
      <div className="px-6 md:px-8 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome{state.session?.email ? `, ${state.session.email}` : ""}. Track mining and wallet activity.</p>
          </div>
          <div className="flex gap-2">
            <DepositDialog>
              <Button className="bg-gradient-to-r from-emerald-500 to-fuchsia-600 text-white">
                <Download className="mr-2 h-4 w-4" />
                Deposit
              </Button>
            </DepositDialog>
            <WithdrawDialog>
              <Button variant="outline" className="border-fuchsia-300 text-fuchsia-700">
                <Upload className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </WithdrawDialog>
          </div>
        </div>

        <Separator className="my-6" />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <SummaryCards />
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MiningStats />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white ring-1 ring-amber-100 p-6"
          >
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {state.transactions.slice(0, 6).map((tx) => (
                <li key={tx.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{tx.type === "deposit" ? "Deposit" : "Withdraw"}</span>
                  <span className={tx.type === "deposit" ? "text-emerald-700" : "text-fuchsia-700"}>
                    {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </span>
                </li>
              ))}
              {state.transactions.length === 0 && (
                <li className="text-sm text-gray-600">No transactions yet.</li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardContent />
    </DashboardShell>
  )
}
