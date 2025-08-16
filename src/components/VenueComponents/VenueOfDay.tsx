import { Heart, MapPin } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const VenueOfDay = ({
  venueOfTheDay,
  locale,
}: {
  venueOfTheDay: any
  locale: string
}) => {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <h2
          className={`${coromantGaramond.className} text-2xl font-bold text-charcoal mb-6 text-center lg:text-left`}
        >
          Venue of the Day
        </h2>

        {/* Compact Card */}
        <div className="bg-ivory rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-1">
            {/* Image */}
            <div className="md:col-span-2 relative h-64 md:h-auto">
              <Image
                src={venueOfTheDay.heroImage.asset.url}
                alt={venueOfTheDay.heroImage.alt}
                width={venueOfTheDay.heroImage.asset.metadata.dimensions.width}
                height={
                  venueOfTheDay.heroImage.asset.metadata.dimensions.height
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-golden text-charcoal px-2 py-1 rounded-full text-xs font-semibold">
                  Today's Pick
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3
                    className={`${coromantGaramond.className} text-xl font-bold text-charcoal`}
                  >
                    {venueOfTheDay.title[locale]}
                  </h3>
                  <div className="flex items-center text-sm text-charcoal/70 mt-1">
                    <MapPin size={14} className="mr-1 text-turquoise" />
                    <span>{venueOfTheDay.location}</span>
                  </div>
                </div>
                <button className="text-charcoal/40 hover:text-turquoise transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              <p className="text-charcoal/70 text-sm mb-4 line-clamp-2">
                {venueOfTheDay.teaser[locale]}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-xs text-charcoal/60">
                  <span>Up to {venueOfTheDay.capacityCocktail} guests</span>
                  <span>•</span>
                  <span>{venueOfTheDay.type}</span>
                  <span>•</span>
                  <span>{venueOfTheDay.amenities.title[locale]}</span>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Link
                  href={`/venues/${venueOfTheDay.slug.current}`}
                  className="bg-turquoise text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-turquoise/90 transition-colors"
                >
                  View Venue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueOfDay
