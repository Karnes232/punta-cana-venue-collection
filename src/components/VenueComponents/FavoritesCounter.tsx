'use client'

import React from 'react'
import { Star, Heart } from 'lucide-react'
import { useFavorites } from '@/customHooks/useFavoritesHook'

interface FavoritesCounterProps {
  variant?: 'star' | 'heart'
  showCount?: boolean
  showProgress?: boolean
  className?: string
}

const FavoritesCounter: React.FC<FavoritesCounterProps> = ({
  variant = 'star',
  showCount = true,
  showProgress = true,
  className = ''
}) => {
  const { favoriteCount, maxFavorites, isAtMaxCapacity } = useFavorites()
  const IconComponent = variant === 'heart' ? Heart : Star

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <IconComponent 
          size={16} 
          className={`${
            favoriteCount > 0 
              ? variant === 'heart' 
                ? 'fill-red-500 text-red-500' 
                : 'fill-golden text-golden'
              : 'text-gray-400'
          }`}
        />
        {showCount && (
          <span className={`text-sm font-medium ${
            isAtMaxCapacity 
              ? 'text-amber-600' 
              : favoriteCount > 0 
                ? 'text-charcoal' 
                : 'text-gray-500'
          }`}>
            {favoriteCount}/{maxFavorites}
          </span>
        )}
      </div>
      
      {showProgress && (
        <div className="flex items-center gap-1">
          {/* Progress dots */}
          {Array.from({ length: maxFavorites }, (_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                index < favoriteCount
                  ? variant === 'heart'
                    ? 'bg-red-500'
                    : 'bg-golden'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}
      
      {isAtMaxCapacity && (
        <span className="text-xs text-amber-600 font-medium">
          Full
        </span>
      )}
    </div>
  )
}

export default FavoritesCounter