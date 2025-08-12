"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useAppStore } from "@/store/app-store"
import { motion } from "framer-motion"
import { CircleDollarSign, Coins, Activity } from 'lucide-react'

export default function SummaryCards() {
  const { state } = useAppStore()
  const items = [
    {
      label: "Balance",
      value: `$${state.wallet.balance.toFixed(2)}`,
      icon: CircleDollarSign,
      ring: "ring-emerald-100",
      text: "text-emerald-700",
    },
    {
      label: "Total Deposited",
      value: `$${state.wallet.totalDeposited.toFixed(2)}`,
      icon: Coins,
      ring: "ring-amber-100",
      text: "text-amber-700",
    },
    {
      label: "Total Withdrawn",
      value: `$${state.wallet.totalWithdrawn.toFixed(2)}`,
      icon: Activity,
      ring: "ring-fuchsia-100",
      text: "text-fuchsia-700",
    },
  ]

  return (
    <div id="wallet" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, idx) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
        >
          <Card className={`hover:shadow-lg transition-shadow ring-1 ${it.ring}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">{it.label}</div>
                <div className={`mt-1 text-2xl font-semibold ${it.text}`}>{it.value}</div>
              </div>
              <it.icon className={`${it.text} h-6 w-6`} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
