import { TypeVenue } from '@/sanity/queries/MainPage/MainPage'
import { urlFor } from '@/sanity/lib/image'
import React from 'react'
import Image from 'next/image'
import { Cormorant_Garamond } from 'next/font/google'

const coromantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })

const TypeVenueCard = ({ type, locale }: { type: TypeVenue, locale: string }) => {
  const title = type.title[locale as keyof typeof type.title] || type.title.en
  const imageUrl = type.image?.asset?.url

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
      {/* Background Image */}
      <div className="aspect-[4/3] w-full">
        {imageUrl ? (
          <Image
            width={type.image?.asset?.metadata?.dimensions?.width}
            height={type.image?.asset?.metadata?.dimensions?.height}
            src={imageUrl}
            alt={type.image?.alt || title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className={`${coromantGaramond.className} text-white text-lg lg:text-2xl font-semibold leading-tight`}>
          {title}
        </h3>
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </div>
  )
}

export default TypeVenueCard