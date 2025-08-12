"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

export function useLenisSmooth(enabled: boolean = true) {
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, smoothTouch: false })
    const raf = (time: number) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [enabled])
}
