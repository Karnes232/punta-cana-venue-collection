import React, { useEffect, useState } from 'react'
import { X, Calendar, Phone, Mail, User, MapPin, Clock } from 'lucide-react';
import { IndividualVenue } from '@/sanity/queries/IndividualVenues/IndividualVenues';

const PopUpForm = ({ popUpReady, setPopUpReady, className, locale, venues }: { popUpReady: boolean, setPopUpReady: (value: boolean) => void, className: string, locale: 'en' | 'es', venues: IndividualVenue[] }) => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    estimatedDate: '',
    venueOfInterest: ''
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' &&
           formData.email.trim() !== '' &&
           formData.phone.trim() !== '' &&
           formData.eventType !== '' &&
           formData.estimatedDate !== '';
  };


  return (
    <div className={` fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${popUpReady ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {!showCalendly ? (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-golden/60 to-golden text-charcoal p-6 rounded-t-2xl">
              <button
                onClick={() => setPopUpReady(false)}
                className="absolute top-4 right-4 text-charcoal hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-charcoal" size={28} />
                <h2 className="text-2xl font-bold">Schedule a call with one of our advisors</h2>
              </div>
              <p className="text-charcoal">Click the link below to schedule your consultation with one of our venue specialists.</p>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Event Type
                </label>
                {/* <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">{t.placeholders.eventType}</option>
                  {t.eventTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select> */}
              </div>

              {/* Estimated Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock size={16} className="inline mr-2" />
                  Estimated Date
                </label>
                <input
                  type="date"
                  name="estimatedDate"
                  value={formData.estimatedDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Venue of Interest */}
              {venues.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Venue of Interest
                  </label>
                  <select
                    name="venueOfInterest"
                    value={formData.venueOfInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Venue of Interest</option>
                    {venues.map((venue, index) => (
                      <option key={index} value={venue.slug.current}>
                        {venue.title[locale]}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                {/* <button
                  onClick={handleScheduleCall}
                  disabled={!isFormValid()}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Calendar size={20} className="inline mr-2" />
                  {isFormValid() ? t.scheduleCall : t.fillForm}
                </button> */}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Calendly View */}
            <div className="relative">
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="p-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2">📅 Schedule a call with one of our advisors</h3>
                  <p className="text-sm text-blue-600">
                    {locale === 'en' 
                      ? 'Click the link below to schedule your consultation with one of our venue specialists.'
                      : 'Haz clic en el enlace de abajo para agendar tu consulta con uno de nuestros especialistas en venues.'
                    }
                  </p>
                </div>
                
                {/* Calendly Embed Placeholder */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    {locale === 'en' ? 'Calendly Integration' : 'Integración de Calendly'}
                  </h4>
                  <p className="text-gray-500 mb-4">
                    {locale === 'en' 
                      ? 'Replace this section with your actual Calendly embed code'
                      : 'Reemplaza esta sección con tu código de integración de Calendly'
                    }
                  </p>
                  <a 
                    href="https://calendly.com/your-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Calendar size={20} className="mr-2" />
                    {locale === 'en' ? 'Open Calendly' : 'Abrir Calendly'}
                  </a>
                </div>

                {/* Customer Info Summary */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {locale === 'en' ? 'Your Information:' : 'Tu Información:'}
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Event Type:</strong> {formData.eventType}</p>
                    <p><strong>Estimated Date:</strong> {formData.estimatedDate}</p>
                    {formData.venueOfInterest && (
                      <p><strong>Venue of Interest:</strong> {
                        venues.find(v => v.slug.current === formData.venueOfInterest)?.title[locale] || formData.venueOfInterest
                      }</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PopUpForm