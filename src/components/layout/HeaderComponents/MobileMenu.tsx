import { Calendar } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MobileMenu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <>
    {isMenuOpen && (
          <div className="lg:hidden border-t border-charcoal/10 py-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Home</Link>
              <Link href="/venues" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Venues</Link>
              <Link href="/inspection" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Venue Inspection</Link>
              <Link href="/blog" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Blog & Guides</Link>
              <Link href="/about" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">About</Link>
              <button className="flex items-center justify-center space-x-2 bg-golden text-charcoal px-4 py-3 rounded-full font-medium hover:bg-golden/90 transition-colors mt-4">
                <Calendar size={16} />
                <span>Book Inspection</span>
              </button>
            </div>
          </div>
        )}
    
    
    </>
  )
}

export default MobileMenu