"use client"
import React, { useState } from "react"
import { Send, User, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { useTranslations } from "next-intl"

interface BlogPostContactFormProps {
  venueName: string
  locale: string
  calendlyUrls: any
}

const BlogPostContactForm = ({
  venueName,
  locale,
  calendlyUrls,
}: BlogPostContactFormProps) => {
  const t = useTranslations("Contact")
  const [formData, setFormData] = useState({
    "form-name": "blogPost",
    name: "",
    email: "",
    phone: "",
    venue: venueName,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== ""
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      // Create FormData for Netlify
      const formDataToSend = new FormData()
      formDataToSend.append("form-name", "blogPost")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("venue", formData.venue)

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
          "form-name": "blogPost",
          name: "",
          email: "",
          phone: "",
          venue: venueName,
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
  console.log(formData)
  const submitForm = async () => {
    console.log(isFormValid())
    if (!isFormValid()) {
      return
    }
    const formDataToSend = new FormData()
    formDataToSend.append("form-name", "blogPost")
    formDataToSend.append("name", formData.name)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("phone", formData.phone)
    formDataToSend.append("venue", formData.venue)

    const response = await fetch("/__forms.html", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formDataToSend as any),
    })
    if (response.ok) {
      setIsSubmitted(true)
    } else {
      console.error("Form submission failed:", response.status)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>

          <h3 className="text-2xl font-bold text-green-800 mb-2">
            {t("thankYou")}
          </h3>
          <p className="text-green-700">
            {t("responseMessage")} {venueName}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full ">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-golden/70 to-golden/90 px-8 py-6 border-b border-slate-200">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-slate-800 mr-2" />
            <span className="text-sm font-medium text-slate-800">
              {venueName}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {t("contactTitle")}
          </h3>
          <p className="text-slate-800">{t("contactDescription")}</p>
        </div>

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

          {/* Hidden Venue Input */}
          <input type="hidden" name="venue" value={formData.venue} />

          {/* Submit Button */}
          <div className="flex 2xl:flex-col justify-end gap-4">
            {isFormValid() ? (
              <a
                href={
                  locale === "en"
                    ? calendlyUrls.englishUrl
                    : calendlyUrls.spanishUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-golden/70 to-golden/90 text-charcoal font-medium rounded-lg hover:bg-golden/90 focus:ring-2 focus:ring-golden focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={submitForm}
              >
                <Calendar size={20} className="mr-2" />
                {locale === "en" ? "Open Calendly" : "Abrir Calendly"}
              </a>
            ) : (
              <button
                type="submit"
                disabled={true}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-golden/70 to-golden/90 text-charcoal font-medium rounded-lg hover:bg-golden/90 focus:ring-2 focus:ring-golden focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t("fillForm")}
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-golden/70 to-golden/90 text-charcoal font-medium rounded-lg hover:bg-golden/90 focus:ring-2 focus:ring-golden focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default BlogPostContactForm
