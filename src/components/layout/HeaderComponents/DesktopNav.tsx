import React from 'react'

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
    <a href="/" className="text-charcoal hover:text-turquoise transition-colors font-medium">Home</a>
    <a href="/venues" className="text-charcoal hover:text-turquoise transition-colors font-medium">Venues</a>
    <a href="/inspection" className="text-charcoal hover:text-turquoise transition-colors font-medium">Venue Inspection</a>
    <a href="/blog" className="text-charcoal hover:text-turquoise transition-colors font-medium">Blog & Guides</a>
    <a href="/about" className="text-charcoal hover:text-turquoise transition-colors font-medium">About</a>
  </div>

  )
}

export default DesktopNav