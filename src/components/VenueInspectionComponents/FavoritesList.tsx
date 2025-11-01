"use client"

import React from "react"
import { Star, Trash2, MapPin, Calendar } from "lucide-react"
import { useTranslations } from "next-intl"
import { useFavorites } from "@/customHooks/useFavoritesHook"
import Link from "next/link"
import { Cormorant_Garamond } from "next/font/google"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface FavoritesListProps {
  locale: string
  className?: string
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  locale,
  className = "",
}) => {
  const { favoriteVenues, removeFavorite, isLoading, clearFavorites } =
    useFavorites()
  const t = useTranslations("favorites")

  // Define main areas
  const mainAreas = ["Cap Cana", "Punta Cana", "Bávaro"]

  // Count venues outside main areas
  const venuesOutsideMainArea = favoriteVenues.filter(
    venue => venue.location && !mainAreas.includes(venue.location),
  ).length

  const handleRemoveFavorite = async (venueId: string) => {
    try {
      await removeFavorite(venueId)
    } catch (error) {
      console.error("Failed to remove favorite:", error)
    }
  }

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to clear all favorites?")) {
      try {
        await clearFavorites()
      } catch (error) {
        console.error("Failed to clear favorites:", error)
      }
    }
  }
  console.log(favoriteVenues)
  if (isLoading) {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-golden fill-golden" />
          <h2
            className={`${coromantGaramond.className} text-2xl font-semibold text-charcoal`}
          >
            {t("favorites")} ({favoriteVenues.length})
          </h2>
        </div>
        {favoriteVenues.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
          >
            <Trash2 size={14} />
            {t("clearAll")}
          </button>
        )}
      </div>

      {venuesOutsideMainArea > 0 && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <p className="text-sm font-medium">
              {venuesOutsideMainArea} venue
              {venuesOutsideMainArea > 1 ? "s" : ""} {t("outsideMainArea")}
            </p>
          </div>
          <p className="text-sm text-amber-700 mt-1">
            {t("outsideMainAreaAdditionalCosts")}
          </p>
        </div>
      )}

      {favoriteVenues.length === 0 ? (
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{t("noFavorites")}</p>
          <p className="text-gray-400 text-sm mt-2">{t("startExploring")}</p>
          <Link
            href={`/${locale}/venues`}
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-br from-golden/50 to-golden/90 text-charcoal rounded-xl font-medium hover:from-golden/70 hover:to-golden transition-all duration-300"
          >
            <MapPin size={16} />
            {t("browseVenues")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteVenues.map(venue => (
            <div
              key={venue.id}
              className="flex items-center justify-between p-4 bg-gradient-to-br from-ivory to-white rounded-xl border border-golden/20 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-golden fill-golden" />
                  <h3 className="font-medium text-charcoal">{venue.name}</h3>
                </div>
                {venue.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                    <MapPin size={12} />
                    <span>{venue.location}</span>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  {t("addedOn")} {new Date(venue.addedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}/venues/${venue.id}`}
                  className="px-3 py-2 text-sm bg-gradient-to-br from-golden/50 to-golden/90 text-charcoal rounded-lg hover:from-golden/70 hover:to-golden transition-all duration-300 flex items-center gap-1"
                >
                  <Calendar size={14} />
                  {t("view")}
                </Link>
                <button
                  onClick={() => handleRemoveFavorite(venue.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-300"
                  title="Remove from favorites"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesList
