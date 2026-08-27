"use client"

import React, { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import {
  Send,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  Heart,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  eventType: string
  estimatedDate: string
  groupSize: string
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
  const locale = useLocale()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitError, setSubmitError] = useState(false)

  const eventTypes = [
    { value: "conference-meeting", label: t("conferenceMeeting") },
    { value: "incentive-program", label: t("incentiveProgram") },
    { value: "launch-activation", label: t("launchActivation") },
    { value: "retreat-offsite", label: t("retreatOffsite") },
    { value: "wedding-social", label: t("weddingSocial") },
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
    } else if (!/^\+[1-9][0-9\s().-]{7,19}$/.test(formData.phone.trim())) {
      newErrors.phone = t("phoneWithCountryCodeRequired")
    }

    if (!formData.eventType) {
      newErrors.eventType = t("pleaseSelectAnEventType")
    }

    if (!formData.estimatedDate) {
      newErrors.estimatedDate = t("dateIsRequired")
    }

    if (!formData.groupSize || Number(formData.groupSize) < 1) {
      newErrors.groupSize = t("groupSizeIsRequired")
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
    setSubmitError(false)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("form-name", "individualVenueForm")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("venue", formData.venue)
      formDataToSend.append("eventType", formData.eventType)
      formDataToSend.append("estimatedDate", formData.estimatedDate)
      formDataToSend.append("groupSize", formData.groupSize)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("venueTitle", formData.venueTitle)
      formDataToSend.append("locale", locale)
      formDataToSend.append("sourcePage", window.location.href)

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
          groupSize: "",
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
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
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
          required
          aria-invalid={Boolean(errors.name)}
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
          required
          aria-invalid={Boolean(errors.email)}
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
          required
          aria-invalid={Boolean(errors.phone)}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.phone ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="+1 829 000 0000"
          pattern="^\+[1-9][0-9\s().-]{7,19}$"
          title={t("phoneWithCountryCodeRequired")}
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
          required
          aria-invalid={Boolean(errors.eventType)}
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
          {t("estimatedEventDate")} *
        </label>
        <input
          type="date"
          id="estimatedDate"
          name="estimatedDate"
          value={formData.estimatedDate}
          onChange={handleInputChange}
          required
          aria-invalid={Boolean(errors.estimatedDate)}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${errors.estimatedDate ? "border-red-300" : "border-gray-300"}`}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.estimatedDate && (
          <p className="mt-1 text-xs text-red-500">{errors.estimatedDate}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="groupSize"
          className="mb-1 block text-sm font-medium text-charcoal"
        >
          {t("groupSize")} *
        </label>
        <input
          type="number"
          id="groupSize"
          name="groupSize"
          min="1"
          max="5000"
          value={formData.groupSize}
          onChange={handleInputChange}
          required
          aria-invalid={Boolean(errors.groupSize)}
          className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200 focus:border-golden focus:outline-none focus:ring-2 focus:ring-golden/50 ${errors.groupSize ? "border-red-300" : "border-gray-300"}`}
          placeholder={t("groupSizePlaceholder")}
        />
        {errors.groupSize && (
          <p className="mt-1 text-xs text-red-500">{errors.groupSize}</p>
        )}
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
          required
          aria-invalid={Boolean(errors.message)}
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

      {submitError && (
        <p
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          role="alert"
        >
          {t("submissionError")}
        </p>
      )}

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
