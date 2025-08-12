"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { useAppStore, AppStoreProvider } from "@/store/app-store"
import { jakarta } from "@/lib/fonts"
import { motion } from "framer-motion"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters").max(128, "Too long"),
})

type FormValues = z.infer<typeof schema>

function LoginForm() {
  const router = useRouter()
  const { login } = useAppStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onSubmit" })

  const onSubmit = async (values: FormValues) => {
    // Simulate an auth request here; hook up to backend later.
    await new Promise((r) => setTimeout(r, 600))
    login(values.email)
    router.push("/dashboard")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-emerald-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Log in to manage your mining dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  autoComplete="email"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  autoComplete="current-password"
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-fuchsia-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm">
          <span className="text-gray-600">No account?</span>
          <Link href="/" className="text-emerald-700 underline underline-offset-4">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <AppStoreProvider>
      <div
        className={`${jakarta.className} min-h-dvh flex flex-col bg-gradient-to-b from-fuchsia-50 via-amber-50 to-emerald-50`}
      >
        <Navbar />
        <main className="flex-1 grid place-items-center px-4 py-12">
          <LoginForm />
        </main>
        <Footer />
      </div>
    </AppStoreProvider>
  )
}
