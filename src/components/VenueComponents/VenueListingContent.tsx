"use client"
import React, { useState, useMemo } from "react"
import HeroComponentVenuePage from "../HeroComponent/HeroComponentVenuePage"
import { VenuePage } from "@/sanity/queries/VenuePage/VenuePage"
import { IndividualVenue } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import IndividualVenueCard from "./IndividualVenueCard"

const VenueListingContent = ({
  venuePage,
  individualVenues,
  locale,
}: {
  venuePage: VenuePage
  individualVenues: IndividualVenue[]
  locale: string
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter venues based on search term
  const filteredVenues = useMemo(() => {
    if (!searchTerm.trim()) {
      return individualVenues
    }

    return individualVenues.filter(venue => {
      const title =
        venue.title[locale as keyof typeof venue.title] || venue.title.en
      return title.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [individualVenues, searchTerm, locale])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  return (
    <div>
      <HeroComponentVenuePage
        heroImage={venuePage.heroImage}
        heroTitle={venuePage.title[locale as keyof typeof venuePage.title]}
        onSearch={handleSearch}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {searchTerm && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              {filteredVenues.length === 0
                ? `No venues found for "${searchTerm}"`
                : `Found ${filteredVenues.length} venue${filteredVenues.length === 1 ? "" : "s"} for "${searchTerm}"`}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map(venue => (
            <IndividualVenueCard
              key={venue.slug.current}
              venue={venue}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VenueListingContent
