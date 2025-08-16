import { TypeVenue as TypeVenueType } from '@/sanity/queries/MainPage/MainPage'
import { Cormorant_Garamond } from 'next/font/google'
import React from 'react'
import TypeVenueCard from './TypeVenueCard'
import { useTranslations } from 'next-intl'


const coromantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })
  

const TypeVenue = ({ typeVenue, locale }: { typeVenue: TypeVenueType[], locale: string }) => {
    const t = useTranslations("Home")
  return (
    <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:py-8">
            <h2 className={`${coromantGaramond.className} text-2xl lg:text-4xl font-bold text-charcoal mb-6 text-center lg:text-left`}>{t("typeVenue")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {typeVenue.map((type) => (
                    <TypeVenueCard key={type.title[locale as keyof typeof type.title]} type={type} locale={locale} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default TypeVenue
