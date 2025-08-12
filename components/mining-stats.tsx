"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppStore } from "@/store/app-store"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

function Stat({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  const controls = useAnimation()
  useEffect(() => {
    controls.start({ opacity: [0, 1], y: [8, 0] })
  }, [controls, value])
  return (
    <motion.div animate={controls} transition={{ duration: 0.4 }} className="rounded-xl bg-white ring-1 ring-fuchsia-100 p-4">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">
        {value.toLocaleString()}
        {suffix}
      </div>
    </motion.div>
  )
}

export default function MiningStats() {
  const { state } = useAppStore()
  const hashrate = state.mining.hashrate
  const daily = state.mining.dailyEarnings
  const uptime = state.mining.uptime

  return (
    <Card className="ring-1 ring-fuchsia-100">
      <CardHeader>
        <CardTitle className="text-gray-900">Mining Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Hashrate" value={hashrate} suffix={" H/s"} />
          <Stat label="Daily Earnings" value={daily} suffix={" USD"} />
          <Stat label="Uptime" value={uptime} suffix={"%"} />
        </div>
        <div className="rounded-xl overflow-hidden">
          <div className="h-36 bg-[linear-gradient(90deg,rgba(16,185,129,0.15),rgba(217,70,239,0.15),rgba(245,158,11,0.15))] relative">
            <div className="absolute inset-0 grid grid-cols-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-white/40" />
              ))}
            </div>
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 600 160" className="w-full h-full">
                <path
                  d="M0,120 C60,80 120,100 180,70 C240,40 300,110 360,90 C420,70 480,130 540,110"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
