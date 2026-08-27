"use client"
import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLocale, useTranslations } from "next-intl"
import { MessageCircle, X } from "lucide-react"
import IndividualVenueContactForm from "../ContactForms/IndividualVenueContactForm"

const IndividualVenueForm = ({
  venueName,
  venueTitle,
  className,
}: {
  venueName: string
  venueTitle: string
  className: string
}) => {
  const t = useTranslations("individualVenueListing")
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    estimatedDate: "",
    groupSize: "",
    message: "",
    venue: venueName,
    venueTitle: venueTitle,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  if (!isOpen) {
    return (
      <button onClick={handleButtonClick} className={className}>
        {t("planEventHere")}
      </button>
    )
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const modalContent = (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isAnimating ? "bg-opacity-50" : "bg-opacity-0"}`}
    >
      <div
        onClick={handleModalClick}
        className={`bg-white rounded-lg shadow-xl max-h-[90vh] max-w-md w-full overflow-y-auto p-6 relative transform transition-all duration-1000 ease-out ${isAnimating ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-golden">
              {t("planEventHere")}
            </p>
            <h2 className="text-xl font-semibold text-gray-900">
              {venueTitle}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label={locale === "es" ? "Cerrar formulario" : "Close form"}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-4 text-sm leading-6 text-slate-600">
          {t("venueFormIntro")}
        </p>

        <a
          href={`https://wa.me/18295222900?text=${encodeURIComponent(
            locale === "es"
              ? `Quiero realizar un evento en ${venueTitle}. Necesito asistencia con la planificación y operación.`
              : `I want to hold an event at ${venueTitle}. I need assistance with planning and operations.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-green-600 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
        >
          <MessageCircle className="h-4 w-4" />
          {t("whatsappVenue")}
        </a>

        <IndividualVenueContactForm
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex-1 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md text-sm"
      >
        {t("planEventHere")}
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}

export default IndividualVenueForm
