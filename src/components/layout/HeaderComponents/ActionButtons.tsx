import { Search, Calendar, Menu, X } from "lucide-react"
import React from "react"

const ActionButtons = ({
  isMenuOpen,
  setIsMenuOpen,
  isSearchOpen,
  setIsSearchOpen,
}: {
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (isSearchOpen: boolean) => void
}) => {
  return (
    <div className="flex items-center space-x-4">
      {/* <button 
      onClick={() => setIsSearchOpen(!isSearchOpen)}
      className="p-2 text-charcoal hover:text-turquoise transition-colors"
    >
      <Search size={20} />
    </button> */}

      <button className="hidden md:flex items-center space-x-2 bg-golden text-charcoal px-4 py-2 rounded-full font-medium hover:bg-golden/90 transition-colors">
        <Calendar size={16} />
        <span>Book Inspection</span>
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-2 text-charcoal"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  )
}

export default ActionButtons
