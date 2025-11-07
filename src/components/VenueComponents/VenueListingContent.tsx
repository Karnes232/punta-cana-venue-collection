"use client"
import React, { useState, useMemo, useEffect } from "react"
import { useTranslations } from "next-intl"
import HeroComponentVenuePage from "../HeroComponent/HeroComponentVenuePage"
import { VenuePage } from "@/sanity/queries/VenuePage/VenuePage"
import { IndividualVenue } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import IndividualVenueCard from "./IndividualVenueCard"
import { TypeVenue as TypeVenueType } from "@/sanity/queries/MainPage/MainPage"
interface FilterOptions {
  location: string
  type: string
  capacity: string
  budget: string
}

// Type for venue with location as string instead of { location: string }
type VenueWithStringLocation = Omit<IndividualVenue, "location"> & {
  location: string
}

const VenueListingContent = ({
  venuePage,
  individualVenues,
  typeVenue,
  locale,
  initialFilters = { location: "", type: "", capacity: "", budget: "" },
}: {
  venuePage: VenuePage
  individualVenues: IndividualVenue[]
  typeVenue: TypeVenueType[]
  locale: string
  initialFilters?: FilterOptions
}) => {
  const t = useTranslations("venueListing")
  const transformedVenues: VenueWithStringLocation[] = individualVenues.map(
    venue => ({
      ...venue,
      location: venue.location.location,
    }),
  )

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)

  // Apply initial filters when component mounts
  useEffect(() => {
    if (Object.values(initialFilters).some(filter => filter !== "")) {
      setFilters(initialFilters)
    }
  }, [initialFilters])

  // Generate filter options from venue data
  const filterOptions = useMemo(() => {
    const locations = [
      ...new Set(transformedVenues.map(venue => venue.location)),
    ].sort()

    const types = [
      ...new Set(
        typeVenue.flatMap(
          venue =>
            venue.title[locale as keyof typeof venue.title] || venue.title.en,
        ),
      ),
    ].sort()

    // Generate capacity ranges based on actual data
    const capacities = transformedVenues
      .map(venue => venue.capacityCocktail)
      .sort((a, b) => a - b)
    const capacityRanges = [
      t("capacityUpTo50"),
      t("capacity51To100"),
      t("capacity101To200"),
      t("capacity201To500"),
      t("capacity500Plus"),
    ]

    // Generate budget ranges based on actual data
    const budgets = transformedVenues
      .map(venue => venue.startingFrom)
      .sort((a, b) => a - b)
    const budgetRanges = [
      t("budgetUnder1000"),
      t("budget1000To2500"),
      t("budget2500To5000"),
      t("budget5000To10000"),
      t("budget10000Plus"),
    ]

    return {
      locations,
      types,
      capacityRanges,
      budgetRanges,
    }
  }, [transformedVenues, locale, t])

  // Filter venues based on search term and filters
  const filteredVenues = useMemo(() => {
    let filtered = transformedVenues

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(venue => {
        const title =
          venue.title[locale as keyof typeof venue.title] || venue.title.en
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
          const typeTitle =
            t.title[locale as keyof typeof t.title] || t.title.en
          return typeTitle === filters.type
        }),
      )
    }

    // Apply capacity filter
    if (filters.capacity) {
      filtered = filtered.filter(venue => {
        const capacity = venue.capacityCocktail
        switch (filters.capacity) {
          case t("capacityUpTo50"):
            return capacity <= 50
          case t("capacity51To100"):
            return capacity >= 51 && capacity <= 100
          case t("capacity101To200"):
            return capacity >= 101 && capacity <= 200
          case t("capacity201To500"):
            return capacity >= 201 && capacity <= 500
          case t("capacity500Plus"):
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
          case t("budgetUnder1000"):
            return budget < 1000
          case t("budget1000To2500"):
            return budget >= 1000 && budget <= 2500
          case t("budget2500To5000"):
            return budget >= 2500 && budget <= 5000
          case t("budget5000To10000"):
            return budget >= 5000 && budget <= 10000
          case t("budget10000Plus"):
            return budget > 10000
          default:
            return true
        }
      })
    }

    return filtered
  }, [transformedVenues, searchTerm, filters, locale, t])

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
        initialFilters={initialFilters}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Results Summary */}
        {(searchTerm || hasActiveFilters) && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              {filteredVenues.length === 0
                ? t("noVenuesFound", { searchTerm: searchTerm || "" })
                : t("venuesFound", {
                    count: filteredVenues.length,
                    searchTerm: searchTerm || "",
                  })}
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
