"use client"

import dynamic from "next/dynamic"

const CookieConsentComponent = dynamic(
  () => import("../CookieConsentComponents/CookieConsentComponent"),
  { ssr: false },
)

const FloatingCtaButton = dynamic(
  () => import("../FloatingCtaButton/FloatingCtaButton"),
  { ssr: false },
)

export default function ClientEnhancements({
  locale,
  telephone,
  email,
}: {
  locale: "en" | "es"
  telephone: string
  email: string
}) {
  return (
    <>
      <FloatingCtaButton telephone={telephone} email={email} />
      <CookieConsentComponent locale={locale} />
    </>
  )
}
