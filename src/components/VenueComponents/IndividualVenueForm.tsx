"use client"
import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"
import IndividualVenueContactForm from "../ContactForms/IndividualVenueContactForm"

const IndividualVenueForm = ({ venueName, className }: { venueName: string, className: string }) => {
  const t = useTranslations("individualVenueForm")
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    estimatedDate: "",
    message: "",
    venue: venueName,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {t("interested")}
      </button>
    )
  }

  const modalContent = (
    <div className={`fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
      <div className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative transform transition-all duration-1000 ease-out ${isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {venueName}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <IndividualVenueContactForm formData={formData} setFormData={setFormData} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md text-sm"
      >
        {t("interested")}
      </button>
      
      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}

export default IndividualVenueForm
