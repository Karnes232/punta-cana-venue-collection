"use client"

import { useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"
import { PopupModal } from "react-calendly"

type Props = {
  locale: string
  calendlyUrls: { englishUrl: string; spanishUrl: string }
}

export default function ScheduleCallButton({ locale, calendlyUrls }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)
  const t = useTranslations("individualVenueListing")

  useEffect(() => {
    setPortalEl(document.body)
  }, [])

  const pageSettings = {
    backgroundColor: "ffffff",
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: "00a2ff",
    textColor: "4d5055",
    zIndex: 9999,
  }

  // Optional: only run when open AND in browser (effect already is browser-only)
  useEffect(() => {
    if (!isOpen) return

    const timer = window.setTimeout(() => {
      const calendlyElements = document.querySelectorAll('[class*="calendly"]')
      calendlyElements.forEach(el => {
        if (el instanceof HTMLElement) el.style.zIndex = "9999"
      })
    }, 100)

    return () => window.clearTimeout(timer)
  }, [isOpen])

  const calendlyUrl =
    locale === "es" ? calendlyUrls.spanishUrl : calendlyUrls.englishUrl

  return (
    <div id="schedule-call-button" className="relative z-[9998] flex-1">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md text-sm"
      >
        {t("scheduleCall")}
      </button>

      {/* ✅ only render the modal once we have a browser root element */}
      {portalEl ? (
        <PopupModal
          url={calendlyUrl}
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          pageSettings={pageSettings}
          rootElement={portalEl}
        />
      ) : null}
    </div>
  )
}
