"use client"

import React, { useState } from "react"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  DollarSign,
  MapPin,
  CheckCircle,
  Star,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useFavorites } from "@/customHooks/useFavoritesHook"

interface InspectionFormProps {
  locale: string
}

const InspectionForm: React.FC<InspectionFormProps> = ({ locale }) => {
  const t = useTranslations("inspectionForm")
  const { favoriteVenues } = useFavorites()

  const [formData, setFormData] = useState({
    "form-name": "inspectionForm",
    name: "",
    email: "",
    phone: "",
    eventType: "",
    estimatedDate: "",
    numberOfGuests: "",
    approximateBudget: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired")
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("emailInvalid")
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("phoneRequired")
    } else if (!/^\+[1-9][0-9\s().-]{7,19}$/.test(formData.phone.trim())) {
      newErrors.phone = t("phoneInvalid")
    }

    if (!formData.eventType) {
      newErrors.eventType = t("eventTypeRequired")
    }

    if (!formData.estimatedDate) {
      newErrors.estimatedDate = t("dateRequired")
    }

    if (!formData.numberOfGuests) {
      newErrors.numberOfGuests = t("guestsRequired")
    }

    if (!formData.approximateBudget) {
      newErrors.approximateBudget = t("budgetRequired")
    }

    if (favoriteVenues.length < 1) {
      newErrors.venues = t("minVenuesRequired")
    }

    if (favoriteVenues.length > 5) {
      newErrors.venues = t("maxVenuesExceeded")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)

    try {
      const payload = new URLSearchParams({
        "form-name": "inspectionForm",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        eventType: formData.eventType,
        estimatedDate: formData.estimatedDate,
        numberOfGuests: formData.numberOfGuests,
        approximateBudget: formData.approximateBudget,
        selectedVenues: favoriteVenues.map(venue => venue.name).join(", "),
        message: formData.message.trim(),
        locale,
        sourcePage: window.location.href,
      })

      // Submit to Netlify
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          "form-name": "inspectionForm",
          name: "",
          email: "",
          phone: "",
          eventType: "",
          estimatedDate: "",
          numberOfGuests: "",
          approximateBudget: "",
          message: "",
        })
      } else {
        setSubmitError(true)
        console.error("Form submission failed:", response.status)
      }
    } catch (error) {
      setSubmitError(true)
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-hero-display text-2xl font-semibold text-green-800 mb-2">
          {t("thankYou")}
        </h3>
        <p className="text-green-700">{t("responseMessage")}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-golden/10 to-golden/5 p-6 border-b border-slate-200">
        <h2 className="font-hero-display text-2xl font-semibold text-charcoal mb-2">
          {t("formTitle")}
        </h2>
        <p className="text-slate-600">{t("formDescription")}</p>
      </div>

      <form
        name="inspectionForm"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        toolname="request-venue-inspection"
        tooldescription={
          locale === "es"
            ? "Solicita una inspección de venues para un proyecto de evento calificado en República Dominicana."
            : "Request a venue inspection for a qualified event project in the Dominican Republic."
        }
        onSubmit={handleSubmit}
        className="p-6 space-y-6"
      >
        <input type="hidden" name="form-name" value="inspectionForm" />
        <input type="hidden" name="locale" value={locale} />
        <p className="hidden">
          <label>
            Do not fill this field <input name="bot-field" tabIndex={-1} />
          </label>
        </p>
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-hero-display text-xl font-semibold text-charcoal flex items-center gap-2">
            <User className="w-5 h-5 text-golden" />
            {t("personalInformation")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("name")} *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="name"
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors ${
                    errors.name ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder={t("namePlaceholder")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("phone")} *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors ${
                    errors.phone ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder={t("phonePlaceholder")}
                  pattern="^\+[1-9][0-9\s().-]{7,19}$"
                  title={t("phoneInvalid")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t("email")} *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors ${
                  errors.email ? "border-red-300" : "border-slate-300"
                }`}
                placeholder={t("emailPlaceholder")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          <h3 className="font-hero-display text-xl font-semibold text-charcoal flex items-center gap-2">
            <Calendar className="w-5 h-5 text-golden" />
            {t("eventDetails")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="eventType"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("eventType")} *
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors ${
                  errors.eventType ? "border-red-300" : "border-slate-300"
                }`}
              >
                <option value="">{t("selectEventType")}</option>
                <option value="corporateEvent">{t("corporateEvent")}</option>
                <option value="conferenceMeeting">
                  {t("conferenceMeeting")}
                </option>
                <option value="incentiveProgram">
                  {t("incentiveProgram")}
                </option>
                <option value="wedding">{t("wedding")}</option>
                <option value="other">{t("other")}</option>
              </select>
              {errors.eventType && (
                <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="estimatedDate"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("estimatedDate")} *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  id="estimatedDate"
                  name="estimatedDate"
                  value={formData.estimatedDate}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors ${
                    errors.estimatedDate ? "border-red-300" : "border-slate-300"
                  }`}
                />
              </div>
              {errors.estimatedDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.estimatedDate}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="numberOfGuests"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("numberOfGuests")} *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors ${
                    errors.numberOfGuests
                      ? "border-red-300"
                      : "border-slate-300"
                  }`}
                  placeholder={t("guestsPlaceholder")}
                />
              </div>
              {errors.numberOfGuests && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numberOfGuests}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="approximateBudget"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("approximateBudget")} *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  id="approximateBudget"
                  name="approximateBudget"
                  value={formData.approximateBudget}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors ${
                    errors.approximateBudget
                      ? "border-red-300"
                      : "border-slate-300"
                  }`}
                >
                  <option value="">{t("selectBudget")}</option>
                  <option value="under1000">{t("under1000")}</option>
                  <option value="1000To2500">{t("1000To2500")}</option>
                  <option value="2500To5000">{t("2500To5000")}</option>
                  <option value="5000To10000">{t("5000To10000")}</option>
                  <option value="10000Plus">{t("10000Plus")}</option>
                </select>
              </div>
              {errors.approximateBudget && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.approximateBudget}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Venue Selection */}
        <div className="space-y-4">
          <h3 className="font-hero-display text-xl font-semibold text-charcoal flex items-center gap-2">
            <Star className="w-5 h-5 text-golden" />
            {t("venueSelection")} ({favoriteVenues.length}/5)
          </h3>

          {favoriteVenues.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-lg">
              <Star className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">{t("noFavorites")}</p>
              <p className="text-slate-400 text-sm mt-2">
                {t("addVenuesFirst")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteVenues.map(venue => (
                <div
                  key={venue.id}
                  className="p-4 border border-slate-200 rounded-lg bg-gradient-to-br from-ivory to-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-golden rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-charcoal">
                        {venue.name}
                      </h4>
                      {venue.location && (
                        <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                          <MapPin size={12} />
                          <span>{venue.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {errors.venues && (
            <p className="text-red-500 text-sm">{errors.venues}</p>
          )}

          <div className="text-sm text-slate-600">
            <p>{t("venueSelectionNote")}</p>
          </div>
        </div>

        {/* Additional Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            {t("additionalMessage")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors resize-vertical"
            placeholder={t("messagePlaceholder")}
          />
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-red-600">
            {locale === "es"
              ? "No pudimos enviar la solicitud. Inténtalo de nuevo o escríbenos por WhatsApp."
              : "We could not send your request. Please try again or contact us on WhatsApp."}
          </p>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-golden/70 to-golden/90 text-slate-800 font-medium rounded-lg hover:bg-golden/90 focus:ring-2 focus:ring-golden focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t("sending")}
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                {t("submitInspection")}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default InspectionForm
