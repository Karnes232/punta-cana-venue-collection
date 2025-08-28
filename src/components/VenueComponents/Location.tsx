import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Cormorant_Garamond } from 'next/font/google'
import React from 'react'

const coromantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })
const Location = ({ location }: { location: string }) => {
    const t = useTranslations("individualVenueListing")
  return (
    <div className="space-y-6">
        <div className="bg-white  rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-cyan-600" strokeWidth={2} />
          </div>
          <h3
            className={`${coromantGaramond.className} text-2xl font-semibold text-gray-800`}
          >
            {t("location")}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-1 gap-4">
          <div className="text-center border border-gray-100 p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg">
            {location}
          </div>
        </div>
      </div>
        
        
        </div>
  )
}

export default Location