import { Search } from "lucide-react"
import React from "react"

const SearchBar = ({ isSearchOpen }: { isSearchOpen: boolean }) => {
  return (
    <>
      {isSearchOpen && (
        <div className="pb-4 border-t border-charcoal/10 pt-4 animate-in slide-in-from-top-2">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search venues by location, style, or capacity..."
              className="w-full px-4 py-3 rounded-full border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
            />
            <Search
              className="absolute right-4 top-3.5 text-charcoal/50"
              size={20}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBar
