"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Wallet } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { jakarta } from "@/lib/fonts";
import { AppStoreProvider } from "@/store/app-store";

export default function Page() {
  return (
    <AppStoreProvider>
      <div
        className={`${jakarta.className} min-h-dvh flex flex-col bg-gradient-to-b from-emerald-50 via-fuchsia-50 to-amber-50`}
      >
        <Navbar />
        <main className="flex-1">
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
              <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-fuchsia-300/30 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-20 md:py-28">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 text-xs md:text-sm">
                    Ultra-smooth cloud mining for everyone
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                    Start Mining Crypto with Performance and Style
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 max-w-prose">
                    Deploy hash power in seconds. Monitor real-time stats,
                    manage deposits and withdrawals, and enjoy silky-smooth
                    scrolling and animations on a modern, responsive UI.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link href="/login" className="w-full sm:w-auto">
                      <Button className="h-11 px-6 w-full bg-gradient-to-r from-emerald-500 to-fuchsia-600 text-white hover:opacity-90">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/dashboard" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="h-11 px-6 w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        Live Dashboard
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="rounded-xl bg-white/70 backdrop-blur ring-1 ring-emerald-100 p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        99.9%
                      </div>
                      <div className="text-xs text-gray-600">Uptime</div>
                    </div>
                    <div className="rounded-xl bg-white/70 backdrop-blur ring-1 ring-fuchsia-100 p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        Global
                      </div>
                      <div className="text-xs text-gray-600">Distribution</div>
                    </div>
                    <div className="rounded-xl bg-white/70 backdrop-blur ring-1 ring-amber-100 p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        Secure
                      </div>
                      <div className="text-xs text-gray-600">by Design</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="relative"
                >
                  <Image
                    src="/placeholder.png?key=4uym7"
                    alt="Crypto mining datacenter"
                    width={960}
                    height={720}
                    className="rounded-2xl shadow-2xl ring-1 ring-black/5"
                    priority
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-4 flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Audited
                      </div>
                      <div className="text-xs text-gray-600">
                        Industry best practices
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-white p-6 ring-1 ring-emerald-100"
              >
                <Zap className="h-6 w-6 text-emerald-600" />
                <h3 className="mt-4 font-semibold text-gray-900">
                  High Performance
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Optimized infrastructure and blazing UI interactions for
                  top-tier UX.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="rounded-2xl bg-white p-6 ring-1 ring-fuchsia-100"
              >
                <Wallet className="h-6 w-6 text-fuchsia-600" />
                <h3 className="mt-4 font-semibold text-gray-900">
                  Simple Wallet
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Deposit and withdraw with clear, transparent flows and
                  tracking.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl bg-white p-6 ring-1 ring-amber-100"
              >
                <ShieldCheck className="h-6 w-6 text-amber-600" />
                <h3 className="mt-4 font-semibold text-gray-900">
                  Best Practices
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Type-safe, modular code ready for production and backend
                  integration.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </AppStoreProvider>
  );
}
