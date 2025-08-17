"use client"
import React, { useState, useMemo } from "react"
import HeroComponentVenuePage from "../HeroComponent/HeroComponentVenuePage"
import { VenuePage } from "@/sanity/queries/VenuePage/VenuePage"
import { IndividualVenue } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import IndividualVenueCard from "./IndividualVenueCard"

interface FilterOptions {
  location: string
  type: string
  capacity: string
  budget: string
}

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
  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    type: "",
    capacity: "",
    budget: "",
  })

  // Generate filter options from venue data
  const filterOptions = useMemo(() => {
    const locations = [...new Set(individualVenues.map(venue => venue.location))].sort()
    
    const types = [...new Set(
      individualVenues.flatMap(venue => 
        venue.type.map(t => t.title[locale as keyof typeof t.title] || t.title.en)
      )
    )].sort()
    
    // Generate capacity ranges based on actual data
    const capacities = individualVenues.map(venue => venue.capacityCocktail).sort((a, b) => a - b)
    const capacityRanges = [
      "Up to 50",
      "51-100", 
      "101-200",
      "201-500",
      "500+"
    ]
    
    // Generate budget ranges based on actual data
    const budgets = individualVenues.map(venue => venue.startingFrom).sort((a, b) => a - b)
    const budgetRanges = [
      "Under $1,000",
      "$1,000 - $2,500",
      "$2,500 - $5,000", 
      "$5,000 - $10,000",
      "$10,000+"
    ]

    return {
      locations,
      types,
      capacityRanges,
      budgetRanges,
    }
  }, [individualVenues, locale])

  // Filter venues based on search term and filters
  const filteredVenues = useMemo(() => {
    let filtered = individualVenues

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(venue => {
        const title = venue.title[locale as keyof typeof venue.title] || venue.title.en
        return title.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(venue => venue.location === filters.location)
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(venue => 
        venue.type.some(t => {
          const typeTitle = t.title[locale as keyof typeof t.title] || t.title.en
          return typeTitle === filters.type
        })
      )
    }

    // Apply capacity filter
    if (filters.capacity) {
      filtered = filtered.filter(venue => {
        const capacity = venue.capacityCocktail
        switch (filters.capacity) {
          case "Up to 50":
            return capacity <= 50
          case "51-100":
            return capacity >= 51 && capacity <= 100
          case "101-200":
            return capacity >= 101 && capacity <= 200
          case "201-500":
            return capacity >= 201 && capacity <= 500
          case "500+":
            return capacity > 500
          default:
            return true
        }
      })
    }

    // Apply budget filter
    if (filters.budget) {
      filtered = filtered.filter(venue => {
        const budget = venue.startingFrom
        switch (filters.budget) {
          case "Under $1,000":
            return budget < 1000
          case "$1,000 - $2,500":
            return budget >= 1000 && budget <= 2500
          case "$2,500 - $5,000":
            return budget >= 2500 && budget <= 5000
          case "$5,000 - $10,000":
            return budget >= 5000 && budget <= 10000
          case "$10,000+":
            return budget > 10000
          default:
            return true
        }
      })
    }

    return filtered
  }, [individualVenues, searchTerm, filters, locale])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const hasActiveFilters = Object.values(filters).some(filter => filter !== "")

  return (
    <div>
      <HeroComponentVenuePage
        heroImage={venuePage.heroImage}
        heroTitle={venuePage.title[locale as keyof typeof venuePage.title]}
        onSearch={handleSearch}
        onFiltersChange={handleFiltersChange}
        filterOptions={filterOptions}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Results Summary */}
        {(searchTerm || hasActiveFilters) && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              {filteredVenues.length === 0
                ? `No venues found${
                    searchTerm ? ` for "${searchTerm}"` : ""
                  }${
                    hasActiveFilters ? " with selected filters" : ""
                  }`
                : `Found ${filteredVenues.length} venue${
                    filteredVenues.length === 1 ? "" : "s"
                  }${
                    searchTerm ? ` for "${searchTerm}"` : ""
                  }${
                    hasActiveFilters ? " with selected filters" : ""
                  }`}
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
