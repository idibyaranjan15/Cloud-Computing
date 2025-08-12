import type React from "react"
import type { Metadata } from "next"
import { jakarta } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "CloudHash - Crypto Cloud Mining",
  description: "Modern crypto cloud mining with performance, security, and delightful UX.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} antialiased`}>{children}</body>
    </html>
  )
}
