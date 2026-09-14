"use client"
import { useEffect } from "react"
import { trackConversion } from "@/lib/conversion-events"
export default function ConversionTracking() {
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.("a")
      if (!a) return
      const href = a.getAttribute("href") || ""
      const source = a.getAttribute("data-rfp-cta")
      if (source) trackConversion("rfp_cta_click", { placement: source })
      else if (href.startsWith("tel:")) trackConversion("phone_click")
      else if (href.startsWith("mailto:")) trackConversion("email_click")
      else if (href.includes("wa.me/")) trackConversion("whatsapp_click")
    }
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [])
  return null
}
