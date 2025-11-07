"use client"

import { useState, useEffect, useCallback } from "react"

interface FavoriteVenue {
  id: string
  name: string
  venueName?: string
  addedAt: string
  location?: string // e.g., "Punta Cana", "Cap Cana", etc.
}

// Create a global state manager
let globalFavorites: string[] = []
let globalFavoriteVenues: FavoriteVenue[] = []
const subscribers = new Set<() => void>()

const notifySubscribers = () => {
  subscribers.forEach(callback => callback())
}

const loadFavoritesFromStorage = () => {
  if (typeof window === "undefined") return

  try {
    const storedFavorites = localStorage.getItem("venueFavorites")
    const storedVenueDetails = localStorage.getItem("venueFavoriteDetails")

    if (storedFavorites) {
      globalFavorites = JSON.parse(storedFavorites)
    }

    if (storedVenueDetails) {
      globalFavoriteVenues = JSON.parse(storedVenueDetails)
    }
  } catch (error) {
    console.error("Failed to load favorites:", error)
  }
}

const saveFavoritesToStorage = (
  favorites: string[],
  favoriteVenues: FavoriteVenue[],
) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("venueFavorites", JSON.stringify(favorites))
    localStorage.setItem("venueFavoriteDetails", JSON.stringify(favoriteVenues))

    // Update global state
    globalFavorites = favorites
    globalFavoriteVenues = favoriteVenues

    // Notify all subscribers
    notifySubscribers()
  } catch (error) {
    console.error("Failed to save favorites:", error)
  }
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoriteVenues, setFavoriteVenues] = useState<FavoriteVenue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const MAX_FAVORITES = 5

  // Subscribe to global state changes
  useEffect(() => {
    // Initialize from global state or storage
    if (globalFavorites.length === 0) {
      loadFavoritesFromStorage()
    }

    setFavorites([...globalFavorites])
    setFavoriteVenues([...globalFavoriteVenues])
    setIsLoading(false)

    // Subscribe to changes
    const updateState = () => {
      setFavorites([...globalFavorites])
      setFavoriteVenues([...globalFavoriteVenues])
    }

    subscribers.add(updateState)

    return () => {
      subscribers.delete(updateState)
    }
  }, [])

  // Add venue to favorites
  const addFavorite = useCallback(
    async (
      venueId: string,
      venueTitle: string,
      location?: string,
      venueName?: string,
    ) => {
      setError(null)

      if (globalFavorites.includes(venueId)) return

      // Check if adding would exceed the limit
      if (globalFavorites.length >= MAX_FAVORITES) {
        const errorMessage = `You can only favorite up to ${MAX_FAVORITES} venues. Please remove a favorite before adding a new one.`
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      const newFavorite: FavoriteVenue = {
        id: venueId,
        name: venueTitle,
        venueName: venueName,
        addedAt: new Date().toISOString(),
        location,
      }

      const newFavorites = [...globalFavorites, venueId]
      const newVenueDetails = [...globalFavoriteVenues, newFavorite]

      saveFavoritesToStorage(newFavorites, newVenueDetails)

      // Here you would typically make an API call
      // try {
      //   await addFavoriteAPI(venueId)
      // } catch (error) {
      //   // Revert on error
      //   saveFavoritesToStorage(globalFavorites, globalFavoriteVenues)
      //   throw error
      // }
    },
    [],
  )

  // Remove venue from favorites
  const removeFavorite = useCallback(async (venueId: string) => {
    setError(null)

    const newFavorites = globalFavorites.filter(id => id !== venueId)
    const newVenueDetails = globalFavoriteVenues.filter(
      venue => venue.id !== venueId,
    )

    saveFavoritesToStorage(newFavorites, newVenueDetails)

    // Here you would typically make an API call
    // try {
    //   await removeFavoriteAPI(venueId)
    // } catch (error) {
    //   // Revert on error
    //   saveFavoritesToStorage(globalFavorites, globalFavoriteVenues)
    //   throw error
    // }
  }, [])

  // Toggle favorite status
  const toggleFavorite = useCallback(
    async (
      venueId: string,
      venueTitle: string,
      location?: string,
      venueName?: string,
    ) => {
      if (globalFavorites.includes(venueId)) {
        await removeFavorite(venueId)
      } else {
        await addFavorite(venueId, venueTitle, location, venueName)
      }
    },
    [addFavorite, removeFavorite],
  )

  // Check if venue is favorited
  const isFavorited = useCallback(
    (venueId: string) => {
      return globalFavorites.includes(venueId)
    },
    [favorites],
  ) // Keep dependency on favorites to trigger re-renders

  // Get favorite count
  const favoriteCount = favorites.length

  // Check if at maximum capacity
  const isAtMaxCapacity = favorites.length >= MAX_FAVORITES

  // Get remaining slots
  const remainingSlots = Math.max(0, MAX_FAVORITES - favorites.length)

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Clear all favorites
  const clearFavorites = useCallback(async () => {
    setError(null)

    saveFavoritesToStorage([], [])

    // Here you would typically make an API call
    // try {
    //   await clearFavoritesAPI()
    // } catch (error) {
    //   console.error('Failed to clear favorites on server:', error)
    // }
  }, [])

  // Get favorite venues by location
  const getFavoritesByLocation = useCallback(
    (location: string) => {
      return favoriteVenues.filter(venue => venue.location === location)
    },
    [favoriteVenues],
  )

  // Get all unique locations from favorites
  const getFavoriteLocations = useCallback(() => {
    const locations = favoriteVenues
      .map(venue => venue.location)
      .filter((location): location is string => location !== undefined)
    return [...new Set(locations)]
  }, [favoriteVenues])

  // Get favorite venues with coordinates
  const getFavoritesWithLocation = useCallback(() => {
    return favoriteVenues.filter(venue => venue.location)
  }, [favoriteVenues])

  return {
    favorites,
    favoriteVenues,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
    favoriteCount,
    maxFavorites: MAX_FAVORITES,
    isAtMaxCapacity,
    remainingSlots,
    clearError,
    clearFavorites,
    getFavoritesByLocation,
    getFavoriteLocations,
    getFavoritesWithLocation,
  }
}

export default useFavorites
