"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Search, X } from "lucide-react"

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

  const altText =
    typeof heroImage.alt === "string" && heroImage.alt.trim()
      ? heroImage.alt
      : heroTitle

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
    <section className="relative w-full h-[75vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage.asset.url}
          alt={altText}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-black/0 z-[5]" aria-hidden />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center font-bold text-white">
        <h1 className="font-hero-display mb-8 max-w-4xs text-5xl font-bold text-shadow-lg md:max-w-lg md:text-7xl">
          {heroTitle}
        </h1>

        <div className="relative w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t("searchVenues")}
              className="w-full rounded-full border-2 border-white/20 bg-white/95 px-6 py-4 text-lg text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-300 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center gap-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 text-gray-500 transition-colors duration-200 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <div className="p-2 text-gray-500">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </div>

          {showResults && filteredVenues.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-white/20 bg-white/95 shadow-xl backdrop-blur-sm">
              {filteredVenues.map(venue => {
                const title = venue.title[locale] || venue.title.en
                return (
                  <Link
                    key={venue.slug.current}
                    href={`/venues/${venue.slug.current}`}
                    onClick={handleVenueClick}
                    className="block border-b border-gray-200 px-6 py-4 text-left text-gray-900 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 hover:bg-white/50"
                  >
                    <div className="font-medium">{title}</div>
                  </Link>
                )
              })}
            </div>
          )}

          {showResults && searchTerm.trim() && filteredVenues.length === 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
              <div className="text-center text-gray-500">
                {t("noVenuesFound")}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroComponent
