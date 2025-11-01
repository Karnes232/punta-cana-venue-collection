"use client"
import React, { useState } from "react"
import { Send, User, Mail, Phone, MapPin, House } from "lucide-react"
import { useTranslations } from "next-intl"

const AddVenueForm = () => {
  const t = useTranslations("AddVenueForm")
  const [formData, setFormData] = useState({
    "form-name": "addVenueForm",
    name: "",
    email: "",
    phone: "",
    message: "",
    venueName: "",
    venueLocation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData for Netlify
      const formDataToSend = new FormData()
      formDataToSend.append("form-name", "addVenueForm")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("venueName", formData.venueName)
      formDataToSend.append("venueLocation", formData.venueLocation)

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
          "form-name": "addVenueForm",
          name: "",
          email: "",
          phone: "",
          message: "",
          venueName: "",
          venueLocation: "",
        })
      } else {
        console.error("Form submission failed:", response.status)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-10">
            {t("thankYou")}
          </h3>
          <p className="text-green-700">{t("responseMessageContactPage")}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full ">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 gap-6 mb-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("name")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors"
                  placeholder={t("namePlaceholder")}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t("phone")}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors"
                  placeholder={t("phonePlaceholder")}
                />
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t("email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors"
                placeholder={t("emailPlaceholder")}
              />
            </div>
          </div>

          {/* Venue Name Input */}
          <div className="mb-6">
            <label
              htmlFor="venueName"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t("venueName")}
            </label>
          </div>
          <div className="relative">
            <House className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="venueName"
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors"
              placeholder={t("venueNamePlaceholder")}
            />
          </div>

          {/* Venue Location Input */}
          <div className="mb-6">
            <label
              htmlFor="venueLocation"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t("venueLocation")}
            </label>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="venueLocation"
              name="venueLocation"
              value={formData.venueLocation}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors"
              placeholder={t("venueLocationPlaceholder")}
            />
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={e =>
                setFormData(prev => ({ ...prev, message: e.target.value }))
              }
              required
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-golden transition-colors resize-vertical"
              placeholder={t("messagePlaceholder")}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-golden/70 to-golden/90 text-slate-800 font-medium rounded-lg hover:bg-golden/90 focus:ring-2 focus:ring-golden focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t("sendMessage")}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddVenueForm
