import { IndividualVenue } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { urlFor } from "@/sanity/lib/image"
import { Cormorant_Garamond } from "next/font/google"
import { MapPin, Users, Star, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { useFavorites } from "@/customHooks/useFavoritesHook"
import IndividualVenueForm from "./IndividualVenueForm"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Type for venue with location as string instead of { location: string }
type VenueWithStringLocation = Omit<IndividualVenue, "location"> & {
  location: string
}

const IndividualVenueCard = ({
  venue,
  locale,
}: {
  venue: VenueWithStringLocation
  locale: string
}) => {
  const {
    venueName,
    title,
    heroImage,
    slug,
    location,
    type,
    capacityCocktail,
    amenities,
    startingFrom,
  } = venue
  const t = useTranslations("venueListing")

  // Use the favorites hook for consistent state management
  const {
    isFavorited,
    toggleFavorite,
    isAtMaxCapacity,
    remainingSlots,
    error,
    clearError,
  } = useFavorites()
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  // Get localized title
  const localizedTitle = title[locale as keyof typeof title] || title.en

  // Check if this venue is favorited
  const isFavoritedStatus = isFavorited(slug.current)

  // Get localized types
  const localizedTypes =
    type.length > 0
      ? type.map(t => t.title[locale as keyof typeof t.title] || t.title.en)
      : ["Venue"]

  // Get first few amenities for display
  const displayAmenities = amenities.slice(0, 3)

  // Handle star click with the hook
  const handleStarClick = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent any parent link navigation
    e.stopPropagation()

    // Clear any existing error
    clearError()
    setShowError(false)

    // If trying to add but already at max capacity
    if (!isFavoritedStatus && isAtMaxCapacity) {
      setShowError(true)
      setTimeout(() => setShowError(false), 4000) // Hide error after 4 seconds
      return
    }

    setIsLoading(true)

    try {
      await toggleFavorite(slug.current, localizedTitle, location, venueName)
      console.log(
        `Venue ${isFavoritedStatus ? "removed from" : "added to"} favorites:`,
        localizedTitle,
      )
    } catch (error) {
      console.error("Failed to update favorite status:", error)
      setShowError(true)
      setTimeout(() => setShowError(false), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link
      href={`/venues/${slug.current}`}
      // className="block w-full bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md"
    >
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {heroImage?.asset?.url ? (
            <Image
              src={heroImage.asset.url}
              alt={heroImage.alt || localizedTitle}
              width={heroImage.asset.metadata.dimensions.width}
              height={heroImage.asset.metadata.dimensions.height}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Type Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[calc(100%-120px)]">
            {localizedTypes.map((typeName, index) => (
              <span
                key={index}
                className="bg-golden/90 text-charcoal px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
              >
                {typeName}
              </span>
            ))}
          </div>

          {/* Price Badge */}
          {/* <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm text-charcoal px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <DollarSign size={14} />
            <span>
              {t("from")} {startingFrom}
            </span>
          </div>
        </div> */}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title with Star */}
          <div className="flex items-start justify-between mb-2 relative">
            <h3
              className={`${coromantGaramond.className} text-xl h-14 font-semibold text-charcoal line-clamp-2 flex-1 pr-3`}
            >
              {localizedTitle}
            </h3>
            <button
              onClick={handleStarClick}
              //disabled={isLoading || (!isFavoritedStatus && isAtMaxCapacity)}
              className={`flex-shrink-0 p-1 rounded-full transition-colors duration-200 group disabled:opacity-50 disabled:cursor-not-allowed ${
                isFavoritedStatus
                  ? "hover:bg-golden/10"
                  : isAtMaxCapacity
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-gray-100"
              } ${showError ? "animate-pulse bg-red-50" : ""}`}
              aria-label={
                isFavoritedStatus
                  ? t("removeFromFavorites")
                  : t("addToFavorites")
              }
              title={
                !isFavoritedStatus && isAtMaxCapacity
                  ? t("maximumFavoritesReached")
                  : isFavoritedStatus
                    ? t("removeFromFavorites")
                    : `${t("addToFavorites")} (${remainingSlots} ${t("slotsRemaining")})`
              }
            >
              <Star
                size={24}
                className={`transition-all duration-200 ${
                  isFavoritedStatus
                    ? "fill-golden text-golden"
                    : isAtMaxCapacity
                      ? "text-gray-400"
                      : "text-gray-400 hover:text-golden group-hover:scale-110"
                } ${isLoading ? "animate-pulse" : ""}`}
              />
            </button>

            {/* Error tooltip for card */}
            {showError &&
              (error || (!isFavoritedStatus && isAtMaxCapacity)) && (
                <div className="absolute top-full right-0 mt-1 p-2 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50 min-w-48">
                  <p className="text-xs text-red-700">
                    {error || t("maxFavoritesReached")}
                  </p>
                </div>
              )}
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 text-slate-600 mb-3">
            <MapPin size={16} className="text-turquoise" />
            <span className="text-sm">{location}</span>
          </div>

          {/* Capacity */}
          <div className="flex items-center space-x-2 text-slate-600 mb-4">
            <Users size={16} className="text-turquoise" />
            <span className="text-sm">
              {t("upTo")} {capacityCocktail} {t("guests")}
            </span>
          </div>

          {/* Amenities */}
          {displayAmenities.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star size={14} className="text-golden" />
                <span className="text-sm font-medium text-slate-700">
                  {t("amenities")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 h-7 overflow-hidden">
                {displayAmenities.map((amenity, index) => {
                  const amenityTitle =
                    amenity.title[locale as keyof typeof amenity.title] ||
                    amenity.title.en
                  return (
                    <span
                      key={index}
                      className="bg-ivory h-6 text-charcoal px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {amenityTitle}
                    </span>
                  )
                })}
                {amenities.length > 3 && (
                  <span className="text-slate-500 text-xs">
                    +{amenities.length - 3} {t("more")}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <IndividualVenueForm
              venueName={venueName}
              venueTitle={localizedTitle}
              className="block w-full bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md"
            />

            <div className="block w-full bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md">
              {t("viewDetails")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default IndividualVenueCard
