"use client"
import React, { useState, useEffect } from "react"
import { getImageProps } from "next/image"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"
import { Cormorant_Garamond } from "next/font/google"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Search, X } from "lucide-react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map(str => {
      const [url, dpi] = str.split(" ")
      return `url("${url}") ${dpi}`
    })
    .join(", ")
  return `image-set(${imageSet})`
}

interface Venue {
  title: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
}

const HeroComponent = ({
  heroImage,
  heroTitle,
  venues = [],
  locale = "en",
}: {
  heroImage: HeroImage
  heroTitle: string
  venues?: Venue[]
  locale?: "en" | "es"
}) => {
  const t = useTranslations("hero")
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([])

  const {
    props: { srcSet },
  } = getImageProps({
    alt: heroImage.alt,
    width: 1000,
    height: 1000,
    src: heroImage.asset.url,
  })
  const backgroundImage = getBackgroundImage(srcSet)

  // Filter venues based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = venues.filter(venue => {
        const title = venue.title[locale] || venue.title.en
        return title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setFilteredVenues(filtered)
      setShowResults(true)
    } else {
      setFilteredVenues([])
      setShowResults(false)
    }
  }, [searchTerm, venues, locale])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setShowResults(false)
  }

  const handleVenueClick = () => {
    setShowResults(false)
    setSearchTerm("")
  }

  return (
    <main
      className="w-full h-[75vh] relative"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/0 z-5"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold z-10 text-center px-4">
        <h1
          className={`${coromantGaramond.className} font-bold text-5xl md:text-7xl text-shadow-lg max-w-4xs md:max-w-lg mb-8`}
        >
          {heroTitle}
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-md relative">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t("searchVenues")}
              className="w-full px-6 py-4 text-lg text-gray-900 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white transition-all duration-300 placeholder-gray-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="p-2 text-gray-500">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showResults && filteredVenues.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 max-h-64 overflow-y-auto z-20">
              {filteredVenues.map((venue, index) => {
                const title = venue.title[locale] || venue.title.en
                return (
                  <Link
                    key={venue.slug.current}
                    href={`/venues/${venue.slug.current}`}
                    onClick={handleVenueClick}
                    className="block px-6 py-4 text-left text-gray-900 hover:bg-white/50 transition-colors duration-200 border-b border-gray-200 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    <div className="font-medium">{title}</div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* No Results Message */}
          {showResults && searchTerm.trim() && filteredVenues.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 z-20">
              <div className="text-gray-500 text-center">
                {t("noVenuesFound")}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default HeroComponent
