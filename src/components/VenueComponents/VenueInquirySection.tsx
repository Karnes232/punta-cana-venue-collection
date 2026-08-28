"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import IndividualVenueContactForm from "@/components/ContactForms/IndividualVenueContactForm"
import { PCVC_BRAND } from "@/lib/brand"

interface VenueInquirySectionProps {
  venueName: string
  venueTitle: string
  locale: "en" | "es"
}

export default function VenueInquirySection({
  venueName,
  venueTitle,
  locale,
}: VenueInquirySectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    estimatedDate: "",
    groupSize: "",
    message: "",
    venue: venueName,
    venueTitle,
  })
  const whatsappMessage =
    locale === "es"
      ? `Quiero realizar un evento en ${venueTitle}. Necesito asistencia con el venue y toda la operación.`
      : `I want to hold an event at ${venueTitle}. I need assistance with the venue and the complete operation.`

  return (
    <section
      id="venue-inquiry"
      aria-labelledby="venue-inquiry-title"
      className="scroll-mt-24 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.09)] sm:p-8 lg:p-10"
    >
      <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-turquoise">
            {locale === "es"
              ? "Tu evento comienza aquí"
              : "Your event starts here"}
          </p>
          <h2
            id="venue-inquiry-title"
            className="font-hero-display mt-3 text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
          >
            {locale === "es"
              ? `Quiero realizar mi evento en ${venueTitle}`
              : `I want to hold my event at ${venueTitle}`}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {locale === "es"
              ? "Envíanos los datos esenciales. Validaremos disponibilidad, capacidad, reglas del venue y necesidades de producción para preparar la ruta correcta de tu evento."
              : "Send us the essential details. We will validate availability, capacity, venue rules and production requirements to define the right path for your event."}
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-5 text-sm leading-6 text-slate-700">
            <p className="font-bold text-charcoal">
              {locale === "es"
                ? "Asistencia local completa"
                : "Complete local support"}
            </p>
            <p className="mt-1">
              {locale === "es"
                ? "Venue, producción, proveedores, transporte, invitados, cronograma y operación en sitio con un solo equipo bilingüe."
                : "Venue, production, suppliers, transportation, guests, timeline and onsite operations through one bilingual team."}
            </p>
          </div>
          <a
            href={`https://wa.me/${PCVC_BRAND.telephone}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3.5 text-sm font-bold text-green-700 transition hover:bg-green-50"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {locale === "es" ? "Hablar por WhatsApp" : "Talk on WhatsApp"}
          </a>
        </div>

        <IndividualVenueContactForm
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </section>
  )
}
