import React, { useState } from "react"
import { getImageProps } from "next/image"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"
import { Cormorant_Garamond } from "next/font/google"

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

interface FilterOptions {
  location: string
  type: string
  capacity: string
  budget: string
}

const HeroComponentVenuePage = ({
  heroImage,
  heroTitle,
  onSearch,
  onFiltersChange,
  filterOptions,
}: {
  heroImage: HeroImage
  heroTitle: string
  onSearch: (searchTerm: string) => void
  onFiltersChange: (filters: FilterOptions) => void
  filterOptions: {
    locations: string[]
    types: string[]
    capacityRanges: string[]
    budgetRanges: string[]
  }
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    type: "",
    capacity: "",
    budget: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const {
    props: { srcSet },
  } = getImageProps({
    alt: heroImage.alt,
    width: 1000,
    height: 1000,
    src: heroImage.asset.url,
  })
  const backgroundImage = getBackgroundImage(srcSet)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value) // Real-time search as user types
  }

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string,
  ) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      location: "",
      type: "",
      capacity: "",
      budget: "",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <main
      className="w-full h-[85vh] md:h-[75vh] lg:h-[40rem] relative"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold z-10 text-center px-4">
        <h1
          className={`${coromantGaramond.className} font-bold text-5xl md:text-7xl text-shadow-lg max-w-4xs md:max-w-lg mb-8`}
        >
          {heroTitle}
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-md mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search Venues..."
              className="w-full px-6 py-4 text-lg text-gray-900 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white transition-all duration-300 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            />
          </svg>
          Filters
        </button>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={e => handleFilterChange("location", e.target.value)}
                  className="w-full px-4 py-2 text-gray-900 bg-white/80 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden"
                >
                  <option value="">All Locations</option>
                  {filterOptions.locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={e => handleFilterChange("type", e.target.value)}
                  className="w-full px-4 py-2 text-gray-900 bg-white/80 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden"
                >
                  <option value="">All Types</option>
                  {filterOptions.types.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Capacity Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Capacity
                </label>
                <select
                  value={filters.capacity}
                  onChange={e => handleFilterChange("capacity", e.target.value)}
                  className="w-full px-4 py-2 text-gray-900 bg-white/80 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden"
                >
                  <option value="">Any Capacity</option>
                  {filterOptions.capacityRanges.map(range => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget
                </label>
                <select
                  value={filters.budget}
                  onChange={e => handleFilterChange("budget", e.target.value)}
                  className="w-full px-4 py-2 text-gray-900 bg-white/80 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:border-golden"
                >
                  <option value="">Any Budget</option>
                  {filterOptions.budgetRanges.map(range => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="mt-4 text-center">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default HeroComponentVenuePage
