import Link from "next/link"
import React from "react"

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      <Link
        href="/"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        Home
      </Link>
      <Link
        href="/venues"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        Venues
      </Link>
      <Link
        href="/inspection"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        Venue Inspection
      </Link>
      <Link
        href="/blog"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        Blog & Guides
      </Link>
      <Link
        href="/about"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        About
      </Link>
    </div>
  )
}

export default DesktopNav
