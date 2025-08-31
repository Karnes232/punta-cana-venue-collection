"use client"
import { useTranslations } from "next-intl"
import React, { useState, useEffect } from "react"
import { useCalendlyEventListener, PopupModal } from "react-calendly"


const ScheduleCall = ({
    locale,
    calendlyUrls,
    handleSubmit,
    validateForm,
    formData,
    favoriteVenues,
}: {
    locale: string
    calendlyUrls: any
    handleSubmit: () => void
    validateForm: () => boolean
    formData: any
    favoriteVenues: any
}) => {
    const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("individualVenueListing")

  const pageSettings = {
    backgroundColor: "ffffff",
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: "00a2ff",
    textColor: "4d5055",
    zIndex: 9999,
  }

  // Force z-index on Calendly modal when it opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const calendlyElements = document.querySelectorAll(
          '[class*="calendly"]',
        )
        calendlyElements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.zIndex = "9999"
          }
        })
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClick = async () => {

    if (validateForm()) {
        setIsOpen(true)   
    }
  }

  

  const calendlyUrl =
    locale === "es" ? calendlyUrls.spanishUrl : calendlyUrls.englishUrl


  const prefill = {
      email: formData?.email || "",
      name: formData?.name || "",
      customAnswers: {
          a1: `Selected Venues: ${favoriteVenues?.map((venue: any) => venue.name).join(", ") || ""}
Phone: ${formData?.phone || ""}
Event Type: ${formData?.eventType || ""}
Estimated Date: ${formData?.estimatedDate || ""}
Number of Guests: ${formData?.numberOfGuests || ""}
Approximate Budget: ${formData?.approximateBudget || ""}
Additional Message: ${formData?.message || ""}`,
      },
  }

  useCalendlyEventListener({
    onEventScheduled: (e) => {
        handleSubmit()
    },
  })


  return (
    <div id="schedule-call-button" className="relative z-[9998] flex-1">
      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md text-sm"
      >
        {t("scheduleCall")}
      </button>
      <PopupModal
        url={calendlyUrl}
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        pageSettings={pageSettings}
        prefill={prefill}
        rootElement={document.body}
      />

    </div>
  )
}

export default ScheduleCall