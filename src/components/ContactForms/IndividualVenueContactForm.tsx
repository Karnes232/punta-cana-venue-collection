'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Send, Calendar, User, Mail, Phone, MessageSquare, Heart } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  eventType: string
  estimatedDate: string
  message: string
  venue: string
}

interface IndividualVenueContactFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onClose?: () => void
}

const IndividualVenueContactForm: React.FC<IndividualVenueContactFormProps> = ({
  formData,
  setFormData,
  onClose
}) => {
  const t = useTranslations('individualVenueForm')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Common event types - you can customize these based on your needs
  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'quinceañera', label: 'Quinceañera' },
    { value: 'other', label: 'Other' }
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us more about your event'
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
        name: '',
        email: '',
        phone: '',
        eventType: '',
        estimatedDate: '',
        message: '',
        venue: formData.venue, // Keep venue name
      })
      if (onClose) {
        onClose()
      }
    } else {
      console.error("Form submission failed:", response.status)
    }

    } catch (error) {
      console.error('Form submission error:', error)
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
          Message Sent Successfully!
        </h3>
        <p className="text-slate-600 text-sm">
          Thank you for your interest in {formData.venue}. We'll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
          <User size={14} className="inline mr-1" />
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          <Mail size={14} className="inline mr-1" />
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
          <Phone size={14} className="inline mr-1" />
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.phone ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Event Type Field */}
      <div>
        <label htmlFor="eventType" className="block text-sm font-medium text-charcoal mb-1">
          <Heart size={14} className="inline mr-1" />
          Event Type *
        </label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden ${
            errors.eventType ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select event type</option>
          {eventTypes.map((type) => (
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
        <label htmlFor="estimatedDate" className="block text-sm font-medium text-charcoal mb-1">
          <Calendar size={14} className="inline mr-1" />
          Estimated Event Date
        </label>
        <input
          type="date"
          id="estimatedDate"
          name="estimatedDate"
          value={formData.estimatedDate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
          <MessageSquare size={14} className="inline mr-1" />
          Tell us about your event *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden resize-none ${
            errors.message ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Please share details about your event: guest count, specific requirements, budget range, or any questions you have about this venue."
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
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Inquiry
            </>
          )}
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-slate-500 text-center pt-2">
        Your information is secure and will only be shared with the venue representative.
      </p>
    </form>
  )
}

export default IndividualVenueContactForm