"use client"

import React, { useState } from "react"
import { Star, Heart } from "lucide-react"
import { useTranslations } from "next-intl"
import { useFavorites } from "@/customHooks/useFavoritesHook"

interface VenueFavoriteButtonProps {
  venueId: string
  venueName: string
  size?: "small" | "medium" | "large"
  showLabel?: boolean
  variant?: "star" | "heart"
  className?: string
}

const VenueFavoriteButton: React.FC<VenueFavoriteButtonProps> = ({
  venueId,
  venueName,
  size = "medium",
  showLabel = false,
  variant = "star",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const {
    isFavorited,
    toggleFavorite,
    error,
    clearError,
    isAtMaxCapacity,
    remainingSlots,
  } = useFavorites()
  const t = useTranslations("favorites")

  const isFavoritedStatus = isFavorited(venueId)

  // Size configurations
  const sizeConfig = {
    small: {
      iconSize: 16,
      buttonClass: "p-1.5",
      textClass: "text-xs",
    },
    medium: {
      iconSize: 20,
      buttonClass: "p-2",
      textClass: "text-sm",
    },
    large: {
      iconSize: 24,
      buttonClass: "p-3",
      textClass: "text-base",
    },
  }

  const config = sizeConfig[size]
  const IconComponent = variant === "heart" ? Heart : Star

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
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
      await toggleFavorite(venueId, venueName)
      console.log(
        `${isFavoritedStatus ? "Removed" : "Added"} "${venueName}" ${isFavoritedStatus ? "from" : "to"} favorites`,
      )
    } catch (error) {
      console.error("Failed to update favorite status:", error)
      setShowError(true)
      setTimeout(() => setShowError(false), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonClasses = `
    ${config.buttonClass}
    rounded-full
    transition-all
    duration-200
    hover:scale-110
    focus:outline-none
    focus:ring-2
    focus:ring-golden/50
    focus:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${
      isFavoritedStatus
        ? "bg-golden/10 hover:bg-golden/20 text-golden"
        : isAtMaxCapacity
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white/90 hover:bg-white text-gray-600 hover:text-golden"
    }
    backdrop-blur-sm
    shadow-sm
    hover:shadow-md
    ${showError ? "animate-pulse border-2 border-red-300" : ""}
    ${className}
  `.trim()

  const iconClasses = `
    transition-all duration-200
    ${
      isFavoritedStatus
        ? variant === "heart"
          ? "fill-red-500 text-red-500"
          : "fill-golden text-golden"
        : isAtMaxCapacity && !isFavoritedStatus
          ? "text-gray-400"
          : "hover:scale-110"
    }
  `.trim()

  if (showLabel) {
    return (
      <div className="relative">
        <div className="flex items-center gap-3">
          <button
            onClick={handleFavoriteToggle}
            disabled={isLoading || (!isFavoritedStatus && isAtMaxCapacity)}
            className={buttonClasses}
            aria-label={
              isFavoritedStatus
                ? `Remove ${venueName} from favorites`
                : `Add ${venueName} to favorites`
            }
            title={
              !isFavoritedStatus && isAtMaxCapacity
                ? `Maximum of 5 favorites reached. Remove a favorite first.`
                : isFavoritedStatus
                  ? "Remove from favorites"
                  : `Add to favorites (${remainingSlots} slots remaining)`
            }
          >
            <IconComponent size={config.iconSize} className={iconClasses} />
          </button>
          <div className="flex flex-col">
            <span className={`${config.textClass} font-medium text-charcoal`}>
              {isFavoritedStatus ? "Saved" : "Save"}
            </span>
            {!isFavoritedStatus &&
              remainingSlots <= 2 &&
              remainingSlots > 0 && (
                <span className="text-xs text-amber-600">
                  {remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} left
                </span>
              )}
          </div>
        </div>

        {/* Error tooltip */}
        {showError && (error || (!isFavoritedStatus && isAtMaxCapacity)) && (
          <div className="absolute top-full left-0 mt-2 p-2 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50 min-w-64">
            <p className="text-xs text-red-700">
              {error ||
                "Maximum of 5 favorites reached. Please remove a favorite first."}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={handleFavoriteToggle}
        disabled={isLoading || (!isFavoritedStatus && isAtMaxCapacity)}
        className={buttonClasses}
        aria-label={
          isFavoritedStatus
            ? `Remove ${venueName} from favorites`
            : `Add ${venueName} to favorites`
        }
        title={
          !isFavoritedStatus && isAtMaxCapacity
            ? `Maximum of 5 favorites reached. Remove a favorite first.`
            : isFavoritedStatus
              ? "Remove from favorites"
              : `Add to favorites (${remainingSlots} slots remaining)`
        }
      >
        <IconComponent size={config.iconSize} className={iconClasses} />
      </button>

      {/* Error tooltip */}
      {showError && (error || (!isFavoritedStatus && isAtMaxCapacity)) && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50 min-w-48">
          <p className="text-xs text-red-700 text-center">
            {error || "Max 5 favorites reached. Remove one first."}
          </p>
        </div>
      )}
    </div>
  )
}

export default VenueFavoriteButton
