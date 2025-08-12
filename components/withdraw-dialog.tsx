"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppStore } from "@/store/app-store"

const schema = z.object({
  amount: z
    .string()
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Enter a valid amount"),
  address: z.string().min(12, "Wallet address is too short"),
})

type FormValues = z.infer<typeof schema>

export default function WithdrawDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const { withdraw } = useAppStore()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: FormValues) => {
    const amt = Number(values.amount)
    await new Promise((r) => setTimeout(r, 600))
    withdraw(amt)
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children ?? <Button variant="outline">Withdraw</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw funds</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input id="amount" placeholder="50.00" inputMode="decimal" {...register("amount")} />
            {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Wallet address</Label>
            <Input id="address" placeholder="0x..." {...register("address")} />
            {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-fuchsia-600 to-amber-500 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
