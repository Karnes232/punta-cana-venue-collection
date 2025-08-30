"use client"
import useFavorites from "@/customHooks/useFavoritesHook"
import { MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"

const Header = () => {
  const { favoriteCount, maxFavorites, isAtMaxCapacity } = useFavorites()
  const t = useTranslations("venueInspection")
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                {t("inspectionList")}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 hidden sm:block">
                {t("manageSelectedVenues")}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-shrink-0">
            <div className="bg-amber-100 text-amber-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-sm sm:text-base">
              <span className="hidden sm:inline">
                {favoriteCount}/{maxFavorites} {t("venues")}
              </span>
              <span className="sm:hidden">
                {favoriteCount}/{maxFavorites}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
