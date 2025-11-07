"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import {
  Send,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  Heart,
} from "lucide-react"
import { set } from "sanity"

interface FormData {
  name: string
  email: string
  phone: string
  eventType: string
  estimatedDate: string
  message: string
  venue: string
  venueTitle: string
}

interface IndividualVenueContactFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onClose?: () => void
}

const IndividualVenueContactForm: React.FC<IndividualVenueContactFormProps> = ({
  formData,
  setFormData,
  onClose,
}) => {
  const t = useTranslations("individualVenueForm")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Common event types - you can customize these based on your needs
  const eventTypes = [
    { value: "wedding", label: t("wedding") },
    { value: "corporate", label: t("corporateEvent") },
    { value: "birthday", label: t("birthdayParty") },
    { value: "anniversary", label: t("anniversary") },
    { value: "graduation", label: t("graduation") },
    { value: "baby-shower", label: t("babyShower") },
    { value: "quinceañera", label: t("quinceañera") },
    { value: "other", label: t("other") },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = t("nameIsRequired")
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailIsRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("pleaseEnterAValidEmailAddress")
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("phoneNumberIsRequired")
    }

    if (!formData.eventType) {
      newErrors.eventType = t("pleaseSelectAnEventType")
    }

    if (!formData.message.trim()) {
      newErrors.message = t("pleaseTellUsMoreAboutYourEvent")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("form-name", "individualVenueForm")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("venue", formData.venue)
      formDataToSend.append("eventType", formData.eventType)
      formDataToSend.append("estimatedDate", formData.estimatedDate)
      formDataToSend.append("message", formData.message)

      // Submit to Netlify
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formDataToSend as any),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          estimatedDate: "",
          message: "",
          venue: formData.venue, // Keep venue name
          venueTitle: formData.venueTitle,
        })
        setTimeout(() => {
          if (onClose) {
            onClose()
          }
        }, 4000)
      } else {
        console.error("Form submission failed:", response.status)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      // Handle error - you might want to show an error message
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Send size={24} className="text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-charcoal mb-2">
          {t("messageSentSuccessfully")}
        </h3>
        <p className="text-slate-600 text-sm">
          {t("thankYouForYourInterest")} {formData.venue}.{" "}
          {t("weWillGetBackToYouWithin24Hours")}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-charcoal mb-1"
        >
          <User size={14} className="inline mr-1" />
          {t("fullName")} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.name ? "border-red-300" : "border-gray-300"
          }`}
          placeholder={t("enterFullName")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-charcoal mb-1"
        >
          <Mail size={14} className="inline mr-1" />
          {t("emailAddress")} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.email ? "border-red-300" : "border-gray-300"
          }`}
          placeholder={t("enterEmailPlaceholder")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-charcoal mb-1"
        >
          <Phone size={14} className="inline mr-1" />
          {t("phoneNumber")} *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.phone ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Event Type Field */}
      <div>
        <label
          htmlFor="eventType"
          className="block text-sm font-medium text-charcoal mb-1"
        >
          <Heart size={14} className="inline mr-1" />
          {t("eventType")} *
        </label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.eventType ? "border-red-300" : "border-gray-300"
          }`}
        >
          <option value="">{t("selectEventType")}</option>
          {eventTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.eventType && (
          <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>
        )}
      </div>

      {/* Date Field */}
      <div>
        <label
          htmlFor="estimatedDate"
          className="block text-sm font-medium text-charcoal mb-1"
        >
          <Calendar size={14} className="inline mr-1" />
          {t("estimatedEventDate")}
        </label>
        <input
          type="date"
          id="estimatedDate"
          name="estimatedDate"
          value={formData.estimatedDate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-1"
        >
          <MessageSquare size={14} className="inline mr-1" />
          {t("tellUsAboutYourEvent")} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden resize-none ${
            errors.message ? "border-red-300" : "border-gray-300"
          }`}
          placeholder={t("enterMessagePlaceholder")}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-charcoal border-t-transparent" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send size={16} />
              {t("sendInquiry")}
            </>
          )}
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-slate-500 text-center pt-2">
        {t("privacyNote")}
      </p>
    </form>
  )
}

export default IndividualVenueContactForm
