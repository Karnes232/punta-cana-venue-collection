import React from "react"
import { Cormorant_Garamond } from "next/font/google"
import { useTranslations } from "next-intl"
import { Ruler, Users } from "lucide-react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface SpaceInfo {
  totalSpace: {
    squareMeters: number
    squareFeet: number
  }
  capacity: {
    setup: {
      en: string
      es: string
    }
    maxGuests: number
  }[]
}

interface VenueSpaceInfoProps {
  totalSpace: number
  capacityCocktail: number
  capacitySeated: number
  locale?: "en" | "es"
}

function convertSqMetersToSqFeet(squareMeters: number) {
  const conversionFactor = 10.76391
  return Math.round(squareMeters * conversionFactor)
}

const VenueSpaceInfo = ({
  totalSpace,
  capacityCocktail,
  capacitySeated,
  locale = "en",
}: VenueSpaceInfoProps) => {
  const t = useTranslations("individualVenueListing")

  if (!totalSpace) {
    return null
  }

  const capacity = [
    {
      setup: {
        en: "Cocktail",
        es: "Coctel",
      },
      maxGuests: capacityCocktail,
    },
    {
      setup: {
        en: "Seated",
        es: "Sentado",
      },
      maxGuests: capacitySeated,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Total Space Section */}
      <div className="bg-white  rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <Ruler className="w-4 h-4 text-blue-600" strokeWidth={2} />
          </div>
          <h3
            className={`${coromantGaramond.className} text-2xl font-semibold text-gray-800`}
          >
            {t("totalSpace")}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center border border-gray-100 p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">
              {totalSpace.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {t("squareMeters")}
            </div>
          </div>
          <div className="text-center border border-gray-100 p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">
              {convertSqMetersToSqFeet(totalSpace).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {t("squareFeet")}
            </div>
          </div>
        </div>
      </div>

      {/* Capacity Section */}
      <div className="bg-white/60 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
            <Users className="w-4 h-4 text-green-600" strokeWidth={2} />
          </div>
          <h3
            className={`${coromantGaramond.className} text-2xl font-semibold text-gray-800`}
          >
            {t("capacity")}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {capacity.map((setup, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-100"
            >
              <div>
                <div className="font-semibold text-gray-800">
                  {setup.setup[locale] || setup.setup.en}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {setup.maxGuests}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {t("guests")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VenueSpaceInfo
