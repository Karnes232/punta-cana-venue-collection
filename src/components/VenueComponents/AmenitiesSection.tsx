import {
  Waves,
  TreePalm,
  Flower2,
  Church,
  Building2,
  Home,
  Building,
  Star,
  Umbrella,
  Sun,
  Utensils,
  Wine,
  GlassWater,
  Flame,
  UtensilsCrossed,
  Music,
  Disc3,
  Lightbulb,
  Speaker,
  Camera,
  Snowflake,
  Wifi,
  Gem,
  Car,
  BedDouble,
  Bus,
  Plane,
  ShieldCheck,
  Key,
  CalendarCheck,
  Sparkles,
  Scissors,
  BookOpenCheck,
  Accessibility,
} from "lucide-react"
import React from "react"
import { Cormorant_Garamond } from "next/font/google"
import { useTranslations } from "next-intl"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface Amenity {
  title: {
    en: string
    es: string
  }
  icon?: string
}

interface AmenitiesSectionProps {
  amenities: Amenity[]
  locale?: "en" | "es"
}

const AmenitiesSection = ({
  amenities,
  locale = "en",
}: AmenitiesSectionProps) => {
  const t = useTranslations("venueListing")

  // Dynamic icon mapping - gets icon component by name
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Waves,
    TreePalm,
    Flower2,
    Church,
    Building2,
    Home,
    Building,
    Star,
    Umbrella,
    Sun,
    Utensils,
    Wine,
    GlassWater,
    Flame,
    UtensilsCrossed,
    Music,
    Disc3,
    Lightbulb,
    Speaker,
    Camera,
    Snowflake,
    Wifi,
    Gem,
    Car,
    BedDouble,
    Bus,
    Plane,
    ShieldCheck,
    Key,
    CalendarCheck,
    Sparkles,
    Scissors,
    BookOpenCheck,
    Accessibility,
  }

  if (!amenities || amenities.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header with elegant styling matching the design */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center">
          <Star
            className="w-4 h-4 text-amber-600"
            strokeWidth={2}
            fill="currentColor"
          />
        </div>
        <h3
          className={`${coromantGaramond.className} text-2xl font-semibold text-gray-800`}
        >
          {t("amenities")}
        </h3>
      </div>

      {/* Grid layout for better visual organization */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-3">
        {amenities.map((amenity, index) => {
          const IconComponent = amenity.icon ? iconMap[amenity.icon] : null
          const title = amenity.title[locale] || amenity.title.en

          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/60 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0">
                {IconComponent ? (
                  <IconComponent
                    className="w-4 h-4 text-gray-600"
                    strokeWidth={1.5}
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                )}
              </div>
              <span className="text-gray-700 font-medium text-sm">{title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AmenitiesSection
