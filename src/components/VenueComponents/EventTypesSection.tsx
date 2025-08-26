import React from "react"
import { Cormorant_Garamond } from "next/font/google"
import { useTranslations } from "next-intl"
import {
  Heart,
  PartyPopper,
  Briefcase,
  GraduationCap,
  Gift,
  Music,
  Calendar,
  Users,
  Crown,
  Cake,
  Camera,
  Star,
} from "lucide-react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface EventType {
  title: {
    en: string
    es: string
  }
  icon?: string
}

interface EventTypesSectionProps {
  eventTypes: EventType[]
  locale?: "en" | "es"
}

const EventTypesSection = ({
  eventTypes,
  locale = "en",
}: EventTypesSectionProps) => {
  const t = useTranslations("individualVenueListing")

  // Dynamic icon mapping
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Heart,
    PartyPopper,
    Briefcase,
    GraduationCap,
    Gift,
    Music,
    Calendar,
    Users,
    Crown,
    Cake,
    Camera,
    Star,
  }

  if (!eventTypes || eventTypes.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
          <Calendar className="w-4 h-4 text-purple-600" strokeWidth={2} />
        </div>
        <h3
          className={`${coromantGaramond.className} text-2xl font-semibold text-gray-800`}
        >
          {t("eventTypes")}
        </h3>
      </div>

      {/* Event Types Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {eventTypes.map((eventType, index) => {
          const IconComponent = eventType.icon ? iconMap[eventType.icon] : Heart
          const title = eventType.title[locale] || eventType.title.en

          return (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/60 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                <IconComponent
                  className="w-5 h-5 text-purple-600"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-gray-700 font-medium text-base">
                {title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EventTypesSection
